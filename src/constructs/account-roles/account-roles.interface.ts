import type { aws_iam as iam } from 'aws-cdk-lib';

/**
 * Properties for the AccountRoles construct.
 */
export interface AccountRolesProps {
  /**
   * The ARN of the KMS key used by the execution role for encrypting and
   * decrypting data within SageMaker Unified Studio projects.
   */
  readonly kmsKeyArn: string;
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
   * The execution role defines the AWS services and data that can be accessed
   * through Amazon SageMaker Unified Studio projects. It determines which tools,
   * compute resources, data sources, and AI/ML assets project members can access.
   * Amazon SageMaker Unified Studio assumes this role to make service calls on
   * behalf of users within projects.
   *
   * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/setup-iam-based-domains.html
   */
  readonly executionRole: iam.IRole;

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
