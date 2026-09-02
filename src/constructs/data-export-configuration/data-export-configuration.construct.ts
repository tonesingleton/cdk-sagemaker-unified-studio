import { Token, Validations, aws_iam as iam, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { DataExportConfigurationProps } from './data-export-configuration.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;

/**
 * Configures asset metadata export from a DataZone domain to an S3 table
 * (under the `aws-sagemaker-catalog` S3 table bucket). Only one export configuration
 * can be active per account per region.
 *
 * There is no CloudFormation resource type for DataZone data export configuration,
 * so this construct uses `AwsCustomResource` to call the DataZone API directly
 * (PutDataExportConfiguration / DeleteDataExportConfiguration).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_PutDataExportConfiguration.html
 */
export class DataExportConfiguration extends Construct {
  constructor(scope: Construct, id: string, props: DataExportConfigurationProps) {
    super(scope, id);

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `DataExportConfiguration domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    const policy = props.executionRoleArn
      ? cr.AwsCustomResourcePolicy.fromStatements([
          new iam.PolicyStatement({
            actions: ['sts:AssumeRole'],
            resources: [props.executionRoleArn],
          }),
        ])
      : cr.AwsCustomResourcePolicy.fromStatements([
          new iam.PolicyStatement({
            actions: ['datazone:PutDataExportConfiguration', 'datazone:DeleteDataExportConfiguration'],
            resources: ['*'],
          }),
        ]);

    const putParams = {
      domainIdentifier: props.domainIdentifier,
      enableExport: props.enableExport ?? true,
      encryptionConfiguration: props.encryptionConfiguration,
    };

    const config = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-datazone',
        action: 'PutDataExportConfiguration',
        parameters: putParams,
        physicalResourceId: cr.PhysicalResourceId.of(props.domainIdentifier),
        assumedRoleArn: props.executionRoleArn,
      },
      onUpdate: {
        service: '@aws-sdk/client-datazone',
        action: 'PutDataExportConfiguration',
        parameters: putParams,
        physicalResourceId: cr.PhysicalResourceId.of(props.domainIdentifier),
        assumedRoleArn: props.executionRoleArn,
      },
      onDelete: {
        service: '@aws-sdk/client-datazone',
        action: 'DeleteDataExportConfiguration',
        parameters: { domainIdentifier: props.domainIdentifier },
        ignoreErrorCodesMatching: 'ResourceNotFoundException',
        assumedRoleArn: props.executionRoleArn,
      },
      policy,
    });

    Validations.of(config).acknowledge(
      {
        id: 'AwsSolutions-IAM5',
        reason: 'DataExportConfiguration actions are scoped to the specific DataZone domain.',
      },
      {
        id: 'AwsSolutions-L1',
        reason: 'AwsCustomResource singleton Lambda runtime is managed by the CDK framework.',
      },
      {
        id: 'AwsSolutions-IAM4',
        reason: 'AwsCustomResource singleton Lambda requires basic execution role for CloudWatch logging.',
      },
    );
  }
}
