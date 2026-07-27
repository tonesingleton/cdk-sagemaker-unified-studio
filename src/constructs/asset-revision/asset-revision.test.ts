import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AssetRevision } from './asset-revision.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'RetailSalesTransactions',
  domainIdentifier: 'dzd-abc123',
  identifier: 'ast-abc123',
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('AssetRevision', () => {
  test('creates a custom resource for the asset revision', () => {
    const stack = createStack();
    new AssetRevision(stack, 'Revision', validProps);
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('passes assumedRoleArn to the custom resource', () => {
    const stack = createStack();
    new AssetRevision(stack, 'Revision', validProps);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('assumedRoleArn.*DomainExecutionRole'),
    });
  });

  test('does not create an onDelete handler', () => {
    const stack = createStack();
    new AssetRevision(stack, 'Revision', validProps);
    const resources = Template.fromStack(stack).findResources('Custom::AWS');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Delete).toBeUndefined();
  });

  test('passes optional props', () => {
    const stack = createStack();
    new AssetRevision(stack, 'Revision', {
      ...validProps,
      description: 'Updated schema',
      typeRevision: '2',
      glossaryTerms: ['term-abc123'],
    });
    const template = Template.fromStack(stack);
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"description":"Updated schema"'),
    });
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"typeRevision":"2"'),
    });
  });

  test('grants sts:AssumeRole scoped to the execution role', () => {
    const stack = createStack();
    new AssetRevision(stack, 'Revision', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Resource: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
          },
        ],
      },
    });
  });

  test('exposes assetId and revision', () => {
    const stack = createStack();
    const r = new AssetRevision(stack, 'Revision', validProps);
    expect(r.assetId).toBeDefined();
    expect(r.revision).toBeDefined();
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new AssetRevision(stack, 'R', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 256 characters', () => {
      const stack = createStack();
      expect(() => new AssetRevision(stack, 'R', { ...validProps, name: 'x'.repeat(257) })).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new AssetRevision(stack, 'R', { ...validProps, domainIdentifier: 'bad' })).toThrow(
        /domainIdentifier/,
      );
    });

    test('throws on invalid identifier', () => {
      const stack = createStack();
      expect(() => new AssetRevision(stack, 'R', { ...validProps, identifier: 'has spaces!' })).toThrow(/identifier/);
    });

    test('throws on description exceeding 2048 characters', () => {
      const stack = createStack();
      expect(() => new AssetRevision(stack, 'R', { ...validProps, description: 'x'.repeat(2049) })).toThrow(
        /description/,
      );
    });
  });

  describe('without executionRoleArn', () => {
    const propsWithoutRole = {
      name: 'RetailSalesTransactions',
      domainIdentifier: 'dzd-abc123',
      identifier: 'ast-abc123',
    };

    test('grants datazone:CreateAssetRevision directly', () => {
      const stack = createStack();
      new AssetRevision(stack, 'Revision', propsWithoutRole);
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: 'datazone:CreateAssetRevision',
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      });
    });

    test('does not pass assumedRoleArn to the custom resource', () => {
      const stack = createStack();
      new AssetRevision(stack, 'Revision', propsWithoutRole);
      const resources = Template.fromStack(stack).findResources('Custom::AWS');
      const resource = Object.values(resources)[0];
      expect(resource.Properties.Create).not.toContain('assumedRoleArn');
    });
  });
});
