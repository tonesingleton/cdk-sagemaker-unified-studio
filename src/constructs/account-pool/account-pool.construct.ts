import { Token, Validations, aws_iam as iam, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { AccountPoolAttributes, AccountPoolProps, IAccountPool } from './account-pool.interface';
import { ResolutionStrategy } from './account-pool.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const NAME_PATTERN = /^[\w -]+$/;
const MAX_NAME_LENGTH = 64;
const MAX_DESCRIPTION_LENGTH = 2048;

/**
 * A DataZone account pool that groups AWS accounts for multi-account data mesh topologies.
 * Accounts in the pool can be associated with a domain as producers or consumers.
 *
 * There is no CloudFormation resource type for DataZone account pools, so this construct
 * uses `AwsCustomResource` to call the DataZone API directly
 * (CreateAccountPool / UpdateAccountPool / DeleteAccountPool).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAccountPool.html
 */
export class AccountPool extends Construct implements IAccountPool {
  /**
   * Import an existing account pool from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: AccountPoolAttributes): IAccountPool {
    class ImportedAccountPool extends Construct implements IAccountPool {
      public readonly accountPoolId = attrs.accountPoolId;
    }
    return new ImportedAccountPool(scope, id);
  }

  /** The ID of the account pool. */
  public readonly accountPoolId: string;

  constructor(scope: Construct, id: string, props: AccountPoolProps) {
    super(scope, id);

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `AccountPool domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!props.name || props.name.length > MAX_NAME_LENGTH || !NAME_PATTERN.test(props.name)) {
      throw new Error(`AccountPool name must be 1–${MAX_NAME_LENGTH} characters and match pattern ${NAME_PATTERN}.`);
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `AccountPool description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
      );
    }

    if (props.accountSource.accounts && props.accountSource.customAccountPoolHandler) {
      throw new Error('AccountPool accountSource must specify either accounts or customAccountPoolHandler, not both.');
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
            actions: ['datazone:CreateAccountPool', 'datazone:UpdateAccountPool', 'datazone:DeleteAccountPool'],
            resources: ['*'],
          }),
        ]);

    const sharedParams = {
      domainIdentifier: props.domainIdentifier,
      name: props.name,
      accountSource: props.accountSource,
      resolutionStrategy: props.resolutionStrategy ?? ResolutionStrategy.MANUAL,
      description: props.description,
    };

    const pool = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-datazone',
        action: 'CreateAccountPool',
        parameters: sharedParams,
        physicalResourceId: cr.PhysicalResourceId.fromResponse('id'),
        assumedRoleArn: props.executionRoleArn,
      },
      onUpdate: {
        service: '@aws-sdk/client-datazone',
        action: 'UpdateAccountPool',
        parameters: {
          ...sharedParams,
          identifier: new cr.PhysicalResourceIdReference(),
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('id'),
        assumedRoleArn: props.executionRoleArn,
      },
      onDelete: {
        service: '@aws-sdk/client-datazone',
        action: 'DeleteAccountPool',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: new cr.PhysicalResourceIdReference(),
        },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
        assumedRoleArn: props.executionRoleArn,
      },
      policy,
    });

    Validations.of(pool).acknowledge(
      {
        id: 'AwsSolutions-IAM5',
        reason: 'AccountPool CRUD actions are scoped to the specific DataZone domain.',
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

    this.accountPoolId = pool.getResponseField('id');
  }
}
