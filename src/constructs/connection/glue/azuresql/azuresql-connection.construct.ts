import type { Construct } from 'constructs';
import { AzureSqlAuthenticationType, type AzureSqlConnectionProps } from './azuresql-connection.interface';
import { GlueConnection } from '../glue-connection.construct';
import { GlueAuthenticationType, GlueComputeEnvironment, GlueConnectionType } from '../glue-connection.interface';

const DEFAULT_PORT = 1433;

const AUTH_TYPE_MAP: Record<AzureSqlAuthenticationType, GlueAuthenticationType> = {
  [AzureSqlAuthenticationType.BASIC]: GlueAuthenticationType.BASIC,
  [AzureSqlAuthenticationType.OAUTH2]: GlueAuthenticationType.OAUTH2,
};

/**
 * A SageMaker Unified Studio Azure SQL Database connection.
 *
 * Creates a Glue connection of type AZURESQL with Spark and Athena compute.
 * Supports Basic and OAuth2 (Azure AD) authentication. No VPC required.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class AzureSqlConnection extends GlueConnection {
  constructor(scope: Construct, id: string, props: AzureSqlConnectionProps) {
    const port = props.port ?? DEFAULT_PORT;

    if (port < 1 || port > 65535) {
      throw new Error(`AzureSqlConnection port must be between 1 and 65535, got ${port}.`);
    }

    const authType = props.authenticationType ?? AzureSqlAuthenticationType.BASIC;

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

      connectionType: GlueConnectionType.AZURESQL,
      connectionProperties: {
        HOST: props.host,
        PORT: String(port),
        DATABASE: props.databaseName,
        ROLE_ARN: props.roleArn,
      },
      authenticationConfiguration: {
        authenticationType: AUTH_TYPE_MAP[authType],
        secretArn: props.secretArn,
        kmsKeyArn: props.kmsKeyArn,
      },
      validateForComputeEnvironments: [GlueComputeEnvironment.SPARK, GlueComputeEnvironment.ATHENA],
      sparkProperties: props.sparkProperties ?? {},
      athenaProperties: props.athenaProperties ?? {},
    });
  }
}
