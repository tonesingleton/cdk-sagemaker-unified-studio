import type { ConnectionProps } from '../../connection.interface';

/**
 * Properties for a PostgreSqlConnection construct.
 *
 * Creates a Glue connection of type POSTGRESQL targeting a PostgreSQL database
 * (Amazon RDS, Aurora PostgreSQL, or on-premises). Supports Spark and Athena compute.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface PostgreSqlConnectionProps extends ConnectionProps {
  /** The PostgreSQL database hostname or IP address. */
  readonly host: string;

  /**
   * The PostgreSQL port.
   *
   * @default 5432
   */
  readonly port?: number;

  /** The PostgreSQL database name. */
  readonly databaseName: string;

  /**
   * The IAM role ARN passed to Glue for accessing the database.
   */
  readonly roleArn: string;

  /** VPC subnet ID where the Glue connection runs. */
  readonly subnetId: string;

  /** Security group IDs allowing access to the PostgreSQL database. */
  readonly securityGroupIds: Array<string>;

  /** Availability zone of the subnet. */
  readonly availabilityZone: string;

  /**
   * ARN of the Secrets Manager secret containing PostgreSQL credentials.
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
