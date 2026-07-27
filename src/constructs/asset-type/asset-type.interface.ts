/**
 * Read-only contract for an AssetType.
 */
export interface IAssetType {
  /** The name of the asset type. */
  readonly assetTypeName: string;
  /** The revision of the asset type. */
  readonly revision: string;
}

/**
 * A form entry that is attached to an asset type, specifying which form types
 * are required or optional when creating assets of this type.
 */
export interface FormEntryInput {
  /** The identifier of the form type. */
  readonly typeIdentifier: string;
  /** The revision of the form type. */
  readonly typeRevision: string;
  /**
   * Whether the form is required for assets of this type.
   *
   * @default false
   */
  readonly required?: boolean;
}

/**
 * Properties for an AssetType construct.
 *
 * There is no CloudFormation resource for DataZone asset types.
 * This construct uses AwsCustomResource to call the DataZone API directly.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAssetType.html
 */
export interface AssetTypeProps {
  /** The name of the asset type (1–256 characters, must not contain `.`). */
  readonly name: string;
  /** The ID of the domain where the asset type is created (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the project that owns this asset type. */
  readonly owningProjectIdentifier: string;
  /**
   * The metadata forms attached to this asset type, keyed by form name.
   * Pass an empty object (`{}`) when no forms are required.
   */
  readonly formsInput: Record<string, FormEntryInput>;
  /**
   * ARN of a role that DataZone trusts for asset type operations (e.g. the domain execution role).
   * The custom resource Lambda assumes this role to satisfy DataZone's internal authorization checks.
   *
   * When omitted, the Lambda calls DataZone directly without role assumption.
   *
   * @default - no role assumption; Lambda calls DataZone directly
   */
  readonly executionRoleArn?: string;
  /**
   * Human-readable description of the asset type.
   *
   * @default - no description
   */
  readonly description?: string;
}

/**
 * Attributes required to import an existing AssetType.
 */
export interface AssetTypeAttributes {
  /** The asset type name. */
  readonly assetTypeName: string;
  /** The revision of the asset type. */
  readonly revision: string;
}
