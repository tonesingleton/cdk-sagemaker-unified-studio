import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { GitProviderType } from './git-connection.interface';
import { Host } from './host.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('Host', () => {
  test('creates a custom resource for the host', () => {
    const stack = createStack();
    new Host(stack, 'Host', {
      name: 'my-ghes',
      providerEndpoint: 'https://github.example.com',
      providerType: GitProviderType.GITHUB_ENTERPRISE_SERVER,
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(
        Match.objectLike({
          action: 'CreateHost',
          parameters: {
            Name: 'my-ghes',
            ProviderEndpoint: 'https://github.example.com',
            ProviderType: 'GitHubEnterpriseServer',
          },
        }),
      ),
      Delete: Match.serializedJson(Match.objectLike({ action: 'DeleteHost' })),
    });
  });

  test('grants codeconnections permissions', () => {
    const stack = createStack();
    new Host(stack, 'Host', {
      name: 'my-ghes',
      providerEndpoint: 'https://github.example.com',
      providerType: GitProviderType.GITHUB_ENTERPRISE_SERVER,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: ['codeconnections:CreateHost', 'codeconnections:TagResource'],
          }),
          Match.objectLike({
            Action: 'codeconnections:DeleteHost',
          }),
        ]),
      }),
    });
  });

  test('exposes hostArn', () => {
    const stack = createStack();
    const host = new Host(stack, 'Host', {
      name: 'my-ghes',
      providerEndpoint: 'https://github.example.com',
      providerType: GitProviderType.GITHUB_ENTERPRISE_SERVER,
    });
    expect(host.hostArn).toBeDefined();
  });

  test('passes tags to CreateHost', () => {
    const stack = createStack();
    new Host(stack, 'Host', {
      name: 'my-ghes',
      providerEndpoint: 'https://github.example.com',
      providerType: GitProviderType.GITHUB_ENTERPRISE_SERVER,
      tags: { Team: 'data' },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(
        Match.objectLike({
          parameters: Match.objectLike({
            Tags: [{ Key: 'Team', Value: 'data' }],
          }),
        }),
      ),
    });
  });
});
