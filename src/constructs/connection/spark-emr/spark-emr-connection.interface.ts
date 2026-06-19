import type { aws_datazone } from 'aws-cdk-lib';

/**
 * Properties for the Spark EMR connection resource configuration.
 */
export interface SparkEmrConnectionResourceProps {
  /** The Spark EMR connection properties. */
  readonly sparkEmrProperties: aws_datazone.CfnConnection.SparkEmrPropertiesInputProperty;
}

/**
 * Properties for a SparkEmrConnection construct.
 */
export interface SparkEmrConnectionProps {
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
  /** The Spark EMR connection resource properties. */
  readonly props: SparkEmrConnectionResourceProps;
}
