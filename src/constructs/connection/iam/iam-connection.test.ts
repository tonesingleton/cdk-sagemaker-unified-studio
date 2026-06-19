import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IamConnection } from './iam-connection.construct';

describe('IamConnection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  const defaultProps = {
    name: 'IAMConnection',
    domainIdentifier: 'dzd-test',
    projectIdentifier: 'proj-test',
    awsLocation: {
      accessRole: 'arn:aws:iam::123456789012:role/AccessRole',
    },
  };

  it('creates an IAM connection with lineage sync disabled by default', () => {
    new IamConnection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'proj-test',
      Name: 'IAMConnection',
      AwsLocation: {
        AccessRole: 'arn:aws:iam::123456789012:role/AccessRole',
      },
      Props: {
        IamProperties: {
          GlueLineageSyncEnabled: false,
        },
      },
    });
  });

  it('enables Glue lineage sync when specified', () => {
    new IamConnection(stack, 'Conn', { ...defaultProps, glueLineageSyncEnabled: true });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        IamProperties: {
          GlueLineageSyncEnabled: true,
        },
      },
    });
  });

  it('sets description when provided', () => {
    new IamConnection(stack, 'Conn', { ...defaultProps, description: 'Cross-account access' });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Cross-account access',
    });
  });

  it('exposes the connection ID', () => {
    const conn = new IamConnection(stack, 'Conn', defaultProps);
    expect(conn.attrConnectionId).toBeDefined();
  });
});
