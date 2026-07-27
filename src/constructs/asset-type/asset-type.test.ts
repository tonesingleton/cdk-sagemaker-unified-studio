import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AssetType } from './asset-type.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'CustomerDataAssetType',
  domainIdentifier: 'dzd-abc123',
  owningProjectIdentifier: 'proj-abc123',
  formsInput: {},
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('AssetType', () => {
  test('creates a custom resource for the asset type', () => {
    const stack = createStack();
    new AssetType(stack, 'AssetType', validProps);
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('passes assumedRoleArn to the custom resource', () => {
    const stack = createStack();
    new AssetType(stack, 'AssetType', validProps);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('assumedRoleArn.*DomainExecutionRole'),
    });
  });

  test('passes formsInput and description', () => {
    const stack = createStack();
    new AssetType(stack, 'AssetType', {
      ...validProps,
      description: 'Customer data asset type',
      formsInput: {
        CustomerForm: { typeIdentifier: 'CustomerFormType', typeRevision: '1', required: true },
      },
    });
    const template = Template.fromStack(stack);
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"description":"Customer data asset type"'),
    });
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"CustomerForm"'),
    });
  });

  test('grants sts:AssumeRole scoped to the execution role', () => {
    const stack = createStack();
    new AssetType(stack, 'AssetType', validProps);
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

  test('exposes assetTypeName and revision', () => {
    const stack = createStack();
    const at = new AssetType(stack, 'AssetType', validProps);
    expect(at.assetTypeName).toBeDefined();
    expect(at.revision).toBeDefined();
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new AssetType(stack, 'AT', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 256 characters', () => {
      const stack = createStack();
      expect(() => new AssetType(stack, 'AT', { ...validProps, name: 'x'.repeat(257) })).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new AssetType(stack, 'AT', { ...validProps, domainIdentifier: 'bad' })).toThrow(/domainIdentifier/);
    });

    test('throws on invalid owningProjectIdentifier', () => {
      const stack = createStack();
      expect(() => new AssetType(stack, 'AT', { ...validProps, owningProjectIdentifier: 'has spaces!' })).toThrow(
        /owningProjectIdentifier/,
      );
    });

    test('throws on description exceeding 2048 characters', () => {
      const stack = createStack();
      expect(() => new AssetType(stack, 'AT', { ...validProps, description: 'x'.repeat(2049) })).toThrow(/description/);
    });
  });

  describe('fromAttributes', () => {
    test('returns an IAssetType with provided attributes', () => {
      const stack = createStack();
      const imported = AssetType.fromAttributes(stack, 'Imported', {
        assetTypeName: 'CustomerDataAssetType',
        revision: '1',
      });
      expect(imported.assetTypeName).toBe('CustomerDataAssetType');
      expect(imported.revision).toBe('1');
    });

    test('does not create any custom resources', () => {
      const stack = createStack();
      AssetType.fromAttributes(stack, 'Imported', { assetTypeName: 'CustomerDataAssetType', revision: '1' });
      expect(stack.node.children.length).toBe(1);
    });
  });

  describe('without executionRoleArn', () => {
    const propsWithoutRole = {
      name: 'CustomerDataAssetType',
      domainIdentifier: 'dzd-abc123',
      owningProjectIdentifier: 'proj-abc123',
      formsInput: {},
    };

    test('grants datazone permissions directly instead of sts:AssumeRole', () => {
      const stack = createStack();
      new AssetType(stack, 'AssetType', propsWithoutRole);
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['datazone:CreateAssetType', 'datazone:DeleteAssetType'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      });
    });

    test('does not pass assumedRoleArn to the custom resource', () => {
      const stack = createStack();
      new AssetType(stack, 'AssetType', propsWithoutRole);
      const resources = Template.fromStack(stack).findResources('Custom::AWS');
      const resource = Object.values(resources)[0];
      expect(resource.Properties.Create).not.toContain('assumedRoleArn');
    });
  });
});
