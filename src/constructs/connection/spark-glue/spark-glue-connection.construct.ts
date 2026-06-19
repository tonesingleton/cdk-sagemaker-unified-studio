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
    super(scope, id, props);
  }
}
