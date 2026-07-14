/**
 * Supported data formats for a data catalog table.
 */
export enum DataFormat {
  /** Apache Parquet columnar format. */
  PARQUET = 'PARQUET',
  /** ORC columnar format. */
  ORC = 'ORC',
  /** JSON format. */
  JSON = 'JSON',
  /** CSV format. */
  CSV = 'CSV',
}

/**
 * Primitive data types supported by Glue Data Catalog.
 *
 * For complex types (array, map, struct), use the static helper methods.
 *
 * @see https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-tables.html
 */
export enum ColumnType {
  /** UTF-8 string. */
  STRING = 'string',
  /** 8-bit signed integer. */
  TINYINT = 'tinyint',
  /** 16-bit signed integer. */
  SMALLINT = 'smallint',
  /** 32-bit signed integer. */
  INT = 'int',
  /** 64-bit signed integer. */
  BIGINT = 'bigint',
  /** Single-precision 32-bit floating point. */
  FLOAT = 'float',
  /** Double-precision 64-bit floating point. */
  DOUBLE = 'double',
  /** Arbitrary-precision decimal. */
  DECIMAL = 'decimal',
  /** Boolean (true/false). */
  BOOLEAN = 'boolean',
  /** Binary data. */
  BINARY = 'binary',
  /** Date without time (YYYY-MM-DD). */
  DATE = 'date',
  /** Timestamp with nanosecond precision. */
  TIMESTAMP = 'timestamp',
  /** Character string with fixed length. */
  CHAR = 'char',
  /** Character string with maximum length. */
  VARCHAR = 'varchar',
}

/**
 * A column definition for a data catalog table.
 */
export interface Column {
  /** The column name. */
  readonly name: string;
  /**
   * The Glue data type.
   *
   * Use `ColumnType` enum for primitive types, or a string for complex types
   * (e.g. `"array<string>"`, `"map<string,int>"`, `"struct<name:string,age:int>"`,
   * `"decimal(10,2)"`, `"char(5)"`, `"varchar(255)"`).
   */
  readonly type: string;
  /**
   * Human-readable description of the column.
   *
   * @default - no comment
   */
  readonly comment?: string;
  /**
   * Key-value pairs defining properties associated with the column.
   *
   * @default - no parameters
   */
  readonly parameters?: Record<string, string>;
}

/**
 * Whether the table is governed by Lake Formation or is an external table.
 */
export enum TableType {
  /** External table — data managed outside Lake Formation governance. */
  EXTERNAL = 'EXTERNAL_TABLE',
  /** Governed table — data managed with Lake Formation transactions. */
  GOVERNED = 'GOVERNED',
}

/**
 * Exposed attributes of the DataCatalogTable construct.
 */
export interface IDataCatalogTable {
  /** The table name. */
  readonly tableName: string;
  /** The database name the table belongs to. */
  readonly databaseName: string;
}

/**
 * Properties for a DataCatalogTable construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-glue-table.html
 */
export interface DataCatalogTableProps {
  /** The table name. */
  readonly tableName: string;
  /** The Glue database name to create this table in. */
  readonly databaseName: string;
  /**
   * The SageMaker Unified Studio project ID.
   *
   * The `AmazonDataZoneProject` tag is automatically applied
   * to any DQDL ruleset created via `addDqdlRuleset()`.
   *
   */
  readonly projectId: string;
  /** The S3 location of the table data. */
  readonly location: string;
  /** The columns of the table (excluding partition keys). */
  readonly columns: Array<Column>;
  /**
   * Partition keys for Hive-style partitioning.
   *
   * @default - no partitions
   */
  readonly partitionKeys?: Array<Column>;
  /**
   * The data format of the table.
   *
   * @default DataFormat.PARQUET
   */
  readonly dataFormat?: DataFormat;
  /**
   * Human-readable description of the table.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * The table type.
   *
   * @default TableType.EXTERNAL
   */
  readonly tableType?: TableType;
  /**
   * Additional table parameters.
   *
   * @default - no additional parameters
   */
  readonly parameters?: Record<string, string>;
}
