import { Token, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { ProjectMembershipProps } from './project-membership.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;

/**
 * Adds a member to a DataZone project independently of the project resource.
 *
 * Unlike `ProjectProps.membershipAssignments` (which requires project replacement
 * to modify), this construct manages membership as a separate CloudFormation
 * resource that can be added or removed without affecting the project itself.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-projectmembership.html
 */
export class ProjectMembership extends Construct {
  constructor(scope: Construct, id: string, props: ProjectMembershipProps) {
    super(scope, id);

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `ProjectMembership domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!Token.isUnresolved(props.projectIdentifier) && !PROJECT_ID_PATTERN.test(props.projectIdentifier)) {
      throw new Error(
        `ProjectMembership projectIdentifier '${props.projectIdentifier}' must match pattern ${PROJECT_ID_PATTERN}.`,
      );
    }

    if (!props.member.userIdentifier && !props.member.groupIdentifier) {
      throw new Error('ProjectMembership member must specify either userIdentifier or groupIdentifier.');
    }

    if (props.member.userIdentifier && props.member.groupIdentifier) {
      throw new Error('ProjectMembership member must specify only one of userIdentifier or groupIdentifier.');
    }

    new datazone.CfnProjectMembership(this, 'Resource', {
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      designation: props.designation,
      member: {
        userIdentifier: props.member.userIdentifier,
        groupIdentifier: props.member.groupIdentifier,
      },
    });
  }
}
