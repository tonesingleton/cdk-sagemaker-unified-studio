import type { Construct } from 'constructs';
import type { OracleConnectionProps } from './oracle-connection.interface';
import { GlueConnection } from '../glue-connection.construct';
import { GlueAuthenticationType, GlueComputeEnvironment, GlueConnectionType } from '../glue-connection.interface';

const DEFAULT_PORT = 1521;

/**
 * A SageMaker Unified Studio Oracle database connection.
 *
 * Creates a Glue connection of type ORACLE with Spark-only compute,
 * targeting an Oracle database (on-premises via Direct Connect/VPN or Amazon RDS).
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class OracleConnection extends GlueConnection {
  constructor(scope: Construct, id: string, props: OracleConnectionProps) {
    const port = props.port ?? DEFAULT_PORT;

    if (port < 1 || port > 65535) {
      throw new Error(`OracleConnection port must be between 1 and 65535, got ${port}.`);
    }

    if (props.securityGroupIds.length === 0) {
      throw new Error('OracleConnection securityGroupIds must contain at least one security group.');
    }

    if (props.kmsKeyArn && !props.secretArn) {
      throw new Error('OracleConnection kmsKeyArn is only valid when secretArn is provided.');
    }

    super(scope, id, {
      // Pass-through from ConnectionProps
      name: props.name,
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      environmentIdentifier: props.environmentIdentifier,
      description: props.description,
      awsLocation: props.awsLocation,
      connectionScope: props.connectionScope,
      enableTrustedIdentityPropagation: props.enableTrustedIdentityPropagation,
      configurations: props.configurations,

      // Fixed: Oracle-specific
      connectionType: GlueConnectionType.ORACLE,
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
      validateForComputeEnvironments: [GlueComputeEnvironment.SPARK],
      sparkProperties: props.sparkProperties ?? {},
    });
  }
}
