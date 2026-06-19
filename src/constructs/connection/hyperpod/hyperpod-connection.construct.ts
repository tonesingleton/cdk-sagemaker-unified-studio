import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { HyperPodConnectionProps } from './hyperpod-connection.interface';

/**
 * A SageMaker Unified Studio HyperPod connection that provides access to a SageMaker HyperPod cluster.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class HyperPodConnection extends datazone.CfnConnection {
  constructor(scope: Construct, id: string, props: HyperPodConnectionProps) {
    super(scope, id, props);
  }
}
