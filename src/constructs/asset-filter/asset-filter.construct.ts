import { Token, Validations, aws_iam as iam, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { AssetFilterAttributes, AssetFilterProps, IAssetFilter } from './asset-filter.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const ASSET_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const NAME_PATTERN = /^[\w -]+$/;
const MAX_NAME_LENGTH = 64;
const MAX_DESCRIPTION_LENGTH = 2048;

/**
 * A DataZone asset filter that creates a controlled view of an asset by restricting
 * visible columns or rows, enabling fine-grained access control without duplicating data.
 *
 * There is no CloudFormation resource type for DataZone asset filters, so this construct
 * uses `AwsCustomResource` to call the DataZone API directly
 * (CreateAssetFilter / UpdateAssetFilter / DeleteAssetFilter).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAssetFilter.html
 */
export class AssetFilter extends Construct implements IAssetFilter {
  /**
   * Import an existing asset filter from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: AssetFilterAttributes): IAssetFilter {
    class ImportedAssetFilter extends Construct implements IAssetFilter {
      public readonly assetFilterId = attrs.assetFilterId;
    }
    return new ImportedAssetFilter(scope, id);
  }

  /** The ID of the asset filter. */
  public readonly assetFilterId: string;

  constructor(scope: Construct, id: string, props: AssetFilterProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH || !NAME_PATTERN.test(props.name)) {
      throw new Error(`AssetFilter name must be 1–${MAX_NAME_LENGTH} characters and match pattern ${NAME_PATTERN}.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `AssetFilter domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!Token.isUnresolved(props.assetIdentifier) && !ASSET_ID_PATTERN.test(props.assetIdentifier)) {
      throw new Error(`AssetFilter assetIdentifier '${props.assetIdentifier}' must match pattern ${ASSET_ID_PATTERN}.`);
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `AssetFilter description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
      );
    }

    if (props.configuration.columnConfiguration && props.configuration.rowConfiguration) {
      throw new Error(
        'AssetFilter configuration must specify either columnConfiguration or rowConfiguration, not both.',
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
            actions: ['datazone:CreateAssetFilter', 'datazone:UpdateAssetFilter', 'datazone:DeleteAssetFilter'],
            resources: ['*'],
          }),
        ]);

    const sharedParams = {
      domainIdentifier: props.domainIdentifier,
      assetIdentifier: props.assetIdentifier,
      name: props.name,
      description: props.description,
      configuration: props.configuration,
    };

    const assetFilter = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-datazone',
        action: 'CreateAssetFilter',
        parameters: sharedParams,
        physicalResourceId: cr.PhysicalResourceId.fromResponse('id'),
        assumedRoleArn: props.executionRoleArn,
      },
      onUpdate: {
        service: '@aws-sdk/client-datazone',
        action: 'UpdateAssetFilter',
        parameters: {
          ...sharedParams,
          identifier: new cr.PhysicalResourceIdReference(),
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('id'),
        assumedRoleArn: props.executionRoleArn,
      },
      onDelete: {
        service: '@aws-sdk/client-datazone',
        action: 'DeleteAssetFilter',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          assetIdentifier: props.assetIdentifier,
          identifier: new cr.PhysicalResourceIdReference(),
        },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
        assumedRoleArn: props.executionRoleArn,
      },
      policy,
    });

    Validations.of(assetFilter).acknowledge(
      {
        id: 'AwsSolutions-IAM5',
        reason: 'AssetFilter CRUD actions are scoped to the specific DataZone domain.',
      },
      {
        id: 'AwsSolutions-L1',
        reason: 'AwsCustomResource singleton Lambda runtime is managed by the CDK framework.',
      },
      {
        id: 'AwsSolutions-IAM4',
        reason: 'AwsCustomResource singleton Lambda requires basic execution role for CloudWatch logging.',
      },
    );

    this.assetFilterId = assetFilter.getResponseField('id');
  }
}
