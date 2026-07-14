import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for a SparkGlueConnection construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface SparkGlueConnectionProps extends ConnectionProps {
  /**
   * The Glue worker type (e.g. 'G.1X', 'G.2X').
   *
   * @default 'G.1X'
   */
  readonly workerType?: string;
  /**
   * The Glue version (e.g. '4.0').
   *
   * @default '4.0'
   */
  readonly glueVersion?: string;
  /**
   * The idle timeout in minutes before the session is terminated.
   *
   * @default 60
   */
  readonly idleTimeout?: number;
  /**
   * The number of workers allocated to the Glue session.
   *
   * @default 10
   */
  readonly numberOfWorkers?: number;
}
