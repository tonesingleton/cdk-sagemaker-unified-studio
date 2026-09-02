import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { OpenSearchConnection } from './opensearch-connection.construct';
import { ConnectionScope } from '../../connection.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'opensearch-analytics',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  endpoint: 'https://search-my-domain-abc123.eu-central-1.es.amazonaws.com',
  secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:opensearch-creds-abc123',
};

describe('OpenSearchConnection', () => {
  test('creates a Glue OPENSEARCH connection with required props', () => {
    const stack = createStack();
    new OpenSearchConnection(stack, 'OpenSearch', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'opensearch-analytics',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'opensearch-analytics',
            ConnectionType: 'OPENSEARCH',
            ConnectionProperties: {
              ENDPOINT: 'https://search-my-domain-abc123.eu-central-1.es.amazonaws.com',
              PORT: '443',
            },
            ValidateForComputeEnvironments: ['SPARK'],
            SparkProperties: {},
          },
        },
      },
    });
  });

  test('uses default port 443', () => {
    const stack = createStack();
    new OpenSearchConnection(stack, 'OpenSearch', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: { PORT: '443' },
          },
        },
      },
    });
  });

  test('allows custom port', () => {
    const stack = createStack();
    new OpenSearchConnection(stack, 'OpenSearch', { ...validProps, port: 9200 });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: { PORT: '9200' },
          },
        },
      },
    });
  });

  test('configures BASIC auth with secretArn', () => {
    const stack = createStack();
    new OpenSearchConnection(stack, 'OpenSearch', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:opensearch-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('includes KMS key when provided', () => {
    const stack = createStack();
    new OpenSearchConnection(stack, 'OpenSearch', {
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
    new OpenSearchConnection(stack, 'OpenSearch', {
      ...validProps,
      roleArn: 'arn:aws:iam::123456789012:role/GlueOpenSearchRole',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: {
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueOpenSearchRole',
            },
          },
        },
      },
    });
  });

  test('no ROLE_ARN in connection properties when omitted', () => {
    const stack = createStack();
    new OpenSearchConnection(stack, 'OpenSearch', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.ConnectionProperties.ROLE_ARN).toBeUndefined();
  });

  test('configures VPC when subnetId and securityGroupIds are provided', () => {
    const stack = createStack();
    new OpenSearchConnection(stack, 'OpenSearch', {
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
    new OpenSearchConnection(stack, 'OpenSearch', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.PhysicalConnectionRequirements).toBeUndefined();
  });

  test('passes through description and connectionScope', () => {
    const stack = createStack();
    new OpenSearchConnection(stack, 'OpenSearch', {
      ...validProps,
      description: 'OpenSearch analytics domain',
      connectionScope: ConnectionScope.PROJECT,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'OpenSearch analytics domain',
      Scope: 'PROJECT',
    });
  });

  test('passes custom sparkProperties', () => {
    const stack = createStack();
    new OpenSearchConnection(stack, 'OpenSearch', {
      ...validProps,
      sparkProperties: { 'opensearch.nodes.wan.only': 'true' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            SparkProperties: { 'opensearch.nodes.wan.only': 'true' },
          },
        },
      },
    });
  });

  describe('validation', () => {
    test('throws on invalid port (0)', () => {
      const stack = createStack();
      expect(() => new OpenSearchConnection(stack, 'OpenSearch', { ...validProps, port: 0 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws on invalid port (65536)', () => {
      const stack = createStack();
      expect(() => new OpenSearchConnection(stack, 'OpenSearch', { ...validProps, port: 65536 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws when subnetId provided without securityGroupIds', () => {
      const stack = createStack();
      expect(
        () =>
          new OpenSearchConnection(stack, 'OpenSearch', {
            ...validProps,
            subnetId: 'subnet-abc123',
          }),
      ).toThrow(/securityGroupIds must be provided when subnetId is specified/);
    });

    test('throws when subnetId provided with empty securityGroupIds', () => {
      const stack = createStack();
      expect(
        () =>
          new OpenSearchConnection(stack, 'OpenSearch', {
            ...validProps,
            subnetId: 'subnet-abc123',
            securityGroupIds: [],
          }),
      ).toThrow(/securityGroupIds must be provided when subnetId is specified/);
    });

    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new OpenSearchConnection(stack, 'OpenSearch', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
