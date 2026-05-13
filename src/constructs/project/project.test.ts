import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Project } from './project.construct';
import { ProjectMemberDesignation } from './project.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('Project', () => {
  test('creates project', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      description: 'A test project.',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Project', {
      Name: 'TestProject',
      Description: 'A test project.',
    });
  });

  test('creates memberships', () => {
    const stack = createStack();
    new Project(stack, 'Project', {
      name: 'TestProject',
      description: 'A test project.',
      domainId: 'dzd-test',
      projectProfileId: 'pp-test',
      members: [
        { userIdentifier: 'arn:aws:iam::123456789012:role/owner', designation: ProjectMemberDesignation.PROJECT_OWNER },
        { userIdentifier: 'arn:aws:iam::123456789012:role/contributor' },
      ],
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::ProjectMembership', 2);
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
});
