import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { GlueComputeEnvironment, type GlueConnectionProps } from './glue-connection.interface';

const ALL_COMPUTE_ENVIRONMENTS = [
  GlueComputeEnvironment.SPARK,
  GlueComputeEnvironment.ATHENA,
  GlueComputeEnvironment.PYTHON,
];

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
    if (!props.environmentIdentifier) {
      throw new Error(
        'environmentIdentifier is required for GlueConnection. Provide it explicitly or place the construct inside an Environment.',
      );
    }

    const computeEnvironments = props.validateForComputeEnvironments ?? ALL_COMPUTE_ENVIRONMENTS;

    if (computeEnvironments.length === 0) {
      throw new Error('validateForComputeEnvironments must contain at least one compute environment when provided.');
    }

    const validValues = new Set(Object.values(GlueComputeEnvironment));
    for (const env of computeEnvironments) {
      if (!validValues.has(env)) {
        throw new Error(`Invalid compute environment "${env}". Must be one of: ${[...validValues].join(', ')}.`);
      }
    }

    // Filter out compute environments whose required properties are not provided,
    // to avoid CloudFormation handler null pointer or missing-property errors.
    const envPropsMap: Record<GlueComputeEnvironment, Record<string, string> | undefined> = {
      [GlueComputeEnvironment.ATHENA]: props.athenaProperties,
      [GlueComputeEnvironment.SPARK]: props.sparkProperties,
      [GlueComputeEnvironment.PYTHON]: props.pythonProperties,
    };
    const effectiveEnvironments = computeEnvironments.filter((env) => envPropsMap[env] !== undefined);

    super(scope, id, {
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      environmentIdentifier: props.environmentIdentifier,
      name: props.name,
      description: props.description,
      awsLocation: props.awsLocation,
      scope: props.connectionScope,
      enableTrustedIdentityPropagation: props.enableTrustedIdentityPropagation,
      configurations: [
        { classification: 'ProvisioningConfiguration', properties: { PROVISIONING_MODE: 'GLUE_CONNECTION' } },
        ...(props.configurations ?? []),
      ],
      props: {
        glueProperties: {
          glueConnectionInput: {
            name: props.name,
            connectionType: props.connectionType,
            connectionProperties: props.connectionProperties,
            physicalConnectionRequirements: props.physicalConnectionRequirements,
            authenticationConfiguration: props.authenticationConfiguration,
            validateCredentials: props.validateCredentials ?? false,
            validateForComputeEnvironments: effectiveEnvironments.length > 0 ? effectiveEnvironments : undefined,
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
