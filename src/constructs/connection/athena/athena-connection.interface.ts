import type { aws_datazone } from 'aws-cdk-lib';

/**
 * Properties for the Athena connection resource configuration.
 */
export interface AthenaConnectionResourceProps {
  /** The Athena connection properties. */
  readonly athenaProperties: aws_datazone.CfnConnection.AthenaPropertiesInputProperty;
}

/**
 * Properties for an AthenaConnection construct.
 */
export interface AthenaConnectionProps {
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
  /** The Athena connection resource properties. */
  readonly props: AthenaConnectionResourceProps;
}
