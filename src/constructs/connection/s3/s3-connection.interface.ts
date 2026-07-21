import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for an S3Connection construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface S3ConnectionProps extends ConnectionProps {
  /**
   * The S3 URI to connect to.
   *
   * @pattern s3://.+/
   */
  readonly s3Uri: string;
  /**
   * Whether to register the S3 Access Grant location.
   *
   * @default - no registration
   */
  readonly registerS3AccessGrantLocation?: boolean;
  /**
   * The S3 Access Grant location ID.
   *
   * @pattern [a-zA-Z0-9\-]+
   * @default - no access grant location
   */
  readonly s3AccessGrantLocationId?: string;
}
