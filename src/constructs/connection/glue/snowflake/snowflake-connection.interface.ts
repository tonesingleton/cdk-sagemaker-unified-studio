import type { ConnectionProps } from '../../connection.interface';

/**
 * Properties for a SnowflakeConnection construct.
 *
 * Creates a Glue connection of type SNOWFLAKE targeting a Snowflake data warehouse.
 * Supports Spark and Athena compute. No VPC required.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface SnowflakeConnectionProps extends ConnectionProps {
  /** The Snowflake account URL (e.g. 'https://myaccount.snowflakecomputing.com'). */
  readonly accountUrl: string;

  /**
   * The Snowflake warehouse name.
   *
   * @default - no warehouse (uses Snowflake default)
   */
  readonly warehouse?: string;

  /** The Snowflake database name. */
  readonly databaseName: string;

  /**
   * The Snowflake role to use for the session.
   *
   * @default - no role (uses Snowflake default)
   */
  readonly snowflakeRole?: string;

  /**
   * The IAM role ARN passed to Glue for accessing Snowflake.
   */
  readonly roleArn: string;

  /**
   * ARN of the Secrets Manager secret containing Snowflake credentials.
   *
   * When provided, the connection uses BASIC authentication with the secret.
   *
   * @default - no secret (role-based access only)
   */
  readonly secretArn?: string;

  /**
   * KMS key ARN used to encrypt the secret.
   * Only relevant when secretArn is provided.
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
