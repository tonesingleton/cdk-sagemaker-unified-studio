import type { ConnectionProps } from '../../connection.interface';

/**
 * Properties for a DynamoDbConnection construct.
 *
 * Creates a Glue connection of type DYNAMODB targeting an Amazon DynamoDB table.
 * No VPC or credentials required — access is controlled via the IAM role.
 * Supports Spark and Athena compute.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-connection.html
 */
export interface DynamoDbConnectionProps extends ConnectionProps {
  /**
   * The ARN of the DynamoDB table to connect to.
   */
  readonly tableArn: string;

  /**
   * The IAM role ARN passed to Glue for accessing the DynamoDB table.
   */
  readonly roleArn: string;

  /**
   * Additional Spark-specific connection properties.
   *
   * @default - no additional Spark properties
   */
  readonly sparkProperties?: Record<string, string>;

  /**
   * Additional Athena-specific connection properties.
   *
   * @default - no additional Athena properties
   */
  readonly athenaProperties?: Record<string, string>;
}
