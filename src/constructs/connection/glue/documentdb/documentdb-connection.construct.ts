import type { Construct } from 'constructs';
import type { DocumentDbConnectionProps } from './documentdb-connection.interface';
import { GlueConnection } from '../glue-connection.construct';
import { GlueAuthenticationType, GlueComputeEnvironment, GlueConnectionType } from '../glue-connection.interface';

/**
 * A SageMaker Unified Studio Amazon DocumentDB connection.
 *
 * Creates a Glue connection of type DOCUMENTDB with Spark and Athena compute,
 * targeting an Amazon DocumentDB cluster via MongoDB-protocol connection URL.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class DocumentDbConnection extends GlueConnection {
  constructor(scope: Construct, id: string, props: DocumentDbConnectionProps) {
    if (props.securityGroupIds.length === 0) {
      throw new Error('DocumentDbConnection securityGroupIds must contain at least one security group.');
    }

    if (props.kmsKeyArn && !props.secretArn) {
      throw new Error('DocumentDbConnection kmsKeyArn is only valid when secretArn is provided.');
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

      connectionType: GlueConnectionType.DOCUMENTDB,
      connectionProperties: {
        CONNECTION_URL: props.connectionUrl,
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
