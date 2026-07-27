import type { aws_iam as iam } from 'aws-cdk-lib';

/**
 * A single AWS DataZone SDK call bound to a custom-resource lifecycle event.
 *
 * The service is always DataZone; specify the action and its input using the
 * AWS SDK for JavaScript v3 DataZone client shapes.
 *
 * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/datazone/
 */
export interface DataZoneSdkCall {
  /**
   * The DataZone API action to invoke, e.g. `ListConnections`, `StartDataSourceRun`,
   * `CreateGlossary`.
   */
  readonly action: string;
  /**
   * The action input, matching the DataZone API request shape (camelCase keys),
   * e.g. `{ domainIdentifier, projectIdentifier }`.
   *
   * @default - no parameters
   */
  readonly parameters?: Record<string, any>;
  /**
   * Response fields to expose via `getResponseField`, using dot/index notation
   * against the API response, e.g. `['items.0.connectionId']`.
   *
   * @default - no response fields are retained
   */
  readonly outputPaths?: Array<string>;
  /**
   * A stable physical resource ID for the custom resource. Change it to force the
   * call to run again on the next deployment.
   *
   * Ignored when `physicalResourceIdFromResponsePath` is set.
   *
   * @default - the construct's path (stable across deployments)
   */
  readonly physicalResourceId?: string;
  /**
   * Derive the physical resource ID from a field in the call's response, using
   * dot/index notation (e.g. `'id'`). Use this for create/update calls that return a
   * server-generated identifier, so that `onUpdate`/`onDelete` can target it via
   * {@link DataZoneApiCall.PHYSICAL_RESOURCE_ID}.
   *
   * Takes precedence over `physicalResourceId`.
   *
   * @default - a static physical resource ID is used
   */
  readonly physicalResourceIdFromResponsePath?: string;
  /**
   * Regex pattern matched against the error code or message. When the SDK call throws
   * and the error matches, the custom resource reports SUCCESS instead of FAILED.
   *
   * Multiple patterns can be combined with `|`, e.g. `'already exists|ConflictException'`.
   *
   * @default - errors are never ignored
   */
  readonly ignoreErrorCodesMatching?: string;
}

/**
 * Properties for a DataZoneApiCall construct.
 */
export interface DataZoneApiCallProps {
  /**
   * The IAM role that executes the SDK call.
   *
   * For DataZone membership-gated actions this must be a DataZone-enrolled principal
   * (a registered user profile with an owner/member association) — not merely a role
   * with `datazone:*` IAM permissions. Typically `domain.datazoneApiRole`.
   *
   * IMPORTANT: this is backed by `AwsCustomResource`, which uses a single stack-wide
   * singleton Lambda. Every `DataZoneApiCall` (and any other `AwsCustomResource`) in a
   * stack shares that Lambda and the role of whichever instance is synthesized first,
   * so pass the SAME enrolled role to all of them.
   */
  readonly role: iam.IRole;
  /**
   * The call to run when the resource is created.
   *
   * @default - the onUpdate call, if provided
   */
  readonly onCreate?: DataZoneSdkCall;
  /**
   * The call to run when the resource is updated.
   *
   * @default - the onCreate call, if provided
   */
  readonly onUpdate?: DataZoneSdkCall;
  /**
   * The call to run when the resource is deleted.
   *
   * @default - no delete call
   */
  readonly onDelete?: DataZoneSdkCall;
  /**
   * Whether to install the latest AWS SDK into the custom-resource Lambda at deploy
   * time. Leave `false` to use the runtime-bundled SDK (faster, no install step;
   * sufficient for all generally-available DataZone actions).
   *
   * @default false
   */
  readonly installLatestAwsSdk?: boolean;
}
