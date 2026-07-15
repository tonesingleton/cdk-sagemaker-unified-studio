import { App, Lazy, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GroupProfile } from './group-profile.construct';
import { GroupProfileStatus, GroupType } from './group-profile.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  domainIdentifier: 'dzd_abc123',
  groupIdentifier: 'a1b2c3d4-5678-90ab-cdef-EXAMPLE11111',
  groupType: GroupType.DATAZONE_SSO_GROUP,
  status: GroupProfileStatus.ASSIGNED,
};

describe('GroupProfile', () => {
  test('creates a group profile with SSO group', () => {
    const stack = createStack();
    new GroupProfile(stack, 'GP', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::GroupProfile', {
      DomainIdentifier: 'dzd_abc123',
      GroupIdentifier: 'a1b2c3d4-5678-90ab-cdef-EXAMPLE11111',
      GroupType: 'DATAZONE_SSO_GROUP',
      Status: 'ASSIGNED',
    });
  });

  test('creates a group profile with IAM role principal ARN', () => {
    const stack = createStack();
    new GroupProfile(stack, 'GP', {
      domainIdentifier: 'dzd_abc123',
      rolePrincipalArn: 'arn:aws:iam::123456789012:role/DataEngineers',
      groupType: GroupType.IAM_ROLE_SESSION_GROUP,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::GroupProfile', {
      DomainIdentifier: 'dzd_abc123',
      RolePrincipalArn: 'arn:aws:iam::123456789012:role/DataEngineers',
      GroupType: 'IAM_ROLE_SESSION_GROUP',
    });
  });

  test('creates a group profile with minimal props', () => {
    const stack = createStack();
    new GroupProfile(stack, 'GP', {
      domainIdentifier: 'dzd_abc123',
      groupIdentifier: 'my-sso-group',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::GroupProfile', {
      DomainIdentifier: 'dzd_abc123',
      GroupIdentifier: 'my-sso-group',
    });
  });

  test('fromAttributes returns IGroupProfile with provided values', () => {
    const stack = createStack();
    const imported = GroupProfile.fromAttributes(stack, 'Imported', {
      groupProfileId: 'gp-12345',
      groupName: 'DataEngineers',
      domainId: 'dzd_abc123',
    });
    expect(imported.groupProfileId).toBe('gp-12345');
    expect(imported.groupName).toBe('DataEngineers');
    expect(imported.domainId).toBe('dzd_abc123');
  });

  describe('validation', () => {
    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new GroupProfile(stack, 'GP', { ...validProps, domainIdentifier: 'bad' })).toThrow(
        /domainIdentifier/,
      );
    });

    test('throws when neither groupIdentifier nor rolePrincipalArn is provided', () => {
      const stack = createStack();
      expect(
        () =>
          new GroupProfile(stack, 'GP', {
            domainIdentifier: 'dzd_abc123',
          }),
      ).toThrow(/groupIdentifier or rolePrincipalArn/);
    });

    test('skips validation when domainIdentifier is a token', () => {
      const stack = createStack();
      expect(
        () =>
          new GroupProfile(stack, 'GP', {
            domainIdentifier: Lazy.string({ produce: () => 'dzd_resolved_later' }),
            groupIdentifier: 'my-group',
          }),
      ).not.toThrow();
    });
  });
});
