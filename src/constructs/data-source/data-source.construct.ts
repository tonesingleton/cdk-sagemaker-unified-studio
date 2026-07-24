import { CustomResource, Duration, aws_datazone as datazone, aws_iam as iam, aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type {
  DataSourceProps,
  GlueDataSourceConfiguration,
  IDataSource,
  RedshiftDataSourceConfiguration,
} from './data-source.interface';

const CR_HANDLER = [
  'import boto3, json, urllib.request',
  'def handler(event, context):',
  '  try:',
  "    if event.get('RequestType') == 'Delete':",
  "      send(event, context, 'SUCCESS', {})",
  '      return',
  "    result = run(event['ResourceProperties'])",
  "    send(event, context, 'SUCCESS', result)",
  '  except Exception as e:',
  "    send(event, context, 'FAILED', {}, str(e))",
  "def send(event, context, status, data, reason=''):",
  "  body = json.dumps({'Status': status, 'Reason': reason, 'PhysicalResourceId': event.get('PhysicalResourceId', context.log_stream_name), 'StackId': event['StackId'], 'RequestId': event['RequestId'], 'LogicalResourceId': event['LogicalResourceId'], 'Data': data}).encode()",
  "  req = urllib.request.Request(event['ResponseURL'], data=body, method='PUT')",
  '  urllib.request.urlopen(req)',
].join('\n');

const LOOKUP_CONNECTION_HANDLER = CR_HANDLER.replace(
  "result = run(event['ResourceProperties'])",
  "p = event['ResourceProperties']\n    resp = boto3.client('datazone').list_connections(domainIdentifier=p['DomainId'], projectIdentifier=p['ProjectId'], type=p['Type'])\n    result = {'ConnectionId': resp['items'][0]['connectionId']}",
);

const TRIGGER_RUN_HANDLER = CR_HANDLER.replace(
  "result = run(event['ResourceProperties'])",
  "p = event['ResourceProperties']\n    boto3.client('datazone').start_data_source_run(domainIdentifier=p['DomainId'], dataSourceIdentifier=p['DataSourceId'])\n    result = {}",
);

/**
 * A SageMaker Unified Studio data source that registers Glue or Redshift
 * databases as governed assets within a domain project.
 *
 * NOTE: DataZone membership-gated API calls (ListConnections, StartDataSourceRun) require
 * the caller to be a project member. AwsCustomResource cannot be used for these calls because
 * it uses a stack-wide singleton Lambda — the `role=` prop and `policy=` prop both apply to
 * that singleton, and whichever AwsCustomResource instance is synthesized first wins. Subsequent
 * instances silently share the same role with no guarantee their policy statements are applied.
 * `assumedRoleArn` per SDK call also fails because it requires `sts:AssumeRole` on the singleton
 * role itself, which cannot be reliably attached for the same reason.
 * Raw `lambda.Function` with `role=projectExecutionRole` is the only correct pattern here.
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
      const lookupFn = new lambda.Function(this, 'LookupConnectionFn', {
        runtime: lambda.Runtime.PYTHON_3_12,
        handler: 'index.handler',
        role: props.projectExecutionRole,
        timeout: Duration.seconds(30),
        code: lambda.Code.fromInline(LOOKUP_CONNECTION_HANDLER),
      });
      const lookupCr = new CustomResource(this, 'LookupConnection', {
        serviceToken: lookupFn.functionArn,
        properties: { DomainId: props.domainId, ProjectId: props.projectId, Type: connectionType },
      });
      connectionId = lookupCr.getAttString('ConnectionId');
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
      props.projectExecutionRole.addToPrincipalPolicy(
        new iam.PolicyStatement({ actions: ['datazone:StartDataSourceRun'], resources: ['*'] }),
      );
      const triggerFn = new lambda.Function(this, 'TriggerRunFn', {
        runtime: lambda.Runtime.PYTHON_3_12,
        handler: 'index.handler',
        role: props.projectExecutionRole,
        timeout: Duration.seconds(30),
        code: lambda.Code.fromInline(TRIGGER_RUN_HANDLER),
      });
      const triggerCr = new CustomResource(this, 'TriggerRun', {
        serviceToken: triggerFn.functionArn,
        properties: { DomainId: props.domainId, DataSourceId: this.dataSourceId },
      });
      triggerCr.node.addDependency(dataSource);
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
