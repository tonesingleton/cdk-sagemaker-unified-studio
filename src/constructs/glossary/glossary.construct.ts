import { Token, aws_iam as iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { GlossaryAttributes, GlossaryProps, IGlossary } from './glossary.interface';
import { DataZoneApiCall } from '../datazone-api-call';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_DESCRIPTION_LENGTH = 4096;

/**
 * A DataZone business glossary for catalog standardization.
 *
 * There is no CloudFormation resource type for DataZone glossaries, so this construct
 * drives the full CreateGlossary / UpdateGlossary / DeleteGlossary lifecycle through
 * {@link DataZoneApiCall}, the shared construct that runs DataZone SDK calls as a
 * supplied enrolled role. The create call's returned `id` becomes the custom
 * resource's physical ID, which update/delete target via
 * `DataZoneApiCall.PHYSICAL_RESOURCE_ID`. `executionRoleArn` must be a DataZone-enrolled
 * principal (typically `domain.datazoneApiRole`).
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

    const call = new DataZoneApiCall(this, 'Resource', {
      role: iam.Role.fromRoleArn(this, 'ExecutionRole', props.executionRoleArn, { mutable: false }),
      onCreate: {
        action: 'CreateGlossary',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          owningProjectIdentifier: props.owningProjectIdentifier,
          name: props.name,
          description: props.description,
          status: props.status,
        },
        physicalResourceIdFromResponsePath: 'id',
        outputPaths: ['id'],
      },
      onUpdate: {
        action: 'UpdateGlossary',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: DataZoneApiCall.PHYSICAL_RESOURCE_ID,
          name: props.name,
          description: props.description,
          status: props.status,
        },
        physicalResourceIdFromResponsePath: 'id',
        outputPaths: ['id'],
      },
      onDelete: {
        action: 'DeleteGlossary',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          identifier: DataZoneApiCall.PHYSICAL_RESOURCE_ID,
        },
      },
    });

    this.glossaryId = call.getResponseField('id');
  }
}
