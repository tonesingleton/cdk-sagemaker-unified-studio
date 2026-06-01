import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { GitProviderType } from './git-connection.interface';
import { Host } from './host.construct';
import type { HostProps } from './host.interface';

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

function createHostWithVpc(stack: Stack, overrides?: Partial<HostProps>): Host {
  return new Host(stack, 'Host', {
    name: 'my-ghes',
    providerEndpoint: 'https://github.example.com',
    providerType: GitProviderType.GITHUB_ENTERPRISE_SERVER,
    vpcConfiguration: {
      vpcId: 'vpc-0123456789abcdef0',
      subnetIds: ['subnet-aaa', 'subnet-bbb'],
      securityGroupIds: ['sg-111'],
    },
    ...overrides,
  });
}

describe('Host with VPC configuration', () => {
  test('passes VpcConfiguration to CreateHost', () => {
    const stack = createStack();
    createHostWithVpc(stack);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(
        Match.objectLike({
          parameters: Match.objectLike({
            VpcConfiguration: {
              VpcId: 'vpc-0123456789abcdef0',
              SubnetIds: ['subnet-aaa', 'subnet-bbb'],
              SecurityGroupIds: ['sg-111'],
            },
          }),
        }),
      ),
    });
  });

  test('includes TlsCertificate when provided', () => {
    const stack = createStack();
    createHostWithVpc(stack, {
      vpcConfiguration: {
        vpcId: 'vpc-0123456789abcdef0',
        subnetIds: ['subnet-aaa'],
        securityGroupIds: ['sg-111'],
        tlsCertificate: '-----BEGIN CERTIFICATE-----\nMIIB...\n-----END CERTIFICATE-----',
      },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(
        Match.objectLike({
          parameters: Match.objectLike({
            VpcConfiguration: Match.objectLike({
              TlsCertificate: '-----BEGIN CERTIFICATE-----\nMIIB...\n-----END CERTIFICATE-----',
            }),
          }),
        }),
      ),
    });
  });

  test('grants EC2 network interface permissions', () => {
    const stack = createStack();
    createHostWithVpc(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: [
              'ec2:CreateNetworkInterface',
              'ec2:CreateTags',
              'ec2:DescribeNetworkInterfaces',
              'ec2:DeleteNetworkInterface',
            ],
          }),
        ]),
      }),
    });
  });

  test('does not grant EC2 permissions without VPC configuration', () => {
    const stack = createStack();
    new Host(stack, 'Host', {
      name: 'my-ghes',
      providerEndpoint: 'https://github.example.com',
      providerType: GitProviderType.GITHUB_ENTERPRISE_SERVER,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: Match.objectLike({
        Statement: Match.not(
          Match.arrayWith([
            Match.objectLike({
              Action: Match.arrayWith(['ec2:CreateNetworkInterface']),
            }),
          ]),
        ),
      }),
    });
  });
});
