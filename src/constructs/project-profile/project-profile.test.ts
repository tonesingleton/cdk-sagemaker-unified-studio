import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { ProjectProfile } from './project-profile.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('ProjectProfile', () => {
  test('creates project profile', () => {
    const stack = createStack();
    new ProjectProfile(stack, 'Profile', {
      name: 'TestProfile',
      description: 'A test profile.',
      domainId: 'dzd-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectProfile', {
      Name: 'TestProfile',
      Status: 'ENABLED',
    });
  });

  test('creates with environment configurations', () => {
    const stack = createStack();
    new ProjectProfile(stack, 'Profile', {
      name: 'TestProfile',
      description: 'A test profile.',
      domainId: 'dzd-test',
      environmentConfigurations: [
        {
          name: 'Tooling',
          environmentBlueprintId: 'bp-123',
        },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectProfile', {
      EnvironmentConfigurations: Match.arrayWith([
        Match.objectLike({
          Name: 'Tooling',
          AwsAccount: { AwsAccountId: '123456789012' },
          AwsRegion: { RegionName: 'eu-central-1' },
        }),
      ]),
    });
  });

  test('uses explicit account and region', () => {
    const stack = createStack();
    new ProjectProfile(stack, 'Profile', {
      name: 'TestProfile',
      domainId: 'dzd-test',
      environmentConfigurations: [
        {
          name: 'Tooling',
          environmentBlueprintId: 'bp-123',
          accountId: '999999999999',
          region: 'us-west-2',
        },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectProfile', {
      EnvironmentConfigurations: Match.arrayWith([
        Match.objectLike({
          AwsAccount: { AwsAccountId: '999999999999' },
          AwsRegion: { RegionName: 'us-west-2' },
        }),
      ]),
    });
  });

  test('sets deployment order', () => {
    const stack = createStack();
    new ProjectProfile(stack, 'Profile', {
      name: 'TestProfile',
      domainId: 'dzd-test',
      environmentConfigurations: [
        { name: 'Tooling', environmentBlueprintId: 'bp-1', deploymentOrder: 0 },
        { name: 'DataLake', environmentBlueprintId: 'bp-2', deploymentOrder: 2 },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectProfile', {
      EnvironmentConfigurations: Match.arrayWith([
        Match.objectLike({ Name: 'Tooling', DeploymentOrder: 0 }),
        Match.objectLike({ Name: 'DataLake', DeploymentOrder: 2 }),
      ]),
    });
  });

  test('passes configuration parameters', () => {
    const stack = createStack();
    new ProjectProfile(stack, 'Profile', {
      name: 'TestProfile',
      domainId: 'dzd-test',
      environmentConfigurations: [
        {
          name: 'LakehouseCatalog',
          environmentBlueprintId: 'bp-1',
          parameters: { catalogName: 'my-catalog', catalogType: 'redshift' },
        },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectProfile', {
      EnvironmentConfigurations: Match.arrayWith([
        Match.objectLike({
          Name: 'LakehouseCatalog',
          ConfigurationParameters: {
            ParameterOverrides: Match.arrayWith([
              Match.objectLike({ Name: 'catalogName', Value: 'my-catalog' }),
              Match.objectLike({ Name: 'catalogType', Value: 'redshift' }),
            ]),
          },
        }),
      ]),
    });
  });
});

describe('ProjectProfile validation', () => {
  test('throws on negative deploymentOrder', () => {
    const stack = createStack();
    expect(
      () =>
        new ProjectProfile(stack, 'Profile', {
          name: 'Test',
          domainId: 'dzd-test',
          environmentConfigurations: [{ name: 'Env', environmentBlueprintId: 'bp-1', deploymentOrder: -1 }],
        }),
    ).toThrow(/deploymentOrder for 'Env' must be a non-negative integer/);
  });

  test('throws on fractional deploymentOrder', () => {
    const stack = createStack();
    expect(
      () =>
        new ProjectProfile(stack, 'Profile', {
          name: 'Test',
          domainId: 'dzd-test',
          environmentConfigurations: [{ name: 'Env', environmentBlueprintId: 'bp-1', deploymentOrder: 1.5 }],
        }),
    ).toThrow(/deploymentOrder for 'Env' must be a non-negative integer/);
  });

  test('allows zero deploymentOrder', () => {
    const stack = createStack();
    new ProjectProfile(stack, 'Profile', {
      name: 'Test',
      domainId: 'dzd-test',
      environmentConfigurations: [{ name: 'Env', environmentBlueprintId: 'bp-1', deploymentOrder: 0 }],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectProfile', {
      EnvironmentConfigurations: Match.arrayWith([Match.objectLike({ DeploymentOrder: 0 })]),
    });
  });
});

describe('ProjectProfile.fromAttributes', () => {
  test('imports project profile with projectProfileId', () => {
    const stack = createStack();
    const imported = ProjectProfile.fromAttributes(stack, 'Imported', {
      projectProfileId: 'pp-abc123',
    });
    expect(imported.projectProfileId).toBe('pp-abc123');
  });

  test('does not create any CloudFormation resources', () => {
    const stack = createStack();
    ProjectProfile.fromAttributes(stack, 'Imported', {
      projectProfileId: 'pp-abc123',
    });
    expect(stack.node.children.length).toBe(1);
  });
});
