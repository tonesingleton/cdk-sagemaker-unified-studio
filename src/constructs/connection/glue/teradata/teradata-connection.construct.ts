import type { Construct } from 'constructs';
import type { TeradataConnectionProps } from './teradata-connection.interface';
import { GlueConnection } from '../glue-connection.construct';
import { GlueAuthenticationType, GlueComputeEnvironment, GlueConnectionType } from '../glue-connection.interface';

const DEFAULT_PORT = 1025;

/**
 * A SageMaker Unified Studio Teradata Vantage connection.
 *
 * Creates a Glue connection of type TERADATA with Spark-only compute,
 * targeting a Teradata Vantage database. Supports optional VPC configuration
 * for instances hosted within a VPC.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class TeradataConnection extends GlueConnection {
  constructor(scope: Construct, id: string, props: TeradataConnectionProps) {
    const port = props.port ?? DEFAULT_PORT;

    if (port < 1 || port > 65535) {
      throw new Error(`TeradataConnection port must be between 1 and 65535, got ${port}.`);
    }

    if (props.subnetId && (!props.securityGroupIds || props.securityGroupIds.length === 0)) {
      throw new Error('TeradataConnection securityGroupIds must be provided when subnetId is specified.');
    }

    const connectionProperties: Record<string, string> = {
      HOST: props.host,
      PORT: String(port),
      DATABASE: props.databaseName,
    };
    if (props.roleArn) {
      connectionProperties.ROLE_ARN = props.roleArn;
    }
    if (props.jdbcParams) {
      connectionProperties.JDBC_PARAMS = props.jdbcParams;
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

      connectionType: GlueConnectionType.TERADATA,
      connectionProperties,
      physicalConnectionRequirements: props.subnetId
        ? {
            subnetId: props.subnetId,
            securityGroupIdList: props.securityGroupIds,
            availabilityZone: props.availabilityZone,
          }
        : undefined,
      authenticationConfiguration: {
        authenticationType: GlueAuthenticationType.BASIC,
        secretArn: props.secretArn,
        kmsKeyArn: props.kmsKeyArn,
      },
      validateForComputeEnvironments: [GlueComputeEnvironment.SPARK],
      sparkProperties: props.sparkProperties ?? {},
    });
  }
}
