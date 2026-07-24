import { App, Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DataSource } from './data-source.construct';

describe('DataSource', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack(new App(), 'TestStack');
  });

  describe('validation', () => {
    it('throws when both configurations are provided', () => {
      expect(() => {
        new DataSource(stack, 'DS', {
          name: 'ds',
          domainId: 'dzd-test',
          projectId: 'proj-test',
          connectionId: 'conn-test',
          glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'db' }] },
          redshiftConfiguration: { relationalFilterConfigurations: [{ databaseName: 'db' }] },
        });
      }).toThrow(/mutually exclusive/);
    });

    it('throws when neither configuration is provided', () => {
      expect(() => {
        new DataSource(stack, 'DS', {
          name: 'ds',
          domainId: 'dzd-test',
          projectId: 'proj-test',
          connectionId: 'conn-test',
        });
      }).toThrow(/Must specify either/);
    });

    it('throws when connectionId is omitted without projectExecutionRole', () => {
      expect(() => {
        new DataSource(stack, 'DS', {
          name: 'ds',
          domainId: 'dzd-test',
          projectId: 'proj-test',
          glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'db' }] },
        });
      }).toThrow(/projectExecutionRole is required/);
    });
  });

  describe('Glue', () => {
    it('creates a Glue data source', () => {
      new DataSource(stack, 'DS', {
        name: 'my-datasource',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Name: 'my-datasource',
        Type: 'GLUE',
        EnableSetting: 'ENABLED',
      });
    });

    it('defaults to include all tables', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Configuration: {
          GlueRunConfiguration: {
            RelationalFilterConfigurations: [
              { DatabaseName: 'mydb', FilterExpressions: [{ Type: 'INCLUDE', Expression: '*' }] },
            ],
          },
        },
      });
    });

    it('uses custom filter expressions', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: {
          relationalFilterConfigurations: [
            { databaseName: 'mydb', filterExpressions: [{ type: 'INCLUDE', expression: 'table_*' }] },
          ],
        },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Configuration: {
          GlueRunConfiguration: {
            RelationalFilterConfigurations: [
              { DatabaseName: 'mydb', FilterExpressions: [{ Type: 'INCLUDE', Expression: 'table_*' }] },
            ],
          },
        },
      });
    });

    it('defaults autoImportDataQualityResult to true', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Configuration: { GlueRunConfiguration: { AutoImportDataQualityResult: true } },
      });
    });

    it('supports multiple databases', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: {
          relationalFilterConfigurations: [{ databaseName: 'db1' }, { databaseName: 'db2' }],
        },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Configuration: {
          GlueRunConfiguration: {
            RelationalFilterConfigurations: [
              { DatabaseName: 'db1', FilterExpressions: [{ Type: 'INCLUDE', Expression: '*' }] },
              { DatabaseName: 'db2', FilterExpressions: [{ Type: 'INCLUDE', Expression: '*' }] },
            ],
          },
        },
      });
    });
  });

  describe('Redshift', () => {
    it('creates a Redshift data source', () => {
      new DataSource(stack, 'DS', {
        name: 'redshift-ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        redshiftConfiguration: {
          relationalFilterConfigurations: [{ databaseName: 'dev', schemaName: 'public' }],
        },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Name: 'redshift-ds',
        Type: 'REDSHIFT',
        EnableSetting: 'ENABLED',
      });
    });

    it('sets Redshift run configuration', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        redshiftConfiguration: {
          relationalFilterConfigurations: [{ databaseName: 'dev', schemaName: 'public' }],
          dataAccessRole: 'arn:aws:iam::123456789012:role/RedshiftRole',
          redshiftCredentialConfiguration: {
            secretManagerArn: 'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret',
          },
          redshiftStorage: { redshiftServerlessSource: { workgroupName: 'my-workgroup' } },
        },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Configuration: {
          RedshiftRunConfiguration: {
            RelationalFilterConfigurations: [
              { DatabaseName: 'dev', SchemaName: 'public', FilterExpressions: [{ Type: 'INCLUDE', Expression: '*' }] },
            ],
            DataAccessRole: 'arn:aws:iam::123456789012:role/RedshiftRole',
            RedshiftCredentialConfiguration: {
              SecretManagerArn: 'arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret',
            },
            RedshiftStorage: {
              RedshiftServerlessSource: { WorkgroupName: 'my-workgroup' },
            },
          },
        },
      });
    });

    it('supports Redshift cluster storage', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        redshiftConfiguration: {
          relationalFilterConfigurations: [{ databaseName: 'dev' }],
          redshiftStorage: { redshiftClusterSource: { clusterName: 'my-cluster' } },
        },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Configuration: {
          RedshiftRunConfiguration: {
            RedshiftStorage: { RedshiftClusterSource: { ClusterName: 'my-cluster' } },
          },
        },
      });
    });
  });

  describe('auto-lookup', () => {
    it('creates a Lambda and CustomResource for Glue when connectionId is omitted', () => {
      const role = iam.Role.fromRoleArn(stack, 'Role', 'arn:aws:iam::123456789012:role/ExecRole');
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        projectExecutionRole: role,
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'db' }] },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {});
      Template.fromStack(stack).hasResourceProperties('AWS::CloudFormation::CustomResource', {
        DomainId: 'dzd-test',
        ProjectId: 'proj-test',
        Type: 'LAKEHOUSE',
      });
    });

    it('uses REDSHIFT type for Redshift when connectionId is omitted', () => {
      const role = iam.Role.fromRoleArn(stack, 'Role', 'arn:aws:iam::123456789012:role/ExecRole');
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        projectExecutionRole: role,
        redshiftConfiguration: { relationalFilterConfigurations: [{ databaseName: 'dev' }] },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::CloudFormation::CustomResource', {
        Type: 'REDSHIFT',
      });
    });

    it('throws when shouldRunOnDeploy is true without projectExecutionRole', () => {
      expect(() => {
        new DataSource(stack, 'DS', {
          name: 'ds',
          domainId: 'dzd-test',
          projectId: 'proj-test',
          connectionId: 'conn-test',
          glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'db' }] },
          shouldRunOnDeploy: true,
        });
      }).toThrow(/projectExecutionRole is required when shouldRunOnDeploy/);
    });

    it('creates TriggerRun CustomResource when shouldRunOnDeploy is true', () => {
      const role = iam.Role.fromRoleArn(stack, 'Role', 'arn:aws:iam::123456789012:role/ExecRole');
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        projectExecutionRole: role,
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'db' }] },
        shouldRunOnDeploy: true,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::CloudFormation::CustomResource', {
        DomainId: 'dzd-test',
        DataSourceId: Match.anyValue(),
      });
    });
  });

  describe('common', () => {
    it('defaults publishOnImport to false', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', { PublishOnImport: false });
    });

    it('defaults enabled to true', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', { EnableSetting: 'ENABLED' });
    });

    it('sets disabled when enabled is false', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
        enabled: false,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', { EnableSetting: 'DISABLED' });
    });

    it('sets publishOnImport when specified', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
        publishOnImport: true,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', { PublishOnImport: true });
    });

    it('sets schedule when provided', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
        schedule: 'cron(0 12 * * ? *)',
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Schedule: { Schedule: 'cron(0 12 * * ? *)' },
      });
    });

    it('omits schedule when not provided', () => {
      new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
      });

      Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DataSource', {
        Schedule: Match.absent(),
      });
    });

    it('exposes the data source ID', () => {
      const ds = new DataSource(stack, 'DS', {
        name: 'ds',
        domainId: 'dzd-test',
        projectId: 'proj-test',
        connectionId: 'conn-test',
        glueConfiguration: { relationalFilterConfigurations: [{ databaseName: 'mydb' }] },
      });

      expect(ds.dataSourceId).toBeDefined();
    });
  });
});
