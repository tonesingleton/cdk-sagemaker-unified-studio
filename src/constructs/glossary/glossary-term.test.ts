import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GlossaryTerm } from './glossary-term.construct';
import { GlossaryTermStatus } from './glossary-term.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'Revenue',
  domainIdentifier: 'dzd-abc123',
  glossaryIdentifier: 'gloss-abc123',
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('GlossaryTerm', () => {
  test('creates a Lambda and custom resource for the glossary term', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', validProps);
    Template.fromStack(stack).resourceCountIs('AWS::Lambda::Function', 1);
    Template.fromStack(stack).resourceCountIs('AWS::CloudFormation::CustomResource', 1);
  });

  test('passes domain and glossary to the custom resource', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::CloudFormation::CustomResource', {
      DomainId: 'dzd-abc123',
      GlossaryId: 'gloss-abc123',
      Name: 'Revenue',
    });
  });

  test('creates with descriptions and status', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', {
      ...validProps,
      shortDescription: 'Total income',
      longDescription: 'Total income from all sources before deductions',
      status: GlossaryTermStatus.ENABLED,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::CloudFormation::CustomResource', {
      ShortDescription: 'Total income',
      LongDescription: 'Total income from all sources before deductions',
      Status: 'ENABLED',
    });
  });

  test('serialises term relations as JSON string', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', {
      ...validProps,
      termRelations: [
        { classifier: 'isA', termId: 'term-parent' },
        { classifier: 'hasA', termId: 'term-child' },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::CloudFormation::CustomResource', {
      TermRelations: JSON.stringify({ isA: ['term-parent'], hasA: ['term-child'] }),
    });
  });

  test('Lambda uses the provided execution role', () => {
    const stack = createStack();
    new GlossaryTerm(stack, 'Term', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
      Role: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
    });
  });

  test('exposes glossaryTermId', () => {
    const stack = createStack();
    const term = new GlossaryTerm(stack, 'Term', validProps);
    expect(term.glossaryTermId).toBeDefined();
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new GlossaryTerm(stack, 'T', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 256 characters', () => {
      const stack = createStack();
      expect(() => new GlossaryTerm(stack, 'T', { ...validProps, name: 'x'.repeat(257) })).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new GlossaryTerm(stack, 'T', { ...validProps, domainIdentifier: 'bad' })).toThrow(
        /domainIdentifier/,
      );
    });

    test('throws on empty glossaryIdentifier', () => {
      const stack = createStack();
      expect(() => new GlossaryTerm(stack, 'T', { ...validProps, glossaryIdentifier: '' })).toThrow(
        /glossaryIdentifier/,
      );
    });

    test('throws on shortDescription exceeding 1024 characters', () => {
      const stack = createStack();
      expect(() => new GlossaryTerm(stack, 'T', { ...validProps, shortDescription: 'x'.repeat(1025) })).toThrow(
        /shortDescription/,
      );
    });

    test('throws on longDescription exceeding 4096 characters', () => {
      const stack = createStack();
      expect(() => new GlossaryTerm(stack, 'T', { ...validProps, longDescription: 'x'.repeat(4097) })).toThrow(
        /longDescription/,
      );
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
      Template.fromStack(stack).resourceCountIs('AWS::CloudFormation::CustomResource', 0);
      Template.fromStack(stack).resourceCountIs('AWS::Lambda::Function', 0);
    });
  });
});
