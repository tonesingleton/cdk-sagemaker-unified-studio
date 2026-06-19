import type { aws_datazone } from 'aws-cdk-lib';

/**
 * Properties for the S3 connection resource configuration.
 */
export interface S3ConnectionResourceProps {
  /** The S3 connection properties. */
  readonly s3Properties: aws_datazone.CfnConnection.S3PropertiesInputProperty;
}

/**
 * Properties for an S3Connection construct.
 */
export interface S3ConnectionProps {
  /** Display name of the connection. */
  readonly name: string;
  /** The SageMaker Unified Studio domain ID. */
  readonly domainIdentifier: string;
  /** The project ID that owns this connection. */
  readonly projectIdentifier: string;
  /**
   * Human-readable description of the connection.
   *
   * @default - no description
   */
  readonly description?: string;
  /** The S3 connection resource properties. */
  readonly props: S3ConnectionResourceProps;
}
