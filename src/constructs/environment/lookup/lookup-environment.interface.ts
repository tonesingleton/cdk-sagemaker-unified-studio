import type { aws_iam as iam } from 'aws-cdk-lib';

/**
 * Properties for the LookupEnvironment construct.
 */
export interface LookupEnvironmentProps {
  /** The SageMaker Unified Studio domain ID. */
  readonly domainId: string;
  /** The project ID to look up the environment in. */
  readonly projectId: string;
  /**
   * The name of the environment to look up (e.g. `'Tooling'`, `'ToolingLite'`).
   *
   * Must match exactly one environment in the project. If multiple environments
   * share the same name, the first result is returned.
   */
  readonly environmentName: string;
  /**
   * The DataZone API role to use for the custom resource Lambda.
   *
   * Must be a project owner so it can call the project-scoped `ListEnvironments` API.
   * Pass `domain.datazoneApiRole` here.
   */
  readonly datazoneApiRole: iam.IRole;
}
