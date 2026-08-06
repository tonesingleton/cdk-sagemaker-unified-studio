import type { ConnectionProps } from '../../connection.interface';

/**
 * Properties for an OpenSearchConnection construct.
 *
 * Creates a Glue connection of type OPENSEARCH targeting an Amazon OpenSearch Service domain.
 * Uses BASIC authentication via a Secrets Manager secret. Supports optional VPC configuration
 * for domains hosted within a VPC. Only Spark compute is supported.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface OpenSearchConnectionProps extends ConnectionProps {
  /**
   * The Amazon OpenSearch Service domain endpoint URL.
   *
   * Has the form: `https://search-<domainName>-<id>.<region>.es.amazonaws.com`
   */
  readonly endpoint: string;

  /**
   * The port open on the OpenSearch endpoint.
   *
   * @default 443
   */
  readonly port?: number;

  /**
   * ARN of the Secrets Manager secret containing OpenSearch credentials (USERNAME / PASSWORD).
   */
  readonly secretArn: string;

  /**
   * KMS key ARN used to encrypt the secret.
   *
   * @default - AWS managed key
   */
  readonly kmsKeyArn?: string;

  /**
   * The IAM role ARN used to access Secrets Manager and assign a VPC IP address.
   *
   * @default - no role ARN
   */
  readonly roleArn?: string;

  /**
   * VPC subnet ID. Required when the OpenSearch domain is hosted in a VPC.
   *
   * @default - no VPC configuration
   */
  readonly subnetId?: string;

  /**
   * Security group IDs. Required when subnetId is provided.
   *
   * @default - no security groups
   */
  readonly securityGroupIds?: Array<string>;

  /**
   * Availability zone of the subnet.
   *
   * @default - no availability zone
   */
  readonly availabilityZone?: string;

  /**
   * Additional Spark-specific connection properties.
   *
   * @default - no additional Spark properties
   */
  readonly sparkProperties?: Record<string, string>;
}
