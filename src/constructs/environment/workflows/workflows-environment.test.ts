import { App, Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { WorkflowsEnvironment } from './workflows-environment.construct';
import { ManagedBlueprintIdentifier } from '../../blueprint/blueprint.interface';
import type { IDomain } from '../../domain/domain.interface';
import type { IProject } from '../../project/project.interface';
import type { IProjectProfile } from '../../project-profile/project-profile.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

function mockDomain(stack: Stack): IDomain {
  return {
    domainId: 'dzd-test',
    domainArn: 'arn:aws:datazone:eu-central-1:123456789012:domain/dzd-test',
    rootDomainUnitId: 'du-root',
    domainExecutionRole: iam.Role.fromRoleArn(stack, 'DomainExecRole', 'arn:aws:iam::123456789012:role/DomainExec'),
    manageAccessRole: iam.Role.fromRoleArn(stack, 'ManageAccessRole', 'arn:aws:iam::123456789012:role/ManageAccess'),
    datazoneApiRole: iam.Role.fromRoleArn(stack, 'DatazoneApiRole', 'arn:aws:iam::123456789012:role/DatazoneApi'),
    domainUnits: {},
    blueprints: {
      [ManagedBlueprintIdentifier.WORKFLOWS]: { environmentBlueprintId: 'bp-workflows' } as any,
    },
    blueprintPolicyGrants: [],
    projectsBucket: {
      bucketName: 'amazon-sagemaker-projects',
      bucketArn: 'arn:aws:s3:::amazon-sagemaker-projects',
    } as any,
    accessLogsBucket: { bucketName: 'sagemaker-logs', bucketArn: 'arn:aws:s3:::sagemaker-logs' } as any,
  };
}

function mockProject(stack: Stack): IProject {
  return {
    id: 'dzp-test',
    domainId: 'dzd-test',
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'test',
    lastUpdatedAt: '2024-01-01T00:00:00Z',
    projectStatus: 'ACTIVE',
    projectExecutionRole: iam.Role.fromRoleArn(stack, 'ProjectExecRole', 'arn:aws:iam::123456789012:role/ProjectExec'),
  };
}

function mockProjectProfile(): IProjectProfile {
  return {
    projectProfileId: 'pp-test',
    environmentConfigurationIds: {
      [ManagedBlueprintIdentifier.WORKFLOWS]: 'cfg-workflows123',
    },
  };
}

describe('WorkflowsEnvironment', () => {
  test('creates environment with default name Workflows', () => {
    const stack = createStack();
    new WorkflowsEnvironment(stack, 'Env', {
      domain: mockDomain(stack),
      project: mockProject(stack),
      projectProfile: mockProjectProfile(),
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Environment', {
      Name: 'Workflows',
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'dzp-test',
      EnvironmentBlueprintIdentifier: 'bp-workflows',
    });
  });

  test('allows overriding the name', () => {
    const stack = createStack();
    new WorkflowsEnvironment(stack, 'Env', {
      domain: mockDomain(stack),
      project: mockProject(stack),
      projectProfile: mockProjectProfile(),
      name: 'MyWorkflows',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Environment', {
      Name: 'MyWorkflows',
    });
  });

  test('sets description when provided', () => {
    const stack = createStack();
    new WorkflowsEnvironment(stack, 'Env', {
      domain: mockDomain(stack),
      project: mockProject(stack),
      projectProfile: mockProjectProfile(),
      description: 'MWAA Serverless for pipeline orchestration.',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Environment', {
      Description: 'MWAA Serverless for pipeline orchestration.',
    });
  });

  test('omits description when not provided', () => {
    const stack = createStack();
    new WorkflowsEnvironment(stack, 'Env', {
      domain: mockDomain(stack),
      project: mockProject(stack),
      projectProfile: mockProjectProfile(),
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Environment', {
      Description: Match.absent(),
    });
  });

  test('does not create LakeFormation permissions', () => {
    const stack = createStack();
    new WorkflowsEnvironment(stack, 'Env', {
      domain: mockDomain(stack),
      project: mockProject(stack),
      projectProfile: mockProjectProfile(),
    });
    Template.fromStack(stack).resourceCountIs('AWS::LakeFormation::PrincipalPermissions', 0);
  });

  test('exposes environmentId', () => {
    const stack = createStack();
    const env = new WorkflowsEnvironment(stack, 'Env', {
      domain: mockDomain(stack),
      project: mockProject(stack),
      projectProfile: mockProjectProfile(),
    });
    expect(env.environmentId).toBeDefined();
  });

  test('fromAttributes imports environment without creating resources', () => {
    const stack = createStack();
    const imported = WorkflowsEnvironment.fromAttributes(stack, 'Imported', { environmentId: 'env-abc123' });
    expect(imported.environmentId).toBe('env-abc123');
  });
});
