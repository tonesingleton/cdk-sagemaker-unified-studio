import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { GlueComputeEnvironment, type GlueConnectionProps } from './glue-connection.interface';

/**
 * A SageMaker Unified Studio Glue connection that provides connectivity to external data sources via AWS Glue.
 *
 * Supports connection types such as Oracle, Snowflake, PostgreSQL, MySQL, and more.
 * The connection name must be lowercase.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class GlueConnection extends datazone.CfnConnection {
  constructor(scope: Construct, id: string, props: GlueConnectionProps) {
    const computeEnvironments = props.validateForComputeEnvironments;

    if (computeEnvironments !== undefined) {
      if (computeEnvironments.length === 0) {
        throw new Error('validateForComputeEnvironments must contain at least one compute environment when provided.');
      }

      const validValues = new Set(Object.values(GlueComputeEnvironment));
      for (const env of computeEnvironments) {
        if (!validValues.has(env)) {
          throw new Error(`Invalid compute environment "${env}". Must be one of: ${[...validValues].join(', ')}.`);
        }
      }
    }

    super(scope, id, {
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      environmentIdentifier: props.environmentIdentifier,
      name: props.name,
      description: props.description,
      configurations: props.configurations,
      props: {
        glueProperties: {
          glueConnectionInput: {
            name: props.name,
            connectionType: props.connectionType,
            connectionProperties: props.connectionProperties,
            physicalConnectionRequirements: props.physicalConnectionRequirements,
            authenticationConfiguration: props.authenticationConfiguration,
            validateCredentials: props.validateCredentials ?? false,
            validateForComputeEnvironments: computeEnvironments,
            athenaProperties: props.athenaProperties,
            sparkProperties: props.sparkProperties,
            pythonProperties: props.pythonProperties,
            matchCriteria: props.matchCriteria,
          },
        },
      },
    });
  }
}
