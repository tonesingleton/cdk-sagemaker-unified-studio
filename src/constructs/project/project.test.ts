import { App, Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Project } from './project.construct';
import { Designation } from './project.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('Project', () => {
  test('creates project with minimal props', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      Name: 'TestProject',
      DomainIdentifier: 'dzd-test',
      ProjectExecutionRole: { 'Fn::GetAtt': Match.anyValue() },
    });
  });

  test('creates project with description and domainUnitId', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      description: 'A test project.',
      domainIdentifier: 'dzd-test',
      domainUnitId: 'du-123',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      Description: 'A test project.',
      DomainUnitId: 'du-123',
    });
  });

  test('auto-creates execution role', () => {
    const stack = createStack();
    const project = new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
    });
    expect(project.projectExecutionRole).toBeDefined();
    Template.fromStack(stack).resourceCountIs('AWS::IAM::Role', 1);
  });

  test('auto-created role has correct trust policy', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: ['sts:AssumeRole', 'sts:TagSession', 'sts:SetContext', 'sts:SetSourceIdentity'],
            Condition: { StringEquals: { 'aws:SourceAccount': '123456789012' } },
          }),
        ]),
      }),
      ManagedPolicyArns: Match.arrayWith([{ 'Fn::Join': Match.anyValue() }]),
    });
  });

  test('uses provided execution role instead of creating one', () => {
    const stack = createStack();
    const role = new iam.Role(stack, 'Role', {
      assumedBy: new iam.ServicePrincipal('datazone.amazonaws.com'),
    });
    const project = new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      projectExecutionRole: role,
    });
    expect(project.projectExecutionRole).toBe(role);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ProjectExecutionRole: { 'Fn::GetAtt': [Match.stringLikeRegexp('Role'), 'Arn'] },
    });
  });

  test('does not inject userParameters automatically', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      projectProfileId: 'pp-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      UserParameters: Match.absent(),
      ProjectProfileVersion: Match.absent(),
    });
  });

  test('passes userParameters as-is', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      userParameters: [
        {
          environmentConfigurationName: 'DataLake',
          environmentParameters: [{ name: 'userRoleArn', value: 'arn:aws:iam::123456789012:role/custom' }],
        },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ProjectProfileVersion: 'latest',
      UserParameters: [
        {
          EnvironmentConfigurationName: 'DataLake',
          EnvironmentParameters: [{ Name: 'userRoleArn', Value: 'arn:aws:iam::123456789012:role/custom' }],
        },
      ],
    });
  });

  test('creates inline membership assignments', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      membershipAssignments: [
        {
          designation: Designation.PROJECT_OWNER,
          member: { userIdentifier: 'arn:aws:iam::123456789012:role/owner' },
        },
        {
          designation: Designation.PROJECT_CONTRIBUTOR,
          member: { userIdentifier: 'arn:aws:iam::123456789012:role/contributor' },
        },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      MembershipAssignments: [
        {
          Designation: 'PROJECT_OWNER',
          Member: { UserIdentifier: 'arn:aws:iam::123456789012:role/owner' },
        },
        {
          Designation: 'PROJECT_CONTRIBUTOR',
          Member: { UserIdentifier: 'arn:aws:iam::123456789012:role/contributor' },
        },
      ],
    });
  });

  test('does not set membershipAssignments when none provided', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      MembershipAssignments: Match.absent(),
    });
  });

  test('sets glossaryTerms', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      glossaryTerms: ['term-1', 'term-2'],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      GlossaryTerms: ['term-1', 'term-2'],
    });
  });

  test('sets projectCategory', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      projectCategory: 'analytics',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ProjectCategory: 'analytics',
    });
  });

  test('sets resourceTags', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      resourceTags: [{ key: 'Team', value: 'Data' }],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ResourceTags: [{ Key: 'Team', Value: 'Data' }],
    });
  });

  test('sets projectProfileVersion to latest when userParameters provided', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      userParameters: [
        {
          environmentConfigurationName: 'DataLake',
          environmentParameters: [{ name: 'glueDbName', value: 'mydb' }],
        },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ProjectProfileVersion: 'latest',
    });
  });

  test('does not set projectProfileVersion when no userParameters', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      projectProfileId: 'pp-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      ProjectProfileVersion: Match.absent(),
    });
  });

  test('supports environmentId for project updates', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
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

  test('exposes all CFN attributes', () => {
    const stack = createStack();
    const project = new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
    });
    expect(project.id).toBeDefined();
    expect(project.domainId).toBeDefined();
    expect(project.createdAt).toBeDefined();
    expect(project.createdBy).toBeDefined();
    expect(project.lastUpdatedAt).toBeDefined();
    expect(project.projectStatus).toBeDefined();
  });
});
