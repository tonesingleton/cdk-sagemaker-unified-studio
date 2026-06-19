import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SparkGlueConnection } from './spark-glue-connection.construct';

describe('SparkGlueConnection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  const defaultProps = {
    name: 'SparkGlueConnection',
    domainIdentifier: 'dzd-test',
    projectIdentifier: 'proj-test',
    props: {
      sparkGlueProperties: {
        workerType: 'G.1X',
        glueVersion: '4.0',
        idleTimeout: 60,
        numberOfWorkers: 10,
      },
    },
  };

  it('creates a Spark Glue connection with all properties', () => {
    new SparkGlueConnection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'proj-test',
      Name: 'SparkGlueConnection',
      Props: {
        SparkGlueProperties: {
          WorkerType: 'G.1X',
          GlueVersion: '4.0',
          IdleTimeout: 60,
          NumberOfWorkers: 10,
        },
      },
    });
  });

  it('sets description when provided', () => {
    new SparkGlueConnection(stack, 'Conn', { ...defaultProps, description: 'Glue Spark sessions' });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Glue Spark sessions',
    });
  });

  it('exposes the connection ID', () => {
    const conn = new SparkGlueConnection(stack, 'Conn', defaultProps);
    expect(conn.attrConnectionId).toBeDefined();
  });
});
