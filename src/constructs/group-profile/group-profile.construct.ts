import { Token, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { GroupProfileAttributes, GroupProfileProps, IGroupProfile } from './group-profile.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;

/**
 * Maps an IAM Identity Center (SSO) group or IAM role session group to a
 * DataZone group profile for access control within a domain.
 *
 * Once a group profile exists, the group can be referenced in project
 * memberships and policy grants.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-groupprofile.html
 */
export class GroupProfile extends Construct implements IGroupProfile {
  /**
   * Import an existing group profile from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: GroupProfileAttributes): IGroupProfile {
    class ImportedGroupProfile extends Construct implements IGroupProfile {
      public readonly groupProfileId = attrs.groupProfileId;
      public readonly groupName = attrs.groupName;
      public readonly domainId = attrs.domainId;
    }
    return new ImportedGroupProfile(scope, id);
  }

  /** The ID of the group profile. */
  public readonly groupProfileId: string;
  /** The name of the group. */
  public readonly groupName: string;
  /** The ID of the domain this group profile belongs to. */
  public readonly domainId: string;

  constructor(scope: Construct, id: string, props: GroupProfileProps) {
    super(scope, id);

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `GroupProfile domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!props.groupIdentifier && !props.rolePrincipalArn) {
      throw new Error('GroupProfile must specify either groupIdentifier or rolePrincipalArn.');
    }

    const resource = new datazone.CfnGroupProfile(this, 'Resource', {
      domainIdentifier: props.domainIdentifier,
      groupIdentifier: props.groupIdentifier,
      groupType: props.groupType,
      rolePrincipalArn: props.rolePrincipalArn,
      status: props.status,
    });

    this.groupProfileId = resource.attrId;
    this.groupName = resource.attrGroupName;
    this.domainId = resource.attrDomainId;
  }
}
