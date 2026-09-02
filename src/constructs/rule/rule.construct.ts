import { Token, Validations, aws_iam as iam, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { IRule, RuleAttributes, RuleProps } from './rule.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const NAME_PATTERN = /^[\w -]+$/;
const MAX_NAME_LENGTH = 256;
const MAX_DESCRIPTION_LENGTH = 2048;

/**
 * A DataZone governance rule that enforces specific requirements across user workflows
 * (publishing assets, requesting subscriptions) within a domain unit.
 *
 * There is no CloudFormation resource type for DataZone rules, so this construct
 * uses `AwsCustomResource` to call the DataZone API directly
 * (CreateRule / UpdateRule / DeleteRule).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateRule.html
 */
export class Rule extends Construct implements IRule {
  /**
   * Import an existing rule from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: RuleAttributes): IRule {
    class ImportedRule extends Construct implements IRule {
      public readonly ruleId = attrs.ruleId;
    }
    return new ImportedRule(scope, id);
  }

  /** The ID of the rule. */
  public readonly ruleId: string;

  constructor(scope: Construct, id: string, props: RuleProps) {
    super(scope, id);

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(`Rule domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`);
    }

    if (!props.name || props.name.length > MAX_NAME_LENGTH || !NAME_PATTERN.test(props.name)) {
      throw new Error(`Rule name must be 1–${MAX_NAME_LENGTH} characters and match pattern ${NAME_PATTERN}.`);
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `Rule description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
      );
    }

    if (props.detail.metadataFormEnforcementDetail && props.detail.glossaryTermEnforcementDetail) {
      throw new Error(
        'Rule detail must specify either metadataFormEnforcementDetail or glossaryTermEnforcementDetail, not both.',
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
            actions: ['datazone:CreateRule', 'datazone:UpdateRule', 'datazone:DeleteRule'],
            resources: ['*'],
          }),
        ]);

    const rule = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-datazone',
        action: 'CreateRule',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          name: props.name,
          action: props.action,
          scope: props.scope,
          target: props.target,
          detail: props.detail,
          description: props.description,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('identifier'),
        assumedRoleArn: props.executionRoleArn,
      },
      onUpdate: {
        service: '@aws-sdk/client-datazone',
        action: 'UpdateRule',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: new cr.PhysicalResourceIdReference(),
          name: props.name,
          scope: props.scope,
          detail: props.detail,
          description: props.description,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('identifier'),
        assumedRoleArn: props.executionRoleArn,
      },
      onDelete: {
        service: '@aws-sdk/client-datazone',
        action: 'DeleteRule',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: new cr.PhysicalResourceIdReference(),
        },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
        assumedRoleArn: props.executionRoleArn,
      },
      policy,
    });

    Validations.of(rule).acknowledge(
      {
        id: 'AwsSolutions-IAM5',
        reason: 'Rule CRUD actions are scoped to the specific DataZone domain.',
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

    this.ruleId = rule.getResponseField('identifier');
  }
}
