import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for an IamConnection construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface IamConnectionProps extends ConnectionProps {
  /**
   * Whether Glue lineage sync is enabled for this connection.
   *
   * @default false
   */
  readonly glueLineageSyncEnabled?: boolean;
}
