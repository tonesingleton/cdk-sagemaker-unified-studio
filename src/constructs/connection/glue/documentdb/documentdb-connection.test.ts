import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DocumentDbConnection } from './documentdb-connection.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'documentdb-cluster',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  connectionUrl: 'mongodb://docdb-cluster.cluster-xxxx.eu-central-1.docdb.amazonaws.com:27017',
  roleArn: 'arn:aws:iam::123456789012:role/GlueDocDbRole',
  subnetId: 'subnet-abc123',
  securityGroupIds: ['sg-111111'],
  availabilityZone: 'eu-central-1a',
};

describe('DocumentDbConnection', () => {
  test('creates a DOCUMENTDB connection with CONNECTION_URL in properties', () => {
    const stack = createStack();
    new DocumentDbConnection(stack, 'DocDb', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'documentdb-cluster',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'documentdb-cluster',
            ConnectionType: 'DOCUMENTDB',
            ConnectionProperties: {
              CONNECTION_URL: 'mongodb://docdb-cluster.cluster-xxxx.eu-central-1.docdb.amazonaws.com:27017',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueDocDbRole',
            },
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

  test('validates for both SPARK and ATHENA compute environments', () => {
    const stack = createStack();
    new DocumentDbConnection(stack, 'DocDb', validProps);
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
    new DocumentDbConnection(stack, 'DocDb', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:docdb-creds-abc123',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:docdb-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('includes KMS key when provided with secretArn', () => {
    const stack = createStack();
    new DocumentDbConnection(stack, 'DocDb', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:docdb-creds-abc123',
      kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:docdb-creds-abc123',
              KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
            },
          },
        },
      },
    });
  });

  test('no auth configuration when secretArn is omitted', () => {
    const stack = createStack();
    new DocumentDbConnection(stack, 'DocDb', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.AuthenticationConfiguration).toBeUndefined();
  });

  test('passes sparkProperties and athenaProperties', () => {
    const stack = createStack();
    new DocumentDbConnection(stack, 'DocDb', {
      ...validProps,
      sparkProperties: { 'spark.mongodb.input.partitioner': 'MongoPaginateBySizePartitioner' },
      athenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            SparkProperties: { 'spark.mongodb.input.partitioner': 'MongoPaginateBySizePartitioner' },
            AthenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
          },
        },
      },
    });
  });

  describe('validation', () => {
    test('throws on empty securityGroupIds', () => {
      const stack = createStack();
      expect(() => new DocumentDbConnection(stack, 'DocDb', { ...validProps, securityGroupIds: [] })).toThrow(
        /must contain at least one security group/,
      );
    });

    test('throws when kmsKeyArn provided without secretArn', () => {
      const stack = createStack();
      expect(
        () =>
          new DocumentDbConnection(stack, 'DocDb', {
            ...validProps,
            kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
          }),
      ).toThrow(/kmsKeyArn is only valid when secretArn is provided/);
    });

    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new DocumentDbConnection(stack, 'DocDb', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
