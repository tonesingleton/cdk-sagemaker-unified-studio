import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SubscriptionTarget } from './subscription-target.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'GlueTableGrant',
  domainIdentifier: 'dzd-abc123',
  environmentIdentifier: 'env-abc123',
  type: 'amazon.datazone.GlueTableGrantType',
  applicableAssetTypes: ['amazon.datazone.GlueTableAssetType'],
  authorizedPrincipals: ['arn:aws:iam::123456789012:role/DataZoneAdmin'],
  subscriptionTargetConfig: [{ content: '{}', formName: 'GlueTableForm' }],
};

describe('SubscriptionTarget', () => {
  test('creates a subscription target with required props', () => {
    const stack = createStack();
    new SubscriptionTarget(stack, 'Target', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::SubscriptionTarget', {
      Name: 'GlueTableGrant',
      DomainIdentifier: 'dzd-abc123',
      EnvironmentIdentifier: 'env-abc123',
      Type: 'amazon.datazone.GlueTableGrantType',
      ApplicableAssetTypes: ['amazon.datazone.GlueTableAssetType'],
      AuthorizedPrincipals: ['arn:aws:iam::123456789012:role/DataZoneAdmin'],
      SubscriptionTargetConfig: [{ Content: '{}', FormName: 'GlueTableForm' }],
    });
  });

  test('creates a subscription target with optional props', () => {
    const stack = createStack();
    new SubscriptionTarget(stack, 'Target', {
      ...validProps,
      manageAccessRole: 'arn:aws:iam::123456789012:role/ManageAccess',
      provider: 'custom-provider',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::SubscriptionTarget', {
      ManageAccessRole: 'arn:aws:iam::123456789012:role/ManageAccess',
      Provider: 'custom-provider',
    });
  });

  test('exposes subscriptionTargetId', () => {
    const stack = createStack();
    const target = new SubscriptionTarget(stack, 'Target', validProps);
    expect(target.subscriptionTargetId).toBeDefined();
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new SubscriptionTarget(stack, 'T', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 256 characters', () => {
      const stack = createStack();
      expect(() => new SubscriptionTarget(stack, 'T', { ...validProps, name: 'x'.repeat(257) })).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new SubscriptionTarget(stack, 'T', { ...validProps, domainIdentifier: 'bad' })).toThrow(
        /domainIdentifier/,
      );
    });

    test('throws on invalid environmentIdentifier', () => {
      const stack = createStack();
      expect(() => new SubscriptionTarget(stack, 'T', { ...validProps, environmentIdentifier: 'has spaces!' })).toThrow(
        /environmentIdentifier/,
      );
    });

    test('throws on empty type', () => {
      const stack = createStack();
      expect(() => new SubscriptionTarget(stack, 'T', { ...validProps, type: '' })).toThrow(/type/);
    });

    test('throws on empty applicableAssetTypes', () => {
      const stack = createStack();
      expect(() => new SubscriptionTarget(stack, 'T', { ...validProps, applicableAssetTypes: [] })).toThrow(
        /applicableAssetTypes/,
      );
    });

    test('throws on empty authorizedPrincipals', () => {
      const stack = createStack();
      expect(() => new SubscriptionTarget(stack, 'T', { ...validProps, authorizedPrincipals: [] })).toThrow(
        /authorizedPrincipals/,
      );
    });

    test('throws on authorizedPrincipals exceeding 10', () => {
      const stack = createStack();
      expect(
        () =>
          new SubscriptionTarget(stack, 'T', {
            ...validProps,
            authorizedPrincipals: Array(11).fill('arn:aws:iam::123456789012:role/R'),
          }),
      ).toThrow(/authorizedPrincipals/);
    });

    test('throws on empty subscriptionTargetConfig', () => {
      const stack = createStack();
      expect(() => new SubscriptionTarget(stack, 'T', { ...validProps, subscriptionTargetConfig: [] })).toThrow(
        /subscriptionTargetConfig/,
      );
    });
  });

  describe('fromAttributes', () => {
    test('returns an ISubscriptionTarget with provided ID', () => {
      const stack = createStack();
      const imported = SubscriptionTarget.fromAttributes(stack, 'Imported', {
        subscriptionTargetId: 'st-12345',
      });
      expect(imported.subscriptionTargetId).toBe('st-12345');
    });

    test('does not create any CloudFormation resources', () => {
      const stack = createStack();
      SubscriptionTarget.fromAttributes(stack, 'Imported', { subscriptionTargetId: 'st-12345' });
      Template.fromStack(stack).resourceCountIs('AWS::DataZone::SubscriptionTarget', 0);
    });
  });
});
