import { Stack, Token, Validations, aws_iam as iam, aws_lambda as lambda_, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { AssetRevisionProps, IAssetRevision } from './asset-revision.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const ASSET_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_DESCRIPTION_LENGTH = 2048;

/**
 * A new revision of an existing DataZone catalog asset, capturing changes to
 * metadata, forms, or glossary terms while preserving the full revision history.
 *
 * There is no CloudFormation resource type for DataZone asset revisions, so this
 * construct uses `AwsCustomResource` to call `CreateAssetRevision` at deploy time.
 * Revisions are immutable — there is no update or delete operation.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAssetRevision.html
 */
export class AssetRevision extends Construct implements IAssetRevision {
  /** The ID of the asset (same across all revisions). */
  public readonly assetId: string;
  /** The new revision identifier created by this operation. */
  public readonly revision: string;

  constructor(scope: Construct, id: string, props: AssetRevisionProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`AssetRevision name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `AssetRevision domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!Token.isUnresolved(props.identifier) && !ASSET_ID_PATTERN.test(props.identifier)) {
      throw new Error(`AssetRevision identifier '${props.identifier}' must match pattern ${ASSET_ID_PATTERN}.`);
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `AssetRevision description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
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
            actions: ['datazone:CreateAssetRevision'],
            resources: ['*'],
          }),
        ]);

    const revision = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-datazone',
        action: 'CreateAssetRevision',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: props.identifier,
          name: props.name,
          description: props.description,
          typeRevision: props.typeRevision,
          formsInput: props.formsInput,
          glossaryTerms: props.glossaryTerms,
          predictionConfiguration: props.predictionConfiguration,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('revision'),
        assumedRoleArn: props.executionRoleArn,
      },
      policy,
    });

    Validations.of(revision).acknowledge({
      id: 'AwsSolutions-IAM5',
      reason: 'AssetRevision create action is scoped to the specific DataZone domain.',
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

    this.assetId = revision.getResponseField('id');
    this.revision = revision.getResponseField('revision');
  }
}
