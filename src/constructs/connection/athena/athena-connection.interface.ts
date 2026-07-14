import type { ConnectionProps } from '../connection.interface';

/**
 * Properties for an AthenaConnection construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface AthenaConnectionProps extends ConnectionProps {
  /** The Athena workgroup name. */
  readonly workgroupName: string;
}
