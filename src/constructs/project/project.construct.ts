import { Stack, aws_datazone as datazone, aws_iam as iam } from 'aws-cdk-lib';
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
  /** The project's execution role. */
  public readonly projectExecutionRole?: iam.Role;

  constructor(scope: Construct, id: string, props: ProjectProps) {
    super(scope, id);

    const account = Stack.of(this).account;
    const trustActions = ['sts:AssumeRole', 'sts:TagSession', 'sts:SetContext', 'sts:SetSourceIdentity'];
    const sourceAccountCondition = { StringEquals: { 'aws:SourceAccount': account } };

    if (props.isCustomExecutionRole) {
      const servicePrincipals = [
        'scheduler.amazonaws.com',
        'bedrock.amazonaws.com',
        'lakeformation.amazonaws.com',
        'glue.amazonaws.com',
        'sagemaker.amazonaws.com',
        'redshift.amazonaws.com',
        'emr-serverless.amazonaws.com',
        'athena.amazonaws.com',
        'airflow-serverless.amazonaws.com',
      ].map((s) => new iam.ServicePrincipal(s));

      this.projectExecutionRole = new iam.Role(this, 'ProjectExecutionRole', {
        description: '',
        assumedBy: new iam.CompositePrincipal(new iam.ServicePrincipal('datazone.amazonaws.com'), ...servicePrincipals),
        managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('SageMakerStudioUserIAMDefaultExecutionPolicy')],
      });

      this.projectExecutionRole.assumeRolePolicy!.addStatements(
        new iam.PolicyStatement({
          actions: trustActions,
          principals: [new iam.ServicePrincipal('datazone.amazonaws.com')],
          conditions: sourceAccountCondition,
        }),
        new iam.PolicyStatement({
          actions: trustActions,
          principals: servicePrincipals,
          conditions: sourceAccountCondition,
        }),
      );
    }

    const project = new datazone.CfnProject(this, 'Resource', {
      domainIdentifier: props.domainId,
      domainUnitId: props.domainUnitId,
      name: props.name,
      description: props.description,
      projectProfileId: props.projectProfileId,
      projectProfileVersion: props.userParameters?.length ? 'latest' : undefined,
      projectExecutionRole: this.projectExecutionRole?.roleArn,
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
