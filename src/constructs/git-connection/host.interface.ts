import type { GitProviderType } from './git-connection.interface';

/**
 * VPC configuration for a CodeConnections host.
 *
 * Required when the Git provider endpoint is only reachable from within a VPC.
 *
 * @see https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-host-vpc.html
 */
export interface HostVpcConfiguration {
  /** The ID of the VPC. */
  readonly vpcId: string;
  /** The subnet IDs to use for the host. */
  readonly subnetIds: Array<string>;
  /** The security group IDs to associate with the host. */
  readonly securityGroupIds: Array<string>;
  /**
   * The PEM-encoded TLS certificate for the Git provider endpoint.
   *
   * @default - no custom TLS certificate
   */
  readonly tlsCertificate?: string;
}

/**
 * Properties for the Host construct.
 *
 * @see https://docs.aws.amazon.com/codeconnections/latest/APIReference/API_CreateHost.html
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
   * VPC configuration for the host.
   *
   * Required when the Git provider is only reachable from within a VPC.
   *
   * @default - no VPC configuration (public endpoint)
   */
  readonly vpcConfiguration?: HostVpcConfiguration;
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
