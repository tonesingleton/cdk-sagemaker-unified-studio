import type { aws_kms as kms, aws_s3 as s3 } from 'aws-cdk-lib';

/**
 * Trigger mode for the workflow execution.
 */
export enum TriggerMode {
  /** Workflow runs on the defined schedule. */
  SCHEDULED = 'scheduled',
  /** Workflow can only be run on-demand. */
  MANUAL_ONLY = 'manual_only',
  /** Workflow cannot be run on schedule or on-demand. */
  DISABLED = 'disabled',
}

/**
 * Encryption type for workflow data.
 */
export enum EncryptionType {
  /** AWS manages the encryption key. */
  AWS_MANAGED_KEY = 'AWS_MANAGED_KEY',
  /** You provide a KMS key. */
  CUSTOMER_MANAGED_KEY = 'CUSTOMER_MANAGED_KEY',
}

/**
 * Local workflow definition file configuration.
 *
 * The construct deploys the file to S3 with a content-hash in the object key
 * so that CloudFormation detects changes and triggers a workflow update
 * (MWAA Serverless snapshots the definition on create/update).
 */
export interface WorkflowDefinitionFile {
  /** Absolute path to the local YAML workflow definition file. */
  readonly path: string;
  /** The S3 bucket to deploy the definition to. */
  readonly bucket: s3.IBucket;
  /**
   * S3 key prefix for the deployed definition.
   *
   * @default 'workflows'
   */
  readonly keyPrefix?: string;
}

/**
 * Encryption configuration for workflow data at rest and in transit.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-mwaaserverless-workflow-encryptionconfiguration.html
 */
export interface WorkflowEncryptionConfiguration {
  /** The type of encryption to use. */
  readonly type: EncryptionType;
  /**
   * The KMS key to use for encryption. Required when type is CUSTOMER_MANAGED_KEY.
   *
   * @default - AWS managed key
   */
  readonly kmsKey?: kms.IKey;
}

/**
 * Logging configuration for workflow execution.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-mwaaserverless-workflow-loggingconfiguration.html
 */
export interface WorkflowLoggingConfiguration {
  /** The name of the CloudWatch log group where workflow execution logs are stored. */
  readonly logGroupName: string;
}

/**
 * Network configuration for workflow execution.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-mwaaserverless-workflow-networkconfiguration.html
 */
export interface WorkflowNetworkConfiguration {
  /**
   * VPC security group IDs for the workflow execution environment.
   *
   * @default - service default
   */
  readonly securityGroupIds?: Array<string>;
  /**
   * VPC subnet IDs where the workflow execution environment is deployed.
   *
   * @default - service default
   */
  readonly subnetIds?: Array<string>;
}

/**
 * Exposed attributes of the Workflow construct.
 */
export interface IWorkflow {
  /** The workflow ARN. */
  readonly workflowArn: string;
  /** The workflow name. */
  readonly workflowName: string;
}

/**
 * Properties for a Workflow construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-mwaaserverless-workflow.html
 */
export interface WorkflowProps {
  /**
   * The name of the workflow.
   *
   * Must match `^[a-zA-Z0-9]+[a-zA-Z0-9.\-_]*$` and be between 1–255 characters.
   * Changing this value requires replacement.
   */
  readonly name: string;

  /**
   * The local YAML workflow definition file.
   *
   * The construct deploys this file to S3 and appends a content hash to the
   * object key so that any edit triggers a CloudFormation update.
   */
  readonly definitionFile: WorkflowDefinitionFile;

  /**
   * The ARN of the IAM role that MWAA Serverless assumes when executing the workflow.
   */
  readonly roleArn: string;

  /**
   * Description of the workflow.
   *
   * @default - no description
   */
  readonly description?: string;

  /**
   * The trigger mode for the workflow.
   *
   * @default TriggerMode.MANUAL_ONLY
   */
  readonly triggerMode?: TriggerMode;

  /**
   * Encryption configuration for workflow data.
   *
   * Changing this value requires replacement.
   *
   * @default - AWS managed encryption
   */
  readonly encryptionConfiguration?: WorkflowEncryptionConfiguration;

  /**
   * Logging configuration for workflow execution.
   *
   * @default - no logging
   */
  readonly loggingConfiguration?: WorkflowLoggingConfiguration;

  /**
   * Network configuration for VPC access during execution.
   *
   * When specified, ECS worker tasks are deployed in your VPC for secure
   * connectivity to VPC-only resources (e.g. RDS, private endpoints).
   *
   * @default - runs in the service's default worker VPC
   */
  readonly networkConfiguration?: WorkflowNetworkConfiguration;

  /**
   * Tags to apply to the workflow resource.
   *
   * @default - no tags
   */
  readonly tags?: Record<string, string>;
}
