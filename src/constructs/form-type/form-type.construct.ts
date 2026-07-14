import { Token, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { FormTypeAttributes, FormTypeProps, IFormType } from './form-type.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const NAME_PATTERN = /^(?![0-9_])\w+$|^_\w*[a-zA-Z0-9]\w*$/;
const MAX_NAME_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 2048;
const MAX_SMITHY_LENGTH = 100000;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;

/**
 * A DataZone form type that defines a custom metadata schema using Smithy models.
 *
 * Form types are structured metadata schemas that can be attached to assets,
 * enabling custom metadata curation and classification within a domain.
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

    if (!props.model.smithy || props.model.smithy.length > MAX_SMITHY_LENGTH) {
      throw new Error(`FormType model.smithy must be 1–${MAX_SMITHY_LENGTH} characters.`);
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
      model: { smithy: props.model.smithy },
      description: props.description,
      status: props.status,
    });

    this.formTypeIdentifier = resource.attrFormTypeIdentifier;
    this.revision = resource.attrRevision;
  }
}
