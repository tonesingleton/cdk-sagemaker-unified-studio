import { App, Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { LookupEnvironment } from './lookup-environment.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

function createRole(stack: Stack): iam.Role {
  return new iam.Role(stack, 'DatazoneApiRole', {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
  });
}

describe('LookupEnvironment', () => {
  test('creates a custom resource calling DataZone ListEnvironments', () => {
    const stack = createStack();
    new LookupEnvironment(stack, 'Lookup', {
      domainId: 'dzd-abc123',
      projectId: 'dzp-xyz456',
      environmentName: 'Tooling',
      datazoneApiRole: createRole(stack),
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(
        Match.objectLike({
          service: 'DataZone',
          action: 'ListEnvironments',
          parameters: Match.objectLike({
            domainIdentifier: 'dzd-abc123',
            projectIdentifier: 'dzp-xyz456',
            name: 'Tooling',
          }),
        }),
      ),
    });
  });

  test('uses the provided datazoneApiRole', () => {
    const stack = createStack();
    const role = createRole(stack);
    new LookupEnvironment(stack, 'Lookup', {
      domainId: 'dzd-abc123',
      projectId: 'dzp-xyz456',
      environmentName: 'Tooling',
      datazoneApiRole: role,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
      Role: { 'Fn::GetAtt': [Match.stringLikeRegexp('DatazoneApiRole'), 'Arn'] },
    });
  });

  test('exposes environmentId as a token', () => {
    const stack = createStack();
    const lookup = new LookupEnvironment(stack, 'Lookup', {
      domainId: 'dzd-abc123',
      projectId: 'dzp-xyz456',
      environmentName: 'Tooling',
      datazoneApiRole: createRole(stack),
    });
    expect(lookup.environmentId).toBeDefined();
  });

  test('physical resource id encodes project and environment name', () => {
    const stack = createStack();
    new LookupEnvironment(stack, 'Lookup', {
      domainId: 'dzd-abc123',
      projectId: 'dzp-xyz456',
      environmentName: 'ToolingLite',
      datazoneApiRole: createRole(stack),
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(
        Match.objectLike({
          physicalResourceId: { id: 'dzp-xyz456-env-ToolingLite' },
        }),
      ),
    });
  });
});
