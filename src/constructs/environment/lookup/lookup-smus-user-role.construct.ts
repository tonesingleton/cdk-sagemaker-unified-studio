import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LookupEnvironment } from './lookup-environment.construct';
import type { LookupSmusUserRoleProps } from './lookup-smus-user-role.interface';
import { ManagedBlueprintIdentifier } from '../../blueprint/blueprint.interface';

/**
 * Resolves the ARN of the SMUS user role (`datazone_usr_role`) provisioned by
 * the Tooling blueprint for a given project.
 *
 * ## Background
 *
 * When the Tooling blueprint provisions an environment for a project, it creates
 * an IAM role named `datazone_usr_role_<projectId>_<environmentId>`. This role
 * is the execution identity assumed by **JupyterLab notebook users** when they
 * run code inside the project's Tooling environment — for example, running Spark
 * cells via Glue Interactive Sessions, querying data with Athena, or accessing S3.
 *
 * Because all project members share this single role (IAM-based domains have no
 * per-user attribution), it is also the role you attach additional IAM policies
 * to when you need notebook users to access resources outside the default
 * permissions granted by the Tooling blueprint — for example, reading from a
 * specific S3 bucket or calling a Glue connection.
 *
 * ## Why a construct is needed
 *
 * The role name follows a deterministic SMUS-specific convention that encodes
 * both the project ID and the Tooling environment ID. The environment ID is only
 * known after the Tooling blueprint has finished provisioning (it is not a
 * CloudFormation output), so it must be looked up at deploy time via
 * `DataZone:ListEnvironments`. This construct wraps that lookup and exposes the
 * fully-resolved role ARN as a CloudFormation token.
 *
 * @example
 * const userRole = new LookupSmusUserRole(this, 'SmusUserRole', {
 *   domainId: domain.domainId,
 *   projectId: project.id,
 *   datazoneApiRole: domain.datazoneApiRole,
 * });
 *
 * // Attach an additional policy so notebook users can read from a custom bucket
 * new iam.Policy(this, 'NotebookS3Access', {
 *   roles: [iam.Role.fromRoleArn(this, 'UserRole', userRole.roleArn, { mutable: false })],
 *   statements: [
 *     new iam.PolicyStatement({
 *       actions: ['s3:GetObject', 's3:ListBucket'],
 *       resources: ['arn:aws:s3:::my-bucket', 'arn:aws:s3:::my-bucket/*'],
 *     }),
 *   ],
 * });
 */
export class LookupSmusUserRole extends Construct {
  /**
   * The ARN of the `datazone_usr_role` IAM role created by the Tooling blueprint
   * for this project (CloudFormation token).
   */
  public readonly roleArn: string;
  public readonly environmentId: string;

  constructor(scope: Construct, id: string, props: LookupSmusUserRoleProps) {
    super(scope, id);

    this.environmentId = new LookupEnvironment(this, 'LookupEnvironment', {
      domainId: props.domainId,
      projectId: props.projectId,
      environmentName: ManagedBlueprintIdentifier.TOOLING,
      datazoneApiRole: props.datazoneApiRole,
    }).environmentId;

    const account = Stack.of(this).account;
    this.roleArn = `arn:aws:iam::${account}:role/datazone_usr_role_${props.projectId}_${this.environmentId}`;
  }
}
