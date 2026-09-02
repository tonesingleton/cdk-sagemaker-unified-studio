import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Asset } from './asset.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'RetailSalesTransactions',
  domainIdentifier: 'dzd-abc123',
  owningProjectIdentifier: 'proj-abc123',
  typeIdentifier: 'amazon.datazone.GlueTableAssetType',
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('Asset', () => {
  test('creates a custom resource for the asset', () => {
    const stack = createStack();
    new Asset(stack, 'Asset', validProps);
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('passes assumedRoleArn to the custom resource', () => {
    const stack = createStack();
    new Asset(stack, 'Asset', validProps);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('assumedRoleArn.*DomainExecutionRole'),
    });
  });

  test('creates with description, formsInput, and glossaryTerms', () => {
    const stack = createStack();
    new Asset(stack, 'Asset', {
      ...validProps,
      description: 'Sales transaction data',
      glossaryTerms: ['term-abc123'],
      formsInput: [{ formName: 'GlueTableForm', typeIdentifier: 'amazon.datazone.GlueTableFormType' }],
    });
    const template = Template.fromStack(stack);
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"description":"Sales transaction data"'),
    });
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"glossaryTerms":\\["term-abc123"\\]'),
    });
  });

  test('passes typeRevision and externalIdentifier when provided', () => {
    const stack = createStack();
    new Asset(stack, 'Asset', {
      ...validProps,
      typeRevision: '13',
      externalIdentifier: 'ext-id-001',
    });
    const template = Template.fromStack(stack);
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"typeRevision":"13"'),
    });
    template.hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"externalIdentifier":"ext-id-001"'),
    });
  });

  test('grants sts:AssumeRole scoped to the execution role', () => {
    const stack = createStack();
    new Asset(stack, 'Asset', validProps);
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
    const asset = new Asset(stack, 'Asset', validProps);
    expect(asset.assetId).toBeDefined();
    expect(asset.revision).toBeDefined();
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new Asset(stack, 'A', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 256 characters', () => {
      const stack = createStack();
      expect(() => new Asset(stack, 'A', { ...validProps, name: 'x'.repeat(257) })).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new Asset(stack, 'A', { ...validProps, domainIdentifier: 'bad' })).toThrow(/domainIdentifier/);
    });

    test('throws on invalid owningProjectIdentifier', () => {
      const stack = createStack();
      expect(() => new Asset(stack, 'A', { ...validProps, owningProjectIdentifier: 'has spaces!' })).toThrow(
        /owningProjectIdentifier/,
      );
    });

    test('throws on description exceeding 2048 characters', () => {
      const stack = createStack();
      expect(() => new Asset(stack, 'A', { ...validProps, description: 'x'.repeat(2049) })).toThrow(/description/);
    });
  });

  describe('fromAttributes', () => {
    test('returns an IAsset with provided attributes', () => {
      const stack = createStack();
      const imported = Asset.fromAttributes(stack, 'Imported', { assetId: 'ast-abc123', revision: '1' });
      expect(imported.assetId).toBe('ast-abc123');
      expect(imported.revision).toBe('1');
    });

    test('does not create any custom resources', () => {
      const stack = createStack();
      Asset.fromAttributes(stack, 'Imported', { assetId: 'ast-abc123', revision: '1' });
      expect(stack.node.children.length).toBe(1);
    });
  });

  describe('without executionRoleArn', () => {
    const propsWithoutRole = {
      name: 'RetailSalesTransactions',
      domainIdentifier: 'dzd-abc123',
      owningProjectIdentifier: 'proj-abc123',
      typeIdentifier: 'amazon.datazone.GlueTableAssetType',
    };

    test('grants datazone permissions directly instead of sts:AssumeRole', () => {
      const stack = createStack();
      new Asset(stack, 'Asset', propsWithoutRole);
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['datazone:CreateAsset', 'datazone:DeleteAsset'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      });
    });

    test('does not pass assumedRoleArn to the custom resource', () => {
      const stack = createStack();
      new Asset(stack, 'Asset', propsWithoutRole);
      const resources = Template.fromStack(stack).findResources('Custom::AWS');
      const resource = Object.values(resources)[0];
      expect(resource.Properties.Create).not.toContain('assumedRoleArn');
    });
  });
});
