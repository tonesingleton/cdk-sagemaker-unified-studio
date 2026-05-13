import { aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { S3ConnectionProps } from './s3-connection.interface';

/**
 * A SageMaker Unified Studio S3 connection that provides access to data
 * stored in Amazon S3 from within a project.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/connecting-amazon-s3.html
 */
export class S3Connection extends Construct {
  /** The connection ID. */
  public readonly connectionId: string;

  constructor(scope: Construct, id: string, props: S3ConnectionProps) {
    super(scope, id);

    const connection = new datazone.CfnConnection(this, 'Resource', {
      domainIdentifier: props.domainId,
      environmentIdentifier: props.environmentId,
      projectIdentifier: props.projectId,
      name: props.name,
      description: props.description,
      props: {
        s3Properties: {
          s3Uri: props.s3Uri,
        },
      },
    });

    this.connectionId = connection.attrConnectionId;
  }
}
