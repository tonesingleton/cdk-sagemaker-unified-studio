import type {
  RemovalPolicy,
  aws_datazone as datazone,
  aws_ec2 as ec2,
  aws_iam as iam,
  aws_s3 as s3,
} from 'aws-cdk-lib';
import type { Blueprint } from '../blueprint/blueprint.construct';

/**
 * Configuration for a domain unit within a SageMaker Unified Studio domain.
 */
export interface DomainUnitConfig {
  /** Display name of the domain unit. */
  readonly name: string;
  /**
   * Description of the domain unit.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * Name of the parent domain unit (must match another unit's `name`).
   *
   * @default - root domain unit
   */
  readonly parentDomainUnitName?: string;
}

/**
 * Properties for the Domain construct.
 */
export interface DomainProps {
  /** Display name of the domain. */
  readonly name: string;
  /**
   * Human-readable description of the domain's purpose.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * ARN of the account-level provisioning role for blueprint configurations.
   * Typically obtained from `AccountRoles.provisioningRole.roleArn`.
   */
  readonly provisioningRoleArn: string;
  /**
   * IAM role ARNs to grant permission to assume the domain execution role.
   * These are the roles your users federate into (e.g. SSO permission set roles).
   *
   * @default - no additional roles
   */
  readonly assumeRoleArns?: Array<string>;
  /** VPC for the Tooling blueprint's SageMaker domain. */
  readonly vpc: ec2.IVpc;
  /**
   * Subnet selection for the Tooling blueprint.
   *
   * @default SubnetType.PRIVATE_WITH_EGRESS
   */
  readonly vpcSubnets?: ec2.SubnetSelection;
  /**
   * Domain unit configurations. Automatically sorted topologically so
   * parents are always created before their children.
   *
   * @default - no domain units
   */
  readonly domainUnits?: Array<DomainUnitConfig>;
  /**
   * Additional blueprint identifiers to activate beyond Tooling (which is
   * always included). Use `ManagedBlueprintIdentifier` constants or custom strings.
   *
   * @default - only Tooling
   */
  readonly additionalBlueprintIdentifiers?: Array<string>;
  /**
   * Removal policy for S3 buckets created by this construct.
   *
   * @default RemovalPolicy.RETAIN
   */
  readonly removalPolicy?: RemovalPolicy;
  /**
   * Whether to automatically delete S3 objects when the stack is destroyed.
   * Requires `removalPolicy` to be set to `RemovalPolicy.DESTROY`.
   *
   * @default false
   */
  readonly autoDeleteObjects?: boolean;
  /**
   * Name for the projects S3 bucket.
   *
   * Must start with one of the allowed prefixes defined in `ALLOWED_BUCKET_PREFIXES`
   * (e.g. `amazon-sagemaker-`).
   *
   * @default `amazon-sagemaker-{account}-{region}-{domainId}`
   */
  readonly projectsBucketName?: string;
  /**
   * Name for the access logs S3 bucket.
   *
   * @default `sagemaker-logs-{account}-{region}-{domainId}`
   */
  readonly accessLogsBucketName?: string;
  /**
   * IAM principal ARNs to grant Lake Formation DATA_LOCATION_ACCESS on the
   * projects bucket. The grant is performed by the manage access role (which
   * is a Lake Formation admin) via a custom resource Lambda.
   *
   * @default - no grants
   */
  readonly dataLocationGrantPrincipals?: Array<string>;
}

/**
 * Exposed attributes of the Domain construct.
 */
export interface IDomain {
  readonly domainId: string;
  readonly domainArn: string;
  readonly rootDomainUnitId: string;
  readonly domainExecutionRole: iam.IRole;
  readonly manageAccessRole: iam.IRole;
  readonly domainUnits: { [name: string]: datazone.CfnDomainUnit };
  readonly blueprints: { [identifier: string]: Blueprint };
  readonly blueprintPolicyGrants: Array<datazone.CfnPolicyGrant>;
  readonly projectsBucket: s3.IBucket;
  readonly accessLogsBucket: s3.IBucket;
}
