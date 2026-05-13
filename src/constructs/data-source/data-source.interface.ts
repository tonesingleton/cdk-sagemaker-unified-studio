/**
 * A filter expression for a data source.
 */
export interface FilterExpression {
  /** The filter type (INCLUDE or EXCLUDE). */
  readonly type: 'INCLUDE' | 'EXCLUDE';
  /** The filter expression (e.g. '*' for all tables). */
  readonly expression: string;
}

/**
 * A relational filter configuration for a data source.
 */
export interface RelationalFilterConfiguration {
  /** The database name to include in the data source. */
  readonly databaseName: string;
  /**
   * The schema name to filter on (Redshift only).
   *
   * @default - no schema filter
   */
  readonly schemaName?: string;
  /**
   * Filter expressions to include or exclude tables.
   *
   * @default - include all tables
   */
  readonly filterExpressions?: Array<FilterExpression>;
}

/**
 * Glue data source configuration.
 */
export interface GlueDataSourceConfiguration {
  /**
   * The relational filter configurations specifying which databases/tables to include.
   */
  readonly relationalFilterConfigurations: Array<RelationalFilterConfiguration>;
  /**
   * Whether to auto-import data quality results.
   *
   * @default true
   */
  readonly autoImportDataQualityResult?: boolean;
}

/**
 * Redshift credential configuration.
 */
export interface RedshiftCredentialConfiguration {
  /** The ARN of the secret in Secrets Manager containing the Redshift credentials. */
  readonly secretManagerArn: string;
}

/**
 * Redshift cluster storage configuration.
 */
export interface RedshiftClusterStorage {
  /** The name of the Redshift cluster. */
  readonly clusterName: string;
}

/**
 * Redshift Serverless storage configuration.
 */
export interface RedshiftServerlessStorage {
  /** The name of the Redshift Serverless workgroup. */
  readonly workgroupName: string;
}

/**
 * Redshift storage configuration (either cluster or serverless).
 */
export interface RedshiftStorage {
  /**
   * The Redshift cluster source.
   *
   * @default - not a cluster source
   */
  readonly redshiftClusterSource?: RedshiftClusterStorage;
  /**
   * The Redshift Serverless source.
   *
   * @default - not a serverless source
   */
  readonly redshiftServerlessSource?: RedshiftServerlessStorage;
}

/**
 * Redshift data source configuration.
 */
export interface RedshiftDataSourceConfiguration {
  /**
   * The relational filter configurations specifying which schemas/tables to include.
   */
  readonly relationalFilterConfigurations: Array<RelationalFilterConfiguration>;
  /**
   * The data access role ARN for the Redshift data source.
   *
   * @default - no data access role
   */
  readonly dataAccessRole?: string;
  /**
   * The Redshift credential configuration.
   *
   * @default - no credential configuration
   */
  readonly redshiftCredentialConfiguration?: RedshiftCredentialConfiguration;
  /**
   * The Redshift storage configuration.
   *
   * @default - no storage configuration
   */
  readonly redshiftStorage?: RedshiftStorage;
}

/**
 * Properties for a DataSource construct.
 */
export interface DataSourceProps {
  /** Display name of the data source. */
  readonly name: string;
  /** The SageMaker Unified Studio domain ID. */
  readonly domainId: string;
  /** The project ID that owns this data source. */
  readonly projectId: string;
  /** The connection ID for the data source connection. */
  readonly connectionId: string;
  /**
   * The Glue data source configuration.
   *
   * Mutually exclusive with `redshiftConfiguration`.
   *
   * @default - no Glue configuration (must specify `redshiftConfiguration` instead)
   */
  readonly glueConfiguration?: GlueDataSourceConfiguration;
  /**
   * The Redshift data source configuration.
   *
   * Mutually exclusive with `glueConfiguration`.
   *
   * @default - no Redshift configuration (must specify `glueConfiguration` instead)
   */
  readonly redshiftConfiguration?: RedshiftDataSourceConfiguration;
  /**
   * Whether the data source is enabled.
   *
   * @default true
   */
  readonly enabled?: boolean;
  /**
   * Whether to automatically publish imported assets.
   *
   * @default false
   */
  readonly publishOnImport?: boolean;
  /**
   * A cron expression for the data source run schedule.
   *
   * @default - no schedule (manual runs only)
   */
  readonly schedule?: string;
}
