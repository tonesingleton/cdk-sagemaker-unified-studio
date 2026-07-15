/**
 * Read-only contract for a GroupProfile.
 */
export interface IGroupProfile {
  /** The ID of the group profile. */
  readonly groupProfileId: string;
  /** The name of the group. */
  readonly groupName: string;
  /** The ID of the domain this group profile belongs to. */
  readonly domainId: string;
}

/**
 * The type of group being mapped.
 */
export enum GroupType {
  /** An IAM Identity Center (SSO) group. */
  DATAZONE_SSO_GROUP = 'DATAZONE_SSO_GROUP',
  /** An IAM role session group. */
  IAM_ROLE_SESSION_GROUP = 'IAM_ROLE_SESSION_GROUP',
}

/**
 * Status of the group profile.
 */
export enum GroupProfileStatus {
  /** The group profile is assigned and active. */
  ASSIGNED = 'ASSIGNED',
  /** The group profile is not assigned. */
  NOT_ASSIGNED = 'NOT_ASSIGNED',
}

/**
 * Properties for a GroupProfile construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-groupprofile.html
 */
export interface GroupProfileProps {
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;

  /**
   * The identifier of the group (SSO group ID or IAM role session group name).
   *
   * Required for SSO groups. For IAM role session groups, provide `rolePrincipalArn` instead.
   *
   * @default - not specified (use rolePrincipalArn for IAM_ROLE_SESSION_GROUP)
   */
  readonly groupIdentifier?: string;

  /**
   * The type of the group.
   *
   * @default GroupType.DATAZONE_SSO_GROUP
   */
  readonly groupType?: GroupType;

  /**
   * The ARN of the IAM role principal associated with this group profile.
   *
   * Required for IAM_ROLE_SESSION_GROUP type.
   *
   * @default - not specified (use groupIdentifier for DATAZONE_SSO_GROUP)
   */
  readonly rolePrincipalArn?: string;

  /**
   * The status of the group profile.
   *
   * @default GroupProfileStatus.ASSIGNED
   */
  readonly status?: GroupProfileStatus;
}

/**
 * Attributes required to import an existing GroupProfile.
 */
export interface GroupProfileAttributes {
  /** The ID of the group profile. */
  readonly groupProfileId: string;
  /** The name of the group. */
  readonly groupName: string;
  /** The ID of the domain. */
  readonly domainId: string;
}
