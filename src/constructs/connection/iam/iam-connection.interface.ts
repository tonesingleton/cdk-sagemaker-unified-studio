import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for an IamConnection construct.
 */
export interface IamConnectionProps extends ConnectionProps {
  /**
   * Whether Glue lineage sync is enabled for this connection.
   *
   * @default false
   */
  readonly glueLineageSyncEnabled?: boolean;
}
