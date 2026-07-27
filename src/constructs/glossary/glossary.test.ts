import { App, Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Glossary } from './glossary.construct';
import { GlossaryStatus } from './glossary.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

function makeRole(stack: Stack): iam.IRole {
  return iam.Role.fromRoleArn(stack, 'ApiRole', 'arn:aws:iam::123456789012:role/DomainExecutionRole');
}

describe('Glossary', () => {
  test('creates a custom resource for the glossary', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', {
      name: 'BusinessTerms',
      domainIdentifier: 'dzd-abc123',
      owningProjectIdentifier: 'proj-abc123',
      datazoneApiRole: makeRole(stack),
    });
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('passes domain and project to the custom resource', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', {
      name: 'BusinessTerms',
      domainIdentifier: 'dzd-abc123',
      owningProjectIdentifier: 'proj-abc123',
      datazoneApiRole: makeRole(stack),
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('CreateGlossary'),
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('dzd-abc123'),
    });
  });

  test('creates with description and status', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', {
      name: 'BusinessTerms',
      domainIdentifier: 'dzd-abc123',
      owningProjectIdentifier: 'proj-abc123',
      datazoneApiRole: makeRole(stack),
      description: 'Central glossary',
      status: GlossaryStatus.ENABLED,
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('Central glossary'),
    });
  });

  test('exposes glossaryId', () => {
    const stack = createStack();
    const glossary = new Glossary(stack, 'Glossary', {
      name: 'BusinessTerms',
      domainIdentifier: 'dzd-abc123',
      owningProjectIdentifier: 'proj-abc123',
      datazoneApiRole: makeRole(stack),
    });
    expect(glossary.glossaryId).toBeDefined();
  });

  test('runs as the provided datazoneApiRole (role prop on Lambda)', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', {
      name: 'BusinessTerms',
      domainIdentifier: 'dzd-abc123',
      owningProjectIdentifier: 'proj-abc123',
      datazoneApiRole: makeRole(stack),
    });
    // DataZoneApiCall sets the Lambda execution role directly — no sts:AssumeRole needed
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.not(Match.stringLikeRegexp('assumedRoleArn')),
    });
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(
        () =>
          new Glossary(stack, 'G', {
            name: '',
            domainIdentifier: 'dzd-abc123',
            owningProjectIdentifier: 'proj-abc123',
            datazoneApiRole: makeRole(stack),
          }),
      ).toThrow(/name/);
    });

    test('throws on name exceeding 256 characters', () => {
      const stack = createStack();
      expect(
        () =>
          new Glossary(stack, 'G', {
            name: 'x'.repeat(257),
            domainIdentifier: 'dzd-abc123',
            owningProjectIdentifier: 'proj-abc123',
            datazoneApiRole: makeRole(stack),
          }),
      ).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(
        () =>
          new Glossary(stack, 'G', {
            name: 'BusinessTerms',
            domainIdentifier: 'bad',
            owningProjectIdentifier: 'proj-abc123',
            datazoneApiRole: makeRole(stack),
          }),
      ).toThrow(/domainIdentifier/);
    });

    test('throws on invalid owningProjectIdentifier', () => {
      const stack = createStack();
      expect(
        () =>
          new Glossary(stack, 'G', {
            name: 'BusinessTerms',
            domainIdentifier: 'dzd-abc123',
            owningProjectIdentifier: 'has spaces!',
            datazoneApiRole: makeRole(stack),
          }),
      ).toThrow(/owningProjectIdentifier/);
    });

    test('throws on description exceeding 4096 characters', () => {
      const stack = createStack();
      expect(
        () =>
          new Glossary(stack, 'G', {
            name: 'BusinessTerms',
            domainIdentifier: 'dzd-abc123',
            owningProjectIdentifier: 'proj-abc123',
            datazoneApiRole: makeRole(stack),
            description: 'x'.repeat(4097),
          }),
      ).toThrow(/description/);
    });
  });

  describe('fromAttributes', () => {
    test('returns an IGlossary with provided ID', () => {
      const stack = createStack();
      const imported = Glossary.fromAttributes(stack, 'Imported', { glossaryId: 'gloss-123' });
      expect(imported.glossaryId).toBe('gloss-123');
    });

    test('does not create any resources', () => {
      const stack = createStack();
      Glossary.fromAttributes(stack, 'Imported', { glossaryId: 'gloss-123' });
      expect(stack.node.children.length).toBe(1);
    });
  });
});
