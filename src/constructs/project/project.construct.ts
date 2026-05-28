import { aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { IProject, ProjectProps } from './project.interface';
import { ProjectMemberDesignation } from './project.interface';

/**
 * A SageMaker Unified Studio project within a domain.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/projects.html
 */
export class Project extends Construct implements IProject {
  /** The project ID. */
  public readonly projectId: string;

  constructor(scope: Construct, id: string, props: ProjectProps) {
    super(scope, id);

    const project = new datazone.CfnProject(this, 'Resource', {
      domainIdentifier: props.domainId,
      domainUnitId: props.domainUnitId,
      name: props.name,
      description: props.description,
      projectProfileId: props.projectProfileId,
      projectProfileVersion: props.userParameters?.length ? 'latest' : undefined,
      userParameters: props.userParameters?.map((up) => ({
        environmentConfigurationName: up.environmentConfigurationName,
        environmentId: up.environmentId,
        environmentParameters: up.environmentParameters.map((ep) => ({ name: ep.name, value: ep.value })),
      })),
    });

    this.projectId = project.attrId;

    for (const member of props.members ?? []) {
      const memberId = this.sanitizeId(member.userIdentifier);
      new datazone.CfnProjectMembership(this, `Membership${memberId}`, {
        domainIdentifier: props.domainId,
        projectIdentifier: this.projectId,
        designation: member.designation ?? ProjectMemberDesignation.PROJECT_CONTRIBUTOR,
        member: { userIdentifier: member.userIdentifier },
      });
    }
  }

  private sanitizeId(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9]/g, '').slice(-40);
  }
}
