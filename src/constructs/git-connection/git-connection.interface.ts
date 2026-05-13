/**
 * Supported Git provider types for CodeConnections.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/git-connections.html
 */
export class GitProviderType {
  public static readonly GITHUB = 'GitHub';
  public static readonly GITHUB_ENTERPRISE_SERVER = 'GitHubEnterpriseServer';
  public static readonly GITLAB = 'GitLab';
  public static readonly GITLAB_SELF_MANAGED = 'GitLabSelfManaged';
  public static readonly BITBUCKET = 'Bitbucket';

  /* istanbul ignore next */
  private constructor() {}
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
   * Use `GitProviderType` constants or pass a custom string.
   * Required when `codeConnectionArn` is not provided.
   *
   * @default - required when creating a new CodeConnection
   */
  readonly providerType?: string;
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
}
