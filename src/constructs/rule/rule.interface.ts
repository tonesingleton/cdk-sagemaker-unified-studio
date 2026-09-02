/**
 * Read-only contract for a Rule.
 */
export interface IRule {
  /** The ID of the rule. */
  readonly ruleId: string;
}

/**
 * Attributes required to import an existing Rule.
 */
export interface RuleAttributes {
  /** The rule ID. */
  readonly ruleId: string;
}

/** The action that triggers the rule. */
export enum RuleAction {
  CREATE_LISTING_CHANGE_SET = 'CREATE_LISTING_CHANGE_SET',
  CREATE_SUBSCRIPTION_REQUEST = 'CREATE_SUBSCRIPTION_REQUEST',
}

/** Selection mode for asset types or projects in a rule scope. */
export enum RuleSelectionMode {
  ALL = 'ALL',
  SPECIFIC = 'SPECIFIC',
}

/**
 * Restricts which asset types the rule applies to.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_AssetTypesForRule.html
 */
export interface AssetTypesForRule {
  /** Whether to apply to all asset types or only specific ones. */
  readonly selectionMode: RuleSelectionMode;
  /**
   * The specific asset type names to include. Required when `selectionMode` is `SPECIFIC`.
   *
   * @default - all asset types
   */
  readonly specificAssetTypes?: Array<string>;
}

/**
 * Restricts which projects the rule applies to.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_ProjectsForRule.html
 */
export interface ProjectsForRule {
  /** Whether to apply to all projects or only specific ones. */
  readonly selectionMode: RuleSelectionMode;
  /**
   * The specific project IDs to include. Required when `selectionMode` is `SPECIFIC`.
   *
   * @default - all projects
   */
  readonly specificProjects?: Array<string>;
}

/**
 * The scope of a rule — which asset types, projects, and data products it applies to.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_RuleScope.html
 */
export interface RuleScope {
  /**
   * The asset types included in the rule scope.
   *
   * @default - all asset types
   */
  readonly assetType?: AssetTypesForRule;
  /**
   * Whether the rule applies to data products.
   *
   * @default false
   */
  readonly dataProduct?: boolean;
  /**
   * The projects included in the rule scope.
   *
   * @default - all projects
   */
  readonly project?: ProjectsForRule;
}

/**
 * The target domain unit for a rule.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_DomainUnitTarget.html
 */
export interface DomainUnitTarget {
  /** The ID of the domain unit. */
  readonly domainUnitId: string;
  /**
   * Whether the rule also applies to child domain units.
   *
   * @default false
   */
  readonly includeChildDomainUnits?: boolean;
}

/**
 * The target of a rule (union — currently only `domainUnitTarget` is supported).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_RuleTarget.html
 */
export interface RuleTarget {
  /** The domain unit target. */
  readonly domainUnitTarget: DomainUnitTarget;
}

/**
 * A reference to a metadata form type that must be filled in.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_MetadataFormReference.html
 */
export interface MetadataFormReference {
  /** The type identifier of the metadata form (1–385 characters, pattern `(?!\\.)[\\w\\.]*\\w`). */
  readonly typeIdentifier: string;
  /** The type revision of the metadata form. */
  readonly typeRevision: string;
}

/**
 * Enforcement detail for a metadata form rule — specifies which forms are required.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_MetadataFormEnforcementDetail.html
 */
export interface MetadataFormEnforcementDetail {
  /**
   * The metadata forms that must be filled in (1–5 items).
   *
   * @default - no required forms
   */
  readonly requiredMetadataForms?: Array<MetadataFormReference>;
}

/**
 * Enforcement detail for a glossary term rule — specifies which terms must be applied.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_GlossaryTermEnforcementDetail.html
 */
export interface GlossaryTermEnforcementDetail {
  /**
   * The IDs of the glossary terms that must be applied (1–5 items).
   *
   * @default - no required terms
   */
  readonly requiredGlossaryTermIds?: Array<string>;
}

/**
 * The detail of a rule (union — specify exactly one).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_RuleDetail.html
 */
export interface RuleDetail {
  /** Enforce required metadata forms on assets. */
  readonly metadataFormEnforcementDetail?: MetadataFormEnforcementDetail;
  /** Enforce required glossary terms on assets. */
  readonly glossaryTermEnforcementDetail?: GlossaryTermEnforcementDetail;
}

/**
 * Properties for a Rule construct.
 *
 * There is no CloudFormation resource for DataZone rules.
 * This construct uses AwsCustomResource to call the DataZone API directly.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateRule.html
 */
export interface RuleProps {
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The rule name (1–256 characters, pattern `[\w -]+`). */
  readonly name: string;
  /** The action that triggers this rule. */
  readonly action: RuleAction;
  /** The scope of the rule — which asset types and projects it applies to. */
  readonly scope: RuleScope;
  /** The target of the rule — the domain unit it is attached to. */
  readonly target: RuleTarget;
  /** The enforcement detail of the rule (metadata form or glossary term). */
  readonly detail: RuleDetail;
  /**
   * Human-readable description of the rule.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * ARN of a role that DataZone trusts for rule operations (e.g. the domain execution role).
   *
   * @default - no role assumption; Lambda calls DataZone directly
   */
  readonly executionRoleArn?: string;
}
