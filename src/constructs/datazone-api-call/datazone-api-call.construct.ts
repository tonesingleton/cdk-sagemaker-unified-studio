import { custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { DataZoneApiCallProps, DataZoneSdkCall } from './datazone-api-call.interface';

const SERVICE = 'DataZone';

/**
 * A CloudFormation custom resource that invokes a single AWS DataZone SDK action at
 * deploy time, running as a caller-supplied DataZone-enrolled role.
 *
 * This is the single, shared entry point for calling DataZone APIs from CDK. It wraps
 * `AwsCustomResource`, so every action in the DataZone v3 client is available
 * declaratively (no handler code), while guaranteeing the call executes as the
 * provided `role` so it passes DataZone's membership-gated authorization — which
 * checks the *calling identity* against the project/domain ACL, not just IAM.
 *
 * IDENTITY CONSTRAINT: `AwsCustomResource` backs every instance in a stack with one
 * singleton Lambda whose role is fixed by whichever instance is synthesized first.
 * All `DataZoneApiCall`s in a stack must therefore use the SAME enrolled role — pass
 * `domain.datazoneApiRole` consistently.
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/datazone/
 */
export class DataZoneApiCall extends Construct {
  /**
   * Sentinel for a parameter that resolves, at deploy time, to this custom resource's
   * physical ID (the ID captured by `physicalResourceIdFromResponsePath` on create).
   * Use it in `onUpdate`/`onDelete` parameters to target the created resource, e.g.
   * `{ identifier: DataZoneApiCall.PHYSICAL_RESOURCE_ID }`. Cannot be used in `onCreate`.
   *
   * Mirrors `custom_resources.PhysicalResourceIdReference`.
   */
  public static readonly PHYSICAL_RESOURCE_ID = 'PHYSICAL:RESOURCEID:';

  private readonly resource: cr.AwsCustomResource;

  constructor(scope: Construct, id: string, props: DataZoneApiCallProps) {
    super(scope, id);

    if (!props.onCreate && !props.onUpdate && !props.onDelete) {
      throw new Error('DataZoneApiCall requires at least one of onCreate, onUpdate, or onDelete.');
    }

    const defaultId = this.node.path;
    const physicalId = (call: DataZoneSdkCall, forceDefault: boolean): cr.PhysicalResourceId | undefined => {
      if (call.physicalResourceIdFromResponsePath !== undefined) {
        return cr.PhysicalResourceId.fromResponse(call.physicalResourceIdFromResponsePath);
      }
      if (call.physicalResourceId !== undefined) {
        return cr.PhysicalResourceId.of(call.physicalResourceId);
      }
      return forceDefault ? cr.PhysicalResourceId.of(defaultId) : undefined;
    };
    const toSdkCall = (call: DataZoneSdkCall, forceDefault: boolean): cr.AwsSdkCall => ({
      service: SERVICE,
      action: call.action,
      parameters: call.parameters,
      outputPaths: call.outputPaths,
      physicalResourceId: physicalId(call, forceDefault),
    });

    // A lookup should re-resolve on stack updates, so default each of create/update
    // to the other when only one is supplied.
    const create = props.onCreate ?? props.onUpdate;
    const update = props.onUpdate ?? props.onCreate;

    this.resource = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: create ? toSdkCall(create, true) : undefined,
      onUpdate: update ? toSdkCall(update, true) : undefined,
      onDelete: props.onDelete ? toSdkCall(props.onDelete, false) : undefined,
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE }),
      role: props.role,
      installLatestAwsSdk: props.installLatestAwsSdk ?? false,
    });
  }

  /**
   * Returns a field from the SDK call response as a CloudFormation token. The path
   * must be listed in the call's `outputPaths`.
   */
  public getResponseField(path: string): string {
    return this.resource.getResponseField(path);
  }
}
