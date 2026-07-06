import { Stack, Validations, aws_iam as iam } from 'aws-cdk-lib';
import { CfnProject } from 'aws-cdk-lib/aws-datazone';
import { Construct } from 'constructs';
import type { EnvironmentConfigurationUserParameter, IProject, ProjectProps } from './project.interface';

const DATALAKE_BLUEPRINT_NAME = 'DataLake';

const EXECUTION_ROLE_TRUST_PRINCIPALS = [
  'datazone.amazonaws.com',
  'scheduler.amazonaws.com',
  'bedrock.amazonaws.com',
  'lakeformation.amazonaws.com',
  'glue.amazonaws.com',
  'sagemaker.amazonaws.com',
  'redshift.amazonaws.com',
  'emr-serverless.amazonaws.com',
  'athena.amazonaws.com',
  'airflow-serverless.amazonaws.com',
];

/**
 * A SageMaker Unified Studio project within a domain.
 *
 * Projects enable a group of users to collaborate on various business use cases that involve publishing,
 * discovering, subscribing to, and consuming data in the Amazon SageMaker Unified Studio catalog.
 * Project members consume assets from the Amazon SageMaker Unified Studio catalog and produce new assets
 * using one or more analytical workflows.
 *
 * When a `projectProfileId` is provided and no `projectExecutionRole` is specified, the construct
 * automatically creates a project-scoped execution role and injects its ARN as the `userRoleArn`
 * parameter for the DataLake environment configuration.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/projects.html
 */
export class Project extends Construct implements IProject {
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
  /** The project execution role (provided or auto-created when projectProfileId is set). */
  public readonly projectExecutionRole?: iam.IRole;

  constructor(scope: Construct, id: string, props: ProjectProps) {
    super(scope, id);

    // Create an execution role when a project profile is specified but no role is provided.
    // The DataLake blueprint requires userRoleArn to provision the Glue database.
    this.projectExecutionRole =
      props.projectExecutionRole ?? (props.projectProfileId ? this.createExecutionRole() : undefined);

    const userParameters = this.buildUserParameters(props);

    const project = new CfnProject(this, 'Resource', {
      name: props.name,
      description: props.description,
      domainIdentifier: props.domainIdentifier,
      domainUnitId: props.domainUnitId,
      glossaryTerms: props.glossaryTerms,
      projectProfileId: props.projectProfileId,
      projectProfileVersion: userParameters?.length ? 'latest' : undefined,
      projectCategory: props.projectCategory,
      projectExecutionRole: this.projectExecutionRole?.roleArn,
      membershipAssignments: props.membershipAssignments?.map((m) => ({
        designation: m.designation,
        member: { userIdentifier: m.member.userIdentifier, groupIdentifier: m.member.groupIdentifier },
      })),
      resourceTags: props.resourceTags?.map((t) => ({ key: t.key, value: t.value })),
      userParameters: userParameters?.map((up) => ({
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
  }

  /**
   * Builds the final userParameters array, injecting userRoleArn into the
   * DataLake environment configuration if an execution role exists.
   */
  private buildUserParameters(props: ProjectProps) {
    if (!this.projectExecutionRole) return props.userParameters;

    const hasDataLake = props.userParameters?.some((up) => up.environmentConfigurationName === DATALAKE_BLUEPRINT_NAME);

    if (hasDataLake) return props.userParameters;

    const dataLakeParam: EnvironmentConfigurationUserParameter = {
      environmentConfigurationName: DATALAKE_BLUEPRINT_NAME,
      environmentParameters: [{ name: 'userRoleArn', value: this.projectExecutionRole.roleArn }],
    };

    return [...(props.userParameters ?? []), dataLakeParam];
  }

  private createExecutionRole(): iam.Role {
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

    return role;
  }
}
