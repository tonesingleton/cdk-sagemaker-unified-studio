import { Stack, Token, Validations, aws_iam as iam, aws_lambda as lambda_, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { AssetTypeAttributes, AssetTypeProps, IAssetType } from './asset-type.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_DESCRIPTION_LENGTH = 2048;

/**
 * A custom DataZone asset type that defines the schema and required metadata forms
 * for a category of catalog assets.
 *
 * There is no CloudFormation resource type for DataZone asset types, so this construct
 * uses `AwsCustomResource` to call the DataZone API directly
 * (CreateAssetType / DeleteAssetType).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAssetType.html
 */
export class AssetType extends Construct implements IAssetType {
  /**
   * Import an existing asset type from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: AssetTypeAttributes): IAssetType {
    class ImportedAssetType extends Construct implements IAssetType {
      public readonly assetTypeName = attrs.assetTypeName;
      public readonly revision = attrs.revision;
    }
    return new ImportedAssetType(scope, id);
  }

  /** The name of the asset type. */
  public readonly assetTypeName: string;
  /** The revision of the asset type. */
  public readonly revision: string;

  constructor(scope: Construct, id: string, props: AssetTypeProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`AssetType name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `AssetType domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!Token.isUnresolved(props.owningProjectIdentifier) && !PROJECT_ID_PATTERN.test(props.owningProjectIdentifier)) {
      throw new Error(
        `AssetType owningProjectIdentifier '${props.owningProjectIdentifier}' must match pattern ${PROJECT_ID_PATTERN}.`,
      );
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `AssetType description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
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
            actions: ['datazone:CreateAssetType', 'datazone:DeleteAssetType'],
            resources: ['*'],
          }),
        ]);

    const assetType = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-datazone',
        action: 'CreateAssetType',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          name: props.name,
          owningProjectIdentifier: props.owningProjectIdentifier,
          formsInput: props.formsInput,
          description: props.description,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('name'),
        assumedRoleArn: props.executionRoleArn,
      },
      onDelete: {
        service: '@aws-sdk/client-datazone',
        action: 'DeleteAssetType',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: new cr.PhysicalResourceIdReference(),
        },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
        assumedRoleArn: props.executionRoleArn,
      },
      policy,
    });

    Validations.of(assetType).acknowledge({
      id: 'AwsSolutions-IAM5',
      reason: 'AssetType CRUD actions are scoped to the specific DataZone domain.',
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

    this.assetTypeName = assetType.getResponseField('name');
    this.revision = assetType.getResponseField('revision');
  }
}
