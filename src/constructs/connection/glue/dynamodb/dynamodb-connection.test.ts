import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DynamoDbConnection } from './dynamodb-connection.construct';
import { ConnectionScope } from '../../connection.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'dynamodb-orders',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  tableArn: 'arn:aws:dynamodb:eu-central-1:123456789012:table/Orders',
  roleArn: 'arn:aws:iam::123456789012:role/GlueDynamoDbRole',
};

describe('DynamoDbConnection', () => {
  test('creates a DYNAMODB connection with TABLE_ARN and ROLE_ARN', () => {
    const stack = createStack();
    new DynamoDbConnection(stack, 'DynamoDb', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'dynamodb-orders',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'dynamodb-orders',
            ConnectionType: 'DYNAMODB',
            ConnectionProperties: {
              TABLE_ARN: 'arn:aws:dynamodb:eu-central-1:123456789012:table/Orders',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueDynamoDbRole',
            },
          },
        },
      },
    });
  });

  test('validates for both SPARK and ATHENA compute environments', () => {
    const stack = createStack();
    new DynamoDbConnection(stack, 'DynamoDb', validProps);
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

  test('no PhysicalConnectionRequirements (unlike VPC connections)', () => {
    const stack = createStack();
    new DynamoDbConnection(stack, 'DynamoDb', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.PhysicalConnectionRequirements).toBeUndefined();
  });

  test('no AuthenticationConfiguration', () => {
    const stack = createStack();
    new DynamoDbConnection(stack, 'DynamoDb', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.AuthenticationConfiguration).toBeUndefined();
  });

  test('passes sparkProperties and athenaProperties', () => {
    const stack = createStack();
    new DynamoDbConnection(stack, 'DynamoDb', {
      ...validProps,
      sparkProperties: { 'spark.dynamodb.throughput.read.percent': '0.5' },
      athenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            SparkProperties: { 'spark.dynamodb.throughput.read.percent': '0.5' },
            AthenaProperties: { 'athena.spill_bucket': 'my-spill-bucket' },
          },
        },
      },
    });
  });

  test('passes through description and connectionScope', () => {
    const stack = createStack();
    new DynamoDbConnection(stack, 'DynamoDb', {
      ...validProps,
      description: 'Orders table connection',
      connectionScope: ConnectionScope.PROJECT,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Orders table connection',
      Scope: 'PROJECT',
    });
  });

  describe('validation', () => {
    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new DynamoDbConnection(stack, 'DynamoDb', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
