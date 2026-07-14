import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for an MwaaConnection construct.
 *
 * Creates a connection to an Amazon MWAA (Managed Workflows for Apache Airflow)
 * environment within SageMaker Unified Studio.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface MwaaConnectionProps extends ConnectionProps {
  /**
   * The name of the MWAA environment to connect to.
   */
  readonly mwaaEnvironmentName: string;
}
