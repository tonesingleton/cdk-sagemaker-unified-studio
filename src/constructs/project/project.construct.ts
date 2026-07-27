import { Stack, aws_iam as iam, aws_lakeformation as lakeformation, Validations } from 'aws-cdk-lib';
import { CfnProject, CfnProjectMembership } from 'aws-cdk-lib/aws-datazone';
import { Construct } from 'constructs';
import { EXECUTION_ROLE_TRUST_PRINCIPALS } from '../common';
import type { IProject, ProjectAttributes, ProjectProps } from './project.interface';
import { Designation } from './project.interface';

/**
 * A SageMaker Unified Studio project within a domain.
 *
 * Projects enable a group of users to collaborate on various business use cases that involve publishing,
 * discovering, subscribing to, and consuming data in the Amazon SageMaker Unified Studio catalog.
 * Project members consume assets from the Amazon SageMaker Unified Studio catalog and produce new assets
 * using one or more analytical workflows.
 *
 * The construct always ensures a project execution role exists — either provided via `projectExecutionRole`
 * or auto-created with the necessary trust policy for SageMaker Unified Studio services.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/projects.html
 */
export class Project extends Construct implements IProject {
  /**
   * Import an existing project from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: ProjectAttributes): IProject {
    class ImportedProject extends Construct implements IProject {
      public readonly id = attrs.projectId;
      public readonly domainId = attrs.domainId;
      public readonly createdAt = '';
      public readonly createdBy = '';
      public readonly lastUpdatedAt = '';
      public readonly projectStatus = '';
      public readonly projectExecutionRole = attrs.projectExecutionRoleArn
        ? iam.Role.fromRoleArn(this, 'ProjectExecutionRole', attrs.projectExecutionRoleArn)
        : (undefined as unknown as iam.IRole);
    }
    return new ImportedProject(scope, id);
  }
  /** The identifier of a project. */
  public readonly id: string;
  /** The identifier of the domain where the project exists. */
  public readonly domainId: string;
  /** The timestamp of when the project was created. */
  public readonly createdAt: string;
  /** The Amazon DataZone user who created the project. */
  public readonly createdBy: string;
  /** The timestamp of when the project was last updated. */
  public readonly lastUpdatedAt: string;
  /** The status of the project. */
  public readonly projectStatus: string;
  /** The project execution role (provided or auto-created). */
  public readonly projectExecutionRole: iam.IRole;

  constructor(scope: Construct, id: string, props: ProjectProps) {
    super(scope, id);

    this.projectExecutionRole = props.projectExecutionRole ?? this.createExecutionRole(props.additionalTrustPrincipals);

    const project = new CfnProject(this, 'Resource', {
      name: props.name,
      description: props.description,
      domainIdentifier: props.domainIdentifier,
      domainUnitId: props.domainUnitId,
      glossaryTerms: props.glossaryTerms,
      projectProfileId: props.projectProfileId,
      projectProfileVersion: props.userParameters?.length ? 'latest' : undefined,
      projectCategory: props.projectCategory,
      projectExecutionRole: this.projectExecutionRole.roleArn,
      resourceTags: props.resourceTags?.map((t) => ({ key: t.key, value: t.value })),
      membershipAssignments: props.membershipAssignments?.map((m) => ({
        designation: m.designation,
        member: { userIdentifier: m.member.userIdentifier, groupIdentifier: m.member.groupIdentifier },
      })),
      userParameters: props.userParameters?.map((up) => ({
        environmentConfigurationName: up.environmentConfigurationName,
        environmentId: up.environmentId,
        environmentParameters: up.environmentParameters.map((ep) => ({ name: ep.name, value: ep.value })),
      })),
    });

    this.id = project.attrId;
    this.domainId = project.attrDomainId;
    this.createdAt = project.attrCreatedAt;
    this.createdBy = project.attrCreatedBy;
    this.lastUpdatedAt = project.attrLastUpdatedAt;
    this.projectStatus = project.attrProjectStatus;

    // TODO: Replace membershipAssignments in CfnProject above with CfnProjectMembership once
    // a safe migration path exists for existing projects (currently causes destructive replacement).
    // props.membershipAssignments?.forEach((m, index) => {
    //   const membership = new CfnProjectMembership(this, `Membership${index}`, {
    //     domainIdentifier: props.domainIdentifier,
    //     projectIdentifier: project.attrId,
    //     designation: m.designation,
    //     member: { userIdentifier: m.member.userIdentifier, groupIdentifier: m.member.groupIdentifier },
    //   });
    //   membership.addDependency(project);
    // });

    if (props.crRole) {
      const membership = new CfnProjectMembership(this, 'CrRoleMembership', {
        domainIdentifier: props.domainIdentifier,
        projectIdentifier: project.attrId,
        designation: Designation.PROJECT_OWNER,
        member: { userIdentifier: props.crRole.roleArn },
      });
      membership.addDependency(project);
    }

    if (props.grantDefaultDatabaseDescribe) {
      new lakeformation.CfnPrincipalPermissions(this, 'DefaultDatabaseDescribe', {
        principal: { dataLakePrincipalIdentifier: this.projectExecutionRole.roleArn },
        resource: { database: { catalogId: Stack.of(this).account, name: 'default' } },
        permissions: ['DESCRIBE'],
        permissionsWithGrantOption: [],
      });
    }
  }

  private createExecutionRole(additionalTrustPrincipals?: Array<string>): iam.Role {
    const account = Stack.of(this).account;
    const servicePrincipals = EXECUTION_ROLE_TRUST_PRINCIPALS.map((s) => new iam.ServicePrincipal(s));

    const role = new iam.Role(this, 'ProjectExecutionRole', {
      description:
        'Project-scoped execution role for SageMaker Unified Studio. ' +
        'Defines which AWS services and data can be accessed within this project.',
      assumedBy: new iam.CompositePrincipal(...servicePrincipals),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('SageMakerStudioUserIAMDefaultExecutionPolicy')],
    });

    Validations.of(role).acknowledge({
      id: 'AwsSolutions-IAM4',
      reason:
        'SageMakerStudioUserIAMDefaultExecutionPolicy is the AWS-recommended managed policy for SageMaker Unified Studio project execution roles.',
    });

    role.assumeRolePolicy!.addStatements(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole', 'sts:TagSession', 'sts:SetContext', 'sts:SetSourceIdentity'],
        principals: servicePrincipals,
        conditions: { StringEquals: { 'aws:SourceAccount': account } },
      }),
    );

    if (additionalTrustPrincipals?.length) {
      role.assumeRolePolicy!.addStatements(
        new iam.PolicyStatement({
          actions: ['sts:AssumeRole'],
          principals: additionalTrustPrincipals.map((arn) => new iam.ArnPrincipal(arn)),
        }),
      );
    }

    return role;
  }
}
