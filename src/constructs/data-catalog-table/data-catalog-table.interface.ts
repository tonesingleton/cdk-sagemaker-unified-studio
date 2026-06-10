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
 * A column definition for a data catalog table.
 */
export interface Column {
  /** The column name. */
  readonly name: string;
  /** The Hive/Glue data type (e.g. string, int, double, timestamp, array<string>). */
  readonly type: string;
  /**
   * Human-readable description of the column.
   *
   * @default - no comment
   */
  readonly comment?: string;
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
 */
export interface DataCatalogTableProps {
  /** The table name. */
  readonly tableName: string;
  /** The Glue database name to create this table in. */
  readonly databaseName: string;
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
   * Whether the table is registered with Lake Formation for fine-grained access control.
   *
   * @default false
   */
  readonly registeredWithLakeFormation?: boolean;
  /**
   * Additional table parameters.
   *
   * @default - no additional parameters
   */
  readonly parameters?: Record<string, string>;
}
