import {
  CustomResource,
  Duration,
  Stack,
  aws_iam as iam,
  aws_lambda as lambda_,
  custom_resources as cr,
} from 'aws-cdk-lib';
import type { NagPackSuppression } from 'cdk-nag';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { CLEANUP_HANDLER_CODE } from './lake-formation-cleanup.handler';

/**
 * Properties for the LakeFormationCleanup construct.
 */
export interface LakeFormationCleanupProps {
  /** Role ARNs to deregister from Lake Formation admins on stack deletion. */
  readonly roleArns: ReadonlyArray<string>;
  /** The DataZone domain ID for Glue database cleanup. */
  readonly domainId: string;
  /** Principal ARNs to grant/revoke DATA_LOCATION_ACCESS on the bucket. */
  readonly dataLocationGrantPrincipals: ReadonlyArray<string>;
  /** The S3 bucket ARN for DATA_LOCATION_ACCESS grants. */
  readonly bucketArn: string;
}

/**
 * Custom resource that manages Lake Formation cleanup on stack lifecycle events.
 *
 * On Create/Update: grants DATA_LOCATION_ACCESS to specified principals.
 * On Delete: revokes grants, removes roles from Lake Formation admins,
 * and cleans up Glue databases created by DataLake environments.
 */
export class LakeFormationCleanup extends Construct {
  constructor(scope: Construct, id: string, props: LakeFormationCleanupProps) {
    super(scope, id);

    const region = Stack.of(this).region;
    const account = Stack.of(this).account;

    const handler = new lambda_.Function(this, 'Handler', {
      runtime: lambda_.Runtime.NODEJS_24_X,
      handler: 'index.handler',
      timeout: Duration.minutes(1),
      code: lambda_.Code.fromInline(CLEANUP_HANDLER_CODE),
    });

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          'lakeformation:GetDataLakeSettings',
          'lakeformation:PutDataLakeSettings',
          'lakeformation:GrantPermissions',
          'lakeformation:RevokePermissions',
        ],
        resources: ['*'],
      }),
    );

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['datazone:ListProjects', 'datazone:ListEnvironments'],
        resources: ['*'],
      }),
    );

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['glue:DeleteDatabase'],
        resources: [
          `arn:aws:glue:${region}:${account}:catalog`,
          `arn:aws:glue:${region}:${account}:database/glue_db_*`,
        ],
      }),
    );

    NagSuppressions.addResourceSuppressions(
      handler,
      [
        {
          id: 'AwsSolutions-IAM4',
          reason: 'Lambda basic execution role is required for CloudWatch logging.',
          appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'],
        } satisfies NagPackSuppression,
        {
          id: 'AwsSolutions-IAM5',
          reason:
            'Lake Formation settings, SageMaker Unified Studio list operations, and Glue database cleanup are account-level and do not support resource-level permissions.',
          appliesTo: ['Resource::*', `Resource::arn:aws:glue:${region}:${account}:database/glue_db_*`],
        } satisfies NagPackSuppression,
      ],
      true,
    );

    const provider = new cr.Provider(this, 'Provider', {
      onEventHandler: handler,
    });

    NagSuppressions.addResourceSuppressions(
      provider,
      [
        {
          id: 'AwsSolutions-IAM4',
          reason: 'Provider framework Lambda requires basic execution role for CloudWatch logging.',
          appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'],
        } satisfies NagPackSuppression,
        {
          id: 'AwsSolutions-L1',
          reason: 'Provider framework manages its own Lambda runtime version.',
        } satisfies NagPackSuppression,
      ],
      true,
    );

    const policyPath = `${provider.node.path}/framework-onEvent/ServiceRole/DefaultPolicy/Resource`;
    NagSuppressions.addResourceSuppressionsByPath(Stack.of(this), policyPath, [
      {
        id: 'AwsSolutions-IAM5',
        reason:
          'Provider framework requires lambda:InvokeFunction with a :* suffix to invoke all versions of the cleanup handler.',
      } satisfies NagPackSuppression,
    ]);

    new CustomResource(this, 'Resource', {
      serviceToken: provider.serviceToken,
      properties: {
        RoleArns: props.roleArns,
        DomainId: props.domainId,
        DataLocationGrantPrincipals: props.dataLocationGrantPrincipals,
        BucketArn: props.bucketArn,
      },
    });
  }
}
