import { Token, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { FormField, FormTypeAttributes, FormTypeProps, IFormType } from './form-type.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const NAME_PATTERN = /^(?![0-9_])\w+$|^_\w*[a-zA-Z0-9]\w*$/;
const MAX_NAME_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 2048;
const MAX_SMITHY_LENGTH = 100000;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;

/**
 * Serialize typed FormField definitions to a Smithy structure string.
 */
function fieldsToSmithy(structName: string, fields: Array<FormField>): string {
  const lines: Array<string> = [`structure ${structName} {`];
  for (const field of fields) {
    if (field.required) {
      lines.push('    @required');
    }
    if (field.displayName) {
      lines.push(`    @amazon.datazone#displayname(defaultName: "${field.displayName}")`);
    }
    if (field.documentation) {
      lines.push(`    @documentation("${field.documentation}")`);
    }
    if (field.range) {
      const parts: Array<string> = [];
      if (field.range.min !== undefined) parts.push(`min: ${field.range.min}`);
      if (field.range.max !== undefined) parts.push(`max: ${field.range.max}`);
      if (parts.length) lines.push(`    @range(${parts.join(', ')})`);
    }
    lines.push(`    ${field.name}: ${field.type}`);
  }
  lines.push('}');
  return lines.join('\n');
}

/**
 * A DataZone form type that defines a custom metadata schema.
 *
 * Form types are structured metadata schemas that can be attached to assets,
 * enabling custom metadata curation and classification within a domain.
 *
 * Use `model.fields` for a typed definition (recommended) or `model.smithy`
 * for raw Smithy when you need annotations the typed interface doesn't cover.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-formtype.html
 */
export class FormType extends Construct implements IFormType {
  /**
   * Import an existing form type from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: FormTypeAttributes): IFormType {
    class ImportedFormType extends Construct implements IFormType {
      public readonly formTypeIdentifier = attrs.formTypeIdentifier;
      public readonly revision = attrs.revision;
    }
    return new ImportedFormType(scope, id);
  }

  /** The form type identifier. */
  public readonly formTypeIdentifier: string;
  /** The revision of the form type. */
  public readonly revision: string;

  constructor(scope: Construct, id: string, props: FormTypeProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH || !NAME_PATTERN.test(props.name)) {
      throw new Error(
        `FormType name '${props.name}' must be 1–${MAX_NAME_LENGTH} characters and match ${NAME_PATTERN}.`,
      );
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(`FormType domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`);
    }

    if (!Token.isUnresolved(props.owningProjectIdentifier) && !PROJECT_ID_PATTERN.test(props.owningProjectIdentifier)) {
      throw new Error(
        `FormType owningProjectIdentifier '${props.owningProjectIdentifier}' must match pattern ${PROJECT_ID_PATTERN}.`,
      );
    }

    // Resolve the Smithy model: typed fields take precedence over raw smithy string
    let smithy: string;
    if (props.model.fields && props.model.fields.length > 0) {
      smithy = fieldsToSmithy(props.name, props.model.fields);
    } else if (props.model.smithy) {
      smithy = props.model.smithy;
    } else {
      throw new Error('FormType model must specify either `fields` or `smithy`.');
    }

    if (smithy.length > MAX_SMITHY_LENGTH) {
      throw new Error(`FormType model.smithy must be at most ${MAX_SMITHY_LENGTH} characters.`);
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `FormType description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
      );
    }

    const resource = new datazone.CfnFormType(this, 'Resource', {
      name: props.name,
      domainIdentifier: props.domainIdentifier,
      owningProjectIdentifier: props.owningProjectIdentifier,
      model: { smithy },
      description: props.description,
      status: props.status,
    });

    this.formTypeIdentifier = resource.attrFormTypeIdentifier;
    this.revision = resource.attrRevision;
  }
}
