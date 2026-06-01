/**
 * Supported Git provider types for CodeConnections.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/git-connections.html
 */
export enum GitProviderType {
  /** GitHub cloud-hosted. */
  GITHUB = 'GitHub',
  /** GitHub Enterprise Server (self-managed). */
  GITHUB_ENTERPRISE_SERVER = 'GitHubEnterpriseServer',
  /** GitLab cloud-hosted. */
  GITLAB = 'GitLab',
  /** GitLab self-managed. */
  GITLAB_SELF_MANAGED = 'GitLabSelfManaged',
  /** Bitbucket cloud-hosted. */
  BITBUCKET = 'Bitbucket',
}

/**
 * Properties for the GitConnection construct.
 */
export interface GitConnectionProps {
  /** Display name of the connection. */
  readonly name: string;
  /**
   * ARN of an existing, already-authorized CodeConnection.
   *
   * When provided, `providerType` and `hostArn` are ignored and no new
   * `AWS::CodeConnections::Connection` resource is created.
   *
   * @default - a new CodeConnection is created (requires manual authorization after deployment)
   */
  readonly codeConnectionArn?: string;
  /**
   * The Git provider type.
   *
   * Required when `codeConnectionArn` is not provided.
   *
   * @default - required when creating a new CodeConnection
   */
  readonly providerType?: GitProviderType;
  /**
   * The ARN of the host for self-managed providers (e.g. GitHubEnterpriseServer, GitLabSelfManaged).
   *
   * @default - not required for cloud-hosted providers
   */
  readonly hostArn?: string;
}

/**
 * Exposed attributes of the GitConnection construct.
 */
export interface IGitConnection {
  /** The ARN of the CodeConnections connection. */
  readonly codeConnectionArn: string;
  /**
   * The status of the CodeConnections connection.
   *
   * New connections are created in `PENDING` status and must be authorized
   * in the AWS Console before they can be used.
   *
   * Only available when a new connection is created (not when using an existing ARN).
   */
  readonly connectionStatus?: string;
}
