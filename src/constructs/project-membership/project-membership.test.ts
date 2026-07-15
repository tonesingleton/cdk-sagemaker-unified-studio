import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ProjectMembership } from './project-membership.construct';
import { ProjectMemberDesignation } from './project-membership.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  domainIdentifier: 'dzd_abc123',
  projectIdentifier: 'proj-abc123',
  member: { userIdentifier: 'arn:aws:iam::123456789012:role/DataEngineer' },
  designation: ProjectMemberDesignation.PROJECT_CONTRIBUTOR,
};

describe('ProjectMembership', () => {
  test('creates a project membership with user identifier', () => {
    const stack = createStack();
    new ProjectMembership(stack, 'Membership', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectMembership', {
      DomainIdentifier: 'dzd_abc123',
      ProjectIdentifier: 'proj-abc123',
      Designation: 'PROJECT_CONTRIBUTOR',
      Member: { UserIdentifier: 'arn:aws:iam::123456789012:role/DataEngineer' },
    });
  });

  test('creates a project membership with group identifier', () => {
    const stack = createStack();
    new ProjectMembership(stack, 'Membership', {
      ...validProps,
      member: { groupIdentifier: 'data-engineering-team' },
      designation: ProjectMemberDesignation.PROJECT_OWNER,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::ProjectMembership', {
      Designation: 'PROJECT_OWNER',
      Member: { GroupIdentifier: 'data-engineering-team' },
    });
  });

  describe('validation', () => {
    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new ProjectMembership(stack, 'M', { ...validProps, domainIdentifier: 'bad' })).toThrow(
        /domainIdentifier/,
      );
    });

    test('throws on invalid projectIdentifier', () => {
      const stack = createStack();
      expect(() => new ProjectMembership(stack, 'M', { ...validProps, projectIdentifier: 'has spaces!' })).toThrow(
        /projectIdentifier/,
      );
    });

    test('throws when neither userIdentifier nor groupIdentifier is provided', () => {
      const stack = createStack();
      expect(() => new ProjectMembership(stack, 'M', { ...validProps, member: {} })).toThrow(
        /userIdentifier or groupIdentifier/,
      );
    });

    test('throws when both userIdentifier and groupIdentifier are provided', () => {
      const stack = createStack();
      expect(
        () =>
          new ProjectMembership(stack, 'M', {
            ...validProps,
            member: { userIdentifier: 'user', groupIdentifier: 'group' },
          }),
      ).toThrow(/only one/);
    });
  });
});
