/**
 * Read-only contract for a Data Quality Ruleset.
 */
export interface IDataQualityRuleset {
  /** The ruleset name. */
  readonly name: string;
}

/**
 * Attributes required to import an existing Data Quality Ruleset.
 */
export interface DataQualityRulesetAttributes {
  /** The ruleset name. */
  readonly name: string;
}

/**
 * Target table for the data quality ruleset.
 */
export interface DataQualityTargetTable {
  /** The Glue catalog database name. */
  readonly databaseName: string;
  /** The Glue catalog table name. */
  readonly tableName: string;
}

/**
 * Properties for a DataQualityRuleset construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-glue-dataqualityruleset.html
 */
export interface DataQualityRulesetProps {
  /**
   * The ruleset name. Must be unique within the account/region.
   *
   * Must be 1–255 characters and match `^[a-zA-Z0-9_-]+$`.
   */
  readonly name: string;

  /**
   * The DQDL ruleset string.
   *
   * Must begin with `Rules = [` (case-insensitive whitespace flexible).
   *
   * @example 'Rules = [ Completeness "col" = 1.0 ]'
   * @see https://docs.aws.amazon.com/glue/latest/dg/dqdl.html
   */
  readonly ruleset: string;

  /**
   * The target Glue table for the ruleset.
   */
  readonly targetTable: DataQualityTargetTable;

  /**
   * Human-readable description of the ruleset.
   *
   * Must be at most 2048 characters.
   *
   * @default - no description
   */
  readonly description?: string;

  /**
   * A client token for idempotent creation (e.g. a UUID).
   *
   * @default - no client token
   */
  readonly clientToken?: string;

  /**
   * Tags to apply to the ruleset.
   *
   * @default - no tags
   */
  readonly tags?: Record<string, string>;
}
