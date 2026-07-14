import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { OracleConnection } from './oracle-connection.construct';
import { ConnectionScope } from '../../connection.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'oracle-datastore',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  host: 'oracle.internal.example.com',
  databaseName: 'ORCL',
  roleArn: 'arn:aws:iam::123456789012:role/GlueOracleRole',
  subnetId: 'subnet-abc123',
  securityGroupIds: ['sg-111111'],
  availabilityZone: 'eu-central-1a',
};

describe('OracleConnection', () => {
  test('creates a Glue ORACLE connection with required props', () => {
    const stack = createStack();
    new OracleConnection(stack, 'Oracle', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'oracle-datastore',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            Name: 'oracle-datastore',
            ConnectionType: 'ORACLE',
            ConnectionProperties: {
              HOST: 'oracle.internal.example.com',
              PORT: '1521',
              DATABASE: 'ORCL',
              ROLE_ARN: 'arn:aws:iam::123456789012:role/GlueOracleRole',
            },
            PhysicalConnectionRequirements: {
              SubnetId: 'subnet-abc123',
              SecurityGroupIdList: ['sg-111111'],
              AvailabilityZone: 'eu-central-1a',
            },
            ValidateForComputeEnvironments: ['SPARK'],
            SparkProperties: {},
          },
        },
      },
    });
  });

  test('uses default port 1521', () => {
    const stack = createStack();
    new OracleConnection(stack, 'Oracle', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: { PORT: '1521' },
          },
        },
      },
    });
  });

  test('allows custom port', () => {
    const stack = createStack();
    new OracleConnection(stack, 'Oracle', { ...validProps, port: 1522 });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            ConnectionProperties: { PORT: '1522' },
          },
        },
      },
    });
  });

  test('configures BASIC auth when secretArn is provided', () => {
    const stack = createStack();
    new OracleConnection(stack, 'Oracle', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:oracle-creds-abc123',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:oracle-creds-abc123',
            },
          },
        },
      },
    });
  });

  test('includes KMS key when provided with secretArn', () => {
    const stack = createStack();
    new OracleConnection(stack, 'Oracle', {
      ...validProps,
      secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:oracle-creds-abc123',
      kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            AuthenticationConfiguration: {
              AuthenticationType: 'BASIC',
              SecretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:oracle-creds-abc123',
              KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
            },
          },
        },
      },
    });
  });

  test('no auth configuration when secretArn is omitted', () => {
    const stack = createStack();
    new OracleConnection(stack, 'Oracle', validProps);
    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::DataZone::Connection');
    const resource = Object.values(resources)[0];
    expect(resource.Properties.Props.GlueProperties.GlueConnectionInput.AuthenticationConfiguration).toBeUndefined();
  });

  test('passes through description and connectionScope', () => {
    const stack = createStack();
    new OracleConnection(stack, 'Oracle', {
      ...validProps,
      description: 'Oracle RDS production connection',
      connectionScope: ConnectionScope.PROJECT,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Oracle RDS production connection',
      Scope: 'PROJECT',
    });
  });

  test('passes custom sparkProperties', () => {
    const stack = createStack();
    new OracleConnection(stack, 'Oracle', {
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

  test('supports multiple security groups', () => {
    const stack = createStack();
    new OracleConnection(stack, 'Oracle', {
      ...validProps,
      securityGroupIds: ['sg-111111', 'sg-222222'],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Props: {
        GlueProperties: {
          GlueConnectionInput: {
            PhysicalConnectionRequirements: {
              SecurityGroupIdList: ['sg-111111', 'sg-222222'],
            },
          },
        },
      },
    });
  });

  describe('validation', () => {
    test('throws on invalid port (0)', () => {
      const stack = createStack();
      expect(() => new OracleConnection(stack, 'Oracle', { ...validProps, port: 0 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws on invalid port (65536)', () => {
      const stack = createStack();
      expect(() => new OracleConnection(stack, 'Oracle', { ...validProps, port: 65536 })).toThrow(
        /port must be between 1 and 65535/,
      );
    });

    test('throws on empty securityGroupIds', () => {
      const stack = createStack();
      expect(() => new OracleConnection(stack, 'Oracle', { ...validProps, securityGroupIds: [] })).toThrow(
        /must contain at least one security group/,
      );
    });

    test('throws when kmsKeyArn provided without secretArn', () => {
      const stack = createStack();
      expect(
        () =>
          new OracleConnection(stack, 'Oracle', {
            ...validProps,
            kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/12345678-1234-1234-1234-123456789012',
          }),
      ).toThrow(/kmsKeyArn is only valid when secretArn is provided/);
    });

    test('throws when environmentIdentifier is missing', () => {
      const stack = createStack();
      const { environmentIdentifier: _, ...propsWithoutEnv } = validProps;
      expect(() => new OracleConnection(stack, 'Oracle', propsWithoutEnv as any)).toThrow(
        /environmentIdentifier is required/,
      );
    });
  });
});
