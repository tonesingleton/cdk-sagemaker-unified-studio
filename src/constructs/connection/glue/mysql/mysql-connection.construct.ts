import type { Construct } from 'constructs';
import type { MySqlConnectionProps } from './mysql-connection.interface';
import { GlueConnection } from '../glue-connection.construct';
import { GlueAuthenticationType, GlueComputeEnvironment, GlueConnectionType } from '../glue-connection.interface';

const DEFAULT_PORT = 3306;

/**
 * A SageMaker Unified Studio MySQL database connection.
 *
 * Creates a Glue connection of type MYSQL with Spark and Athena compute,
 * targeting a MySQL database (Amazon RDS, Aurora MySQL, or on-premises).
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class MySqlConnection extends GlueConnection {
  constructor(scope: Construct, id: string, props: MySqlConnectionProps) {
    const port = props.port ?? DEFAULT_PORT;

    if (port < 1 || port > 65535) {
      throw new Error(`MySqlConnection port must be between 1 and 65535, got ${port}.`);
    }

    if (props.securityGroupIds.length === 0) {
      throw new Error('MySqlConnection securityGroupIds must contain at least one security group.');
    }

    if (props.kmsKeyArn && !props.secretArn) {
      throw new Error('MySqlConnection kmsKeyArn is only valid when secretArn is provided.');
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

      connectionType: GlueConnectionType.MYSQL,
      connectionProperties: {
        HOST: props.host,
        PORT: String(port),
        DATABASE: props.databaseName,
        ROLE_ARN: props.roleArn,
      },
      physicalConnectionRequirements: {
        subnetId: props.subnetId,
        securityGroupIdList: props.securityGroupIds,
        availabilityZone: props.availabilityZone,
      },
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
