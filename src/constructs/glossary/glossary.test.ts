import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Glossary } from './glossary.construct';
import { GlossaryStatus } from './glossary.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'BusinessTerms',
  domainIdentifier: 'dzd-abc123',
  owningProjectIdentifier: 'proj-abc123',
};

describe('Glossary', () => {
  test('creates a custom resource for the glossary', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', validProps);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: JSON.stringify({
        service: '@aws-sdk/client-datazone',
        action: 'CreateGlossary',
        parameters: {
          domainIdentifier: 'dzd-abc123',
          name: 'BusinessTerms',
          owningProjectIdentifier: 'proj-abc123',
        },
        physicalResourceId: { responsePath: 'id' },
      }),
    });
  });

  test('creates with description and status', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', {
      ...validProps,
      description: 'Central glossary',
      status: GlossaryStatus.ENABLED,
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: JSON.stringify({
        service: '@aws-sdk/client-datazone',
        action: 'CreateGlossary',
        parameters: {
          domainIdentifier: 'dzd-abc123',
          name: 'BusinessTerms',
          owningProjectIdentifier: 'proj-abc123',
          description: 'Central glossary',
          status: 'ENABLED',
        },
        physicalResourceId: { responsePath: 'id' },
      }),
    });
  });

  test('grants datazone permissions scoped to the domain', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          {
            Action: ['datazone:CreateGlossary', 'datazone:UpdateGlossary', 'datazone:DeleteGlossary'],
            Effect: 'Allow',
            Resource: 'arn:aws:datazone:us-east-1:123456789012:domain/dzd-abc123',
          },
        ],
      },
    });
  });

  test('exposes glossaryId', () => {
    const stack = createStack();
    const glossary = new Glossary(stack, 'Glossary', validProps);
    expect(glossary.glossaryId).toBeDefined();
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new Glossary(stack, 'G', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 256 characters', () => {
      const stack = createStack();
      expect(() => new Glossary(stack, 'G', { ...validProps, name: 'x'.repeat(257) })).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new Glossary(stack, 'G', { ...validProps, domainIdentifier: 'bad' })).toThrow(/domainIdentifier/);
    });

    test('throws on invalid owningProjectIdentifier', () => {
      const stack = createStack();
      expect(() => new Glossary(stack, 'G', { ...validProps, owningProjectIdentifier: 'has spaces!' })).toThrow(
        /owningProjectIdentifier/,
      );
    });

    test('throws on description exceeding 4096 characters', () => {
      const stack = createStack();
      expect(() => new Glossary(stack, 'G', { ...validProps, description: 'x'.repeat(4097) })).toThrow(/description/);
    });
  });

  describe('fromAttributes', () => {
    test('returns an IGlossary with provided ID', () => {
      const stack = createStack();
      const imported = Glossary.fromAttributes(stack, 'Imported', { glossaryId: 'gloss-123' });
      expect(imported.glossaryId).toBe('gloss-123');
    });

    test('does not create any custom resources', () => {
      const stack = createStack();
      Glossary.fromAttributes(stack, 'Imported', { glossaryId: 'gloss-123' });
      Template.fromStack(stack).resourceCountIs('Custom::AWS', 0);
    });
  });
});
