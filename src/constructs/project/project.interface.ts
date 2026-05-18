/**
 * Designations for a project member.
 */
export enum ProjectMemberDesignation {
  /** Full owner access to the project. */
  PROJECT_OWNER = 'PROJECT_OWNER',
  /** Contributor access to the project. */
  PROJECT_CONTRIBUTOR = 'PROJECT_CONTRIBUTOR',
}

/**
 * A member of a SageMaker Unified Studio project.
 */
export interface ProjectMember {
  /** The IAM role ARN or SageMaker Unified Studio user identifier for this member. */
  readonly userIdentifier: string;
  /**
   * The member's designation within the project.
   *
   * @default ProjectMemberDesignation.PROJECT_CONTRIBUTOR
   */
  readonly designation?: ProjectMemberDesignation;
}

/**
 * A key-value parameter for an environment.
 */
export interface EnvironmentParameterValue {
  /** The parameter name. */
  readonly name: string;
  /** The parameter value. */
  readonly value: string;
}

/**
 * User parameters for a specific environment configuration within a project.
 *
 * Specify `environmentConfigurationName` when creating a new project, or
 * `environmentId` when updating an existing project.
 */
export interface ProjectEnvironmentUserParameter {
  /**
   * The environment configuration name (as defined in the project profile).
   * Use this when creating a new project.
   *
   * @default - not set (use environmentId for updates)
   */
  readonly environmentConfigurationName?: string;
  /**
   * The environment ID. Use this when updating an existing project.
   *
   * @default - not set (use environmentConfigurationName for creates)
   */
  readonly environmentId?: string;
  /** The parameters to pass to this environment configuration. */
  readonly environmentParameters: Array<EnvironmentParameterValue>;
}

/**
 * Exposed attributes of the Project construct.
 */
export interface IProject {
  /** The project ID. */
  readonly projectId: string;
}

/**
 * Properties for a Project construct.
 */
export interface ProjectProps {
  /** Display name of the project. */
  readonly name: string;
  /**
   * Human-readable description of the project's purpose.
   *
   * @default - no description
   */
  readonly description?: string;
  /** The SageMaker Unified Studio domain ID this project belongs to. */
  readonly domainId: string;
  /** The project profile ID that defines the project's capabilities. */
  readonly projectProfileId: string;
  /**
   * Project members with their designations.
   *
   * @default - no members
   */
  readonly members?: Array<ProjectMember>;
  /**
   * User parameters for environment configurations. Use this to customize
   * environments provisioned by the project profile (e.g. database names).
   *
   * @default - no user parameters
   */
  readonly userParameters?: Array<ProjectEnvironmentUserParameter>;
}
