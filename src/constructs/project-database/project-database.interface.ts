/**
 * Properties for a ProjectDatabase construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-glue-database.html
 */
export interface ProjectDatabaseProps {
  /** The name of the Glue database to create. */
  readonly databaseName: string;
  /**
   * Human-readable description of the database.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * The ARN of the project execution role that will be granted
   * Lake Formation permissions on the database.
   */
  readonly projectExecutionRoleArn: string;
  /**
   * The S3 location URI for the database.
   *
   * @default - no location (tables define their own locations)
   */
  readonly locationUri?: string;
}

/**
 * Exposed attributes of the ProjectDatabase construct.
 */
export interface IProjectDatabase {
  /** The name of the Glue database. */
  readonly databaseName: string;
}
