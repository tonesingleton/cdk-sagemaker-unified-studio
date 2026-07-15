/**
 * Read-only contract for a UserProfile.
 */
export interface IUserProfile {
  /** The ID of the user profile. */
  readonly userProfileId: string;
  /** The type of the user profile (e.g. IAM, SSO). */
  readonly userProfileType: string;
  /** The ID of the domain this user profile belongs to. */
  readonly domainId: string;
}

/**
 * The type of user being mapped.
 */
export enum UserType {
  /** An IAM user. */
  IAM_USER = 'IAM_USER',
  /** An IAM role. */
  IAM_ROLE = 'IAM_ROLE',
  /** An IAM Identity Center (SSO) user. */
  SSO_USER = 'SSO_USER',
  /** An IAM role session. */
  IAM_ROLE_SESSION = 'IAM_ROLE_SESSION',
}

/**
 * Status of the user profile.
 */
export enum UserProfileStatus {
  /** The user profile is assigned and active. */
  ASSIGNED = 'ASSIGNED',
  /** The user profile is not assigned. */
  NOT_ASSIGNED = 'NOT_ASSIGNED',
  /** The user profile is activated. */
  ACTIVATED = 'ACTIVATED',
  /** The user profile is deactivated. */
  DEACTIVATED = 'DEACTIVATED',
}

/**
 * Properties for a UserProfile construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-userprofile.html
 */
export interface UserProfileProps {
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;

  /**
   * The identifier of the user (SSO user ID, IAM user/role ARN, or IAM role session name).
   */
  readonly userIdentifier: string;

  /**
   * The type of the user.
   *
   * @default UserType.SSO_USER
   */
  readonly userType?: UserType;

  /**
   * The session name for IAM role sessions.
   *
   * Must be 2–64 characters. Only applicable when `userType` is `IAM_ROLE_SESSION`.
   *
   * @default - no session name
   */
  readonly sessionName?: string;

  /**
   * The status of the user profile.
   *
   * @default UserProfileStatus.ASSIGNED
   */
  readonly status?: UserProfileStatus;
}

/**
 * Attributes required to import an existing UserProfile.
 */
export interface UserProfileAttributes {
  /** The ID of the user profile. */
  readonly userProfileId: string;
  /** The type of the user profile. */
  readonly userProfileType: string;
  /** The ID of the domain. */
  readonly domainId: string;
}
