import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { SparkEmrConnectionProps } from './spark-emr-connection.interface';

/**
 * A SageMaker Unified Studio Spark EMR connection that provides access to an EMR Serverless application or EMR cluster.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class SparkEmrConnection extends datazone.CfnConnection {
  constructor(scope: Construct, id: string, props: SparkEmrConnectionProps) {
    super(scope, id, {
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      name: props.name,
      description: props.description,
      props: {
        sparkEmrProperties: {
          computeArn: props.computeArn,
        },
      },
    });
  }
}
