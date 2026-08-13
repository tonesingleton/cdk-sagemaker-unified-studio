import type { Construct } from 'constructs';
import { ManagedBlueprintIdentifier } from '../../blueprint/blueprint.interface';
import { Environment } from '../environment.construct';
import type { EnvironmentAttributes, IEnvironment } from '../environment.interface';
import type { WorkflowsEnvironmentProps } from './workflows-environment.interface';

/**
 * A SageMaker Unified Studio Workflows environment.
 *
 * Opinionated wrapper around `Environment` for the Workflows blueprint.
 * Provisions an MWAA Serverless environment within a project, enabling
 * DAG-based orchestration of Glue jobs and other AWS services.
 *
 * - The environment name defaults to `"Workflows"`.
 * - The blueprint ID is derived from `domain.blueprints`.
 * - The environment configuration ID is resolved from `projectProfile`.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/workflows-blueprint.html
 */
export class WorkflowsEnvironment extends Environment {
  /**
   * Import an existing Workflows environment from its ID.
   */
  public static override fromAttributes(scope: Construct, id: string, attrs: EnvironmentAttributes): IEnvironment {
    return Environment.fromAttributes(scope, id, attrs);
  }

  constructor(scope: Construct, id: string, props: WorkflowsEnvironmentProps) {
    super(scope, id, {
      name: props.name ?? 'Workflows',
      description: props.description,
      glossaryTerms: props.glossaryTerms,
      domainId: props.domain.domainId,
      projectId: props.project.id,
      environmentBlueprintId: props.domain.blueprints[ManagedBlueprintIdentifier.WORKFLOWS].environmentBlueprintId,
      environmentConfigurationId:
        props.projectProfile.environmentConfigurationIds[ManagedBlueprintIdentifier.WORKFLOWS],
    });
  }
}
