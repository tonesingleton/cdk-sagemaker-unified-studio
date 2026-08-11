import type { IDomain } from '../../domain/domain.interface';
import type { IProject } from '../../project/project.interface';
import type { IProjectProfile } from '../../project-profile/project-profile.interface';

/**
 * Properties for a LakeHouseDatabaseEnvironment construct.
 *
 * Opinionated environment for the LakehouseDatabase blueprint. Provisions a
 * Glue database and Athena workgroup within a project.
 *
 * The blueprint ID and project execution role are derived automatically from
 * `domain` and `project`. The environment name defaults to `"LakeHouseDatabase"`.
 *
 * When `glueDbName` is set, the construct injects it as a user parameter and
 * grants the project execution role Lake Formation `CREATE_TABLE`, `ALTER`,
 * `DROP`, and `DESCRIBE` on the database and a table wildcard, so CDK can
 * create `AWS::Glue::Table` resources in the blueprint-provisioned database.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-environment.html
 */
export interface LakeHouseDatabaseEnvironmentProps {
  /** The domain this environment belongs to. */
  readonly domain: IDomain;
  /** The project this environment belongs to. */
  readonly project: IProject;
  /** The project profile used to create the project. Used to resolve the DataLake environment configuration ID. */
  readonly projectProfile: IProjectProfile;
  /**
   * Display name of the environment.
   *
   * @default "LakeHouseDatabase"
   */
  readonly name?: string;
  /**
   * Human-readable description of the environment's purpose.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * Glossary term IDs to tag the environment with.
   * Each term must match `^[a-zA-Z0-9_-]{1,36}$`.
   *
   * @default - no glossary terms
   */
  readonly glossaryTerms?: Array<string>;
  /**
   * The name of the Glue database that the LakehouseDatabase blueprint will create.
   *
   * When set, the construct injects a `glueDbName` user parameter and grants the
   * project execution role Lake Formation permissions on the database and a table
   * wildcard, so that CDK can create `AWS::Glue::Table` resources in that database.
   *
   * @default - no Glue database name
   */
  readonly glueDbName?: string;
}
