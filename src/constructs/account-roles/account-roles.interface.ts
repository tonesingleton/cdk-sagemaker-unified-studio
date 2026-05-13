import type { aws_iam as iam } from 'aws-cdk-lib';

/**
 * Properties for the AccountRoles construct.
 */
export interface AccountRolesProps {
  /**
   * The AWS account ID used to scope trust policies on the provisioning
   * and query execution roles.
   *
   * @default Stack.of(this).account
   */
  readonly account?: string;
}

/**
 * Exposed attributes of the AccountRoles construct.
 */
export interface IAccountRoles {
  /**
   * The provisioning role used by SageMaker Unified Studio to deploy blueprint resources.
   */
  readonly provisioningRole: iam.IRole;

  /**
   * The query execution role used by Lake Formation and Glue for Athena queries.
   */
  readonly queryExecutionRole: iam.IRole;

  /**
   * The Bedrock model management role used to create inference profiles.
   */
  readonly bedrockModelManagementRole: iam.IRole;

  /**
   * The Bedrock FM consumption role used for model invocation via inference profiles.
   */
  readonly bedrockFmConsumptionRole: iam.IRole;
}
