import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for a HyperPodConnection construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface HyperPodConnectionProps extends ConnectionProps {
  /**
   * The HyperPod cluster name.
   *
   * @pattern ^[a-zA-Z0-9](-*[a-zA-Z0-9])*$
   */
  readonly clusterName: string;
}
