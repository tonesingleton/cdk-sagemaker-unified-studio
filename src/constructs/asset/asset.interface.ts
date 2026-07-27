/**
 * Read-only contract for an Asset.
 */
export interface IAsset {
  /** The ID of the asset assigned by DataZone. */
  readonly assetId: string;
  /** The revision of the asset. */
  readonly revision: string;
}

/**
 * A metadata form attached to the asset.
 */
export interface AssetFormInput {
  /** The name of the form. */
  readonly formName: string;
  /** The serialized form content. */
  readonly content?: string;
  /** The identifier of the form type. */
  readonly typeIdentifier?: string;
  /** The revision of the form type. */
  readonly typeRevision?: string;
}

/**
 * Business name generation settings within a prediction configuration.
 */
export interface BusinessNameGenerationConfiguration {
  /** Whether business name generation is enabled. */
  readonly enabled: boolean;
}

/**
 * Configuration for automatically generated business-friendly metadata.
 */
export interface PredictionConfiguration {
  /** Business name generation settings. */
  readonly businessNameGeneration?: BusinessNameGenerationConfiguration;
}

/**
 * Properties for an Asset construct.
 *
 * There is no CloudFormation resource for DataZone assets.
 * This construct uses AwsCustomResource to call the DataZone API directly.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAsset.html
 */
export interface AssetProps {
  /** The asset name (1–256 characters). */
  readonly name: string;
  /** The ID of the domain where the asset is created (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the project that owns this asset. */
  readonly owningProjectIdentifier: string;
  /** The unique identifier of the asset type (e.g. `amazon.datazone.GlueTableAssetType`). */
  readonly typeIdentifier: string;
  /**
   * ARN of a role that DataZone trusts for asset operations (e.g. the domain execution role).
   * The custom resource Lambda assumes this role to satisfy DataZone's internal authorization checks.
   *
   * When omitted, the Lambda calls DataZone directly without role assumption.
   *
   * @default - no role assumption; Lambda calls DataZone directly
   */
  readonly executionRoleArn?: string;
  /**
   * Human-readable description of the asset.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * The revision of the asset type.
   *
   * @default - latest revision
   */
  readonly typeRevision?: string;
  /**
   * An external identifier for the asset. Must be unique if specified.
   *
   * @default - no external identifier
   */
  readonly externalIdentifier?: string;
  /**
   * Metadata forms attached to the asset.
   *
   * @default - no forms
   */
  readonly formsInput?: Array<AssetFormInput>;
  /**
   * Glossary terms attached to the asset.
   *
   * @default - no glossary terms
   */
  readonly glossaryTerms?: Array<string>;
  /**
   * Configuration for automatically generated business-friendly metadata.
   *
   * @default - no prediction configuration
   */
  readonly predictionConfiguration?: PredictionConfiguration;
}

/**
 * Attributes required to import an existing Asset.
 */
export interface AssetAttributes {
  /** The asset ID. */
  readonly assetId: string;
  /** The revision of the asset. */
  readonly revision: string;
}
