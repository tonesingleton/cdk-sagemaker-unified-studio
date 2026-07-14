import type { ConnectionProps } from '../../connection.interface';

/**
 * Properties for an OracleConnection construct.
 *
 * Creates a Glue connection of type ORACLE targeting an Oracle database
 * (on-premises or Amazon RDS). Only Spark compute is supported.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface OracleConnectionProps extends ConnectionProps {
  /** The Oracle database hostname or IP address. */
  readonly host: string;

  /**
   * The Oracle listener port.
   *
   * @default 1521
   */
  readonly port?: number;

  /** The Oracle database name (SID or service name). */
  readonly databaseName: string;

  /**
   * The IAM role ARN passed to Glue for accessing the database.
   * Must have permission to read the secret and connect through the VPC.
   */
  readonly roleArn: string;

  /** VPC subnet ID where the Glue connection runs. */
  readonly subnetId: string;

  /** Security group IDs allowing access to the Oracle database. */
  readonly securityGroupIds: Array<string>;

  /** Availability zone of the subnet. */
  readonly availabilityZone: string;

  /**
   * ARN of the Secrets Manager secret containing Oracle credentials.
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
}
