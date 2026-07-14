import type { ConnectionProps } from '../../connection.interface';

/**
 * Properties for a SqlServerConnection construct.
 *
 * Creates a Glue connection of type SQLSERVER targeting a Microsoft SQL Server database
 * (Amazon RDS or on-premises). Supports Spark and Athena compute.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface SqlServerConnectionProps extends ConnectionProps {
  /** The SQL Server database hostname or IP address. */
  readonly host: string;

  /**
   * The SQL Server port.
   *
   * @default 1433
   */
  readonly port?: number;

  /** The SQL Server database name. */
  readonly databaseName: string;

  /**
   * The IAM role ARN passed to Glue for accessing the database.
   */
  readonly roleArn: string;

  /** VPC subnet ID where the Glue connection runs. */
  readonly subnetId: string;

  /** Security group IDs allowing access to the SQL Server database. */
  readonly securityGroupIds: Array<string>;

  /** Availability zone of the subnet. */
  readonly availabilityZone: string;

  /**
   * ARN of the Secrets Manager secret containing SQL Server credentials.
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
