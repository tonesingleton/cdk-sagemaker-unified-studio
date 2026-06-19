import { aws_datazone as datazone } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { S3ConnectionProps } from './s3-connection.interface';

/**
 * A SageMaker Unified Studio S3 connection that provides access to data stored in Amazon S3 from within a project.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/connecting-amazon-s3.html
 */
export class S3Connection extends datazone.CfnConnection {
  constructor(scope: Construct, id: string, props: S3ConnectionProps) {
    super(scope, id, {
      domainIdentifier: props.domainIdentifier,
      projectIdentifier: props.projectIdentifier,
      name: props.name,
      description: props.description,
      props: {
        s3Properties: {
          s3Uri: props.s3Uri,
          registerS3AccessGrantLocation: props.registerS3AccessGrantLocation,
          s3AccessGrantLocationId: props.s3AccessGrantLocationId,
        },
      },
    });
  }
}
