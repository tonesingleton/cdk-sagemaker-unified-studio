import { Stack, aws_iam as iam } from 'aws-cdk-lib';
import type { NagPackSuppression } from 'cdk-nag';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import type { AccountRolesProps, IAccountRoles } from './account-roles.interface';
import { LakeFormationAdminSync } from './constructs';

const EXECUTION_ROLE_TRUST_PRINCIPALS = [
  'datazone.amazonaws.com',
  'sagemaker.amazonaws.com',
  'glue.amazonaws.com',
  'bedrock.amazonaws.com',
  'scheduler.amazonaws.com',
  'lakeformation.amazonaws.com',
  'airflow-serverless.amazonaws.com',
  'athena.amazonaws.com',
  'redshift.amazonaws.com',
  'emr-serverless.amazonaws.com',
];

/**
 * Account-level IAM roles shared across all SageMaker Unified Studio domains.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html
 */
export class AccountRoles extends Construct implements IAccountRoles {
  public readonly provisioningRole: iam.IRole;
  /**
   * The execution role defines the AWS services and data that can be accessed
   * through Amazon SageMaker Unified Studio projects. It determines which tools,
   * compute resources, data sources, and AI/ML assets project members can access.
   * Amazon SageMaker Unified Studio assumes this role to make service calls on
   * behalf of users within projects.
   *
   * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/setup-iam-based-domains.html
   */
  public readonly executionRole: iam.IRole;
  public readonly queryExecutionRole: iam.IRole;
  public readonly bedrockModelManagementRole: iam.IRole;
  public readonly bedrockFmConsumptionRole: iam.IRole;

  constructor(scope: Construct, id: string, props: AccountRolesProps) {
    super(scope, id);

    const account = Stack.of(this).account;

    // Query Execution Role
    const queryExecutionRole = new iam.Role(this, 'QueryExecutionRole', {
      roleName: 'AmazonSageMakerQueryExecution',
      path: '/service-role/',
      description:
        'This role is used while running a query execution. AWS Lake Formation assumes ' +
        'this role to vend credentials needed by Amazon Athena during query execution.',
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('lakeformation.amazonaws.com'),
        new iam.ServicePrincipal('glue.amazonaws.com'),
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/SageMakerStudioQueryExecutionRolePolicy'),
      ],
    });

    queryExecutionRole.assumeRolePolicy!.addStatements(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole', 'sts:SetContext'],
        principals: [
          new iam.ServicePrincipal('lakeformation.amazonaws.com'),
          new iam.ServicePrincipal('glue.amazonaws.com'),
        ],
        conditions: { StringEquals: { 'aws:SourceAccount': account } },
      }),
    );

    NagSuppressions.addResourceSuppressions(queryExecutionRole, [
      {
        id: 'AwsSolutions-IAM4',
        reason:
          'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/AmazonSageMakerQueryExecution.html',
        appliesTo: [
          'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/SageMakerStudioQueryExecutionRolePolicy',
        ],
      } satisfies NagPackSuppression,
    ]);

    // Provisioning Role
    const provisioningRole = new iam.Role(this, 'ProvisioningRole', {
      roleName: `AmazonSageMakerProvisioning-${account}`,
      path: '/service-role/',
      description:
        'Amazon SageMaker Unified Studio uses this role to provision and manage ' +
        'resources defined in the selected blueprints in your account.',
      assumedBy: new iam.ServicePrincipal('datazone.amazonaws.com', {
        conditions: { StringEquals: { 'aws:SourceAccount': account } },
      }),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/SageMakerStudioProjectProvisioningRolePolicy'),
      ],
    });

    NagSuppressions.addResourceSuppressions(provisioningRole, [
      {
        id: 'AwsSolutions-IAM4',
        reason:
          'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/AmazonSageMakerProvisioning.html',
        appliesTo: [
          'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/SageMakerStudioProjectProvisioningRolePolicy',
        ],
      } satisfies NagPackSuppression,
      {
        id: 'AwsSolutions-IAM5',
        reason:
          'The ToolingLite blueprint creates S3 buckets named amazon-sagemaker-<account>-<region>-<projectId>. ' +
          'The provisioning role needs bucket policy management on these buckets for environment cleanup.',
        appliesTo: [`Resource::arn:aws:s3:::amazon-sagemaker-<AWS::AccountId>-${Stack.of(this).region}-*`],
      } satisfies NagPackSuppression,
    ]);

    provisioningRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'PassQueryExecutionRole',
        actions: ['iam:PassRole', 'iam:GetRole'],
        resources: [queryExecutionRole.roleArn],
      }),
    );

    provisioningRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'S3BucketPolicyManagement',
        actions: ['s3:GetBucketPolicy', 's3:PutBucketPolicy', 's3:DeleteBucketPolicy'],
        resources: [`arn:aws:s3:::amazon-sagemaker-${account}-${Stack.of(this).region}-*`],
      }),
    );

    // Execution Role
    const executionRolePrincipals = EXECUTION_ROLE_TRUST_PRINCIPALS.map((s) => new iam.ServicePrincipal(s));

    const executionRole = new iam.Role(this, 'ExecutionRole', {
      roleName: `AmazonSageMakerExecution-${account}`,
      description:
        'This role defines the AWS services and data that can be accessed through Amazon SageMaker ' +
        'Unified Studio projects. The execution role determines which tools, compute resources, data sources, ' +
        'and AI/ML assets project members can access. Amazon SageMaker Unified Studio assumes this role to ' +
        'make service calls on behalf of users within projects.',
      assumedBy: new iam.CompositePrincipal(...executionRolePrincipals),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('SageMakerStudioAdminIAMPermissiveExecutionPolicy')],
    });

    executionRole.assumeRolePolicy!.addStatements(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole', 'sts:TagSession', 'sts:SetContext', 'sts:SetSourceIdentity'],
        principals: executionRolePrincipals,
        conditions: { StringEquals: { 'aws:SourceAccount': account } },
      }),
    );

    executionRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'KMSDescribePermissions',
        actions: ['kms:DescribeKey'],
        resources: [props.kmsKeyArn],
      }),
    );

    executionRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'KMSPermissions',
        actions: ['kms:Decrypt', 'kms:GenerateDataKey'],
        resources: [props.kmsKeyArn],
        conditions: {
          'ForAnyValue:StringEquals': { 'kms:EncryptionContextKeys': 'aws:datazone:domainId' },
        },
      }),
    );

    NagSuppressions.addResourceSuppressions(executionRole, [
      {
        id: 'AwsSolutions-IAM4',
        reason:
          'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/setup-iam-based-domains.html',
        appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/SageMakerStudioAdminIAMPermissiveExecutionPolicy'],
      } satisfies NagPackSuppression,
    ]);

    // Bedrock Model Management Role
    const bedrockModelManagementRole = new iam.Role(this, 'BedrockModelManagementRole', {
      roleName: 'AmazonDataZoneBedrockModelManagementRole',
      description:
        'Amazon SageMaker Unified Studio uses this role to create inference profiles ' +
        'for Amazon Bedrock models in a project.',
      assumedBy: new iam.ServicePrincipal('datazone.amazonaws.com', {
        conditions: { StringEquals: { 'aws:SourceAccount': account } },
      }),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonDataZoneBedrockModelManagementPolicy'),
      ],
    });

    bedrockModelManagementRole.assumeRolePolicy!.addStatements(
      new iam.PolicyStatement({
        actions: ['sts:SetContext'],
        principals: [new iam.ServicePrincipal('datazone.amazonaws.com')],
        conditions: { StringEquals: { 'aws:SourceAccount': account } },
      }),
    );

    NagSuppressions.addResourceSuppressions(bedrockModelManagementRole, [
      {
        id: 'AwsSolutions-IAM4',
        reason:
          'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/AmazonDataZoneBedrockModelManagementRole.html',
        appliesTo: [
          'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonDataZoneBedrockModelManagementPolicy',
        ],
      } satisfies NagPackSuppression,
    ]);

    // Bedrock FM Consumption Role
    const bedrockFmConsumptionRole = new iam.Role(this, 'BedrockFmConsumptionRole', {
      roleName: 'AmazonDataZoneBedrockFMConsumptionRole',
      description: 'A consumption role required for Amazon Bedrock models enabled in the playground for non-builders.',
      assumedBy: new iam.ServicePrincipal('datazone.amazonaws.com', {
        conditions: { StringEquals: { 'aws:SourceAccount': account } },
      }),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonDataZoneBedrockModelConsumptionPolicy'),
      ],
    });

    NagSuppressions.addResourceSuppressions(bedrockFmConsumptionRole, [
      {
        id: 'AwsSolutions-IAM4',
        reason:
          'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/AmazonDataZoneBedrockFMConsumptionRole.html',
        appliesTo: [
          'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonDataZoneBedrockModelConsumptionPolicy',
        ],
      } satisfies NagPackSuppression,
    ]);

    this.queryExecutionRole = queryExecutionRole;
    this.provisioningRole = provisioningRole;
    this.executionRole = executionRole;
    this.bedrockModelManagementRole = bedrockModelManagementRole;
    this.bedrockFmConsumptionRole = bedrockFmConsumptionRole;

    // Register the execution role as a Lake Formation data lake administrator
    new LakeFormationAdminSync(this, 'LakeFormationAdminSync', executionRole.roleArn);
  }
}
