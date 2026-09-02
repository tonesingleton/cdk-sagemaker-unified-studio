import { Token } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DataZoneApiCall } from '../datazone-api-call';
import type { GlossaryTermAttributes, GlossaryTermProps, IGlossaryTerm } from './glossary-term.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_SHORT_DESC_LENGTH = 1024;
const MAX_LONG_DESC_LENGTH = 4096;

/**
 * A DataZone glossary term within a business glossary.
 *
 * There is no CloudFormation resource type for DataZone glossary terms, so this construct
 * uses `AwsCustomResource` to call the DataZone API directly
 * (CreateGlossaryTerm / UpdateGlossaryTerm / DeleteGlossaryTerm).
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/create-maintain-business-glossary.html
 */
export class GlossaryTerm extends Construct implements IGlossaryTerm {
  /**
   * Import an existing glossary term from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: GlossaryTermAttributes): IGlossaryTerm {
    class ImportedGlossaryTerm extends Construct implements IGlossaryTerm {
      public readonly glossaryTermId = attrs.glossaryTermId;
    }
    return new ImportedGlossaryTerm(scope, id);
  }

  /** The glossary term ID assigned by DataZone. */
  public readonly glossaryTermId: string;

  constructor(scope: Construct, id: string, props: GlossaryTermProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`GlossaryTerm name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `GlossaryTerm domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!props.glossaryIdentifier) {
      throw new Error('GlossaryTerm glossaryIdentifier must not be empty.');
    }

    if (props.shortDescription && props.shortDescription.length > MAX_SHORT_DESC_LENGTH) {
      throw new Error(
        `GlossaryTerm shortDescription must be at most ${MAX_SHORT_DESC_LENGTH} characters, got ${props.shortDescription.length}.`,
      );
    }

    if (props.longDescription && props.longDescription.length > MAX_LONG_DESC_LENGTH) {
      throw new Error(
        `GlossaryTerm longDescription must be at most ${MAX_LONG_DESC_LENGTH} characters, got ${props.longDescription.length}.`,
      );
    }

    const termRelations = props.termRelations?.length
      ? {
          isA: props.termRelations.filter((r) => r.classifier === 'isA').map((r) => r.termId),
          hasA: props.termRelations.filter((r) => r.classifier === 'hasA').map((r) => r.termId),
        }
      : undefined;

    const sharedParams = {
      domainIdentifier: props.domainIdentifier,
      glossaryIdentifier: props.glossaryIdentifier,
      name: props.name,
      shortDescription: props.shortDescription,
      longDescription: props.longDescription,
      status: props.status,
      termRelations,
    };

    const term = new DataZoneApiCall(this, 'Resource', {
      role: props.datazoneApiRole,
      onCreate: {
        action: 'CreateGlossaryTerm',
        parameters: sharedParams,
        physicalResourceIdFromResponsePath: 'id',
      },
      onUpdate: {
        action: 'UpdateGlossaryTerm',
        parameters: {
          ...sharedParams,
          identifier: DataZoneApiCall.PHYSICAL_RESOURCE_ID,
        },
        physicalResourceIdFromResponsePath: 'id',
      },
      onDelete: {
        action: 'DeleteGlossaryTerm',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: DataZoneApiCall.PHYSICAL_RESOURCE_ID,
        },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
      },
    });

    this.glossaryTermId = term.getResponseField('id');
  }
}
