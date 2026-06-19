import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for a HyperPodConnection construct.
 */
export interface HyperPodConnectionProps extends ConnectionProps {
  /**
   * The HyperPod cluster name.
   *
   * @pattern ^[a-zA-Z0-9](-*[a-zA-Z0-9])*$
   */
  readonly clusterName: string;
}
