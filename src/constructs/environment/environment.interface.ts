/**
 * A user parameter for an environment.
 */
export interface EnvironmentParameter {
  /** The parameter name. */
  readonly name: string;
  /** The parameter value. */
  readonly value: string;
}

/**
 * Exposed attributes of the Environment construct.
 */
export interface IEnvironment {
  /** The environment ID. */
  readonly environmentId: string;
}

/**
 * Attributes required to import an existing Environment.
 */
export interface EnvironmentAttributes {
  /** The environment ID. */
  readonly environmentId: string;
}

/**
 * Properties for an Environment construct.
 */
export interface EnvironmentProps {
  /** Display name of the environment. */
  readonly name: string;
  /**
   * Human-readable description of the environment's purpose.
   *
   * @default - no description
   */
  readonly description?: string;
  /** The SageMaker Unified Studio domain ID this environment belongs to. */
  readonly domainId: string;
  /** The project ID this environment is associated with. */
  readonly projectId: string;
  /**
   * The environment blueprint identifier to provision.
   *
   * @default - no blueprint (basic environment)
   */
  readonly environmentBlueprintId?: string;
  /**
   * The environment configuration ID from the project profile.
   * Use this to create environments matching a specific project profile configuration.
   *
   * @default - no configuration ID
   */
  readonly environmentConfigurationId?: string;
  /**
   * User parameters for the environment (key-value pairs passed to the blueprint).
   *
   * @default - no user parameters
   */
  readonly userParameters?: Array<EnvironmentParameter>;
  /**
   * Glossary terms to tag the environment with.
   * Each term must match `^[a-zA-Z0-9_-]{1,36}$`.
   *
   * @default - no glossary terms
   */
  readonly glossaryTerms?: Array<string>;
}
