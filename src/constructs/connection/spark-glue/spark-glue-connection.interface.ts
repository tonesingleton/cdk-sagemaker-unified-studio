import type { aws_datazone } from 'aws-cdk-lib';

/**
 * Properties for the Spark Glue connection resource configuration.
 */
export interface SparkGlueConnectionResourceProps {
  /** The Spark Glue connection properties. */
  readonly sparkGlueProperties: aws_datazone.CfnConnection.SparkGluePropertiesInputProperty;
}

/**
 * Properties for a SparkGlueConnection construct.
 */
export interface SparkGlueConnectionProps {
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
  /** The Spark Glue connection resource properties. */
  readonly props: SparkGlueConnectionResourceProps;
}
