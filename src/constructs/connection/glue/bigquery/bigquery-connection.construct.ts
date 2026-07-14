import type { Construct } from 'constructs';
import type { BigQueryConnectionProps } from './bigquery-connection.interface';
import { GlueConnection } from '../glue-connection.construct';
import { GlueAuthenticationType, GlueComputeEnvironment, GlueConnectionType } from '../glue-connection.interface';

/**
 * A SageMaker Unified Studio Google BigQuery connection.
 *
 * Creates a Glue connection of type BIGQUERY with Spark and Athena compute.
 * Uses OAuth2 authentication via a Secrets Manager secret containing Google credentials.
 * No VPC configuration required.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class BigQueryConnection extends GlueConnection {
  constructor(scope: Construct, id: string, props: BigQueryConnectionProps) {
    const connectionProperties: Record<string, string> = {
      PROJECT_ID: props.projectId,
      ROLE_ARN: props.roleArn,
    };
    if (props.dataset) {
      connectionProperties.DATASET = props.dataset;
    }

    super(scope, id, {
      name: props.name,
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      environmentIdentifier: props.environmentIdentifier,
      description: props.description,
      awsLocation: props.awsLocation,
      connectionScope: props.connectionScope,
      enableTrustedIdentityPropagation: props.enableTrustedIdentityPropagation,
      configurations: props.configurations,

      connectionType: GlueConnectionType.BIGQUERY,
      connectionProperties,
      authenticationConfiguration: {
        authenticationType: GlueAuthenticationType.OAUTH2,
        secretArn: props.secretArn,
        kmsKeyArn: props.kmsKeyArn,
      },
      validateForComputeEnvironments: [GlueComputeEnvironment.SPARK, GlueComputeEnvironment.ATHENA],
      sparkProperties: props.sparkProperties ?? {},
      athenaProperties: props.athenaProperties ?? {},
    });
  }
}
