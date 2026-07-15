import { App, Lazy, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { UserProfile } from './user-profile.construct';
import { UserProfileStatus, UserType } from './user-profile.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  domainIdentifier: 'dzd_abc123',
  userIdentifier: 'a1b2c3d4-5678-90ab-cdef-EXAMPLE22222',
  userType: UserType.SSO_USER,
  status: UserProfileStatus.ASSIGNED,
};

describe('UserProfile', () => {
  test('creates a user profile with SSO user', () => {
    const stack = createStack();
    new UserProfile(stack, 'UP', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::UserProfile', {
      DomainIdentifier: 'dzd_abc123',
      UserIdentifier: 'a1b2c3d4-5678-90ab-cdef-EXAMPLE22222',
      UserType: 'SSO_USER',
      Status: 'ASSIGNED',
    });
  });

  test('creates a user profile with IAM role', () => {
    const stack = createStack();
    new UserProfile(stack, 'UP', {
      domainIdentifier: 'dzd_abc123',
      userIdentifier: 'arn:aws:iam::123456789012:role/DataEngineer',
      userType: UserType.IAM_ROLE,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::UserProfile', {
      DomainIdentifier: 'dzd_abc123',
      UserIdentifier: 'arn:aws:iam::123456789012:role/DataEngineer',
      UserType: 'IAM_ROLE',
    });
  });

  test('creates a user profile with IAM user', () => {
    const stack = createStack();
    new UserProfile(stack, 'UP', {
      domainIdentifier: 'dzd_abc123',
      userIdentifier: 'arn:aws:iam::123456789012:user/alice',
      userType: UserType.IAM_USER,
      status: UserProfileStatus.ACTIVATED,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::UserProfile', {
      DomainIdentifier: 'dzd_abc123',
      UserIdentifier: 'arn:aws:iam::123456789012:user/alice',
      UserType: 'IAM_USER',
      Status: 'ACTIVATED',
    });
  });

  test('creates a user profile with minimal props', () => {
    const stack = createStack();
    new UserProfile(stack, 'UP', {
      domainIdentifier: 'dzd_abc123',
      userIdentifier: 'a1b2c3d4-5678-90ab-cdef-EXAMPLE33333',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::UserProfile', {
      DomainIdentifier: 'dzd_abc123',
      UserIdentifier: 'a1b2c3d4-5678-90ab-cdef-EXAMPLE33333',
    });
  });

  test('fromAttributes returns IUserProfile with provided values', () => {
    const stack = createStack();
    const imported = UserProfile.fromAttributes(stack, 'Imported', {
      userProfileId: 'up-12345',
      userProfileType: 'SSO',
      domainId: 'dzd_abc123',
    });
    expect(imported.userProfileId).toBe('up-12345');
    expect(imported.userProfileType).toBe('SSO');
    expect(imported.domainId).toBe('dzd_abc123');
  });

  describe('validation', () => {
    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new UserProfile(stack, 'UP', { ...validProps, domainIdentifier: 'bad' })).toThrow(
        /domainIdentifier/,
      );
    });

    test('throws when userIdentifier is empty', () => {
      const stack = createStack();
      expect(() => new UserProfile(stack, 'UP', { ...validProps, userIdentifier: '' })).toThrow(/userIdentifier/);
    });

    test('throws when sessionName is too short', () => {
      const stack = createStack();
      expect(() => new UserProfile(stack, 'UP', { ...validProps, sessionName: 'x' })).toThrow(/sessionName/);
    });

    test('throws when sessionName is too long', () => {
      const stack = createStack();
      expect(() => new UserProfile(stack, 'UP', { ...validProps, sessionName: 'a'.repeat(65) })).toThrow(/sessionName/);
    });

    test('accepts valid sessionName', () => {
      const stack = createStack();
      expect(
        () =>
          new UserProfile(stack, 'UP', {
            ...validProps,
            userType: UserType.IAM_ROLE_SESSION,
            sessionName: 'my-session',
          }),
      ).not.toThrow();
    });

    test('skips validation when domainIdentifier is a token', () => {
      const stack = createStack();
      expect(
        () =>
          new UserProfile(stack, 'UP', {
            domainIdentifier: Lazy.string({ produce: () => 'dzd_resolved_later' }),
            userIdentifier: 'some-user',
          }),
      ).not.toThrow();
    });
  });
});
