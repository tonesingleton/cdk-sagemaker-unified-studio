import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AzureSqlConnection } from './azuresql-connection.construct';
import { AzureSqlAuthenticationType } from './azuresql-connection.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'azuresql-analytics',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  host: 'myserver.database.windows.net',
  databaseName: 'analytics',
  roleArn: 'arn:aws:iam::123456789012:role/GlueAzureSqlRole',
  secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:azure-creds-abc123',
};

describe('AzureSqlConnection', () => {
  test('creates an AZURESQL connection with default port 1433 and BASIC auth', () => {
    const stack = createStack();
    new AzureSqlConnection(stack, 'AzureSql', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'azuresql-analytics',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'azuresql-analytics',
            ConnectionType: 'AZURESQL',
            ConnectionProperties: {
              HOST: 'myserver.database.windows.net',
              PORT: '1433',
              DATABASE: 'analytics',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueAzureSqlRole',
            },
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:azure-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('allows custom port', () => {
    const stack = createStack();
    new AzureSqlConnection(stack, 'AzureSql', { ...validProps, port: 1434 });
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

  test('supports OAuth2 authentication type', () => {
    const stack = createStack();
    new AzureSqlConnection(stack, 'AzureSql', {
      ...validProps,
      authenticationType: AzureSqlAuthenticationType.OAUTH2,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'OAUTH2',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:azure-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('includes KMS key when provided', () => {
    const stack = createStack();
    new AzureSqlConnection(stack, 'AzureSql', {
      ...validProps,
      kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:azure-creds-abc123',
              KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
            },
          },
        },
      },
    });
  });

  test('validates for both SPARK and ATHENA compute environments', () => {
    const stack = createStack();
    new AzureSqlConnection(stack, 'AzureSql', validProps);
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

  test('no PhysicalConnectionRequirements', () => {
    const stack = createStack();
    new AzureSqlConnection(stack, 'AzureSql', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.PhysicalConnectionRequirements).toBeUndefined();
  });

  test('passes sparkProperties and athenaProperties', () => {
    const stack = createStack();
    new AzureSqlConnection(stack, 'AzureSql', {
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
      expect(() => new AzureSqlConnection(stack, 'AzureSql', { ...validProps, port: 0 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws on invalid port (65536)', () => {
      const stack = createStack();
      expect(() => new AzureSqlConnection(stack, 'AzureSql', { ...validProps, port: 65536 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new AzureSqlConnection(stack, 'AzureSql', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
