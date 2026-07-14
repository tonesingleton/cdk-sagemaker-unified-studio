/**
 * Status of a project profile.
 */
export enum ProjectProfileStatus {
  /** The project profile is active and can be used to create projects. */
  ENABLED = 'ENABLED',
  /** The project profile is disabled and cannot be used. */
  DISABLED = 'DISABLED',
}

/**
 * Deployment mode for an environment configuration.
 */
export enum DeploymentMode {
  /** Environment is provisioned automatically when a project is created. */
  ON_CREATE = 'ON_CREATE',
  /** Environment must be provisioned manually after project creation. */
  ON_DEMAND = 'ON_DEMAND',
}

/**
 * An environment configuration within a project profile.
 *
 * Defines which blueprint is provisioned, in which account and region,
 * and in what order when a project is created from this profile.
 */
export interface EnvironmentConfiguration {
  /** Display name of the environment configuration. */
  readonly name: string;
  /** The environment blueprint ID to provision. */
  readonly environmentBlueprintId: string;
  /**
   * AWS region where the environment is deployed.
   *
   * @default Stack.of(this).region
   */
  readonly region?: string;
  /**
   * AWS account ID where the environment is deployed.
   *
   * @default Stack.of(this).account
   */
  readonly accountId?: string;
  /**
   * Human-readable description of the environment configuration.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * Deployment order for this environment. Lower numbers deploy first.
   * Environments with the same order deploy in parallel.
   *
   * @default - no explicit ordering
   */
  readonly deploymentOrder?: number;
  /**
   * Deployment mode for the environment.
   *
   * @default DeploymentMode.ON_DEMAND for non-Tooling blueprints, service default for Tooling
   */
  readonly deploymentMode?: DeploymentMode;
  /**
   * Configuration parameters for the environment (key-value pairs).
   * These are passed as parameter overrides to the blueprint.
   *
   * @default - no parameters
   */
  readonly parameters?: { [key: string]: string };
}

/**
 * Exposed attributes of the ProjectProfile construct.
 */
export interface IProjectProfile {
  /** The project profile ID. */
  readonly projectProfileId: string;
}

/**
 * Attributes required to import an existing ProjectProfile.
 */
export interface ProjectProfileAttributes {
  /** The project profile ID. */
  readonly projectProfileId: string;
}

/**
 * Properties for a ProjectProfile construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-projectprofile.html
 */
export interface ProjectProfileProps {
  /** Display name of the project profile. */
  readonly name: string;
  /**
   * Human-readable description of the project profile.
   *
   * @default - no description
   */
  readonly description?: string;
  /** The SageMaker Unified Studio domain ID this profile belongs to. */
  readonly domainId: string;
  /**
   * The domain unit ID this profile is scoped to.
   *
   * @default - scoped to the root domain unit
   */
  readonly domainUnitId?: string;
  /**
   * Environment configurations that define which blueprints are provisioned
   * when a project is created from this profile.
   *
   * @default - no environment configurations
   */
  readonly environmentConfigurations?: Array<EnvironmentConfiguration>;
  /**
   * Whether the project profile is enabled.
   *
   * @default ProjectProfileStatus.ENABLED
   */
  readonly status?: ProjectProfileStatus;
}
