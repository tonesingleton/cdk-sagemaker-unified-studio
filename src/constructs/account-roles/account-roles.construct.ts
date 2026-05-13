import { Stack, aws_iam as iam } from 'aws-cdk-lib';
import type { NagPackSuppression } from 'cdk-nag';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import type { AccountRolesProps, IAccountRoles } from './account-roles.interface';

/**
 * Account-level IAM roles shared across all SageMaker Unified Studio domains.
 *
 * Creates four roles:
 * - **Query execution role**: Assumed by Lake Formation and Glue to vend
 *   credentials for Athena query execution.
 * - **Provisioning role**: Assumed by SageMaker Unified Studio to provision
 *   and manage resources defined in environment blueprints.
 * - **Bedrock model management role**: Used to create inference profiles
 *   for Amazon Bedrock models in a project.
 * - **Bedrock FM consumption role**: Used for model invocation via
 *   inference profiles for non-builders.
 *
 * These roles are not domain-specific. Domain-specific roles (e.g. manage
 * access role) are created within the `Domain` construct.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html
 */
export class AccountRoles extends Construct implements IAccountRoles {
  public readonly provisioningRole: iam.IRole;
  public readonly queryExecutionRole: iam.IRole;
  public readonly bedrockModelManagementRole: iam.IRole;
  public readonly bedrockFmConsumptionRole: iam.IRole;

  constructor(scope: Construct, id: string, props: AccountRolesProps = {}) {
    super(scope, id);

    const account = props.account ?? Stack.of(this).account;

    const queryExecutionRole = new iam.Role(this, 'QueryExecutionRole', {
      roleName: 'AmazonSageMakerQueryExecution',
      description:
        'This role is used while running a query execution. AWS Lake Formation assumes ' +
        'this role to vend credentials needed by Amazon Athena during query execution.',
      assumedBy: new iam.ServicePrincipal('lakeformation.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/SageMakerStudioQueryExecutionRolePolicy'),
      ],
    });

    queryExecutionRole.assumeRolePolicy!.addStatements(
      new iam.PolicyStatement({
        actions: ['sts:AssumeRole', 'sts:SetContext'],
        principals: [
          new iam.ServicePrincipal('glue.amazonaws.com'),
          new iam.ServicePrincipal('lakeformation.amazonaws.com'),
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

    const provisioningRole = new iam.Role(this, 'ProvisioningRole', {
      roleName: `AmazonSageMakerProvisioning-${account}`,
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
    ]);

    // The provisioning role must be able to pass the query execution role to
    // Lake Formation during creation of federated connections (e.g. Athena).
    // See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/AmazonSageMakerQueryExecution.html
    provisioningRole.addToPolicy(
      new iam.PolicyStatement({
        sid: 'PassQueryExecutionRole',
        actions: ['iam:PassRole', 'iam:GetRole'],
        resources: [queryExecutionRole.roleArn],
      }),
    );

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
    this.bedrockModelManagementRole = bedrockModelManagementRole;
    this.bedrockFmConsumptionRole = bedrockFmConsumptionRole;
  }
}
