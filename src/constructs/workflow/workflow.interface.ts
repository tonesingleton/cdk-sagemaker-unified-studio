import type { aws_s3 as s3 } from 'aws-cdk-lib';

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
 * S3 location of the YAML workflow definition.
 */
export interface WorkflowDefinitionLocation {
  /** The S3 bucket containing the YAML definition. */
  readonly bucket: s3.IBucket;
  /** The S3 object key of the YAML definition file. */
  readonly objectKey: string;
}

/**
 * Network configuration for workflow execution.
 */
export interface WorkflowNetworkConfiguration {
  /** Security group IDs for the workflow execution environment. */
  readonly securityGroupIds: Array<string>;
  /** Subnet IDs for the workflow execution environment. */
  readonly subnetIds: Array<string>;
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
 */
export interface WorkflowProps {
  /**
   * The name of the workflow.
   *
   * Must be unique within the AWS account.
   */
  readonly name: string;

  /**
   * The S3 location of the YAML workflow definition.
   */
  readonly definitionLocation: WorkflowDefinitionLocation;

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
   * Network configuration for VPC access during execution.
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
