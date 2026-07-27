import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AssetFilter } from './asset-filter.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'pii-column-filter',
  domainIdentifier: 'dzd-abc123',
  assetIdentifier: 'ast-abc123',
  configuration: { columnConfiguration: { includedColumnNames: ['customer_id', 'email'] } },
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('AssetFilter', () => {
  test('creates a custom resource for the asset filter', () => {
    const stack = createStack();
    new AssetFilter(stack, 'Filter', validProps);
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('creates with a row configuration', () => {
    const stack = createStack();
    new AssetFilter(stack, 'Filter', {
      ...validProps,
      configuration: {
        rowConfiguration: {
          rowFilter: { expression: { equalTo: { columnName: 'region', value: 'EU' } } },
          sensitive: true,
        },
      },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"rowConfiguration"'),
    });
  });

  test('creates with description', () => {
    const stack = createStack();
    new AssetFilter(stack, 'Filter', { ...validProps, description: 'Hides PII columns' });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"description":"Hides PII columns"'),
    });
  });

  test('exposes assetFilterId', () => {
    const stack = createStack();
    const f = new AssetFilter(stack, 'Filter', validProps);
    expect(f.assetFilterId).toBeDefined();
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new AssetFilter(stack, 'F', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 64 characters', () => {
      const stack = createStack();
      expect(() => new AssetFilter(stack, 'F', { ...validProps, name: 'x'.repeat(65) })).toThrow(/name/);
    });

    test('throws on name with invalid characters', () => {
      const stack = createStack();
      expect(() => new AssetFilter(stack, 'F', { ...validProps, name: 'bad!name' })).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new AssetFilter(stack, 'F', { ...validProps, domainIdentifier: 'bad' })).toThrow(/domainIdentifier/);
    });

    test('throws on invalid assetIdentifier', () => {
      const stack = createStack();
      expect(() => new AssetFilter(stack, 'F', { ...validProps, assetIdentifier: 'has spaces!' })).toThrow(
        /assetIdentifier/,
      );
    });

    test('throws on description exceeding 2048 characters', () => {
      const stack = createStack();
      expect(() => new AssetFilter(stack, 'F', { ...validProps, description: 'x'.repeat(2049) })).toThrow(
        /description/,
      );
    });

    test('throws when both columnConfiguration and rowConfiguration are set', () => {
      const stack = createStack();
      expect(
        () =>
          new AssetFilter(stack, 'F', {
            ...validProps,
            configuration: {
              columnConfiguration: { includedColumnNames: ['id'] },
              rowConfiguration: { rowFilter: { expression: { isNull: { columnName: 'x' } } } },
            },
          }),
      ).toThrow(/columnConfiguration.*rowConfiguration/);
    });
  });

  test('creates an onUpdate handler', () => {
    const stack = createStack();
    new AssetFilter(stack, 'Filter', validProps);
    const resources = Template.fromStack(stack).findResources('Custom::AWS');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Update).toBeDefined();
  });

  describe('fromAttributes', () => {
    test('returns an IAssetFilter with provided attributes', () => {
      const stack = createStack();
      const imported = AssetFilter.fromAttributes(stack, 'Imported', { assetFilterId: 'flt-abc123' });
      expect(imported.assetFilterId).toBe('flt-abc123');
    });

    test('does not create any custom resources', () => {
      const stack = createStack();
      AssetFilter.fromAttributes(stack, 'Imported', { assetFilterId: 'flt-abc123' });
      expect(stack.node.children.length).toBe(1);
    });
  });

  describe('without executionRoleArn', () => {
    const propsWithoutRole = {
      name: 'pii-column-filter',
      domainIdentifier: 'dzd-abc123',
      assetIdentifier: 'ast-abc123',
      configuration: { columnConfiguration: { includedColumnNames: ['customer_id'] } },
    };

    test('grants datazone permissions directly instead of sts:AssumeRole', () => {
      const stack = createStack();
      new AssetFilter(stack, 'Filter', propsWithoutRole);
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['datazone:CreateAssetFilter', 'datazone:UpdateAssetFilter', 'datazone:DeleteAssetFilter'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      });
    });

    test('does not pass assumedRoleArn to the custom resource', () => {
      const stack = createStack();
      new AssetFilter(stack, 'Filter', propsWithoutRole);
      const resources = Template.fromStack(stack).findResources('Custom::AWS');
      const resource = Object.values(resources)[0];
      expect(resource.Properties.Create).not.toContain('assumedRoleArn');
    });
  });
});
