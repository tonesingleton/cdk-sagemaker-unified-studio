import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { SparkGlueConnectionProps } from './spark-glue-connection.interface';

/**
 * A SageMaker Unified Studio Spark Glue connection that configures Glue Interactive Sessions for Spark compute.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class SparkGlueConnection extends datazone.CfnConnection {
  constructor(scope: Construct, id: string, props: SparkGlueConnectionProps) {
    super(scope, id, {
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      name: props.name,
      description: props.description,
      props: {
        sparkGlueProperties: {
          workerType: props.workerType ?? 'G.1X',
          glueVersion: props.glueVersion ?? '4.0',
          idleTimeout: props.idleTimeout ?? 60,
          numberOfWorkers: props.numberOfWorkers ?? 10,
        },
      },
    });
  }
}
