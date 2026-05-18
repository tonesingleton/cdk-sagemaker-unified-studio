import type { GitProviderType } from './git-connection.interface';

/**
 * Properties for the Host construct.
 */
export interface HostProps {
  /** Display name of the host. */
  readonly name: string;
  /**
   * The endpoint URL of the Git provider (e.g. `https://github.example.com`).
   */
  readonly providerEndpoint: string;
  /**
   * The Git provider type.
   */
  readonly providerType: GitProviderType;
  /**
   * Tags to apply to the host at creation time.
   *
   * @default - no tags
   */
  readonly tags?: { [key: string]: string };
}

/**
 * Exposed attributes of the Host construct.
 */
export interface IHost {
  /** The ARN of the CodeConnections host. */
  readonly hostArn: string;
}
