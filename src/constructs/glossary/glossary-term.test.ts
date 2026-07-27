import { App, Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { GlossaryTerm } from './glossary-term.construct';
import { GlossaryTermStatus } from './glossary-term.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

function makeRole(stack: Stack): iam.IRole {
  return iam.Role.fromRoleArn(stack, 'ApiRole', 'arn:aws:iam::123456789012:role/DomainExecutionRole');
}

const baseProps = {
  name: 'Revenue',
  domainIdentifier: 'dzd-abc123',
  glossaryIdentifier: 'gloss-abc123',
};

describe('GlossaryTerm', () => {
  test('creates a custom resource for the glossary term', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', { ...baseProps, datazoneApiRole: makeRole(stack) });
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('passes domain and glossary to the custom resource', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', { ...baseProps, datazoneApiRole: makeRole(stack) });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('CreateGlossaryTerm'),
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('gloss-abc123'),
    });
  });

  test('creates with descriptions and status', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', {
      ...baseProps,
      datazoneApiRole: makeRole(stack),
      shortDescription: 'Total income',
      longDescription: 'Total income from all sources before deductions',
      status: GlossaryTermStatus.ENABLED,
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('Total income'),
    });
  });

  test('includes term relations as a nested object', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', {
      ...baseProps,
      datazoneApiRole: makeRole(stack),
      termRelations: [
        { classifier: 'isA', termId: 'term-parent' },
        { classifier: 'hasA', termId: 'term-child' },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('termRelations'),
    });
  });

  test('runs as the provided datazoneApiRole (role prop on Lambda)', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', { ...baseProps, datazoneApiRole: makeRole(stack) });
    // DataZoneApiCall sets the Lambda execution role directly — no sts:AssumeRole needed
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.not(Match.stringLikeRegexp('assumedRoleArn')),
    });
  });

  test('exposes glossaryTermId', () => {
    const stack = createStack();
    const term = new GlossaryTerm(stack, 'Term', { ...baseProps, datazoneApiRole: makeRole(stack) });
    expect(term.glossaryTermId).toBeDefined();
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new GlossaryTerm(stack, 'T', { ...baseProps, datazoneApiRole: makeRole(stack), name: '' })).toThrow(
        /name/,
      );
    });

    test('throws on name exceeding 256 characters', () => {
      const stack = createStack();
      expect(
        () => new GlossaryTerm(stack, 'T', { ...baseProps, datazoneApiRole: makeRole(stack), name: 'x'.repeat(257) }),
      ).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(
        () => new GlossaryTerm(stack, 'T', { ...baseProps, datazoneApiRole: makeRole(stack), domainIdentifier: 'bad' }),
      ).toThrow(/domainIdentifier/);
    });

    test('throws on empty glossaryIdentifier', () => {
      const stack = createStack();
      expect(
        () => new GlossaryTerm(stack, 'T', { ...baseProps, datazoneApiRole: makeRole(stack), glossaryIdentifier: '' }),
      ).toThrow(/glossaryIdentifier/);
    });

    test('throws on shortDescription exceeding 1024 characters', () => {
      const stack = createStack();
      expect(
        () =>
          new GlossaryTerm(stack, 'T', {
            ...baseProps,
            datazoneApiRole: makeRole(stack),
            shortDescription: 'x'.repeat(1025),
          }),
      ).toThrow(/shortDescription/);
    });

    test('throws on longDescription exceeding 4096 characters', () => {
      const stack = createStack();
      expect(
        () =>
          new GlossaryTerm(stack, 'T', {
            ...baseProps,
            datazoneApiRole: makeRole(stack),
            longDescription: 'x'.repeat(4097),
          }),
      ).toThrow(/longDescription/);
    });
  });

  describe('fromAttributes', () => {
    test('returns an IGlossaryTerm with provided ID', () => {
      const stack = createStack();
      const imported = GlossaryTerm.fromAttributes(stack, 'Imported', { glossaryTermId: 'term-123' });
      expect(imported.glossaryTermId).toBe('term-123');
    });

    test('does not create any resources', () => {
      const stack = createStack();
      GlossaryTerm.fromAttributes(stack, 'Imported', { glossaryTermId: 'term-123' });
      expect(stack.node.children.length).toBe(1);
    });
  });
});
