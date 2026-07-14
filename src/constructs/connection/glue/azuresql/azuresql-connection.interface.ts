import type { ConnectionProps } from '../../connection.interface';

/**
 * The authentication type for an Azure SQL connection.
 */
export enum AzureSqlAuthenticationType {
  /** Basic username/password authentication via Secrets Manager. */
  BASIC = 'BASIC',
  /** OAuth2/Azure AD authentication via Secrets Manager. */
  OAUTH2 = 'OAUTH2',
}

/**
 * Properties for an AzureSqlConnection construct.
 *
 * Creates a Glue connection of type AZURESQL targeting an Azure SQL Database.
 * Supports Basic and OAuth2 authentication. No VPC required.
 * Supports Spark and Athena compute.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface AzureSqlConnectionProps extends ConnectionProps {
  /**
   * The Azure SQL server hostname (e.g. 'myserver.database.windows.net').
   */
  readonly host: string;

  /**
   * The Azure SQL port.
   *
   * @default 1433
   */
  readonly port?: number;

  /** The Azure SQL database name. */
  readonly databaseName: string;

  /**
   * The IAM role ARN passed to Glue for accessing Azure SQL.
   */
  readonly roleArn: string;

  /**
   * ARN of the Secrets Manager secret containing Azure SQL credentials.
   */
  readonly secretArn: string;

  /**
   * The authentication type.
   *
   * @default AzureSqlAuthenticationType.BASIC
   */
  readonly authenticationType?: AzureSqlAuthenticationType;

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
