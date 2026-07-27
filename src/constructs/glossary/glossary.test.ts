import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Glossary } from './glossary.construct';
import { GlossaryStatus } from './glossary.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'BusinessTerms',
  domainIdentifier: 'dzd-abc123',
  owningProjectIdentifier: 'proj-abc123',
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('Glossary', () => {
  test('creates a Lambda and custom resource for the glossary', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', validProps);
    Template.fromStack(stack).resourceCountIs('AWS::Lambda::Function', 1);
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('passes domain and project to the custom resource', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', validProps);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(
        Match.objectLike({
          service: 'DataZone',
          action: 'CreateGlossary',
          parameters: Match.objectLike({
            domainIdentifier: 'dzd-abc123',
            owningProjectIdentifier: 'proj-abc123',
            name: 'BusinessTerms',
          }),
        }),
      ),
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
      Create: Match.serializedJson(
        Match.objectLike({
          parameters: Match.objectLike({ description: 'Central glossary', status: 'ENABLED' }),
        }),
      ),
    });
  });

  test('Lambda uses the provided execution role', () => {
    const stack = createStack();
    new Glossary(stack, 'Glossary', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
      Role: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
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

    test('does not create any resources', () => {
      const stack = createStack();
      Glossary.fromAttributes(stack, 'Imported', { glossaryId: 'gloss-123' });
      expect(stack.node.children.length).toBe(1); // only the imported construct, no CFN resources
    });
  });

  describe('without executionRoleArn', () => {
    const propsWithoutRole = {
      name: 'BusinessTerms',
      domainIdentifier: 'dzd-abc123',
      owningProjectIdentifier: 'proj-abc123',
    };

    test('grants datazone permissions directly instead of sts:AssumeRole', () => {
      const stack = createStack();
      new Glossary(stack, 'Glossary', propsWithoutRole);
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['datazone:CreateGlossary', 'datazone:UpdateGlossary', 'datazone:DeleteGlossary'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      });
    });

    test('does not pass assumedRoleArn to the custom resource', () => {
      const stack = createStack();
      new Glossary(stack, 'Glossary', propsWithoutRole);
      const template = Template.fromStack(stack);
      const resources = template.findResources('Custom::AWS');
      const cr = Object.values(resources)[0];
      expect(cr.Properties.Create).not.toContain('assumedRoleArn');
    });
  });
});
