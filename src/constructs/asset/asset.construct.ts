import { Stack, Token, Validations, aws_iam as iam, aws_lambda as lambda_, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { AssetAttributes, AssetProps, IAsset } from './asset.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_DESCRIPTION_LENGTH = 2048;

/**
 * A DataZone catalog asset — a discoverable data entity (table, view, S3 collection, etc.)
 * registered in the domain catalog with metadata forms and governance attributes.
 *
 * There is no CloudFormation resource type for DataZone assets, so this construct uses
 * `AwsCustomResource` to call the DataZone API directly (CreateAsset / DeleteAsset).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAsset.html
 */
export class Asset extends Construct implements IAsset {
  /**
   * Import an existing asset from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: AssetAttributes): IAsset {
    class ImportedAsset extends Construct implements IAsset {
      public readonly assetId = attrs.assetId;
      public readonly revision = attrs.revision;
    }
    return new ImportedAsset(scope, id);
  }

  /** The ID of the asset assigned by DataZone. */
  public readonly assetId: string;
  /** The revision of the asset. */
  public readonly revision: string;

  constructor(scope: Construct, id: string, props: AssetProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`Asset name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(`Asset domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`);
    }

    if (!Token.isUnresolved(props.owningProjectIdentifier) && !PROJECT_ID_PATTERN.test(props.owningProjectIdentifier)) {
      throw new Error(
        `Asset owningProjectIdentifier '${props.owningProjectIdentifier}' must match pattern ${PROJECT_ID_PATTERN}.`,
      );
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `Asset description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
      );
    }

    const policy = props.executionRoleArn
      ? cr.AwsCustomResourcePolicy.fromStatements([
          new iam.PolicyStatement({
            actions: ['sts:AssumeRole'],
            resources: [props.executionRoleArn],
          }),
        ])
      : cr.AwsCustomResourcePolicy.fromStatements([
          new iam.PolicyStatement({
            actions: ['datazone:CreateAsset', 'datazone:DeleteAsset'],
            resources: ['*'],
          }),
        ]);

    const asset = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-datazone',
        action: 'CreateAsset',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          name: props.name,
          owningProjectIdentifier: props.owningProjectIdentifier,
          typeIdentifier: props.typeIdentifier,
          typeRevision: props.typeRevision,
          description: props.description,
          externalIdentifier: props.externalIdentifier,
          formsInput: props.formsInput,
          glossaryTerms: props.glossaryTerms,
          predictionConfiguration: props.predictionConfiguration,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('id'),
        assumedRoleArn: props.executionRoleArn,
      },
      onDelete: {
        service: '@aws-sdk/client-datazone',
        action: 'DeleteAsset',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: new cr.PhysicalResourceIdReference(),
        },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
        assumedRoleArn: props.executionRoleArn,
      },
      policy,
    });

    Validations.of(asset).acknowledge({
      id: 'AwsSolutions-IAM5',
      reason: 'Asset CRUD actions are scoped to the specific DataZone domain.',
    });

    // AwsCustomResource singleton Lambda suppressions
    const stack = Stack.of(this);
    for (const child of stack.node.children) {
      if (child instanceof lambda_.Function && child.node.id.startsWith('AWS')) {
        Validations.of(child).acknowledge(
          {
            id: 'AwsSolutions-L1',
            reason: 'AwsCustomResource singleton Lambda runtime is managed by the CDK framework.',
          },
          {
            id: 'AwsSolutions-IAM4',
            reason: 'AwsCustomResource singleton Lambda requires basic execution role for CloudWatch logging.',
          },
        );
        break;
      }
    }

    this.assetId = asset.getResponseField('id');
    this.revision = asset.getResponseField('revision');
  }
}
