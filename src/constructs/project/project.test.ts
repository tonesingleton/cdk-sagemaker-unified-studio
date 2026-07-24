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

  test('creates membership assignments as separate CfnProjectMembership resources', () => {
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
      MembershipAssignments: Match.absent(),
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::ProjectMembership', 2);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectMembership', {
      Designation: 'PROJECT_OWNER',
      Member: { UserIdentifier: 'arn:aws:iam::123456789012:role/owner' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectMembership', {
      Designation: 'PROJECT_CONTRIBUTOR',
      Member: { UserIdentifier: 'arn:aws:iam::123456789012:role/contributor' },
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

  test('does not create default database DESCRIBE grant by default', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
    });
    Template.fromStack(stack).resourceCountIs('AWS::LakeFormation::PrincipalPermissions', 0);
  });

  test('adds cr role as PROJECT_OWNER membership when crRole provided', () => {
    const stack = createStack();
    const crRole = new iam.Role(stack, 'CrRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      crRole,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectMembership', {
      Designation: 'PROJECT_OWNER',
      Member: { UserIdentifier: { 'Fn::GetAtt': [Match.stringLikeRegexp('CrRole'), 'Arn'] } },
    });
  });

  test('does not create any memberships when neither crRole nor membershipAssignments provided', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::ProjectMembership', 0);
  });

  test('grants DESCRIBE on default Glue database when grantDefaultDatabaseDescribe is true', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      domainIdentifier: 'dzd-test',
      grantDefaultDatabaseDescribe: true,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::LakeFormation::PrincipalPermissions', {
      Principal: { DataLakePrincipalIdentifier: { 'Fn::GetAtt': Match.anyValue() } },
      Resource: { Database: { CatalogId: '123456789012', Name: 'default' } },
      Permissions: ['DESCRIBE'],
      PermissionsWithGrantOption: [],
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

describe('Project.fromAttributes', () => {
  test('imports project with all attributes', () => {
    const stack = createStack();
    const imported = Project.fromAttributes(stack, 'Imported', {
      projectId: 'dzp-abc123',
      domainId: 'dzd-test',
      projectExecutionRoleArn: 'arn:aws:iam::123456789012:role/ProjectExec',
    });
    expect(imported.id).toBe('dzp-abc123');
    expect(imported.domainId).toBe('dzd-test');
    expect(imported.projectExecutionRole).toBeDefined();
  });

  test('imports project without optional role ARN', () => {
    const stack = createStack();
    const imported = Project.fromAttributes(stack, 'Imported', {
      projectId: 'dzp-abc123',
      domainId: 'dzd-test',
    });
    expect(imported.id).toBe('dzp-abc123');
    expect(imported.domainId).toBe('dzd-test');
    expect(imported.createdAt).toBe('');
    expect(imported.createdBy).toBe('');
    expect(imported.lastUpdatedAt).toBe('');
    expect(imported.projectStatus).toBe('');
  });

  test('does not create any CloudFormation resources', () => {
    const stack = createStack();
    Project.fromAttributes(stack, 'Imported', {
      projectId: 'dzp-abc123',
      domainId: 'dzd-test',
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::Project', 0);
    Template.fromStack(stack).resourceCountIs('AWS::IAM::Role', 0);
  });
});
