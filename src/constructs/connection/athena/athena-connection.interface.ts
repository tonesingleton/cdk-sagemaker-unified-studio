import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for an AthenaConnection construct.
 */
export interface AthenaConnectionProps extends ConnectionProps {
  /** The Athena workgroup name. */
  readonly workgroupName: string;
}
