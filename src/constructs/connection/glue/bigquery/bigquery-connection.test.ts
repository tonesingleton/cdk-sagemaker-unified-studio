import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { BigQueryConnection } from './bigquery-connection.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'bigquery-analytics',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  projectId: 'my-gcp-project-123',
  roleArn: 'arn:aws:iam::123456789012:role/GlueBigQueryRole',
  secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:gcp-oauth-creds-abc123',
};

describe('BigQueryConnection', () => {
  test('creates a BIGQUERY connection with PROJECT_ID and ROLE_ARN', () => {
    const stack = createStack();
    new BigQueryConnection(stack, 'BigQuery', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'bigquery-analytics',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'bigquery-analytics',
            ConnectionType: 'BIGQUERY',
            ConnectionProperties: {
              PROJECT_ID: 'my-gcp-project-123',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueBigQueryRole',
            },
          },
        },
      },
    });
  });

  test('includes DATASET when provided', () => {
    const stack = createStack();
    new BigQueryConnection(stack, 'BigQuery', { ...validProps, dataset: 'analytics_dataset' });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: {
              PROJECT_ID: 'my-gcp-project-123',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueBigQueryRole',
              DATASET: 'analytics_dataset',
            },
          },
        },
      },
    });
  });

  test('validates for both SPARK and ATHENA compute environments', () => {
    const stack = createStack();
    new BigQueryConnection(stack, 'BigQuery', validProps);
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

  test('configures OAuth2 auth with secretArn', () => {
    const stack = createStack();
    new BigQueryConnection(stack, 'BigQuery', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'OAUTH2',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:gcp-oauth-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('includes KMS key when provided', () => {
    const stack = createStack();
    new BigQueryConnection(stack, 'BigQuery', {
      ...validProps,
      kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'OAUTH2',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:gcp-oauth-creds-abc123',
              KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
            },
          },
        },
      },
    });
  });

  test('no PhysicalConnectionRequirements', () => {
    const stack = createStack();
    new BigQueryConnection(stack, 'BigQuery', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.PhysicalConnectionRequirements).toBeUndefined();
  });

  test('passes sparkProperties and athenaProperties', () => {
    const stack = createStack();
    new BigQueryConnection(stack, 'BigQuery', {
      ...validProps,
      sparkProperties: { 'spark.bigquery.materializationDataset': 'temp_dataset' },
      athenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            SparkProperties: { 'spark.bigquery.materializationDataset': 'temp_dataset' },
            AthenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
          },
        },
      },
    });
  });

  describe('validation', () => {
    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new BigQueryConnection(stack, 'BigQuery', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
