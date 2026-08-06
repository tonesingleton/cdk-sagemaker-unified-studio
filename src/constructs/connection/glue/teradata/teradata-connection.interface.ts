import type { ConnectionProps } from '../../connection.interface';

/**
 * Properties for a TeradataConnection construct.
 *
 * Creates a Glue connection of type TERADATA targeting a Teradata Vantage database.
 * Uses BASIC authentication via a Secrets Manager secret. Supports optional VPC
 * configuration for instances hosted within a VPC. Only Spark compute is supported.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface TeradataConnectionProps extends ConnectionProps {
  /** The hostname of the Teradata database endpoint. */
  readonly host: string;

  /**
   * The Teradata listener port.
   *
   * @default 1025
   */
  readonly port?: number;

  /** The name of the Teradata database to connect to. */
  readonly databaseName: string;

  /**
   * ARN of the Secrets Manager secret containing Teradata credentials (USERNAME / PASSWORD).
   */
  readonly secretArn: string;

  /**
   * KMS key ARN used to encrypt the secret.
   *
   * @default - AWS managed key
   */
  readonly kmsKeyArn?: string;

  /**
   * The IAM role ARN used to access Secrets Manager and assign a VPC IP address.
   *
   * @default - no role ARN
   */
  readonly roleArn?: string;

  /**
   * Additional JDBC parameters for the connection (comma-separated key=value pairs).
   *
   * @default - no additional JDBC parameters
   */
  readonly jdbcParams?: string;

  /**
   * VPC subnet ID. Required when the Teradata instance is hosted in a VPC.
   *
   * @default - no VPC configuration
   */
  readonly subnetId?: string;

  /**
   * Security group IDs. Required when subnetId is provided.
   *
   * @default - no security groups
   */
  readonly securityGroupIds?: Array<string>;

  /**
   * Availability zone of the subnet.
   *
   * @default - no availability zone
   */
  readonly availabilityZone?: string;

  /**
   * Additional Spark-specific connection properties.
   *
   * @default - no additional Spark properties
   */
  readonly sparkProperties?: Record<string, string>;
}
