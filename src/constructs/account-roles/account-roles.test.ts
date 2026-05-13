import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { AccountRoles } from './account-roles.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('AccountRoles', () => {
  test('creates query execution role', () => {
    const stack = createStack();
    new AccountRoles(stack, 'Roles', { account: '123456789012' });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'AmazonSageMakerQueryExecution',
    });
  });

  test('creates provisioning role', () => {
    const stack = createStack();
    new AccountRoles(stack, 'Roles', { account: '123456789012' });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      RoleName: Match.stringLikeRegexp('AmazonSageMakerProvisioning-.*'),
    });
  });

  test('creates bedrock model management role', () => {
    const stack = createStack();
    new AccountRoles(stack, 'Roles', { account: '123456789012' });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'AmazonDataZoneBedrockModelManagementRole',
    });
  });

  test('creates bedrock fm consumption role', () => {
    const stack = createStack();
    new AccountRoles(stack, 'Roles', { account: '123456789012' });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'AmazonDataZoneBedrockFMConsumptionRole',
    });
  });

  test('creates exactly four roles', () => {
    const stack = createStack();
    new AccountRoles(stack, 'Roles', { account: '123456789012' });
    Template.fromStack(stack).resourceCountIs('AWS::IAM::Role', 4);
  });

  test('provisioning role can pass query execution role', () => {
    const stack = createStack();
    new AccountRoles(stack, 'Roles', { account: '123456789012' });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: ['iam:PassRole', 'iam:GetRole'],
            Effect: 'Allow',
          }),
        ]),
      }),
    });
  });

  test('defaults account from stack', () => {
    const stack = createStack();
    new AccountRoles(stack, 'Roles');
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'AmazonSageMakerProvisioning-123456789012',
    });
  });
});
