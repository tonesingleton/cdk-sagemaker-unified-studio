import type { Construct } from 'constructs';
import type { OpenSearchConnectionProps } from './opensearch-connection.interface';
import { GlueConnection } from '../glue-connection.construct';
import { GlueAuthenticationType, GlueComputeEnvironment, GlueConnectionType } from '../glue-connection.interface';

const DEFAULT_PORT = 443;

/**
 * A SageMaker Unified Studio Amazon OpenSearch Service connection.
 *
 * Creates a Glue connection of type OPENSEARCH with Spark-only compute,
 * targeting an Amazon OpenSearch Service domain. Supports optional VPC
 * configuration for domains hosted within a VPC.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class OpenSearchConnection extends GlueConnection {
  constructor(scope: Construct, id: string, props: OpenSearchConnectionProps) {
    const port = props.port ?? DEFAULT_PORT;

    if (port < 1 || port > 65535) {
      throw new Error(`OpenSearchConnection port must be between 1 and 65535, got ${port}.`);
    }

    if (props.subnetId && (!props.securityGroupIds || props.securityGroupIds.length === 0)) {
      throw new Error('OpenSearchConnection securityGroupIds must be provided when subnetId is specified.');
    }

    const connectionProperties: Record<string, string> = {
      ENDPOINT: props.endpoint,
      PORT: String(port),
    };
    if (props.roleArn) {
      connectionProperties.ROLE_ARN = props.roleArn;
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

      connectionType: GlueConnectionType.OPENSEARCH,
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
