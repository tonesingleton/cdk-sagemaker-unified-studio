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
    environmentIdentifier: 'env-test',
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
      EnvironmentIdentifier: 'env-test',
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
            ValidateForComputeEnvironments: ['ATHENA'],
            AthenaProperties: {
              spill_bucket: 'my-spill-bucket',
              spill_prefix: 'spill/',
            },
          },
        },
      },
    });
  });

  it('sets default configurations with PROVISIONING_MODE', () => {
    new GlueConnection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Configurations: [
        {
          Classification: 'ProvisioningConfiguration',
          Properties: { PROVISIONING_MODE: 'GLUE_CONNECTION' },
        },
      ],
    });
  });

  it('creates a minimal Glue connection without validation', () => {
    new GlueConnection(stack, 'Conn', {
      name: 'glue_conn_network',
      domainIdentifier: 'dzd-test',
      projectIdentifier: 'proj-test',
      environmentIdentifier: 'env-test',
      connectionType: GlueConnectionType.NETWORK,
      validateCredentials: false,
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::DataZone::Connection', {
      EnvironmentIdentifier: 'env-test',
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
    // No compute environment properties provided, so validateForComputeEnvironments is omitted
    template.hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            ValidateForComputeEnvironments: Match.absent(),
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

  it('throws when validateForComputeEnvironments is empty', () => {
    expect(() => {
      new GlueConnection(stack, 'Conn', {
        ...defaultProps,
        validateForComputeEnvironments: [],
      });
    }).toThrow('validateForComputeEnvironments must contain at least one compute environment when provided.');
  });

  it('throws when validateForComputeEnvironments contains an invalid value', () => {
    expect(() => {
      new GlueConnection(stack, 'Conn', {
        ...defaultProps,
        validateForComputeEnvironments: ['INVALID' as GlueComputeEnvironment],
      });
    }).toThrow(/Invalid compute environment "INVALID"/);
  });

  it('throws when environmentIdentifier is not provided', () => {
    expect(() => {
      new GlueConnection(stack, 'Conn', {
        ...defaultProps,
        environmentIdentifier: undefined as unknown as string,
      });
    }).toThrow('environmentIdentifier is required for GlueConnection');
  });
});
