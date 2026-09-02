import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AccountPool } from './account-pool.construct';
import { ResolutionStrategy } from './account-pool.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  domainIdentifier: 'dzd-abc123',
  name: 'Producer Accounts',
  accountSource: { accounts: [{ awsAccountId: '111122223333', supportedRegions: ['eu-central-1'] }] },
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('AccountPool', () => {
  test('creates a custom resource for the account pool', () => {
    const stack = createStack();
    new AccountPool(stack, 'Pool', validProps);
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('creates with a custom Lambda handler source', () => {
    const stack = createStack();
    new AccountPool(stack, 'Pool', {
      ...validProps,
      accountSource: {
        customAccountPoolHandler: {
          lambdaFunctionArn: 'arn:aws:lambda:eu-central-1:123456789012:function:AccountProvider',
          lambdaExecutionRoleArn: 'arn:aws:iam::123456789012:role/LambdaExecRole',
        },
      },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('customAccountPoolHandler'),
    });
  });

  test('creates with description', () => {
    const stack = createStack();
    new AccountPool(stack, 'Pool', { ...validProps, description: 'Finance producer accounts' });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('Finance producer accounts'),
    });
  });

  test('creates with explicit resolutionStrategy', () => {
    const stack = createStack();
    new AccountPool(stack, 'Pool', { ...validProps, resolutionStrategy: ResolutionStrategy.MANUAL });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('MANUAL'),
    });
  });

  test('defaults resolutionStrategy to MANUAL', () => {
    const stack = createStack();
    new AccountPool(stack, 'Pool', validProps);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('MANUAL'),
    });
  });

  test('creates an onUpdate handler', () => {
    const stack = createStack();
    new AccountPool(stack, 'Pool', validProps);
    const resources = Template.fromStack(stack).findResources('Custom::AWS');
    expect(Object.values(resources)[0].Properties.Update).toBeDefined();
  });

  test('exposes accountPoolId', () => {
    const stack = createStack();
    const pool = new AccountPool(stack, 'Pool', validProps);
    expect(pool.accountPoolId).toBeDefined();
  });

  describe('validation', () => {
    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new AccountPool(stack, 'P', { ...validProps, domainIdentifier: 'bad' })).toThrow(/domainIdentifier/);
    });

    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new AccountPool(stack, 'P', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 64 characters', () => {
      const stack = createStack();
      expect(() => new AccountPool(stack, 'P', { ...validProps, name: 'x'.repeat(65) })).toThrow(/name/);
    });

    test('throws on name with invalid characters', () => {
      const stack = createStack();
      expect(() => new AccountPool(stack, 'P', { ...validProps, name: 'bad!name' })).toThrow(/name/);
    });

    test('throws on description exceeding 2048 characters', () => {
      const stack = createStack();
      expect(() => new AccountPool(stack, 'P', { ...validProps, description: 'x'.repeat(2049) })).toThrow(
        /description/,
      );
    });

    test('throws when both accountSource types are set', () => {
      const stack = createStack();
      expect(
        () =>
          new AccountPool(stack, 'P', {
            ...validProps,
            accountSource: {
              accounts: [{ awsAccountId: '111122223333', supportedRegions: ['eu-central-1'] }],
              customAccountPoolHandler: { lambdaFunctionArn: 'arn:aws:lambda:eu-central-1:123456789012:function:F' },
            },
          }),
      ).toThrow(/accounts.*customAccountPoolHandler/);
    });
  });

  describe('fromAttributes', () => {
    test('returns an IAccountPool with provided attributes', () => {
      const stack = createStack();
      const imported = AccountPool.fromAttributes(stack, 'Imported', { accountPoolId: 'ap-abc123' });
      expect(imported.accountPoolId).toBe('ap-abc123');
    });

    test('does not create any custom resources', () => {
      const stack = createStack();
      AccountPool.fromAttributes(stack, 'Imported', { accountPoolId: 'ap-abc123' });
      expect(stack.node.children.length).toBe(1);
    });
  });

  describe('without executionRoleArn', () => {
    const propsWithoutRole = { ...validProps, executionRoleArn: undefined };

    test('grants datazone permissions directly instead of sts:AssumeRole', () => {
      const stack = createStack();
      new AccountPool(stack, 'Pool', propsWithoutRole);
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['datazone:CreateAccountPool', 'datazone:UpdateAccountPool', 'datazone:DeleteAccountPool'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      });
    });

    test('does not pass assumedRoleArn to the custom resource', () => {
      const stack = createStack();
      new AccountPool(stack, 'Pool', propsWithoutRole);
      const resources = Template.fromStack(stack).findResources('Custom::AWS');
      expect(JSON.stringify(Object.values(resources)[0].Properties.Create)).not.toContain('assumedRoleArn');
    });
  });
});
