import type { ConnectionProps } from '../connection.interface';

/**
 * Redshift username and password credentials.
 */
export interface RedshiftUsernamePassword {
  /** The username for the Redshift database. */
  readonly username: string;
  /** The password for the Redshift database. */
  readonly password: string;
}

/**
 * Redshift storage configuration.
 */
export interface RedshiftStorage {
  /**
   * The Redshift cluster name.
   *
   * @default - no cluster
   */
  readonly clusterName?: string;
  /**
   * The Redshift Serverless workgroup name.
   *
   * @default - no workgroup
   */
  readonly workgroupName?: string;
}

/**
 * Redshift credentials configuration.
 */
export interface RedshiftCredentials {
  /**
   * Username and password credentials.
   *
   * @default - no username/password
   */
  readonly usernamePassword?: RedshiftUsernamePassword;
  /**
   * The ARN of the Secrets Manager secret containing credentials.
   *
   * @pattern ^arn:aws(-(cn|us-gov|iso(-[bef])?))?:secretsmanager:.*$
   * @default - no secret
   */
  readonly secretArn?: string;
}

/**
 * Properties for a RedshiftConnection construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface RedshiftConnectionProps extends ConnectionProps {
  /** The credentials for the Redshift database. */
  readonly credentials: RedshiftCredentials;
  /** The Redshift database name. */
  readonly databaseName: string;
  /** The hostname of the Redshift cluster or serverless endpoint. */
  readonly host: string;
  /**
   * The port of the Redshift cluster.
   *
   * @default 5439
   */
  readonly port?: number;
  /** The storage configuration (cluster or serverless). */
  readonly storage: RedshiftStorage;
}
