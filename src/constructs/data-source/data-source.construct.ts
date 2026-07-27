import { aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type {
  DataSourceProps,
  GlueDataSourceConfiguration,
  IDataSource,
  RedshiftDataSourceConfiguration,
} from './data-source.interface';
import { DataZoneApiCall } from '../datazone-api-call';

/**
 * A SageMaker Unified Studio data source that registers Glue or Redshift
 * databases as governed assets within a domain project.
 *
 * Deploy-time DataZone calls — `ListConnections` (to resolve the connection when
 * `connectionId` is omitted) and `StartDataSourceRun` (to trigger an initial run) —
 * go through {@link DataZoneApiCall}, the shared construct that invokes DataZone APIs
 * as a supplied enrolled role. DataZone authorizes the *calling identity* against the
 * project/domain ACL, so `projectExecutionRole` must be a DataZone-enrolled principal;
 * pass the same enrolled role used for the domain's other DataZone custom resources
 * (typically `domain.datazoneApiRole`).
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/manage-data-sources.html
 */
export class DataSource extends Construct implements IDataSource {
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

    let connectionId: string;
    if (props.connectionId) {
      connectionId = props.connectionId;
    } else {
      if (!props.projectExecutionRole) {
        throw new Error('projectExecutionRole is required when connectionId is not provided.');
      }
      const connectionType = type === 'GLUE' ? 'LAKEHOUSE' : 'REDSHIFT';
      const lookup = new DataZoneApiCall(this, 'LookupConnection', {
        role: props.projectExecutionRole,
        onCreate: {
          action: 'ListConnections',
          parameters: { domainIdentifier: props.domainId, projectIdentifier: props.projectId, type: connectionType },
          outputPaths: ['items.0.connectionId'],
          physicalResourceId: `${props.projectId}-${connectionType}-connection`,
        },
      });
      connectionId = lookup.getResponseField('items.0.connectionId');
    }

    const dataSource = new datazone.CfnDataSource(this, 'Resource', {
      domainIdentifier: props.domainId,
      projectIdentifier: props.projectId,
      connectionIdentifier: connectionId,
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

    if (props.shouldRunOnDeploy) {
      if (!props.projectExecutionRole) {
        throw new Error('projectExecutionRole is required when shouldRunOnDeploy is true.');
      }
      // `datazone:StartDataSourceRun` is granted by DataZoneApiCall's `fromSdkCalls` policy
      // (derived from the action), so it is not granted explicitly here.
      const triggerRun = new DataZoneApiCall(this, 'TriggerRun', {
        role: props.projectExecutionRole,
        onCreate: {
          action: 'StartDataSourceRun',
          parameters: { domainIdentifier: props.domainId, dataSourceIdentifier: this.dataSourceId },
          physicalResourceId: `${props.domainId}-${this.dataSourceId}-run`,
        },
      });
      triggerRun.node.addDependency(dataSource);
    }
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
