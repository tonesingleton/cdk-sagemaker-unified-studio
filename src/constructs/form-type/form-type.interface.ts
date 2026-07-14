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
 * Supported field types in a DataZone form type.
 */
export enum FormFieldType {
  /** A text field. */
  STRING = 'String',
  /** A whole number field. */
  INTEGER = 'Integer',
  /** A true/false field. */
  BOOLEAN = 'Boolean',
  /** A floating-point number field. */
  FLOAT = 'Float',
  /** A 64-bit integer field. */
  LONG = 'Long',
}

/**
 * A numeric range constraint for Integer, Float, or Long fields.
 */
export interface FormFieldRange {
  /**
   * Minimum value (inclusive).
   *
   * @default - no minimum
   */
  readonly min?: number;
  /**
   * Maximum value (inclusive).
   *
   * @default - no maximum
   */
  readonly max?: number;
}

/**
 * A single field definition in a form type.
 */
export interface FormField {
  /** The field name (must be a valid Smithy identifier). */
  readonly name: string;
  /** The data type of the field. */
  readonly type: FormFieldType;
  /**
   * Whether the field is required.
   *
   * @default false
   */
  readonly required?: boolean;
  /**
   * Human-readable description shown in the UI.
   *
   * @default - no documentation
   */
  readonly documentation?: string;
  /**
   * Display name shown in the DataZone UI.
   *
   * @default - uses the field name
   */
  readonly displayName?: string;
  /**
   * Numeric range constraint (only applies to Integer, Float, Long).
   *
   * @default - no range constraint
   */
  readonly range?: FormFieldRange;
}

/**
 * The Smithy model definition for the form type schema.
 *
 * Provide either `fields` (typed, recommended) or `smithy` (raw escape hatch).
 * If both are provided, `fields` takes precedence.
 */
export interface FormTypeModel {
  /**
   * Typed field definitions. The construct serializes these to Smithy internally.
   *
   * @default - uses `smithy` raw string instead
   */
  readonly fields?: Array<FormField>;
  /**
   * Raw Smithy model string. Use only when `fields` cannot express your schema.
   *
   * Must be 1–100,000 characters.
   *
   * **Important:** Do NOT include `$version` or `namespace` directives.
   * DataZone infers the namespace from the domain ID automatically.
   * The model should contain only the `structure` block.
   *
   * @default - uses `fields` typed definition instead
   * @example 'structure MyForm { @required name: String }'
   * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateFormType.html
   */
  readonly smithy?: string;
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
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the project that owns this form type. */
  readonly owningProjectIdentifier: string;
  /** The model defining the form schema (typed fields or raw Smithy). */
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
