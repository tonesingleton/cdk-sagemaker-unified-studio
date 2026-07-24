import { App, Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { LookupSmusUserRole } from './lookup-smus-user-role.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

function createRole(stack: Stack): iam.Role {
  return new iam.Role(stack, 'DatazoneApiRole', {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
  });
}

describe('LookupSmusUserRole', () => {
  test('creates a LookupEnvironment custom resource for the Tooling environment', () => {
    const stack = createStack();
    new LookupSmusUserRole(stack, 'Lookup', {
      domainId: 'dzd-abc123',
      projectId: 'dzp-xyz456',
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

  test('roleArn encodes account, projectId, and resolved environmentId', () => {
    const stack = createStack();
    const lookup = new LookupSmusUserRole(stack, 'Lookup', {
      domainId: 'dzd-abc123',
      projectId: 'dzp-xyz456',
      datazoneApiRole: createRole(stack),
    });
    expect(lookup.roleArn).toContain('123456789012');
    expect(lookup.roleArn).toContain('datazone_usr_role_dzp-xyz456_');
  });

  test('uses the provided datazoneApiRole', () => {
    const stack = createStack();
    const role = createRole(stack);
    new LookupSmusUserRole(stack, 'Lookup', {
      domainId: 'dzd-abc123',
      projectId: 'dzp-xyz456',
      datazoneApiRole: role,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
      Role: { 'Fn::GetAtt': [Match.stringLikeRegexp('DatazoneApiRole'), 'Arn'] },
    });
  });
});
