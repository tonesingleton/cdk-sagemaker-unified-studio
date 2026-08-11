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
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-environment.html
 */
export interface EnvironmentProps {
  /**
   * Display name of the environment.
   *
   * @default - auto-generated
   */
  readonly name?: string;
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
   * The name of the Glue database that the LakehouseDatabase blueprint will create.
   *
   * When set, the construct injects a `glueDbName` user parameter and grants the
   * project execution role Lake Formation `CREATE_TABLE`, `ALTER`, `DROP`, and
   * `DESCRIBE` permissions on the database and a table wildcard, so that CDK can
   * create `AWS::Glue::Table` resources in that database after the environment is
   * provisioned.
   *
   * Requires `projectExecutionRoleArn` to be set.
   *
   * @default - no Glue database name; user parameters are passed as-is
   */
  readonly glueDbName?: string;
  /**
   * ARN of the project execution role.
   *
   * Required when `glueDbName` is set — used to grant Lake Formation permissions
   * on the blueprint-provisioned Glue database.
   *
   * @default - not required when glueDbName is not set
   */
  readonly projectExecutionRoleArn?: string;
  /**
   * Glossary terms to tag the environment with.
   * Each term must match `^[a-zA-Z0-9_-]{1,36}$`.
   *
   * @default - no glossary terms
   */
  readonly glossaryTerms?: Array<string>;
}
