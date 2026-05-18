import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Connection } from './connection.construct';
import { ComputeEnvironment, ConnectionAuthenticationType, ConnectionType } from './connection.interface';

describe('Connection', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  const defaultProps = {
    name: 'datastore',
    domainId: 'dzd-test',
    environmentId: 'env-test',
    connectionType: ConnectionType.ORACLE,
    connectionProperties: {
      host: 'db.example.com',
      port: '1521',
      database: 'ORCL',
    },
    physicalConnectionRequirements: {
      subnetId: 'subnet-abc123',
      securityGroupIdList: ['sg-abc123'],
      availabilityZone: 'eu-central-1a',
    },
    authenticationConfiguration: {
      authenticationType: ConnectionAuthenticationType.BASIC,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:my-secret',
      kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/my-key',
    },
    validateForComputeEnvironments: [ComputeEnvironment.SPARK],
    athenaProperties: {
      spillBucket: 'my-spill-bucket',
      spillPrefix: 'spill/prefix',
    },
  };

  it('creates a connection with required properties', () => {
    new Connection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      DomainIdentifier: 'dzd-test',
      EnvironmentIdentifier: 'env-test',
      Name: 'datastore',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionType: 'ORACLE',
            ConnectionProperties: {
              HOST: 'db.example.com',
              PORT: '1521',
              DATABASE: 'ORCL',
            },
            PhysicalConnectionRequirements: {
              SubnetId: 'subnet-abc123',
              SecurityGroupIdList: ['sg-abc123'],
              AvailabilityZone: 'eu-central-1a',
            },
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:my-secret',
              KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/my-key',
            },
            ValidateCredentials: false,
            ValidateForComputeEnvironments: ['SPARK'],
            AthenaProperties: {
              spill_bucket: 'my-spill-bucket',
              spill_prefix: 'spill/prefix',
            },
          },
        },
      },
    });
  });

  it('sets project identifier when provided', () => {
    new Connection(stack, 'Conn', {
      ...defaultProps,
      projectId: 'proj-test',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      ProjectIdentifier: 'proj-test',
    });
  });

  it('omits project identifier when not provided', () => {
    new Connection(stack, 'Conn', defaultProps);

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      ProjectIdentifier: Match.absent(),
    });
  });

  it('sets description when provided', () => {
    new Connection(stack, 'Conn', {
      ...defaultProps,
      description: 'Oracle RDS connection',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Oracle RDS connection',
    });
  });

  it('enables credential validation when specified', () => {
    new Connection(stack, 'Conn', {
      ...defaultProps,
      validateCredentials: true,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            ValidateCredentials: true,
          }),
        },
      },
    });
  });

  it('supports subnetIdList in physical connection requirements', () => {
    new Connection(stack, 'Conn', {
      ...defaultProps,
      physicalConnectionRequirements: {
        subnetIdList: ['subnet-abc123', 'subnet-def456'],
        securityGroupIdList: ['sg-abc123'],
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            PhysicalConnectionRequirements: {
              SubnetIdList: ['subnet-abc123', 'subnet-def456'],
              SecurityGroupIdList: ['sg-abc123'],
            },
          }),
        },
      },
    });
  });

  it('supports spark and python properties', () => {
    new Connection(stack, 'Conn', {
      ...defaultProps,
      sparkProperties: { key: 'value' },
      pythonProperties: { pyKey: 'pyValue' },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            SparkProperties: { key: 'value' },
            PythonProperties: { pyKey: 'pyValue' },
          }),
        },
      },
    });
  });

  it('maps jdbcConnectionUrl to JDBC_CONNECTION_URL', () => {
    new Connection(stack, 'Conn', {
      ...defaultProps,
      connectionProperties: {
        jdbcConnectionUrl: 'jdbc:oracle:thin:@//db.example.com:1521/ORCL',
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            ConnectionProperties: {
              JDBC_CONNECTION_URL: 'jdbc:oracle:thin:@//db.example.com:1521/ORCL',
            },
          }),
        },
      },
    });
  });

  it('omits connectionProperties when not provided', () => {
    new Connection(stack, 'Conn', {
      name: 'minimal',
      domainId: 'dzd-test',
      environmentId: 'env-test',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            ValidateCredentials: false,
          }),
        },
      },
    });
  });

  it('omits connectionProperties when empty object is provided', () => {
    new Connection(stack, 'Conn', {
      name: 'empty-props',
      domainId: 'dzd-test',
      environmentId: 'env-test',
      connectionProperties: {},
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            ValidateCredentials: false,
          }),
        },
      },
    });
  });

  it('omits authenticationConfiguration when not provided', () => {
    new Connection(stack, 'Conn', {
      name: 'no-auth',
      domainId: 'dzd-test',
      environmentId: 'env-test',
      connectionType: ConnectionType.NETWORK,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            ConnectionType: 'NETWORK',
          }),
        },
      },
    });
  });

  it('maps all connectionProperties fields', () => {
    new Connection(stack, 'Conn', {
      ...defaultProps,
      connectionProperties: {
        host: 'db.example.com',
        port: '1521',
        database: 'ORCL',
        jdbcConnectionUrl: 'jdbc:oracle:thin:@//db.example.com:1521/ORCL',
        jdbcEngine: 'oracle',
        jdbcEnforceSsl: 'true',
        secretId: 'my-secret-id',
        connectorUrl: 'https://connector.example.com',
        connectorClassName: 'com.example.Connector',
        connectorType: 'JDBC',
        connectionUrl: 'mongodb://host:27017',
        kafkaBootstrapServers: 'broker1:9092,broker2:9092',
        kafkaSslEnabled: 'true',
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            ConnectionProperties: {
              HOST: 'db.example.com',
              PORT: '1521',
              DATABASE: 'ORCL',
              JDBC_CONNECTION_URL: 'jdbc:oracle:thin:@//db.example.com:1521/ORCL',
              JDBC_ENGINE: 'oracle',
              JDBC_ENFORCE_SSL: 'true',
              SECRET_ID: 'my-secret-id',
              CONNECTOR_URL: 'https://connector.example.com',
              CONNECTOR_CLASS_NAME: 'com.example.Connector',
              CONNECTOR_TYPE: 'JDBC',
              CONNECTION_URL: 'mongodb://host:27017',
              KAFKA_BOOTSTRAP_SERVERS: 'broker1:9092,broker2:9092',
              KAFKA_SSL_ENABLED: 'true',
            },
          }),
        },
      },
    });
  });

  it('maps athenaProperties instanceType', () => {
    new Connection(stack, 'Conn', {
      ...defaultProps,
      athenaProperties: {
        spillBucket: 'bucket',
        spillPrefix: 'prefix',
        instanceType: 'ml.m5.large',
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            AthenaProperties: {
              spill_bucket: 'bucket',
              spill_prefix: 'prefix',
              instance_type: 'ml.m5.large',
            },
          }),
        },
      },
    });
  });

  it('supports customAuthenticationCredentials', () => {
    new Connection(stack, 'Conn', {
      ...defaultProps,
      authenticationConfiguration: {
        authenticationType: ConnectionAuthenticationType.CUSTOM,
        customAuthenticationCredentials: { token: 'abc123' },
      },
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: Match.objectLike({
            AuthenticationConfiguration: {
              AuthenticationType: 'CUSTOM',
              CustomAuthenticationCredentials: { token: 'abc123' },
            },
          }),
        },
      },
    });
  });

  it('exposes the connection ID', () => {
    const conn = new Connection(stack, 'Conn', defaultProps);

    expect(conn.connectionId).toBeDefined();
  });
});
