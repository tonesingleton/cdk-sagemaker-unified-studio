import type { Construct } from 'constructs';
import type { SnowflakeConnectionProps } from './snowflake-connection.interface';
import { GlueConnection } from '../glue-connection.construct';
import { GlueAuthenticationType, GlueComputeEnvironment, GlueConnectionType } from '../glue-connection.interface';

/**
 * A SageMaker Unified Studio Snowflake data warehouse connection.
 *
 * Creates a Glue connection of type SNOWFLAKE with Spark and Athena compute.
 * No VPC configuration is required for Snowflake connections.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class SnowflakeConnection extends GlueConnection {
  constructor(scope: Construct, id: string, props: SnowflakeConnectionProps) {
    if (props.kmsKeyArn && !props.secretArn) {
      throw new Error('SnowflakeConnection kmsKeyArn is only valid when secretArn is provided.');
    }

    const connectionProperties: Record<string, string> = {
      ACCOUNT_URL: props.accountUrl,
      DATABASE: props.databaseName,
      ROLE_ARN: props.roleArn,
    };
    if (props.warehouse) {
      connectionProperties.WAREHOUSE = props.warehouse;
    }
    if (props.snowflakeRole) {
      connectionProperties.ROLE = props.snowflakeRole;
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

      connectionType: GlueConnectionType.SNOWFLAKE,
      connectionProperties,
      authenticationConfiguration: props.secretArn
        ? {
            authenticationType: GlueAuthenticationType.BASIC,
            secretArn: props.secretArn,
            kmsKeyArn: props.kmsKeyArn,
          }
        : undefined,
      validateForComputeEnvironments: [GlueComputeEnvironment.SPARK, GlueComputeEnvironment.ATHENA],
      sparkProperties: props.sparkProperties ?? {},
      athenaProperties: props.athenaProperties ?? {},
    });
  }
}
