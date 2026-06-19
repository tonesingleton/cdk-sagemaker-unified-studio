import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { GlueConnection } from './glue-connection.construct';
import { GlueAuthenticationType, GlueComputeEnvironment, GlueConnectionType } from './glue-connection.interface';

describe('GlueConnection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  const defaultProps = {
    name: 'glue_conn_snowflake',
    domainIdentifier: 'dzd-test',
    projectIdentifier: 'proj-test',
    connectionType: GlueConnectionType.SNOWFLAKE,
    connectionProperties: {
      DATABASE: 'my_db',
      HOST: 'account.snowflakecomputing.com',
      PORT: '443',
      ROLE_ARN: 'arn:aws:iam::123456789012:role/MyRole',
      WAREHOUSE: 'my_warehouse',
    },
    physicalConnectionRequirements: {
      subnetId: 'subnet-abc123',
      securityGroupIdList: ['sg-abc123', 'sg-def456'],
      availabilityZone: 'eu-central-1a',
    },
    authenticationConfiguration: {
      authenticationType: GlueAuthenticationType.BASIC,
      basicAuthenticationCredentials: {
        userName: 'snowflake_user',
        password: 'snowflake_pwd',
      },
    },
    validateCredentials: true,
    validateForComputeEnvironments: [GlueComputeEnvironment.SPARK, GlueComputeEnvironment.ATHENA],
    athenaProperties: {
      spill_bucket: 'my-spill-bucket',
      spill_prefix: 'spill/',
    },
  };

  it('creates a Glue connection with all properties', () => {
    new GlueConnection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      ProjectIdentifier: 'proj-test',
      Name: 'glue_conn_snowflake',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'glue_conn_snowflake',
            ConnectionType: 'SNOWFLAKE',
            ConnectionProperties: {
              DATABASE: 'my_db',
              HOST: 'account.snowflakecomputing.com',
              PORT: '443',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/MyRole',
              WAREHOUSE: 'my_warehouse',
            },
            PhysicalConnectionRequirements: {
              SubnetId: 'subnet-abc123',
              SecurityGroupIdList: ['sg-abc123', 'sg-def456'],
              AvailabilityZone: 'eu-central-1a',
            },
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              BasicAuthenticationCredentials: {
                UserName: 'snowflake_user',
                Password: 'snowflake_pwd',
              },
            },
            ValidateCredentials: true,
            ValidateForComputeEnvironments: ['SPARK', 'ATHENA'],
            AthenaProperties: {
              spill_bucket: 'my-spill-bucket',
              spill_prefix: 'spill/',
            },
          },
        },
      },
    });
  });

  it('creates a minimal Glue connection', () => {
    new GlueConnection(stack, 'Conn', {
      name: 'glue_conn_network',
      domainIdentifier: 'dzd-test',
      projectIdentifier: 'proj-test',
      connectionType: GlueConnectionType.NETWORK,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            Name: 'glue_conn_network',
            ConnectionType: 'NETWORK',
            ValidateCredentials: false,
          }),
        },
      },
    });
  });

  it('sets description when provided', () => {
    new GlueConnection(stack, 'Conn', { ...defaultProps, description: 'Snowflake connection' });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Snowflake connection',
    });
  });

  it('exposes the connection ID', () => {
    const conn = new GlueConnection(stack, 'Conn', defaultProps);
    expect(conn.attrConnectionId).toBeDefined();
  });
});
