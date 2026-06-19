import type { aws_datazone } from 'aws-cdk-lib';

/**
 * The scope of a connection.
 */
export enum ConnectionScope {
  /** Domain-level connection. */
  DOMAIN = 'DOMAIN',
  /** Project-level connection. */
  PROJECT = 'PROJECT',
}

/**
 * The AWS location where a connection is created.
 */
export interface AwsLocation {
  /**
   * The IAM role ARN used as the access role.
   *
   * @default - no access role
   */
  readonly accessRole?: string;
  /**
   * The AWS account ID.
   *
   * @default - current account
   */
  readonly awsAccountId?: string;
  /**
   * The AWS region.
   *
   * @default - current region
   */
  readonly awsRegion?: string;
  /**
   * The IAM connection ID.
   *
   * @default - no IAM connection
   */
  readonly iamConnectionId?: string;
}

/**
 * Common properties shared by all connection constructs.
 */
export interface ConnectionProps {
  /**
   * The name of the connection.
   *
   * @pattern ^[\w][\w\.\-\_]*$
   */
  readonly name: string;
  /**
   * The ID of the domain where the connection is created.
   *
   * @pattern ^dzd[_-][a-zA-Z0-9_-]{1,36}$
   */
  readonly domainIdentifier: string;
  /**
   * The ID of the project that owns this connection.
   *
   * @default - derived from the environment
   */
  readonly projectIdentifier?: string;
  /**
   * The ID of the environment where the connection is created.
   *
   * @default - no environment
   */
  readonly environmentIdentifier?: string;
  /**
   * Connection description.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * The AWS location where the connection is created.
   *
   * @default - no AWS location
   */
  readonly awsLocation?: AwsLocation;
  /**
   * The scope of the connection.
   *
   * @default - no scope
   */
  readonly connectionScope?: ConnectionScope;
  /**
   * Whether trusted identity propagation is enabled.
   *
   * @default - no trusted identity propagation
   */
  readonly enableTrustedIdentityPropagation?: boolean;
  /**
   * The configurations of the connection.
   *
   * @default - no configurations
   */
  readonly configurations?: Array<aws_datazone.CfnConnection.ConnectionConfigurationProperty>;
}
