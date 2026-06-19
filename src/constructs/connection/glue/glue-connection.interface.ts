import type { aws_datazone } from 'aws-cdk-lib';

/**
 * Properties for the Glue connection resource configuration.
 */
export interface GlueConnectionResourceProps {
  /** The Glue connection properties. */
  readonly glueProperties: aws_datazone.CfnConnection.GluePropertiesInputProperty;
}

/**
 * Properties for a GlueConnection construct.
 */
export interface GlueConnectionProps {
  /** Display name of the connection (must be lowercase). */
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
  /** The Glue connection resource properties. */
  readonly props: GlueConnectionResourceProps;
}
