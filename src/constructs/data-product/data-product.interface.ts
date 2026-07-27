/**
 * Read-only contract for a DataProduct.
 */
export interface IDataProduct {
  /** The ID of the data product assigned by DataZone. */
  readonly dataProductId: string;
  /** The revision of the data product. */
  readonly revision: string;
}

/**
 * A single data asset item included in the data product.
 */
export interface DataProductItem {
  /** The identifier of the data asset. */
  readonly identifier: string;
  /** The type of the item (e.g. `ASSET`). */
  readonly itemType: string;
  /** The revision of the item. */
  readonly revision?: string;
  /** Glossary terms associated with this item. */
  readonly glossaryTerms?: Array<string>;
}

/**
 * A metadata form attached to the data product.
 */
export interface DataProductFormInput {
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
 * Properties for a DataProduct construct.
 *
 * There is no CloudFormation resource for DataZone data products.
 * This construct uses AwsCustomResource to call the DataZone API directly.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateDataProduct.html
 */
export interface DataProductProps {
  /** The name of the data product (1–64 characters). */
  readonly name: string;
  /** The ID of the domain where the data product is created (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the project that owns this data product. */
  readonly owningProjectIdentifier: string;
  /**
   * ARN of a role that DataZone trusts for data product operations (e.g. the
   * domain execution role). The custom resource Lambda assumes this role to
   * satisfy DataZone's internal authorization checks.
   *
   * When omitted, the Lambda calls DataZone directly without role assumption.
   *
   * @default - no role assumption; Lambda calls DataZone directly
   */
  readonly executionRoleArn?: string;
  /**
   * Human-readable description of the data product.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * Data assets included in the data product.
   *
   * @default - no items
   */
  readonly items?: Array<DataProductItem>;
  /**
   * Glossary terms associated with the data product.
   *
   * @default - no glossary terms
   */
  readonly glossaryTerms?: Array<string>;
  /**
   * Metadata forms attached to the data product.
   *
   * @default - no forms
   */
  readonly formsInput?: Array<DataProductFormInput>;
}

/**
 * Attributes required to import an existing DataProduct.
 */
export interface DataProductAttributes {
  /** The data product ID. */
  readonly dataProductId: string;
  /** The revision of the data product. */
  readonly revision: string;
}
