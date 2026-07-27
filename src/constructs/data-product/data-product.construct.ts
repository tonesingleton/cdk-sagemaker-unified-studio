import { Stack, Token, Validations, aws_iam as iam, aws_lambda as lambda_, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { DataProductAttributes, DataProductProps, IDataProduct } from './data-product.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 64;
const MAX_DESCRIPTION_LENGTH = 4096;

/**
 * A DataZone data product — a curated package of data assets with metadata,
 * documentation, and access controls.
 *
 * There is no CloudFormation resource type for DataZone data products, so this
 * construct uses `AwsCustomResource` to call the DataZone API directly
 * (CreateDataProduct / DeleteDataProduct).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateDataProduct.html
 */
export class DataProduct extends Construct implements IDataProduct {
  /**
   * Import an existing data product from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: DataProductAttributes): IDataProduct {
    class ImportedDataProduct extends Construct implements IDataProduct {
      public readonly dataProductId = attrs.dataProductId;
      public readonly revision = attrs.revision;
    }
    return new ImportedDataProduct(scope, id);
  }

  /** The ID of the data product assigned by DataZone. */
  public readonly dataProductId: string;
  /** The revision of the data product. */
  public readonly revision: string;

  constructor(scope: Construct, id: string, props: DataProductProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`DataProduct name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `DataProduct domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!Token.isUnresolved(props.owningProjectIdentifier) && !PROJECT_ID_PATTERN.test(props.owningProjectIdentifier)) {
      throw new Error(
        `DataProduct owningProjectIdentifier '${props.owningProjectIdentifier}' must match pattern ${PROJECT_ID_PATTERN}.`,
      );
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `DataProduct description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
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
            actions: ['datazone:CreateDataProduct', 'datazone:DeleteDataProduct'],
            resources: ['*'],
          }),
        ]);

    const dataProduct = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-datazone',
        action: 'CreateDataProduct',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          name: props.name,
          owningProjectIdentifier: props.owningProjectIdentifier,
          description: props.description,
          items: props.items,
          glossaryTerms: props.glossaryTerms,
          formsInput: props.formsInput,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('id'),
        assumedRoleArn: props.executionRoleArn,
      },
      onDelete: {
        service: '@aws-sdk/client-datazone',
        action: 'DeleteDataProduct',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: new cr.PhysicalResourceIdReference(),
        },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
        assumedRoleArn: props.executionRoleArn,
      },
      policy,
    });

    Validations.of(dataProduct).acknowledge({
      id: 'AwsSolutions-IAM5',
      reason: 'DataProduct CRUD actions are scoped to the specific DataZone domain.',
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

    this.dataProductId = dataProduct.getResponseField('id');
    this.revision = dataProduct.getResponseField('revision');
  }
}
