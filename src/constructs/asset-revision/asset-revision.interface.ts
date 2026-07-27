/**
 * Read-only contract for an AssetRevision.
 */
export interface IAssetRevision {
  /** The ID of the asset (same across all revisions). */
  readonly assetId: string;
  /** The new revision identifier created by this operation. */
  readonly revision: string;
}

/**
 * Properties for an AssetRevision construct.
 *
 * There is no CloudFormation resource for DataZone asset revisions.
 * This construct uses AwsCustomResource to call the DataZone API directly.
 * Revisions are immutable — the custom resource only runs on create; there is
 * no update or delete operation.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAssetRevision.html
 */
export interface AssetRevisionProps {
  /** The revised asset name (1–256 characters). */
  readonly name: string;
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the asset being revised. */
  readonly identifier: string;
  /**
   * ARN of a role that DataZone trusts for asset revision operations (e.g. the domain execution role).
   * The custom resource Lambda assumes this role to satisfy DataZone's internal authorization checks.
   *
   * When omitted, the Lambda calls DataZone directly without role assumption.
   *
   * @default - no role assumption; Lambda calls DataZone directly
   */
  readonly executionRoleArn?: string;
  /**
   * The revised description of the asset.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * The revision of the asset type to use for this revision.
   *
   * @default - latest revision
   */
  readonly typeRevision?: string;
  /**
   * Metadata forms to attach as part of this revision.
   *
   * @default - no forms
   */
  readonly formsInput?: Array<{
    readonly formName: string;
    readonly content?: string;
    readonly typeIdentifier?: string;
    readonly typeRevision?: string;
  }>;
  /**
   * Glossary terms to attach as part of this revision.
   *
   * @default - no glossary terms
   */
  readonly glossaryTerms?: Array<string>;
  /**
   * Configuration for automatically generated business-friendly metadata.
   *
   * @default - no prediction configuration
   */
  readonly predictionConfiguration?: {
    readonly businessNameGeneration?: { readonly enabled: boolean };
  };
}
