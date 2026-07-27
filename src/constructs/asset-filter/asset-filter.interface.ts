/**
 * Read-only contract for an AssetFilter.
 */
export interface IAssetFilter {
  /** The ID of the asset filter. */
  readonly assetFilterId: string;
}

/**
 * Column-based filter configuration — restricts which columns are visible.
 */
export interface ColumnFilterConfiguration {
  /**
   * The column names to include. When omitted, all columns are included.
   *
   * @default - all columns included
   */
  readonly includedColumnNames?: Array<string>;
}

/**
 * A column-value pair used in comparison expressions.
 */
export interface ColumnValuePair {
  /** The column name to compare. */
  readonly columnName: string;
  /** The value to compare against. */
  readonly value: string;
}

/**
 * A column-values pair used in set membership expressions.
 */
export interface ColumnValuesPair {
  /** The column name to compare. */
  readonly columnName: string;
  /** The set of values to compare against. */
  readonly values: Array<string>;
}

/**
 * A single-column reference used in null-check expressions.
 */
export interface ColumnReference {
  /** The column name to check. */
  readonly columnName: string;
}

/**
 * A leaf expression in a row filter.
 * Exactly one property must be set (union type).
 */
export interface RowFilterExpression {
  readonly equalTo?: ColumnValuePair;
  readonly notEqualTo?: ColumnValuePair;
  readonly greaterThan?: ColumnValuePair;
  readonly greaterThanOrEqualTo?: ColumnValuePair;
  readonly lessThan?: ColumnValuePair;
  readonly lessThanOrEqualTo?: ColumnValuePair;
  readonly isNull?: ColumnReference;
  readonly isNotNull?: ColumnReference;
  readonly in?: ColumnValuesPair;
  readonly notIn?: ColumnValuesPair;
  readonly like?: ColumnValuePair;
  readonly notLike?: ColumnValuePair;
}

/**
 * A row filter node — either a leaf expression or a logical `and`/`or` of child filters.
 * Exactly one property must be set (union type).
 */
export interface RowFilter {
  /** A leaf comparison expression. */
  readonly expression?: RowFilterExpression;
  /** Logical AND of child row filters. */
  readonly and?: Array<RowFilter>;
  /** Logical OR of child row filters. */
  readonly or?: Array<RowFilter>;
}

/**
 * Row-based filter configuration — restricts which rows are visible.
 */
export interface RowFilterConfiguration {
  /** The row filter expression tree. */
  readonly rowFilter: RowFilter;
  /**
   * Whether the row filter is sensitive (affects how it is displayed to subscribers).
   *
   * @default false
   */
  readonly sensitive?: boolean;
}

/**
 * The filter configuration — either column-based or row-based (union type, not both).
 */
export interface AssetFilterConfiguration {
  /** Column-based filter — restricts visible columns. */
  readonly columnConfiguration?: ColumnFilterConfiguration;
  /** Row-based filter — restricts visible rows. */
  readonly rowConfiguration?: RowFilterConfiguration;
}

/**
 * Properties for an AssetFilter construct.
 *
 * There is no CloudFormation resource for DataZone asset filters.
 * This construct uses AwsCustomResource to call the DataZone API directly.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAssetFilter.html
 */
export interface AssetFilterProps {
  /** The filter name (1–64 characters, pattern `[\w -]+`). */
  readonly name: string;
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the asset this filter applies to. */
  readonly assetIdentifier: string;
  /**
   * The filter configuration. Specify either `columnConfiguration` or `rowConfiguration`, not both.
   */
  readonly configuration: AssetFilterConfiguration;
  /**
   * ARN of a role that DataZone trusts for asset filter operations (e.g. the domain execution role).
   * The custom resource Lambda assumes this role to satisfy DataZone's internal authorization checks.
   *
   * When omitted, the Lambda calls DataZone directly without role assumption.
   *
   * @default - no role assumption; Lambda calls DataZone directly
   */
  readonly executionRoleArn?: string;
  /**
   * Human-readable description of the filter.
   *
   * @default - no description
   */
  readonly description?: string;
}

/**
 * Attributes required to import an existing AssetFilter.
 */
export interface AssetFilterAttributes {
  /** The asset filter ID. */
  readonly assetFilterId: string;
}
