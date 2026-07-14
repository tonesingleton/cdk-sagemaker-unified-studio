/**
 * Read-only contract for a FormType.
 */
export interface IFormType {
  /** The form type identifier (e.g. `owningProjectId:formTypeName`). */
  readonly formTypeIdentifier: string;
  /** The revision of the form type. */
  readonly revision: string;
}

/**
 * Status of the form type.
 */
export enum FormTypeStatus {
  /** The form type is enabled. */
  ENABLED = 'ENABLED',
  /** The form type is disabled. */
  DISABLED = 'DISABLED',
}

/**
 * The Smithy model definition for the form type schema.
 */
export interface FormTypeModel {
  /**
   * The Smithy model string defining the form schema.
   *
   * Must be 1–100,000 characters.
   *
   * @see https://smithy.io/2.0/quickstart.html
   */
  readonly smithy: string;
}

/**
 * Properties for a FormType construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-formtype.html
 */
export interface FormTypeProps {
  /**
   * The name of the form type.
   *
   * Must be 1–128 characters and match `^(?![0-9_])\w+$|^_\w*[a-zA-Z0-9]\w*$`.
   */
  readonly name: string;
  /** The ID of the domain (e.g. `dzd-abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the project that owns this form type. */
  readonly owningProjectIdentifier: string;
  /** The Smithy model defining the form schema. */
  readonly model: FormTypeModel;
  /**
   * Human-readable description of the form type.
   *
   * Must be at most 2048 characters.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * Status of the form type.
   *
   * @default FormTypeStatus.ENABLED
   */
  readonly status?: FormTypeStatus;
}

/**
 * Attributes required to import an existing FormType.
 */
export interface FormTypeAttributes {
  /** The form type identifier. */
  readonly formTypeIdentifier: string;
  /** The revision of the form type. */
  readonly revision: string;
}
