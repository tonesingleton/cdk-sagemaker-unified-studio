import type { ConnectionProps } from '../../connection.interface';

/**
 * Properties for a DocumentDbConnection construct.
 *
 * Creates a Glue connection of type DOCUMENTDB targeting an Amazon DocumentDB cluster.
 * Uses a MongoDB-protocol connection URL. Supports Spark and Athena compute.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface DocumentDbConnectionProps extends ConnectionProps {
  /**
   * The MongoDB-protocol connection URL for the DocumentDB cluster.
   *
   * @example 'mongodb://docdb-cluster.cluster-xxxx.eu-central-1.docdb.amazonaws.com:27017'
   */
  readonly connectionUrl: string;

  /**
   * The IAM role ARN passed to Glue for accessing the database.
   */
  readonly roleArn: string;

  /** VPC subnet ID where the Glue connection runs. */
  readonly subnetId: string;

  /** Security group IDs allowing access to the DocumentDB cluster. */
  readonly securityGroupIds: Array<string>;

  /** Availability zone of the subnet. */
  readonly availabilityZone: string;

  /**
   * ARN of the Secrets Manager secret containing DocumentDB credentials.
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
