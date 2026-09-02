import { Token } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DataZoneApiCall } from '../datazone-api-call';
import type { GlossaryAttributes, GlossaryProps, IGlossary } from './glossary.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_DESCRIPTION_LENGTH = 4096;

/**
 * A DataZone business glossary for catalog standardization.
 *
 * There is no CloudFormation resource type for DataZone glossaries, so this construct
 * uses `AwsCustomResource` to call the DataZone API directly
 * (CreateGlossary / UpdateGlossary / DeleteGlossary).
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/create-maintain-business-glossary.html
 */
export class Glossary extends Construct implements IGlossary {
  /**
   * Import an existing glossary from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: GlossaryAttributes): IGlossary {
    class ImportedGlossary extends Construct implements IGlossary {
      public readonly glossaryId = attrs.glossaryId;
    }
    return new ImportedGlossary(scope, id);
  }

  /** The glossary ID assigned by DataZone. */
  public readonly glossaryId: string;

  constructor(scope: Construct, id: string, props: GlossaryProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`Glossary name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(`Glossary domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`);
    }

    if (!Token.isUnresolved(props.owningProjectIdentifier) && !PROJECT_ID_PATTERN.test(props.owningProjectIdentifier)) {
      throw new Error(
        `Glossary owningProjectIdentifier '${props.owningProjectIdentifier}' must match pattern ${PROJECT_ID_PATTERN}.`,
      );
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `Glossary description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
      );
    }

    const sharedParams = {
      domainIdentifier: props.domainIdentifier,
      owningProjectIdentifier: props.owningProjectIdentifier,
      name: props.name,
      description: props.description,
      status: props.status,
    };

    const glossary = new DataZoneApiCall(this, 'Resource', {
      role: props.datazoneApiRole,
      onCreate: {
        action: 'CreateGlossary',
        parameters: sharedParams,
        physicalResourceIdFromResponsePath: 'id',
      },
      onUpdate: {
        action: 'UpdateGlossary',
        parameters: {
          ...sharedParams,
          identifier: DataZoneApiCall.PHYSICAL_RESOURCE_ID,
        },
        physicalResourceIdFromResponsePath: 'id',
      },
      onDelete: {
        action: 'DeleteGlossary',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: DataZoneApiCall.PHYSICAL_RESOURCE_ID,
        },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
      },
    });

    this.glossaryId = glossary.getResponseField('id');
  }
}
