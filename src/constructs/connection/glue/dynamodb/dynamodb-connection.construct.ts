import type { Construct } from 'constructs';
import type { DynamoDbConnectionProps } from './dynamodb-connection.interface';
import { GlueConnection } from '../glue-connection.construct';
import { GlueComputeEnvironment, GlueConnectionType } from '../glue-connection.interface';

/**
 * A SageMaker Unified Studio Amazon DynamoDB connection.
 *
 * Creates a Glue connection of type DYNAMODB with Spark and Athena compute.
 * No VPC or credentials configuration required — access is controlled via the IAM role.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class DynamoDbConnection extends GlueConnection {
  constructor(scope: Construct, id: string, props: DynamoDbConnectionProps) {
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

      connectionType: GlueConnectionType.DYNAMODB,
      connectionProperties: {
        TABLE_ARN: props.tableArn,
        ROLE_ARN: props.roleArn,
      },
      validateForComputeEnvironments: [GlueComputeEnvironment.SPARK, GlueComputeEnvironment.ATHENA],
      sparkProperties: props.sparkProperties ?? {},
      athenaProperties: props.athenaProperties ?? {},
    });
  }
}
