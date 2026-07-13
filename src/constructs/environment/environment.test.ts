import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Environment } from './environment.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('Environment', () => {
  test('creates environment', () => {
    const stack = createStack();
    new Environment(stack, 'Env', {
      name: 'TestEnv',
      description: 'A test environment.',
      domainId: 'dzd-test',
      projectId: 'dzp-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Environment', {
      Name: 'TestEnv',
      Description: 'A test environment.',
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'dzp-test',
    });
  });

  test('creates with glossary terms', () => {
    const stack = createStack();
    new Environment(stack, 'Env', {
      name: 'TestEnv',
      domainId: 'dzd-test',
      projectId: 'dzp-test',
      glossaryTerms: ['my-term', 'my_term'],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Environment', {
      GlossaryTerms: ['my-term', 'my_term'],
    });
  });

  test('omits glossary terms when empty', () => {
    const stack = createStack();
    new Environment(stack, 'Env', {
      name: 'TestEnv',
      domainId: 'dzd-test',
      projectId: 'dzp-test',
      glossaryTerms: [],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Environment', {
      GlossaryTerms: Match.absent(),
    });
  });

  test('omits glossary terms when not provided', () => {
    const stack = createStack();
    new Environment(stack, 'Env', {
      name: 'TestEnv',
      domainId: 'dzd-test',
      projectId: 'dzp-test',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Environment', {
      GlossaryTerms: Match.absent(),
    });
  });

  test('throws on invalid glossary term with spaces', () => {
    const stack = createStack();
    expect(
      () =>
        new Environment(stack, 'Env', {
          name: 'TestEnv',
          domainId: 'dzd-test',
          projectId: 'dzp-test',
          glossaryTerms: ['Data Mesh'],
        }),
    ).toThrow(/Invalid glossary term/);
  });

  test('throws on empty glossary term', () => {
    const stack = createStack();
    expect(
      () =>
        new Environment(stack, 'Env', {
          name: 'TestEnv',
          domainId: 'dzd-test',
          projectId: 'dzp-test',
          glossaryTerms: [''],
        }),
    ).toThrow(/Invalid glossary term/);
  });

  test('throws on glossary term exceeding 36 characters', () => {
    const stack = createStack();
    expect(
      () =>
        new Environment(stack, 'Env', {
          name: 'TestEnv',
          domainId: 'dzd-test',
          projectId: 'dzp-test',
          glossaryTerms: ['a'.repeat(37)],
        }),
    ).toThrow(/Invalid glossary term/);
  });

  test('throws on glossary term with special characters', () => {
    const stack = createStack();
    expect(
      () =>
        new Environment(stack, 'Env', {
          name: 'TestEnv',
          domainId: 'dzd-test',
          projectId: 'dzp-test',
          glossaryTerms: ['term@invalid'],
        }),
    ).toThrow(/Invalid glossary term/);
  });

  test('creates with userParameters', () => {
    const stack = createStack();
    new Environment(stack, 'Env', {
      name: 'TestEnv',
      domainId: 'dzd-test',
      projectId: 'dzp-test',
      userParameters: [{ name: 'glueDbName', value: 'mydb' }],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Environment', {
      UserParameters: [{ Name: 'glueDbName', Value: 'mydb' }],
    });
  });

  test('exposes environmentId', () => {
    const stack = createStack();
    const env = new Environment(stack, 'Env', {
      name: 'TestEnv',
      domainId: 'dzd-test',
      projectId: 'dzp-test',
    });
    expect(env.environmentId).toBeDefined();
  });
});

describe('Environment.fromAttributes', () => {
  test('imports environment with environmentId', () => {
    const stack = createStack();
    const imported = Environment.fromAttributes(stack, 'Imported', {
      environmentId: 'env-abc123',
    });
    expect(imported.environmentId).toBe('env-abc123');
  });

  test('does not create any CloudFormation resources', () => {
    const stack = createStack();
    Environment.fromAttributes(stack, 'Imported', {
      environmentId: 'env-abc123',
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::Environment', 0);
  });
});
