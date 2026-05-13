import { aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type {
  DataSourceProps,
  GlueDataSourceConfiguration,
  RedshiftDataSourceConfiguration,
} from './data-source.interface';

/**
 * A SageMaker Unified Studio data source that registers Glue or Redshift
 * databases as governed assets within a domain project.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/manage-data-sources.html
 */
export class DataSource extends Construct {
  /** The data source ID. */
  public readonly dataSourceId: string;

  constructor(scope: Construct, id: string, props: DataSourceProps) {
    super(scope, id);

    if (props.glueConfiguration && props.redshiftConfiguration) {
      throw new Error('Cannot specify both glueConfiguration and redshiftConfiguration — they are mutually exclusive.');
    }
    if (!props.glueConfiguration && !props.redshiftConfiguration) {
      throw new Error('Must specify either glueConfiguration or redshiftConfiguration.');
    }

    const type = props.redshiftConfiguration ? 'REDSHIFT' : 'GLUE';

    const dataSource = new datazone.CfnDataSource(this, 'Resource', {
      domainIdentifier: props.domainId,
      projectIdentifier: props.projectId,
      connectionIdentifier: props.connectionId,
      name: props.name,
      type,
      enableSetting: (props.enabled ?? true) ? 'ENABLED' : 'DISABLED',
      publishOnImport: props.publishOnImport ?? false,
      configuration: props.redshiftConfiguration
        ? this.buildRedshiftConfiguration(props.redshiftConfiguration)
        : this.buildGlueConfiguration(props.glueConfiguration!),
      schedule: props.schedule ? { schedule: props.schedule } : undefined,
    });

    this.dataSourceId = dataSource.attrId;
  }

  private buildGlueConfiguration(
    config: GlueDataSourceConfiguration,
  ): datazone.CfnDataSource.DataSourceConfigurationInputProperty {
    return {
      glueRunConfiguration: {
        relationalFilterConfigurations: config.relationalFilterConfigurations.map((fc) => ({
          databaseName: fc.databaseName,
          schemaName: fc.schemaName,
          filterExpressions: fc.filterExpressions ?? [{ type: 'INCLUDE', expression: '*' }],
        })),
        autoImportDataQualityResult: config.autoImportDataQualityResult ?? true,
      },
    };
  }

  private buildRedshiftConfiguration(
    config: RedshiftDataSourceConfiguration,
  ): datazone.CfnDataSource.DataSourceConfigurationInputProperty {
    return {
      redshiftRunConfiguration: {
        relationalFilterConfigurations: config.relationalFilterConfigurations.map((fc) => ({
          databaseName: fc.databaseName,
          schemaName: fc.schemaName,
          filterExpressions: fc.filterExpressions ?? [{ type: 'INCLUDE', expression: '*' }],
        })),
        dataAccessRole: config.dataAccessRole,
        redshiftCredentialConfiguration: config.redshiftCredentialConfiguration
          ? { secretManagerArn: config.redshiftCredentialConfiguration.secretManagerArn }
          : undefined,
        redshiftStorage: config.redshiftStorage
          ? {
              redshiftClusterSource: config.redshiftStorage.redshiftClusterSource
                ? { clusterName: config.redshiftStorage.redshiftClusterSource.clusterName }
                : undefined,
              redshiftServerlessSource: config.redshiftStorage.redshiftServerlessSource
                ? { workgroupName: config.redshiftStorage.redshiftServerlessSource.workgroupName }
                : undefined,
            }
          : undefined,
      },
    };
  }
}
