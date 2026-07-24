/**
 * Read-only contract for a GlossaryTerm.
 */
export interface IGlossaryTerm {
  /** The glossary term ID assigned by DataZone. */
  readonly glossaryTermId: string;
}

/**
 * Status of the glossary term.
 */
export enum GlossaryTermStatus {
  /** The term is enabled. */
  ENABLED = 'ENABLED',
  /** The term is disabled. */
  DISABLED = 'DISABLED',
}

/**
 * A term relation entry for linking glossary terms.
 */
export interface TermRelation {
  /** The classifier of the relation (e.g. 'isA', 'hasA'). */
  readonly classifier?: string;
  /** The ID of the related glossary term. */
  readonly termId: string;
}

/**
 * Properties for a GlossaryTerm construct.
 *
 * There is no CloudFormation resource for DataZone glossary terms.
 * This construct uses AwsCustomResource to call the DataZone API directly.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/create-maintain-business-glossary.html
 */
export interface GlossaryTermProps {
  /** The name of the glossary term (1–256 characters). */
  readonly name: string;
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the glossary that owns this term. */
  readonly glossaryIdentifier: string;
  /**
   * ARN of a role that DataZone trusts for glossary term operations (e.g. the
   * domain execution role). The custom resource Lambda assumes this role
   * to satisfy DataZone's internal authorization checks.
   *
   * When omitted, the Lambda calls DataZone directly without role assumption.
   *
   * @default - no role assumption; Lambda calls DataZone directly
   */
  readonly executionRoleArn?: string;
  /**
   * Human-readable short description of the term.
   *
   * @default - no short description
   */
  readonly shortDescription?: string;
  /**
   * Human-readable long description of the term.
   *
   * @default - no long description
   */
  readonly longDescription?: string;
  /**
   * Status of the glossary term.
   *
   * @default GlossaryTermStatus.ENABLED
   */
  readonly status?: GlossaryTermStatus;
  /**
   * Relations to other glossary terms.
   *
   * @default - no relations
   */
  readonly termRelations?: Array<TermRelation>;
}

/**
 * Attributes required to import an existing GlossaryTerm.
 */
export interface GlossaryTermAttributes {
  /** The glossary term ID. */
  readonly glossaryTermId: string;
}
