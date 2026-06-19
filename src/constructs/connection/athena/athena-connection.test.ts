import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AthenaConnection } from './athena-connection.construct';

describe('AthenaConnection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  const defaultProps = {
    name: 'AthenaConnection',
    domainIdentifier: 'dzd-test',
    projectIdentifier: 'proj-test',
    workgroupName: 'my-workgroup',
  };

  it('creates an Athena connection', () => {
    new AthenaConnection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'proj-test',
      Name: 'AthenaConnection',
      Props: {
        AthenaProperties: {
          WorkgroupName: 'my-workgroup',
        },
      },
    });
  });

  it('sets description when provided', () => {
    new AthenaConnection(stack, 'Conn', { ...defaultProps, description: 'My Athena' });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'My Athena',
    });
  });

  it('exposes the connection ID', () => {
    const conn = new AthenaConnection(stack, 'Conn', defaultProps);
    expect(conn.attrConnectionId).toBeDefined();
  });
});
