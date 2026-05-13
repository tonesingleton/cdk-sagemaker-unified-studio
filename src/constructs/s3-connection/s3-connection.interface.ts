/**
 * Properties for an S3Connection construct.
 */
export interface S3ConnectionProps {
  /** Display name of the connection. */
  readonly name: string;
  /** The SageMaker Unified Studio domain ID. */
  readonly domainId: string;
  /** The environment ID where the connection is created. */
  readonly environmentId: string;
  /**
   * The project ID that owns this connection.
   *
   * @default - derived from the environment
   */
  readonly projectId?: string;
  /**
   * The S3 URI to connect to (e.g. `s3://bucket-name/prefix/`).
   */
  readonly s3Uri: string;
  /**
   * Human-readable description of the connection.
   *
   * @default - no description
   */
  readonly description?: string;
}
