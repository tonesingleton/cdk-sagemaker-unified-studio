import type { ConnectionProps } from '../../connection.interface';

/**
 * Properties for a BigQueryConnection construct.
 *
 * Creates a Glue connection of type BIGQUERY targeting a Google BigQuery dataset.
 * Uses OAuth2 authentication via a Secrets Manager secret containing Google credentials.
 * No VPC required. Supports Spark and Athena compute.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface BigQueryConnectionProps extends ConnectionProps {
  /**
   * The Google Cloud project ID.
   */
  readonly projectId: string;

  /**
   * The BigQuery dataset name.
   *
   * @default - no dataset (connects at project level)
   */
  readonly dataset?: string;

  /**
   * The IAM role ARN passed to Glue for accessing BigQuery.
   */
  readonly roleArn: string;

  /**
   * ARN of the Secrets Manager secret containing Google Cloud OAuth2 credentials.
   */
  readonly secretArn: string;

  /**
   * KMS key ARN used to encrypt the secret.
   *
   * @default - AWS managed key
   */
  readonly kmsKeyArn?: string;

  /**
   * Additional Spark-specific connection properties.
   *
   * @default - no additional Spark properties
   */
  readonly sparkProperties?: Record<string, string>;

  /**
   * Additional Athena-specific connection properties.
   *
   * @default - no additional Athena properties
   */
  readonly athenaProperties?: Record<string, string>;
}
