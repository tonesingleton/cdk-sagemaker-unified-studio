import { custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { LookupEnvironmentProps } from './lookup-environment.interface';

/**
 * Looks up the ID of an existing environment within a project by name.
 *
 * Environments are provisioned asynchronously by SageMaker Unified Studio and
 * are not exposed as CloudFormation outputs. This construct calls
 * `DataZone:ListEnvironments` at deploy time to resolve the environment ID as
 * a CloudFormation token, which can then be used in downstream resources.
 *
 * Requires `domain.datazoneApiRole` — the role must be a project owner so it
 * can call the project-scoped `ListEnvironments` API.
 *
 * @example
 * const lookup = new LookupEnvironment(this, 'LookupTooling', {
 *   domainId: domain.domainId,
 *   projectId: project.id,
 *   environmentName: 'Tooling',
 *   datazoneApiRole: domain.datazoneApiRole,
 * });
 * const environmentId = lookup.environmentId;
 */
export class LookupEnvironment extends Construct {
  /** The resolved environment ID (CloudFormation token). */
  public readonly environmentId: string;

  constructor(scope: Construct, id: string, props: LookupEnvironmentProps) {
    super(scope, id);

    const sdkCall: cr.AwsSdkCall = {
      service: 'DataZone',
      action: 'ListEnvironments',
      parameters: {
        domainIdentifier: props.domainId,
        projectIdentifier: props.projectId,
        name: props.environmentName,
      },
      physicalResourceId: cr.PhysicalResourceId.of(`${props.projectId}-env-${props.environmentName}`),
      outputPaths: ['items.0.id'],
    };

    const lookup = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: sdkCall,
      onUpdate: sdkCall,
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: ['*'] }),
      role: props.datazoneApiRole,
    });

    this.environmentId = lookup.getResponseField('items.0.id');
  }
}
