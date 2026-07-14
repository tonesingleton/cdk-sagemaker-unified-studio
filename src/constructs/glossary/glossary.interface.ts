/**
 * Read-only contract for a Glossary.
 */
export interface IGlossary {
  /** The glossary ID assigned by DataZone. */
  readonly glossaryId: string;
}

/**
 * Status of the glossary.
 */
export enum GlossaryStatus {
  /** The glossary is enabled. */
  ENABLED = 'ENABLED',
  /** The glossary is disabled. */
  DISABLED = 'DISABLED',
}

/**
 * Properties for a Glossary construct.
 *
 * There is no CloudFormation resource for DataZone glossaries.
 * This construct uses AwsCustomResource to call the DataZone API directly.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/create-maintain-business-glossary.html
 */
export interface GlossaryProps {
  /** The name of the glossary (1–256 characters). */
  readonly name: string;
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the project that owns this glossary. */
  readonly owningProjectIdentifier: string;
  /**
   * ARN of a role that DataZone trusts for glossary operations (e.g. the
   * domain execution role). The custom resource Lambda assumes this role
   * to satisfy DataZone's internal authorization checks.
   */
  readonly executionRoleArn: string;
  /**
   * Human-readable description of the glossary.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * Status of the glossary.
   *
   * @default GlossaryStatus.ENABLED
   */
  readonly status?: GlossaryStatus;
}

/**
 * Attributes required to import an existing Glossary.
 */
export interface GlossaryAttributes {
  /** The glossary ID. */
  readonly glossaryId: string;
}
