import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { AthenaConnectionProps } from './athena-connection.interface';

/**
 * A SageMaker Unified Studio Athena connection that provides access to an Amazon Athena workgroup.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class AthenaConnection extends datazone.CfnConnection {
  constructor(scope: Construct, id: string, props: AthenaConnectionProps) {
    super(scope, id, props);
  }
}
