import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { RedshiftConnection } from './redshift-connection.construct';

describe('RedshiftConnection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  const defaultProps = {
    name: 'RedshiftConnection',
    domainIdentifier: 'dzd-test',
    projectIdentifier: 'proj-test',
    credentials: {
      usernamePassword: {
        username: 'admin',
        password: 'secret123',
      },
    },
    databaseName: 'analytics',
    host: 'cluster.abc123.eu-central-1.redshift.amazonaws.com',
    storage: { clusterName: 'my-cluster' },
  };

  it('creates a Redshift connection with username/password credentials', () => {
    new RedshiftConnection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'proj-test',
      Name: 'RedshiftConnection',
      Props: {
        RedshiftProperties: {
          Credentials: {
            UsernamePassword: {
              Username: 'admin',
              Password: 'secret123',
            },
          },
          DatabaseName: 'analytics',
          Host: 'cluster.abc123.eu-central-1.redshift.amazonaws.com',
          Port: 5439,
          Storage: {
            ClusterName: 'my-cluster',
          },
        },
      },
    });
  });

  it('creates a Redshift connection with secretArn credentials', () => {
    new RedshiftConnection(stack, 'Conn', {
      ...defaultProps,
      credentials: { secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:my-secret' },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        RedshiftProperties: {
          Credentials: {
            SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:my-secret',
          },
        },
      },
    });
  });

  it('sets description when provided', () => {
    new RedshiftConnection(stack, 'Conn', { ...defaultProps, description: 'My Redshift' });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'My Redshift',
    });
  });

  it('exposes the connection ID', () => {
    const conn = new RedshiftConnection(stack, 'Conn', defaultProps);
    expect(conn.attrConnectionId).toBeDefined();
  });
});
