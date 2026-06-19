import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { GlueConnectionProps } from './glue-connection.interface';

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
    super(scope, id, props);
  }
}
