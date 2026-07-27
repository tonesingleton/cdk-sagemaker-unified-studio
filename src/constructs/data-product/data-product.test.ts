import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DataProduct } from './data-product.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'CustomerInsights',
  domainIdentifier: 'dzd-abc123',
  owningProjectIdentifier: 'proj-abc123',
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('DataProduct', () => {
  test('creates a custom resource for the data product', () => {
    const stack = createStack();
    new DataProduct(stack, 'DataProduct', validProps);
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('passes assumedRoleArn to the custom resource', () => {
    const stack = createStack();
    new DataProduct(stack, 'DataProduct', validProps);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('assumedRoleArn.*DomainExecutionRole'),
    });
  });

  test('creates with description, items, and glossaryTerms', () => {
    const stack = createStack();
    new DataProduct(stack, 'DataProduct', {
      ...validProps,
      description: 'Customer data product',
      glossaryTerms: ['term-abc123'],
      items: [{ identifier: 'asset-abc123', itemType: 'ASSET' }],
    });
    const template = Template.fromStack(stack);
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"description":"Customer data product"'),
    });
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"glossaryTerms":\\["term-abc123"\\]'),
    });
  });

  test('grants sts:AssumeRole scoped to the execution role', () => {
    const stack = createStack();
    new DataProduct(stack, 'DataProduct', validProps);
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

  test('exposes dataProductId and revision', () => {
    const stack = createStack();
    const dp = new DataProduct(stack, 'DataProduct', validProps);
    expect(dp.dataProductId).toBeDefined();
    expect(dp.revision).toBeDefined();
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new DataProduct(stack, 'DP', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 64 characters', () => {
      const stack = createStack();
      expect(() => new DataProduct(stack, 'DP', { ...validProps, name: 'x'.repeat(65) })).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new DataProduct(stack, 'DP', { ...validProps, domainIdentifier: 'bad' })).toThrow(
        /domainIdentifier/,
      );
    });

    test('throws on invalid owningProjectIdentifier', () => {
      const stack = createStack();
      expect(() => new DataProduct(stack, 'DP', { ...validProps, owningProjectIdentifier: 'has spaces!' })).toThrow(
        /owningProjectIdentifier/,
      );
    });

    test('throws on description exceeding 4096 characters', () => {
      const stack = createStack();
      expect(() => new DataProduct(stack, 'DP', { ...validProps, description: 'x'.repeat(4097) })).toThrow(
        /description/,
      );
    });
  });

  describe('fromAttributes', () => {
    test('returns an IDataProduct with provided attributes', () => {
      const stack = createStack();
      const imported = DataProduct.fromAttributes(stack, 'Imported', { dataProductId: 'dpd-abc123', revision: '1' });
      expect(imported.dataProductId).toBe('dpd-abc123');
      expect(imported.revision).toBe('1');
    });

    test('does not create any custom resources', () => {
      const stack = createStack();
      DataProduct.fromAttributes(stack, 'Imported', { dataProductId: 'dpd-abc123', revision: '1' });
      expect(stack.node.children.length).toBe(1); // only the imported construct, no CFN resources
    });
  });

  describe('without executionRoleArn', () => {
    const propsWithoutRole = {
      name: 'CustomerInsights',
      domainIdentifier: 'dzd-abc123',
      owningProjectIdentifier: 'proj-abc123',
    };

    test('grants datazone permissions directly instead of sts:AssumeRole', () => {
      const stack = createStack();
      new DataProduct(stack, 'DataProduct', propsWithoutRole);
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['datazone:CreateDataProduct', 'datazone:DeleteDataProduct'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      });
    });

    test('does not pass assumedRoleArn to the custom resource', () => {
      const stack = createStack();
      new DataProduct(stack, 'DataProduct', propsWithoutRole);
      const resources = Template.fromStack(stack).findResources('Custom::AWS');
      const resource = Object.values(resources)[0];
      expect(resource.Properties.Create).not.toContain('assumedRoleArn');
    });
  });
});
