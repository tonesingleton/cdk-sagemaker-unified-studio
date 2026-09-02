import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { TeradataConnection } from './teradata-connection.construct';
import { ConnectionScope } from '../../connection.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'teradata-dw',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  host: 'teradata.internal.example.com',
  databaseName: 'analytics_db',
  secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:teradata-creds-abc123',
};

describe('TeradataConnection', () => {
  test('creates a Glue TERADATA connection with required props', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'teradata-dw',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'teradata-dw',
            ConnectionType: 'TERADATA',
            ConnectionProperties: {
              HOST: 'teradata.internal.example.com',
              PORT: '1025',
              DATABASE: 'analytics_db',
            },
            ValidateForComputeEnvironments: ['SPARK'],
            SparkProperties: {},
          },
        },
      },
    });
  });

  test('uses default port 1025', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: { PORT: '1025' },
          },
        },
      },
    });
  });

  test('allows custom port', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', { ...validProps, port: 1026 });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: { PORT: '1026' },
          },
        },
      },
    });
  });

  test('configures BASIC auth with secretArn', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:teradata-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('includes KMS key when provided', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', {
      ...validProps,
      kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
            },
          },
        },
      },
    });
  });

  test('includes ROLE_ARN in connection properties when provided', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', {
      ...validProps,
      roleArn: 'arn:aws:iam::123456789012:role/GlueTeradataRole',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: {
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueTeradataRole',
            },
          },
        },
      },
    });
  });

  test('includes JDBC_PARAMS when provided', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', {
      ...validProps,
      jdbcParams: 'CHARSET=UTF8,TMODE=ANSI',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: {
              JDBC_PARAMS: 'CHARSET=UTF8,TMODE=ANSI',
            },
          },
        },
      },
    });
  });

  test('no ROLE_ARN or JDBC_PARAMS when omitted', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    const props = resource.Properties.Props.GlueProperties.GlueConnectionInput.ConnectionProperties;
    expect(props.ROLE_ARN).toBeUndefined();
    expect(props.JDBC_PARAMS).toBeUndefined();
  });

  test('configures VPC when subnetId and securityGroupIds are provided', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', {
      ...validProps,
      subnetId: 'subnet-abc123',
      securityGroupIds: ['sg-111111'],
      availabilityZone: 'eu-central-1a',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            PhysicalConnectionRequirements: {
              SubnetId: 'subnet-abc123',
              SecurityGroupIdList: ['sg-111111'],
              AvailabilityZone: 'eu-central-1a',
            },
          },
        },
      },
    });
  });

  test('no PhysicalConnectionRequirements when subnetId is omitted', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.PhysicalConnectionRequirements).toBeUndefined();
  });

  test('passes through description and connectionScope', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', {
      ...validProps,
      description: 'Teradata Vantage data warehouse',
      connectionScope: ConnectionScope.PROJECT,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Teradata Vantage data warehouse',
      Scope: 'PROJECT',
    });
  });

  test('passes custom sparkProperties', () => {
    const stack = createStack();
    new TeradataConnection(stack, 'Teradata', {
      ...validProps,
      sparkProperties: { 'spark.jdbc.fetchsize': '1000' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            SparkProperties: { 'spark.jdbc.fetchsize': '1000' },
          },
        },
      },
    });
  });

  describe('validation', () => {
    test('throws on invalid port (0)', () => {
      const stack = createStack();
      expect(() => new TeradataConnection(stack, 'Teradata', { ...validProps, port: 0 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws on invalid port (65536)', () => {
      const stack = createStack();
      expect(() => new TeradataConnection(stack, 'Teradata', { ...validProps, port: 65536 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws when subnetId provided without securityGroupIds', () => {
      const stack = createStack();
      expect(
        () =>
          new TeradataConnection(stack, 'Teradata', {
            ...validProps,
            subnetId: 'subnet-abc123',
          }),
      ).toThrow(/securityGroupIds must be provided when subnetId is specified/);
    });

    test('throws when subnetId provided with empty securityGroupIds', () => {
      const stack = createStack();
      expect(
        () =>
          new TeradataConnection(stack, 'Teradata', {
            ...validProps,
            subnetId: 'subnet-abc123',
            securityGroupIds: [],
          }),
      ).toThrow(/securityGroupIds must be provided when subnetId is specified/);
    });

    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new TeradataConnection(stack, 'Teradata', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
