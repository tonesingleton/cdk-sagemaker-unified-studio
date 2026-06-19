import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { S3Connection } from './s3-connection.construct';

describe('S3Connection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  const defaultProps = {
    name: 'S3Connection',
    domainIdentifier: 'dzd-test',
    projectIdentifier: 'proj-test',
    props: {
      s3Properties: {
        s3Uri: 's3://my-bucket/prefix/',
      },
    },
  };

  it('creates an S3 connection', () => {
    new S3Connection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'proj-test',
      Name: 'S3Connection',
      Props: {
        S3Properties: {
          S3Uri: 's3://my-bucket/prefix/',
        },
      },
    });
  });

  it('sets description when provided', () => {
    new S3Connection(stack, 'Conn', { ...defaultProps, description: 'Raw data bucket' });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Raw data bucket',
    });
  });

  it('exposes the connection ID', () => {
    const conn = new S3Connection(stack, 'Conn', defaultProps);
    expect(conn.attrConnectionId).toBeDefined();
  });
});
