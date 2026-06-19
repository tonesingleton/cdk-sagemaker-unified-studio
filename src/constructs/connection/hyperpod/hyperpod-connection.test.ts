import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { HyperPodConnection } from './hyperpod-connection.construct';

describe('HyperPodConnection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  const defaultProps = {
    name: 'HyperPodConnection',
    domainIdentifier: 'dzd-test',
    projectIdentifier: 'proj-test',
    awsLocation: {
      accessRole: 'arn:aws:iam::123456789012:role/AccessRole',
      awsAccountId: '123456789012',
      awsRegion: 'eu-central-1',
    },
    props: {
      hyperPodProperties: {
        clusterName: 'my-hyperpod-cluster',
      },
    },
  };

  it('creates a HyperPod connection', () => {
    new HyperPodConnection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'proj-test',
      Name: 'HyperPodConnection',
      AwsLocation: {
        AccessRole: 'arn:aws:iam::123456789012:role/AccessRole',
        AwsAccountId: '123456789012',
        AwsRegion: 'eu-central-1',
      },
      Props: {
        HyperPodProperties: {
          ClusterName: 'my-hyperpod-cluster',
        },
      },
    });
  });

  it('sets description when provided', () => {
    new HyperPodConnection(stack, 'Conn', { ...defaultProps, description: 'ML training cluster' });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'ML training cluster',
    });
  });

  it('exposes the connection ID', () => {
    const conn = new HyperPodConnection(stack, 'Conn', defaultProps);
    expect(conn.attrConnectionId).toBeDefined();
  });
});
