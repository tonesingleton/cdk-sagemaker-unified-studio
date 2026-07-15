import { Token, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { IUserProfile, UserProfileAttributes, UserProfileProps } from './user-profile.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const SESSION_NAME_MIN = 2;
const SESSION_NAME_MAX = 64;

/**
 * Maps an IAM user, IAM role, IAM role session, or IAM Identity Center (SSO)
 * user to a DataZone user profile for identity management within a domain.
 *
 * Once a user profile exists, the user can be referenced in project
 * memberships and policy grants.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-userprofile.html
 */
export class UserProfile extends Construct implements IUserProfile {
  /**
   * Import an existing user profile from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: UserProfileAttributes): IUserProfile {
    class ImportedUserProfile extends Construct implements IUserProfile {
      public readonly userProfileId = attrs.userProfileId;
      public readonly userProfileType = attrs.userProfileType;
      public readonly domainId = attrs.domainId;
    }
    return new ImportedUserProfile(scope, id);
  }

  /** The ID of the user profile. */
  public readonly userProfileId: string;
  /** The type of the user profile. */
  public readonly userProfileType: string;
  /** The ID of the domain this user profile belongs to. */
  public readonly domainId: string;

  constructor(scope: Construct, id: string, props: UserProfileProps) {
    super(scope, id);

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `UserProfile domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!props.userIdentifier) {
      throw new Error('UserProfile userIdentifier is required.');
    }

    if (
      props.sessionName &&
      !Token.isUnresolved(props.sessionName) &&
      (props.sessionName.length < SESSION_NAME_MIN || props.sessionName.length > SESSION_NAME_MAX)
    ) {
      throw new Error(
        `UserProfile sessionName must be ${SESSION_NAME_MIN}–${SESSION_NAME_MAX} characters, got ${props.sessionName.length}.`,
      );
    }

    const resource = new datazone.CfnUserProfile(this, 'Resource', {
      domainIdentifier: props.domainIdentifier,
      userIdentifier: props.userIdentifier,
      userType: props.userType,
      status: props.status,
    });

    this.userProfileId = resource.attrId;
    this.userProfileType = resource.attrType;
    this.domainId = resource.attrDomainId;
  }
}
