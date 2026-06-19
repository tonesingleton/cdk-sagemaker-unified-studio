import type { aws_datazone } from 'aws-cdk-lib';

/**
 * Properties for the IAM connection resource configuration.
 */
export interface IamConnectionResourceProps {
  /** The IAM connection properties. */
  readonly iamProperties: aws_datazone.CfnConnection.IamPropertiesInputProperty;
}

/**
 * Properties for an IamConnection construct.
 */
export interface IamConnectionProps {
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
  /** The IAM connection resource properties. */
  readonly props: IamConnectionResourceProps;
}
