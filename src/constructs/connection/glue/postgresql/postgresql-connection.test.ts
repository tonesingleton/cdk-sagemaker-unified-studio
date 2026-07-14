import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PostgreSqlConnection } from './postgresql-connection.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'postgresql-db',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  host: 'postgres.internal.example.com',
  databaseName: 'analytics',
  roleArn: 'arn:aws:iam::123456789012:role/GluePostgreSqlRole',
  subnetId: 'subnet-abc123',
  securityGroupIds: ['sg-111111'],
  availabilityZone: 'eu-central-1a',
};

describe('PostgreSqlConnection', () => {
  test('creates a Glue POSTGRESQL connection with default port 5432', () => {
    const stack = createStack();
    new PostgreSqlConnection(stack, 'PostgreSql', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'postgresql-db',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'postgresql-db',
            ConnectionType: 'POSTGRESQL',
            ConnectionProperties: {
              HOST: 'postgres.internal.example.com',
              PORT: '5432',
              DATABASE: 'analytics',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GluePostgreSqlRole',
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
    new PostgreSqlConnection(stack, 'PostgreSql', { ...validProps, port: 5433 });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: { PORT: '5433' },
          },
        },
      },
    });
  });

  test('validates for both SPARK and ATHENA compute environments', () => {
    const stack = createStack();
    new PostgreSqlConnection(stack, 'PostgreSql', validProps);
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
    new PostgreSqlConnection(stack, 'PostgreSql', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:pg-creds-abc123',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:pg-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('includes KMS key when provided with secretArn', () => {
    const stack = createStack();
    new PostgreSqlConnection(stack, 'PostgreSql', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:pg-creds-abc123',
      kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:pg-creds-abc123',
              KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
            },
          },
        },
      },
    });
  });

  test('no auth configuration when secretArn is omitted', () => {
    const stack = createStack();
    new PostgreSqlConnection(stack, 'PostgreSql', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.AuthenticationConfiguration).toBeUndefined();
  });

  test('passes sparkProperties and athenaProperties', () => {
    const stack = createStack();
    new PostgreSqlConnection(stack, 'PostgreSql', {
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
      expect(() => new PostgreSqlConnection(stack, 'PostgreSql', { ...validProps, port: 0 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws on invalid port (65536)', () => {
      const stack = createStack();
      expect(() => new PostgreSqlConnection(stack, 'PostgreSql', { ...validProps, port: 65536 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws on empty securityGroupIds', () => {
      const stack = createStack();
      expect(() => new PostgreSqlConnection(stack, 'PostgreSql', { ...validProps, securityGroupIds: [] })).toThrow(
        /must contain at least one security group/,
      );
    });

    test('throws when kmsKeyArn provided without secretArn', () => {
      const stack = createStack();
      expect(
        () =>
          new PostgreSqlConnection(stack, 'PostgreSql', {
            ...validProps,
            kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
          }),
      ).toThrow(/kmsKeyArn is only valid when secretArn is provided/);
    });

    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new PostgreSqlConnection(stack, 'PostgreSql', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
