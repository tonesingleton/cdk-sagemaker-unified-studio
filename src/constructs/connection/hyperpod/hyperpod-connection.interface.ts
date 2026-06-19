import type { aws_datazone } from 'aws-cdk-lib';

/**
 * Properties for the HyperPod connection resource configuration.
 */
export interface HyperPodConnectionResourceProps {
  /** The HyperPod connection properties. */
  readonly hyperPodProperties: aws_datazone.CfnConnection.HyperPodPropertiesInputProperty;
}

/**
 * Properties for a HyperPodConnection construct.
 */
export interface HyperPodConnectionProps {
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
  /** The AWS location configuration (access role, account, region). */
  readonly awsLocation?: aws_datazone.CfnConnection.AwsLocationProperty;
  /** The HyperPod connection resource properties. */
  readonly props: HyperPodConnectionResourceProps;
}
