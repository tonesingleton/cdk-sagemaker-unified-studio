/**
 * Properties for a DqdlRuleset construct.
 */
export interface DqdlRulesetProps {
  /** The ruleset name. Must be unique within the account/region. */
  readonly name: string;
  /** The DQDL ruleset string (e.g. 'Rules = [ Completeness "col" = 1.0 ]'). */
  readonly ruleset: string;
  /** The target database name. */
  readonly databaseName: string;
  /** The target table name. */
  readonly tableName: string;
  /**
   * Human-readable description of the ruleset.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * Tags to apply to the ruleset.
   *
   * @default - no tags
   */
  readonly tags?: Record<string, string>;
}
