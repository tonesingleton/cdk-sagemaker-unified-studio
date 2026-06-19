import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for a SparkEmrConnection construct.
 */
export interface SparkEmrConnectionProps extends ConnectionProps {
  /** The ARN of the EMR Serverless application or EMR cluster. */
  readonly computeArn: string;
}
