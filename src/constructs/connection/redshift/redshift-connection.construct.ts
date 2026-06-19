import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { RedshiftConnectionProps } from './redshift-connection.interface';

/**
 * A SageMaker Unified Studio Redshift connection that provides access to an Amazon Redshift cluster.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html
 */
export class RedshiftConnection extends datazone.CfnConnection {
  constructor(scope: Construct, id: string, props: RedshiftConnectionProps) {
    super(scope, id, {
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      name: props.name,
      description: props.description,
      props: {
        redshiftProperties: {
          credentials: props.credentials,
          databaseName: props.databaseName,
          host: props.host,
          port: props.port ?? 5439,
          storage: props.storage,
        },
      },
    });
  }
}
