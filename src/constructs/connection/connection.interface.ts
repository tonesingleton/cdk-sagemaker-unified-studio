/**
 * Authentication type for a connection.
 */
export enum ConnectionAuthenticationType {
  /** Basic username/password authentication via Secrets Manager. */
  BASIC = 'BASIC',
  /** OAuth2 authentication. */
  OAUTH2 = 'OAUTH2',
  /** Custom authentication. */
  CUSTOM = 'CUSTOM',
}

/**
 * The connection type.
 */
export enum ConnectionType {
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
 * Compute environments to validate the connection against.
 */
export enum ComputeEnvironment {
  /** Apache Spark (Glue Interactive Sessions). */
  SPARK = 'SPARK',
  /** Amazon Athena. */
  ATHENA = 'ATHENA',
  /** Python. */
  PYTHON = 'PYTHON',
}

/**
 * Physical connection requirements for a connection.
 */
export interface PhysicalConnectionRequirements {
  /**
   * The subnet ID for the connection.
   *
   * @default - no subnet
   */
  readonly subnetId?: string;
  /**
   * The subnet ID list for the connection.
   * Use this when multiple subnets are required.
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
 * Connection properties for relational database connections.
 */
export interface ConnectionProperties {
  /**
   * The hostname of the database server.
   *
   * @default - no host
   */
  readonly host?: string;
  /**
   * The port number of the database server.
   *
   * @default - no port
   */
  readonly port?: string;
  /**
   * The database name or service name.
   *
   * @default - no database
   */
  readonly database?: string;
  /**
   * The JDBC connection URL.
   * Use this as an alternative to host/port/database.
   *
   * @default - no JDBC connection URL
   */
  readonly jdbcConnectionUrl?: string;
  /**
   * The JDBC database engine (e.g. oracle, mysql, postgresql, sqlserver).
   *
   * @default - no JDBC engine
   */
  readonly jdbcEngine?: string;
  /**
   * Whether to enforce SSL for JDBC connections.
   *
   * @default - no SSL enforcement
   */
  readonly jdbcEnforceSsl?: string;
  /**
   * The secret ID containing credentials.
   * Alternative to providing username/password directly.
   *
   * @default - no secret ID
   */
  readonly secretId?: string;
  /**
   * The connector URL for MARKETPLACE/CUSTOM connections.
   *
   * @default - no connector URL
   */
  readonly connectorUrl?: string;
  /**
   * The connector class name for MARKETPLACE/CUSTOM connections.
   *
   * @default - no connector class name
   */
  readonly connectorClassName?: string;
  /**
   * The connector type for MARKETPLACE/CUSTOM connections.
   *
   * @default - no connector type
   */
  readonly connectorType?: string;
  /**
   * The connection URL for MONGODB or MARKETPLACE connections.
   *
   * @default - no connection URL
   */
  readonly connectionUrl?: string;
  /**
   * Kafka bootstrap servers.
   *
   * @default - no Kafka bootstrap servers
   */
  readonly kafkaBootstrapServers?: string;
  /**
   * Whether SSL is enabled for Kafka.
   *
   * @default - no Kafka SSL
   */
  readonly kafkaSslEnabled?: string;
}

/**
 * Athena-specific connection properties for federated query spill configuration.
 */
export interface AthenaProperties {
  /** The S3 bucket name for Athena federated query spill storage. */
  readonly spillBucket: string;
  /** The S3 key prefix for Athena federated query spill storage. */
  readonly spillPrefix: string;
  /**
   * The instance type for the Athena Lambda function.
   *
   * @default - default instance type
   */
  readonly instanceType?: string;
}

/**
 * Authentication configuration for a connection.
 */
export interface ConnectionAuthenticationConfiguration {
  /**
   * The authentication type.
   *
   * @default - no authentication type
   */
  readonly authenticationType?: ConnectionAuthenticationType;
  /**
   * The ARN of the Secrets Manager secret containing credentials.
   *
   * @default - no secret
   */
  readonly secretArn?: string;
  /**
   * The ARN of the KMS key used to encrypt the secret.
   *
   * @default - no KMS key
   */
  readonly kmsKeyArn?: string;
  /**
   * Custom authentication credentials as key-value pairs.
   * Used when authenticationType is CUSTOM.
   *
   * @default - no custom credentials
   */
  readonly customAuthenticationCredentials?: Record<string, string>;
}

/**
 * Properties for a Connection construct.
 */
export interface ConnectionProps {
  /** Display name of the connection. */
  readonly name: string;
  /** The SageMaker Unified Studio domain ID. */
  readonly domainId: string;
  /** The environment ID where the connection is created. */
  readonly environmentId: string;
  /**
   * The project ID that owns this connection.
   *
   * @default - derived from the environment
   */
  readonly projectId?: string;
  /**
   * Human-readable description of the connection.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * The connection type.
   *
   * @default - no connection type
   */
  readonly connectionType?: ConnectionType;
  /**
   * Connection properties such as host, port, database, jdbcConnectionUrl.
   *
   * @default - no connection properties
   */
  readonly connectionProperties?: ConnectionProperties;
  /**
   * Physical connection requirements (VPC, subnet, security groups).
   *
   * @default - no physical connection requirements
   */
  readonly physicalConnectionRequirements?: PhysicalConnectionRequirements;
  /**
   * Authentication configuration.
   *
   * @default - no authentication configuration
   */
  readonly authenticationConfiguration?: ConnectionAuthenticationConfiguration;
  /**
   * Whether to validate credentials on creation.
   *
   * @default false
   */
  readonly validateCredentials?: boolean;
  /**
   * Compute environments to validate the connection for.
   *
   * @default - no validation
   */
  readonly validateForComputeEnvironments?: Array<ComputeEnvironment>;
  /**
   * Connection properties specific to the Athena compute environment.
   *
   * @default - no Athena properties
   */
  readonly athenaProperties?: AthenaProperties;
  /**
   * Connection properties specific to the Spark compute environment.
   *
   * @default - no Spark properties
   */
  readonly sparkProperties?: Record<string, string>;
  /**
   * Connection properties specific to the Python compute environment.
   *
   * @default - no Python properties
   */
  readonly pythonProperties?: Record<string, string>;
  /**
   * A list of criteria that can be used in selecting this connection.
   *
   * @default - no match criteria
   */
  readonly matchCriteria?: string;
}
