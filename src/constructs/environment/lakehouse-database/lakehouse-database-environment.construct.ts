import type { Construct } from 'constructs';
import { ManagedBlueprintIdentifier } from '../../blueprint/blueprint.interface';
import { Environment } from '../environment.construct';
import type { EnvironmentAttributes, IEnvironment } from '../environment.interface';
import type { LakeHouseDatabaseEnvironmentProps } from './lakehouse-database-environment.interface';

/**
 * A SageMaker Unified Studio LakehouseDatabase environment.
 *
 * Opinionated wrapper around `Environment` for the LakeHouseDatabase blueprint.
 * Provisions a Glue database and Athena workgroup within a project.
 *
 * - The environment name defaults to `"LakeHouseDatabase"`.
 * - The blueprint ID is derived from `domain.blueprints`.
 * - When `glueDbName` is set, the project execution role is derived from
 *   `project.projectExecutionRole` and Lake Formation permissions are granted
 *   automatically so CDK can create Glue tables in the provisioned database.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/lakehouse-database-blueprint.html
 */
export class LakeHouseDatabaseEnvironment extends Environment {
  /**
   * Import an existing LakehouseDatabase environment from its ID.
   */
  public static override fromAttributes(scope: Construct, id: string, attrs: EnvironmentAttributes): IEnvironment {
    return Environment.fromAttributes(scope, id, attrs);
  }

  constructor(scope: Construct, id: string, props: LakeHouseDatabaseEnvironmentProps) {
    super(scope, id, {
      name: props.name ?? 'LakeHouseDatabase',
      description: props.description,
      glossaryTerms: props.glossaryTerms,
      domainId: props.domain.domainId,
      projectId: props.project.id,
      environmentBlueprintId:
        props.domain.blueprints[ManagedBlueprintIdentifier.LAKEHOUSE_DATABASE].environmentBlueprintId,
      environmentConfigurationId:
        props.projectProfile.environmentConfigurationIds[ManagedBlueprintIdentifier.LAKEHOUSE_DATABASE],
      glueDbName: props.glueDbName,
      projectExecutionRoleArn: props.glueDbName ? props.project.projectExecutionRole.roleArn : undefined,
    });
  }
}
