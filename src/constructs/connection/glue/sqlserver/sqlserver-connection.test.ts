import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SqlServerConnection } from './sqlserver-connection.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'sqlserver-db',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  host: 'sqlserver.internal.example.com',
  databaseName: 'warehouse',
  roleArn: 'arn:aws:iam::123456789012:role/GlueSqlServerRole',
  subnetId: 'subnet-abc123',
  securityGroupIds: ['sg-111111'],
  availabilityZone: 'eu-central-1a',
};

describe('SqlServerConnection', () => {
  test('creates a Glue SQLSERVER connection with default port 1433', () => {
    const stack = createStack();
    new SqlServerConnection(stack, 'SqlServer', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'sqlserver-db',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'sqlserver-db',
            ConnectionType: 'SQLSERVER',
            ConnectionProperties: {
              HOST: 'sqlserver.internal.example.com',
              PORT: '1433',
              DATABASE: 'warehouse',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueSqlServerRole',
            },
            PhysicalConnectionRequirements: {
              SubnetId: 'subnet-abc123',
              SecurityGroupIdList: ['sg-111111'],
              AvailabilityZone: 'eu-central-1a',
            },
            ValidateForComputeEnvironments: ['SPARK', 'ATHENA'],
            SparkProperties: {},
            AthenaProperties: {},
          },
        },
      },
    });
  });

  test('allows custom port', () => {
    const stack = createStack();
    new SqlServerConnection(stack, 'SqlServer', { ...validProps, port: 1434 });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: { PORT: '1434' },
          },
        },
      },
    });
  });

  test('validates for both SPARK and ATHENA compute environments', () => {
    const stack = createStack();
    new SqlServerConnection(stack, 'SqlServer', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ValidateForComputeEnvironments: ['SPARK', 'ATHENA'],
          },
        },
      },
    });
  });

  test('configures BASIC auth when secretArn is provided', () => {
    const stack = createStack();
    new SqlServerConnection(stack, 'SqlServer', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:sqlserver-creds-abc123',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:sqlserver-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('includes KMS key when provided with secretArn', () => {
    const stack = createStack();
    new SqlServerConnection(stack, 'SqlServer', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:sqlserver-creds-abc123',
      kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:sqlserver-creds-abc123',
              KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
            },
          },
        },
      },
    });
  });

  test('no auth configuration when secretArn is omitted', () => {
    const stack = createStack();
    new SqlServerConnection(stack, 'SqlServer', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.AuthenticationConfiguration).toBeUndefined();
  });

  test('passes sparkProperties and athenaProperties', () => {
    const stack = createStack();
    new SqlServerConnection(stack, 'SqlServer', {
      ...validProps,
      sparkProperties: { 'spark.jdbc.fetchsize': '1000' },
      athenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            SparkProperties: { 'spark.jdbc.fetchsize': '1000' },
            AthenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
          },
        },
      },
    });
  });

  describe('validation', () => {
    test('throws on invalid port (0)', () => {
      const stack = createStack();
      expect(() => new SqlServerConnection(stack, 'SqlServer', { ...validProps, port: 0 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws on invalid port (65536)', () => {
      const stack = createStack();
      expect(() => new SqlServerConnection(stack, 'SqlServer', { ...validProps, port: 65536 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws on empty securityGroupIds', () => {
      const stack = createStack();
      expect(() => new SqlServerConnection(stack, 'SqlServer', { ...validProps, securityGroupIds: [] })).toThrow(
        /must contain at least one security group/,
      );
    });

    test('throws when kmsKeyArn provided without secretArn', () => {
      const stack = createStack();
      expect(
        () =>
          new SqlServerConnection(stack, 'SqlServer', {
            ...validProps,
            kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
          }),
      ).toThrow(/kmsKeyArn is only valid when secretArn is provided/);
    });

    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new SqlServerConnection(stack, 'SqlServer', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
