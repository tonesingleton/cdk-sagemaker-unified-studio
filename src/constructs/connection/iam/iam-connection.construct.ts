import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { IamConnectionProps } from './iam-connection.interface';

/**
 * A SageMaker Unified Studio IAM connection that provides cross-account access via an IAM role.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/compute-prerequisite-redshift.html#compute-prerequisite-redshift-other-account
 */
export class IamConnection extends datazone.CfnConnection {
  constructor(scope: Construct, id: string, props: IamConnectionProps) {
    super(scope, id, props);
  }
}
