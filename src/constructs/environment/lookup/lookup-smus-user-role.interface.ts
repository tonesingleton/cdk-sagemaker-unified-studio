import type { aws_iam as iam } from 'aws-cdk-lib';

/**
 * Properties for the LookupSmusUserRole construct.
 */
export interface LookupSmusUserRoleProps {
  /** The SageMaker Unified Studio domain ID. */
  readonly domainId: string;
  /** The project ID whose Tooling environment user role to look up. */
  readonly projectId: string;
  /**
   * The DataZone API role to use for the environment lookup custom resource.
   *
   * Must be a project owner so it can call the project-scoped `ListEnvironments` API.
   * Pass `domain.datazoneApiRole` here.
   */
  readonly datazoneApiRole: iam.IRole;
}
