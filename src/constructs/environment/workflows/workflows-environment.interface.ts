import type { IDomain } from '../../domain/domain.interface';
import type { IProject } from '../../project/project.interface';
import type { IProjectProfile } from '../../project-profile/project-profile.interface';

/**
 * Properties for a WorkflowsEnvironment construct.
 *
 * Opinionated environment for the Workflows blueprint. Provisions an MWAA
 * Serverless environment within a project for DAG-based job orchestration.
 *
 * The blueprint ID is derived automatically from `domain`. The environment
 * name defaults to `"Workflows"`.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-environment.html
 */
export interface WorkflowsEnvironmentProps {
  /** The domain this environment belongs to. */
  readonly domain: IDomain;
  /** The project this environment belongs to. */
  readonly project: IProject;
  /** The project profile used to create the project. Used to resolve the Workflows environment configuration ID. */
  readonly projectProfile: IProjectProfile;
  /**
   * Display name of the environment.
   *
   * @default "Workflows"
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
}
