import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Owner, OwnerEntityType } from '.';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  domainIdentifier: 'dzd-abc123',
  entityIdentifier: 'du-root123',
  entityType: OwnerEntityType.DOMAIN_UNIT,
  userIdentifier: 'arn:aws:iam::123456789012:role/Admin',
};

describe('Owner', () => {
  test('creates a CfnOwner with a user identifier', () => {
    const stack = createStack();
    new Owner(stack, 'Owner', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Owner', {
      DomainIdentifier: 'dzd-abc123',
      EntityIdentifier: 'du-root123',
      EntityType: 'DOMAIN_UNIT',
      Owner: { User: { UserIdentifier: 'arn:aws:iam::123456789012:role/Admin' } },
    });
  });

  test('creates a CfnOwner with a group identifier', () => {
    const stack = createStack();
    new Owner(stack, 'Owner', {
      domainIdentifier: 'dzd-abc123',
      entityIdentifier: 'du-root123',
      entityType: OwnerEntityType.DOMAIN_UNIT,
      groupIdentifier: 'group-abc123',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Owner', {
      Owner: { Group: { GroupIdentifier: 'group-abc123' } },
    });
  });

  describe('validation', () => {
    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new Owner(stack, 'O', { ...validProps, domainIdentifier: 'bad' })).toThrow(/domainIdentifier/);
    });

    test('throws when neither userIdentifier nor groupIdentifier is provided', () => {
      const stack = createStack();
      expect(
        () =>
          new Owner(stack, 'O', {
            domainIdentifier: 'dzd-abc123',
            entityIdentifier: 'du-root123',
            entityType: OwnerEntityType.DOMAIN_UNIT,
          }),
      ).toThrow(/exactly one/);
    });

    test('throws when both userIdentifier and groupIdentifier are provided', () => {
      const stack = createStack();
      expect(
        () =>
          new Owner(stack, 'O', {
            ...validProps,
            groupIdentifier: 'group-abc123',
          }),
      ).toThrow(/not both/);
    });
  });
});
