import type { aws_datazone } from 'aws-cdk-lib';
import type { ConnectionProps } from '../connection.interface';

/**
 * The Glue connection type.
 */
export enum GlueConnectionType {
  /** Oracle database. */
  ORACLE = 'ORACLE',
  /** MySQL database. */
  MYSQL = 'MYSQL',
  /** PostgreSQL database. */
  POSTGRESQL = 'POSTGRESQL',
  /** Microsoft SQL Server database. */
  SQLSERVER = 'SQLSERVER',
  /** Amazon Redshift. */
  REDSHIFT = 'REDSHIFT',
  /** Snowflake. */
  SNOWFLAKE = 'SNOWFLAKE',
  /** Generic JDBC connection. */
  JDBC = 'JDBC',
  /** MongoDB document database. */
  MONGODB = 'MONGODB',
  /** Apache Kafka streaming platform. */
  KAFKA = 'KAFKA',
  /** Network connection within a VPC. */
  NETWORK = 'NETWORK',
  /** AWS Marketplace connector. */
  MARKETPLACE = 'MARKETPLACE',
  /** Custom connector. */
  CUSTOM = 'CUSTOM',
}

/**
 * The authentication type for a Glue connection.
 */
export enum GlueAuthenticationType {
  /** Basic username/password authentication. */
  BASIC = 'BASIC',
  /** OAuth2 authentication. */
  OAUTH2 = 'OAUTH2',
  /** Custom authentication. */
  CUSTOM = 'CUSTOM',
}

/**
 * Compute environments to validate the Glue connection against.
 */
export enum GlueComputeEnvironment {
  /** Apache Spark (Glue Interactive Sessions). */
  SPARK = 'SPARK',
  /** Amazon Athena. */
  ATHENA = 'ATHENA',
  /** Python. */
  PYTHON = 'PYTHON',
}

/**
 * Physical connection requirements for a Glue connection.
 */
export interface GluePhysicalConnectionRequirements {
  /**
   * The subnet ID for the connection.
   *
   * @pattern ^subnet-[a-z0-9]+$
   * @default - no subnet
   */
  readonly subnetId?: string;
  /**
   * The subnet ID list for the connection.
   *
   * @default - no subnet list
   */
  readonly subnetIdList?: Array<string>;
  /**
   * The security group IDs for the connection.
   *
   * @default - no security groups
   */
  readonly securityGroupIdList?: Array<string>;
  /**
   * The availability zone of the subnet.
   *
   * @default - no availability zone
   */
  readonly availabilityZone?: string;
}

/**
 * Authentication configuration for a Glue connection.
 */
export interface GlueAuthenticationConfiguration {
  /** The authentication type. */
  readonly authenticationType: GlueAuthenticationType;
  /**
   * The ARN of the Secrets Manager secret containing credentials.
   *
   * @pattern ^arn:aws(-(cn|us-gov|iso(-[bef])?))?:secretsmanager:.*$
   * @default - no secret
   */
  readonly secretArn?: string;
  /**
   * The ARN of the KMS key used to encrypt the secret.
   *
   * @pattern ^$|arn:aws[a-z0-9-]*:kms:.*$
   * @default - no KMS key
   */
  readonly kmsKeyArn?: string;
  /**
   * Basic authentication credentials (username and password).
   *
   * @default - no basic credentials
   */
  readonly basicAuthenticationCredentials?: aws_datazone.CfnConnection.BasicAuthenticationCredentialsProperty;
  /**
   * OAuth2 properties for the connection.
   *
   * @default - no OAuth2 properties
   */
  readonly oAuth2Properties?: aws_datazone.CfnConnection.OAuth2PropertiesProperty;
  /**
   * Custom authentication credentials as key-value pairs.
   *
   * @default - no custom credentials
   */
  readonly customAuthenticationCredentials?: Record<string, string>;
}

/**
 * Properties for a GlueConnection construct.
 */
export interface GlueConnectionProps extends ConnectionProps {
  /** The Glue connection type. */
  readonly connectionType: GlueConnectionType;
  /**
   * Connection properties such as HOST, PORT, DATABASE, SECRET_ID, ROLE_ARN.
   *
   * @default - no connection properties
   */
  readonly connectionProperties?: Record<string, string>;
  /**
   * Physical connection requirements (VPC, subnet, security groups).
   *
   * @default - no physical connection requirements
   */
  readonly physicalConnectionRequirements?: GluePhysicalConnectionRequirements;
  /**
   * Authentication configuration.
   *
   * @default - no authentication
   */
  readonly authenticationConfiguration?: GlueAuthenticationConfiguration;
  /**
   * Whether to validate credentials on creation.
   *
   * @default false
   */
  readonly validateCredentials?: boolean;
  /**
   * Compute environments to validate the connection for.
   * Must contain at least one value when provided.
   *
   * @default - all compute environments (SPARK, ATHENA, PYTHON)
   */
  readonly validateForComputeEnvironments?: Array<GlueComputeEnvironment>;
  /**
   * Athena-specific properties (e.g. spill_bucket, spill_prefix).
   *
   * @default - no Athena properties
   */
  readonly athenaProperties?: Record<string, string>;
  /**
   * Spark-specific properties.
   *
   * @default - no Spark properties
   */
  readonly sparkProperties?: Record<string, string>;
  /**
   * Python-specific properties.
   *
   * @default - no Python properties
   */
  readonly pythonProperties?: Record<string, string>;
  /**
   * Match criteria for selecting this connection.
   *
   * @default - no match criteria
   */
  readonly matchCriteria?: string;
}
