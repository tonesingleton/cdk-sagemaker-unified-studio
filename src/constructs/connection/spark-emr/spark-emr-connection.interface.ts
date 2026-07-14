import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for a SparkEmrConnection construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface SparkEmrConnectionProps extends ConnectionProps {
  /** The ARN of the EMR Serverless application or EMR cluster. */
  readonly computeArn: string;
}
