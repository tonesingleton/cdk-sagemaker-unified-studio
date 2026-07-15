/**
 * Designation for a project member.
 */
export enum ProjectMemberDesignation {
  /** Full owner access to the project. */
  PROJECT_OWNER = 'PROJECT_OWNER',
  /** Contributor access to the project. */
  PROJECT_CONTRIBUTOR = 'PROJECT_CONTRIBUTOR',
}

/**
 * The member to add to a project. Exactly one of `userIdentifier` or
 * `groupIdentifier` must be specified.
 */
export interface ProjectMember {
  /**
   * The user identifier (IAM role ARN or SSO user ID).
   *
   * @default - not a user member
   */
  readonly userIdentifier?: string;
  /**
   * The IAM/SSO group identifier.
   *
   * @default - not a group member
   */
  readonly groupIdentifier?: string;
}

/**
 * Properties for a ProjectMembership construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-projectmembership.html
 */
export interface ProjectMembershipProps {
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the project to add the member to. */
  readonly projectIdentifier: string;
  /** The member to add. */
  readonly member: ProjectMember;
  /** The designation (role) of the member within the project. */
  readonly designation: ProjectMemberDesignation;
}
