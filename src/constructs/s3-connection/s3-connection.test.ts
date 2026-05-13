import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { S3Connection } from './s3-connection.construct';

describe('S3Connection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  it('creates an S3 connection', () => {
    new S3Connection(stack, 'Conn', {
      name: 'raw-data',
      domainId: 'dzd-test',
      environmentId: 'env-test',
      s3Uri: 's3://my-bucket/prefix/',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      EnvironmentIdentifier: 'env-test',
      Name: 'raw-data',
      Props: {
        S3Properties: {
          S3Uri: 's3://my-bucket/prefix/',
        },
      },
    });
  });

  it('sets project identifier when provided', () => {
    new S3Connection(stack, 'Conn', {
      name: 'raw-data',
      domainId: 'dzd-test',
      environmentId: 'env-test',
      projectId: 'proj-test',
      s3Uri: 's3://my-bucket/',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      ProjectIdentifier: 'proj-test',
    });
  });

  it('omits project identifier when not provided', () => {
    new S3Connection(stack, 'Conn', {
      name: 'raw-data',
      domainId: 'dzd-test',
      environmentId: 'env-test',
      s3Uri: 's3://my-bucket/',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      ProjectIdentifier: Match.absent(),
    });
  });

  it('sets description when provided', () => {
    new S3Connection(stack, 'Conn', {
      name: 'raw-data',
      domainId: 'dzd-test',
      environmentId: 'env-test',
      s3Uri: 's3://my-bucket/',
      description: 'Raw Guidewire data',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Raw Guidewire data',
    });
  });

  it('exposes the connection ID', () => {
    const conn = new S3Connection(stack, 'Conn', {
      name: 'raw-data',
      domainId: 'dzd-test',
      environmentId: 'env-test',
      s3Uri: 's3://my-bucket/',
    });

    expect(conn.connectionId).toBeDefined();
  });
});
