import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Project } from './project.construct';
import { ProjectMemberDesignation } from './project.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('Project', () => {
  test('creates project with minimal props', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      Name: 'TestProject',
      DomainIdentifier: 'dzd-test',
      ProjectProfileId: 'pp-test',
    });
  });

  test('creates project with description and domainUnitId', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      description: 'A test project.',
      domainId: 'dzd-test',
      domainUnitId: 'du-123',
      projectProfileId: 'pp-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      Description: 'A test project.',
      DomainUnitId: 'du-123',
    });
  });

  test('does not create execution role when isCustomExecutionRole is false', () => {
    const stack = createStack();
    const project = new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      isCustomExecutionRole: false,
    });
    expect(project.projectExecutionRole).toBeUndefined();
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ProjectExecutionRole: Match.absent(),
    });
  });

  test('does not create execution role when isCustomExecutionRole is not set', () => {
    const stack = createStack();
    const project = new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
    });
    expect(project.projectExecutionRole).toBeUndefined();
  });

  test('creates execution role with correct trust policy when isCustomExecutionRole is true', () => {
    const stack = createStack();
    const project = new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      isCustomExecutionRole: true,
    });
    expect(project.projectExecutionRole).toBeDefined();

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: ['sts:AssumeRole', 'sts:TagSession', 'sts:SetContext', 'sts:SetSourceIdentity'],
            Effect: 'Allow',
            Principal: { Service: 'datazone.amazonaws.com' },
            Condition: { StringEquals: { 'aws:SourceAccount': '123456789012' } },
          }),
          Match.objectLike({
            Action: ['sts:AssumeRole', 'sts:TagSession', 'sts:SetContext', 'sts:SetSourceIdentity'],
            Effect: 'Allow',
            Principal: {
              Service: Match.arrayWith([
                'scheduler.amazonaws.com',
                'bedrock.amazonaws.com',
                'lakeformation.amazonaws.com',
                'glue.amazonaws.com',
                'sagemaker.amazonaws.com',
                'redshift.amazonaws.com',
                'emr-serverless.amazonaws.com',
                'athena.amazonaws.com',
                'airflow-serverless.amazonaws.com',
              ]),
            },
            Condition: { StringEquals: { 'aws:SourceAccount': '123456789012' } },
          }),
        ]),
      }),
      ManagedPolicyArns: Match.arrayWith([{ 'Fn::Join': Match.anyValue() }]),
    });
  });

  test('sets projectExecutionRole ARN on the CfnProject when isCustomExecutionRole is true', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      isCustomExecutionRole: true,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ProjectExecutionRole: Match.objectLike({ 'Fn::GetAtt': Match.anyValue() }),
    });
  });

  test('does not create execution role membership when isCustomExecutionRole is true', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      isCustomExecutionRole: true,
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::ProjectMembership', 0);
  });

  test('does not create execution role membership when isCustomExecutionRole is not set', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::ProjectMembership', 0);
  });

  test('creates memberships for provided members', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      members: [
        { userIdentifier: 'arn:aws:iam::123456789012:role/owner', designation: ProjectMemberDesignation.PROJECT_OWNER },
        { userIdentifier: 'arn:aws:iam::123456789012:role/contributor' },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectMembership', {
      Designation: 'PROJECT_OWNER',
      Member: { UserIdentifier: 'arn:aws:iam::123456789012:role/owner' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectMembership', {
      Designation: 'PROJECT_CONTRIBUTOR',
      Member: { UserIdentifier: 'arn:aws:iam::123456789012:role/contributor' },
    });
  });

  test('defaults member designation to PROJECT_CONTRIBUTOR', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      members: [{ userIdentifier: 'arn:aws:iam::123456789012:role/user' }],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectMembership', {
      Designation: 'PROJECT_CONTRIBUTOR',
    });
  });

  test('sets projectProfileVersion to latest when userParameters provided', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      userParameters: [
        {
          environmentConfigurationName: 'DataLake',
          environmentParameters: [{ name: 'glueDbName', value: 'mydb' }],
        },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ProjectProfileVersion: 'latest',
      UserParameters: [
        {
          EnvironmentConfigurationName: 'DataLake',
          EnvironmentParameters: [{ Name: 'glueDbName', Value: 'mydb' }],
        },
      ],
    });
  });

  test('does not set projectProfileVersion when userParameters is empty', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      userParameters: [],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ProjectProfileVersion: Match.absent(),
    });
  });

  test('supports environmentId for project updates', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      userParameters: [
        {
          environmentId: 'env-123',
          environmentParameters: [{ name: 'glueDbName', value: 'mydb' }],
        },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      UserParameters: [
        {
          EnvironmentId: 'env-123',
          EnvironmentParameters: [{ Name: 'glueDbName', Value: 'mydb' }],
        },
      ],
    });
  });

  test('creates member memberships when both members and execution role provided', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      isCustomExecutionRole: true,
      members: [
        { userIdentifier: 'arn:aws:iam::123456789012:role/owner', designation: ProjectMemberDesignation.PROJECT_OWNER },
      ],
    });
    // Only the explicit member, no execution role membership
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::ProjectMembership', 1);
  });

  test('exposes projectId', () => {
    const stack = createStack();
    const project = new Project(stack, 'Project', {
      name: 'TestProject',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
    });
    expect(project.projectId).toBeDefined();
  });
});
