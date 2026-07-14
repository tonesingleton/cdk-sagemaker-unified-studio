/**
 * Read-only contract for a PolicyGrant.
 */
export interface IPolicyGrant {
  /** The grant ID assigned by DataZone. */
  readonly grantId: string;
}

/**
 * The type of entity (resource) to which the grant is added.
 */
export enum PolicyGrantEntityType {
  /** A domain unit. */
  DOMAIN_UNIT = 'DOMAIN_UNIT',
  /** An environment blueprint configuration. */
  ENVIRONMENT_BLUEPRINT_CONFIGURATION = 'ENVIRONMENT_BLUEPRINT_CONFIGURATION',
  /** An environment profile. */
  ENVIRONMENT_PROFILE = 'ENVIRONMENT_PROFILE',
  /** An asset type. */
  ASSET_TYPE = 'ASSET_TYPE',
}

/**
 * The type of policy to grant.
 */
export enum PolicyType {
  /** Create a domain unit. */
  CREATE_DOMAIN_UNIT = 'CREATE_DOMAIN_UNIT',
  /** Override domain unit owners. */
  OVERRIDE_DOMAIN_UNIT_OWNERS = 'OVERRIDE_DOMAIN_UNIT_OWNERS',
  /** Add to project member pool. */
  ADD_TO_PROJECT_MEMBER_POOL = 'ADD_TO_PROJECT_MEMBER_POOL',
  /** Override project owners. */
  OVERRIDE_PROJECT_OWNERS = 'OVERRIDE_PROJECT_OWNERS',
  /** Create a glossary. */
  CREATE_GLOSSARY = 'CREATE_GLOSSARY',
  /** Create a form type. */
  CREATE_FORM_TYPE = 'CREATE_FORM_TYPE',
  /** Create an asset type. */
  CREATE_ASSET_TYPE = 'CREATE_ASSET_TYPE',
  /** Create a project. */
  CREATE_PROJECT = 'CREATE_PROJECT',
  /** Create an environment profile. */
  CREATE_ENVIRONMENT_PROFILE = 'CREATE_ENVIRONMENT_PROFILE',
  /** Delegate creation of environment profiles. */
  DELEGATE_CREATE_ENVIRONMENT_PROFILE = 'DELEGATE_CREATE_ENVIRONMENT_PROFILE',
  /** Create an environment. */
  CREATE_ENVIRONMENT = 'CREATE_ENVIRONMENT',
  /** Create an environment from a blueprint. */
  CREATE_ENVIRONMENT_FROM_BLUEPRINT = 'CREATE_ENVIRONMENT_FROM_BLUEPRINT',
  /** Create a project from a project profile. */
  CREATE_PROJECT_FROM_PROJECT_PROFILE = 'CREATE_PROJECT_FROM_PROJECT_PROFILE',
}

/**
 * A domain-unit-based filter for project grant principal.
 */
export interface DomainUnitFilter {
  /** The domain unit ID to scope the grant. */
  readonly domainUnit: string;
  /**
   * Whether to include child domain units.
   *
   * @default false
   */
  readonly includeChildDomainUnits?: boolean;
}

/**
 * Project grant filter specifying which projects get the grant.
 */
export interface ProjectGrantFilter {
  /** Filter by domain unit. */
  readonly domainUnitFilter: DomainUnitFilter;
}

/**
 * A project-based principal for the policy grant.
 */
export interface ProjectPrincipal {
  /** The project designation. */
  readonly projectDesignation: 'OWNER' | 'CONTRIBUTOR';
  /**
   * Filter to scope which projects receive the grant.
   *
   * @default - all projects
   */
  readonly projectGrantFilter?: ProjectGrantFilter;
  /**
   * A specific project identifier.
   *
   * @default - uses projectGrantFilter instead
   */
  readonly projectIdentifier?: string;
}

/**
 * A domain-unit-based principal for the policy grant.
 */
export interface DomainUnitPrincipal {
  /** The domain unit designation. */
  readonly domainUnitDesignation: 'OWNER';
  /**
   * A specific domain unit identifier.
   *
   * @default - applies to the domain unit owner broadly
   */
  readonly domainUnitIdentifier?: string;
}

/**
 * A group-based principal for the policy grant.
 */
export interface GroupPrincipal {
  /** The IAM/SSO group identifier. */
  readonly groupIdentifier: string;
}

/**
 * A user-based principal for the policy grant.
 */
export interface UserPrincipal {
  /** The IAM/SSO user identifier. */
  readonly userIdentifier: string;
}

/**
 * Principal that receives the policy grant. Exactly one of the
 * principal types must be specified.
 */
export interface PolicyGrantPrincipal {
  /**
   * A project principal.
   *
   * @default - not a project principal
   */
  readonly project?: ProjectPrincipal;
  /**
   * A domain unit principal.
   *
   * @default - not a domain unit principal
   */
  readonly domainUnit?: DomainUnitPrincipal;
  /**
   * A group principal.
   *
   * @default - not a group principal
   */
  readonly group?: GroupPrincipal;
  /**
   * A user principal.
   *
   * @default - not a user principal
   */
  readonly user?: UserPrincipal;
}

/**
 * Detail configuration for the policy grant. Each policy type has its own
 * detail key (usually an empty object to enable the grant).
 */
export interface PolicyGrantDetail {
  /**
   * Detail for CREATE_DOMAIN_UNIT policy type.
   *
   * @default - not applicable
   */
  readonly createDomainUnit?: Record<string, unknown>;
  /**
   * Detail for OVERRIDE_DOMAIN_UNIT_OWNERS policy type.
   *
   * @default - not applicable
   */
  readonly overrideDomainUnitOwners?: Record<string, unknown>;
  /**
   * Detail for ADD_TO_PROJECT_MEMBER_POOL policy type.
   *
   * @default - not applicable
   */
  readonly addToProjectMemberPool?: Record<string, unknown>;
  /**
   * Detail for OVERRIDE_PROJECT_OWNERS policy type.
   *
   * @default - not applicable
   */
  readonly overrideProjectOwners?: Record<string, unknown>;
  /**
   * Detail for CREATE_GLOSSARY policy type.
   *
   * @default - not applicable
   */
  readonly createGlossary?: Record<string, unknown>;
  /**
   * Detail for CREATE_FORM_TYPE policy type.
   *
   * @default - not applicable
   */
  readonly createFormType?: Record<string, unknown>;
  /**
   * Detail for CREATE_ASSET_TYPE policy type.
   *
   * @default - not applicable
   */
  readonly createAssetType?: Record<string, unknown>;
  /**
   * Detail for CREATE_PROJECT policy type.
   *
   * @default - not applicable
   */
  readonly createProject?: Record<string, unknown>;
  /**
   * Detail for CREATE_ENVIRONMENT_PROFILE policy type.
   *
   * @default - not applicable
   */
  readonly createEnvironmentProfile?: Record<string, unknown>;
  /**
   * Detail for DELEGATE_CREATE_ENVIRONMENT_PROFILE policy type.
   *
   * @default - not applicable
   */
  readonly delegateCreateEnvironmentProfile?: Record<string, unknown>;
  /**
   * Detail for CREATE_ENVIRONMENT policy type.
   *
   * @default - not applicable
   */
  readonly createEnvironment?: Record<string, unknown>;
  /**
   * Detail for CREATE_ENVIRONMENT_FROM_BLUEPRINT policy type.
   *
   * @default - not applicable
   */
  readonly createEnvironmentFromBlueprint?: Record<string, unknown>;
  /**
   * Detail for CREATE_PROJECT_FROM_PROJECT_PROFILE policy type.
   *
   * @default - not applicable
   */
  readonly createProjectFromProjectProfile?: Record<string, unknown>;
}

/**
 * Properties for a PolicyGrant construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-policygrant.html
 */
export interface PolicyGrantProps {
  /** The ID of the domain (e.g. `dzd-abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the entity (resource) to which the grant is added. */
  readonly entityIdentifier: string;
  /** The type of entity to which the grant is added. */
  readonly entityType: PolicyGrantEntityType;
  /** The type of policy to grant. */
  readonly policyType: PolicyType;
  /**
   * The principal that receives the grant.
   *
   * @default - no principal specified
   */
  readonly principal?: PolicyGrantPrincipal;
  /**
   * Detail configuration for the policy grant.
   *
   * @default - no detail
   */
  readonly detail?: PolicyGrantDetail;
}

/**
 * Attributes required to import an existing PolicyGrant.
 */
export interface PolicyGrantAttributes {
  /** The grant ID. */
  readonly grantId: string;
}
