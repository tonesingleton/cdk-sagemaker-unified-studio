import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SnowflakeConnection } from './snowflake-connection.construct';
import { ConnectionScope } from '../../connection.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'snowflake-warehouse',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  accountUrl: 'https://myaccount.snowflakecomputing.com',
  databaseName: 'ANALYTICS',
  roleArn: 'arn:aws:iam::123456789012:role/GlueSnowflakeRole',
};

describe('SnowflakeConnection', () => {
  test('creates a SNOWFLAKE connection with required props', () => {
    const stack = createStack();
    new SnowflakeConnection(stack, 'Snowflake', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'snowflake-warehouse',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'snowflake-warehouse',
            ConnectionType: 'SNOWFLAKE',
            ConnectionProperties: {
              ACCOUNT_URL: 'https://myaccount.snowflakecomputing.com',
              DATABASE: 'ANALYTICS',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueSnowflakeRole',
            },
          },
        },
      },
    });
  });

  test('includes WAREHOUSE when provided', () => {
    const stack = createStack();
    new SnowflakeConnection(stack, 'Snowflake', { ...validProps, warehouse: 'COMPUTE_WH' });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: {
              ACCOUNT_URL: 'https://myaccount.snowflakecomputing.com',
              DATABASE: 'ANALYTICS',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueSnowflakeRole',
              WAREHOUSE: 'COMPUTE_WH',
            },
          },
        },
      },
    });
  });

  test('includes ROLE when snowflakeRole is provided', () => {
    const stack = createStack();
    new SnowflakeConnection(stack, 'Snowflake', { ...validProps, snowflakeRole: 'ANALYST_ROLE' });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: {
              ACCOUNT_URL: 'https://myaccount.snowflakecomputing.com',
              DATABASE: 'ANALYTICS',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueSnowflakeRole',
              ROLE: 'ANALYST_ROLE',
            },
          },
        },
      },
    });
  });

  test('validates for both SPARK and ATHENA compute environments', () => {
    const stack = createStack();
    new SnowflakeConnection(stack, 'Snowflake', validProps);
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
    new SnowflakeConnection(stack, 'Snowflake', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:snowflake-creds-abc123',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:snowflake-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('includes KMS key when provided with secretArn', () => {
    const stack = createStack();
    new SnowflakeConnection(stack, 'Snowflake', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:snowflake-creds-abc123',
      kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:snowflake-creds-abc123',
              KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
            },
          },
        },
      },
    });
  });

  test('no auth configuration when secretArn is omitted', () => {
    const stack = createStack();
    new SnowflakeConnection(stack, 'Snowflake', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.AuthenticationConfiguration).toBeUndefined();
  });

  test('no PhysicalConnectionRequirements (unlike JDBC connections)', () => {
    const stack = createStack();
    new SnowflakeConnection(stack, 'Snowflake', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.PhysicalConnectionRequirements).toBeUndefined();
  });

  test('passes sparkProperties and athenaProperties', () => {
    const stack = createStack();
    new SnowflakeConnection(stack, 'Snowflake', {
      ...validProps,
      sparkProperties: { 'spark.snowflake.autopushdown': 'on' },
      athenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            SparkProperties: { 'spark.snowflake.autopushdown': 'on' },
            AthenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
          },
        },
      },
    });
  });

  test('passes through connectionScope', () => {
    const stack = createStack();
    new SnowflakeConnection(stack, 'Snowflake', {
      ...validProps,
      connectionScope: ConnectionScope.PROJECT,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Scope: 'PROJECT',
    });
  });

  describe('validation', () => {
    test('throws when kmsKeyArn provided without secretArn', () => {
      const stack = createStack();
      expect(
        () =>
          new SnowflakeConnection(stack, 'Snowflake', {
            ...validProps,
            kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
          }),
      ).toThrow(/kmsKeyArn is only valid when secretArn is provided/);
    });

    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new SnowflakeConnection(stack, 'Snowflake', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
