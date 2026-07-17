import { Stack, Token, Validations, aws_iam as iam, aws_lambda as lambda_, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { GlossaryAttributes, GlossaryProps, IGlossary } from './glossary.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_DESCRIPTION_LENGTH = 4096;

/**
 * A DataZone business glossary for catalog standardization.
 *
 * There is no CloudFormation resource type for DataZone glossaries, so this
 * construct uses `AwsCustomResource` to call the DataZone API directly
 * (CreateGlossary / UpdateGlossary / DeleteGlossary).
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/create-maintain-business-glossary.html
 */
export class Glossary extends Construct implements IGlossary {
  /**
   * Import an existing glossary from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: GlossaryAttributes): IGlossary {
    class ImportedGlossary extends Construct implements IGlossary {
      public readonly glossaryId = attrs.glossaryId;
    }
    return new ImportedGlossary(scope, id);
  }

  /** The glossary ID assigned by DataZone. */
  public readonly glossaryId: string;

  constructor(scope: Construct, id: string, props: GlossaryProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`Glossary name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(`Glossary domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`);
    }

    if (!Token.isUnresolved(props.owningProjectIdentifier) && !PROJECT_ID_PATTERN.test(props.owningProjectIdentifier)) {
      throw new Error(
        `Glossary owningProjectIdentifier '${props.owningProjectIdentifier}' must match pattern ${PROJECT_ID_PATTERN}.`,
      );
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `Glossary description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
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
            actions: ['datazone:CreateGlossary', 'datazone:UpdateGlossary', 'datazone:DeleteGlossary'],
            resources: ['*'],
          }),
        ]);

    const glossary = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-datazone',
        action: 'CreateGlossary',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          name: props.name,
          owningProjectIdentifier: props.owningProjectIdentifier,
          description: props.description,
          status: props.status,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('id'),
        assumedRoleArn: props.executionRoleArn,
      },
      onUpdate: {
        service: '@aws-sdk/client-datazone',
        action: 'UpdateGlossary',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: new cr.PhysicalResourceIdReference(),
          name: props.name,
          description: props.description,
          status: props.status,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('id'),
        assumedRoleArn: props.executionRoleArn,
      },
      onDelete: {
        service: '@aws-sdk/client-datazone',
        action: 'DeleteGlossary',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: new cr.PhysicalResourceIdReference(),
        },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
        assumedRoleArn: props.executionRoleArn,
      },
      policy,
    });

    Validations.of(glossary).acknowledge({
      id: 'AwsSolutions-IAM5',
      reason: 'Glossary CRUD actions are scoped to the specific DataZone domain.',
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

    this.glossaryId = glossary.getResponseField('id');
  }
}
