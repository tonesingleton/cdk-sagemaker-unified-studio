import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { MwaaConnectionProps } from './mwaa-connection.interface';

/**
 * A SageMaker Unified Studio MWAA environment connection.
 *
 * Creates a connection to an Amazon Managed Workflows for Apache Airflow (MWAA)
 * environment for workflow orchestration within a project.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class MwaaConnection extends datazone.CfnConnection {
  constructor(scope: Construct, id: string, props: MwaaConnectionProps) {
    if (!props.mwaaEnvironmentName) {
      throw new Error('MwaaConnection mwaaEnvironmentName must not be empty.');
    }

    super(scope, id, {
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      environmentIdentifier: props.environmentIdentifier,
      name: props.name,
      description: props.description,
      awsLocation: props.awsLocation,
      scope: props.connectionScope,
      enableTrustedIdentityPropagation: props.enableTrustedIdentityPropagation,
      configurations: props.configurations,
      props: {
        workflowsMwaaProperties: {
          mwaaEnvironmentName: props.mwaaEnvironmentName,
        },
      },
    });
  }
}
