import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SparkEmrConnection } from './spark-emr-connection.construct';

describe('SparkEmrConnection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  const defaultProps = {
    name: 'SparkEmrConnection',
    domainIdentifier: 'dzd-test',
    projectIdentifier: 'proj-test',
    props: {
      sparkEmrProperties: {
        computeArn: 'arn:aws:emr-serverless:eu-central-1:123456789012:/applications/app-id',
      },
    },
  };

  it('creates a Spark EMR connection', () => {
    new SparkEmrConnection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'proj-test',
      Name: 'SparkEmrConnection',
      Props: {
        SparkEmrProperties: {
          ComputeArn: 'arn:aws:emr-serverless:eu-central-1:123456789012:/applications/app-id',
        },
      },
    });
  });

  it('sets description when provided', () => {
    new SparkEmrConnection(stack, 'Conn', { ...defaultProps, description: 'EMR Serverless' });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'EMR Serverless',
    });
  });

  it('exposes the connection ID', () => {
    const conn = new SparkEmrConnection(stack, 'Conn', defaultProps);
    expect(conn.attrConnectionId).toBeDefined();
  });
});
