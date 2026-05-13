import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { GitConnection } from './git-connection.construct';
import type { GitConnectionProps } from './git-connection.interface';
import { GitProviderType } from './git-connection.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

function createGitConnection(stack: Stack, overrides?: Partial<GitConnectionProps>): GitConnection {
  return new GitConnection(stack, 'GitConnection', {
    name: 'my-github',
    providerType: GitProviderType.GITHUB,
    ...overrides,
  });
}

describe('GitConnection with new CodeConnection', () => {
  test('creates a CodeConnections connection', () => {
    const stack = createStack();
    createGitConnection(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::CodeConnections::Connection', {
      ConnectionName: 'my-github',
      ProviderType: 'GitHub',
    });
  });

  test('omits providerType when host ARN is provided', () => {
    const stack = createStack();
    createGitConnection(stack, {
      providerType: GitProviderType.GITHUB_ENTERPRISE_SERVER,
      hostArn: 'arn:aws:codeconnections:eu-central-1:123456789012:host/my-host',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::CodeConnections::Connection', {
      HostArn: 'arn:aws:codeconnections:eu-central-1:123456789012:host/my-host',
    });
    Template.fromStack(stack).hasResourceProperties(
      'AWS::CodeConnections::Connection',
      Match.not(Match.objectLike({ ProviderType: Match.anyValue() })),
    );
  });

  test('exposes codeConnectionArn', () => {
    const stack = createStack();
    const conn = createGitConnection(stack);
    expect(conn.codeConnectionArn).toBeDefined();
  });
});

describe('GitConnection with existing CodeConnection', () => {
  test('does not create a CodeConnections resource', () => {
    const stack = createStack();
    createGitConnection(stack, {
      providerType: undefined,
      codeConnectionArn: 'arn:aws:codeconnections:eu-central-1:123456789012:connection/existing-id',
    });
    Template.fromStack(stack).resourceCountIs('AWS::CodeConnections::Connection', 0);
  });

  test('exposes the provided codeConnectionArn', () => {
    const stack = createStack();
    const conn = createGitConnection(stack, {
      providerType: undefined,
      codeConnectionArn: 'arn:aws:codeconnections:eu-central-1:123456789012:connection/existing-id',
    });
    expect(conn.codeConnectionArn).toBe('arn:aws:codeconnections:eu-central-1:123456789012:connection/existing-id');
  });
});

describe('GitConnection validation', () => {
  test('throws when neither codeConnectionArn nor providerType is provided', () => {
    const stack = createStack();
    expect(() => new GitConnection(stack, 'Bad', { name: 'bad' })).toThrow(
      /Either 'codeConnectionArn' or 'providerType' must be provided/,
    );
  });
});
