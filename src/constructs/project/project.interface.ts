import type { aws_iam as iam } from 'aws-cdk-lib';

/**
 * Designations for a project member.
 */
export enum Designation {
  /** Full owner access to the project. */
  PROJECT_OWNER = 'PROJECT_OWNER',
  /** Contributor access to the project. */
  PROJECT_CONTRIBUTOR = 'PROJECT_CONTRIBUTOR',
}

/**
 * A membership assignment for a project.
 */
export interface MembershipAssignment {
  /** The member's designation within the project. */
  readonly designation: Designation;
  /** The member identifier. */
  readonly member: Member;
}

/**
 * A member of a project (either a user or a group).
 */
export interface Member {
  /**
   * The group identifier.
   *
   * @default - not a group member
   */
  readonly groupIdentifier?: string;
  /**
   * The user identifier (IAM role ARN or SSO user ID).
   *
   * @default - not a user member
   */
  readonly userIdentifier?: string;
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
export interface EnvironmentConfigurationUserParameter {
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
 * A resource tag for a project.
 */
export interface ResourceTag {
  /** The tag key. */
  readonly key: string;
  /** The tag value. */
  readonly value: string;
}

/**
 * Exposed attributes of the Project construct.
 */
export interface IProject {
  /** The identifier of a project. */
  readonly id: string;
  /** The identifier of the domain where the project exists. */
  readonly domainId: string;
  /** The timestamp of when the project was created. */
  readonly createdAt: string;
  /** The Amazon DataZone user who created the project. */
  readonly createdBy: string;
  /** The timestamp of when the project was last updated. */
  readonly lastUpdatedAt: string;
  /** The status of the project. */
  readonly projectStatus: string;
  /** The project execution role (provided or auto-created). */
  readonly projectExecutionRole: iam.IRole;
}

/**
 * Attributes required to import an existing Project.
 */
export interface ProjectAttributes {
  /** The project ID (e.g. `dzp-abc123`). */
  readonly projectId: string;
  /** The domain ID the project belongs to. */
  readonly domainId: string;
  /**
   * The ARN of the project execution role.
   *
   * @default - no execution role imported
   */
  readonly projectExecutionRoleArn?: string;
}

/**
 * Properties for a Project construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-project.html
 */
export interface ProjectProps {
  /** Display name of the project (1–64 characters, `[\w -]+`). */
  readonly name: string;
  /**
   * Human-readable description of the project's purpose.
   *
   * @default - no description
   */
  readonly description?: string;
  /** The SageMaker Unified Studio domain ID this project belongs to. */
  readonly domainIdentifier: string;
  /**
   * The domain unit ID to place this project in.
   *
   * @default - root domain unit
   */
  readonly domainUnitId?: string;
  /**
   * Glossary terms that can be used in this project.
   *
   * @default - no glossary terms
   */
  readonly glossaryTerms?: Array<string>;
  /**
   * The project profile ID that defines the project's capabilities.
   *
   * @default - no project profile
   */
  readonly projectProfileId?: string;
  /**
   * The category of the project.
   *
   * @default - no category
   */
  readonly projectCategory?: string;
  /**
   * An existing IAM role to use as the project execution role.
   *
   * @default - a new execution role is created automatically
   */
  readonly projectExecutionRole?: iam.IRole;
  /**
   * Membership assignments for the project.
   *
   * @default - no membership assignments
   */
  readonly membershipAssignments?: Array<MembershipAssignment>;
  /**
   * Resource tags for the project.
   *
   * @default - no resource tags
   */
  readonly resourceTags?: Array<ResourceTag>;
  /**
   * User parameters for environment configurations. Use this to customize
   * environments provisioned by the project profile (e.g. database names).
   *
   * @default - no user parameters
   */
  readonly userParameters?: Array<EnvironmentConfigurationUserParameter>;
  /**
   * Whether to grant the project execution role `DESCRIBE` on the Glue `default` database.
   *
   * Glue Interactive Sessions and Spark jobs need this permission to resolve unqualified
   * table references. Enable this when the project uses the Lakehouse blueprint.
   *
   * @default false
   */
  readonly grantDefaultDatabaseDescribe?: boolean;
  /**
   * Additional IAM principals (ARNs) to trust in the project execution role's trust policy.
   *
   * Use this to allow specific IAM roles or users to assume the execution role directly,
   * for example a developer role for local testing or debugging.
   *
   * @default - no additional principals
   */
  readonly additionalTrustPrincipals?: Array<string>;
  /**
   * The domain-level DataZone API role to add as a `PROJECT_OWNER` of this project.
   *
   * When provided, a `CfnProjectMembership` is created automatically so the role
   * can call project-gated DataZone APIs (e.g. `ListConnections`, `ListEnvironments`)
   * during CDK deployments. Pass `domain.datazoneApiRole` here.
   *
   * @default - no datazoneApiRole membership added
   */
  readonly crRole?: iam.IRole;
}
