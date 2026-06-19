import type { aws_datazone } from 'aws-cdk-lib';

/**
 * Properties for the Redshift connection resource configuration.
 */
export interface RedshiftConnectionResourceProps {
  /** The Redshift connection properties. */
  readonly redshiftProperties: aws_datazone.CfnConnection.RedshiftPropertiesInputProperty;
}

/**
 * Properties for a RedshiftConnection construct.
 */
export interface RedshiftConnectionProps {
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
  /** The Redshift connection resource properties. */
  readonly props: RedshiftConnectionResourceProps;
}
