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
import { LF_ADMIN_HANDLER_CODE } from './lake-formation-admin-sync.handler';

/**
 * Registers an IAM role as a Lake Formation data lake administrator.
 *
 * On Create/Update: appends the role to the existing admin list.
 * On Delete: removes the role from the admin list.
 */
export class LakeFormationAdminSync extends Construct {
  constructor(scope: Construct, id: string, roleArn: string) {
    super(scope, id);

    const handler = new lambda_.Function(this, 'Handler', {
      runtime: lambda_.Runtime.NODEJS_24_X,
      handler: 'index.handler',
      timeout: Duration.seconds(30),
      code: lambda_.Code.fromInline(LF_ADMIN_HANDLER_CODE),
    });

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['lakeformation:GetDataLakeSettings', 'lakeformation:PutDataLakeSettings'],
        resources: ['*'],
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
          reason: 'Lake Formation settings are account-level and do not support resource-level permissions.',
          appliesTo: ['Resource::*'],
        } satisfies NagPackSuppression,
      ],
      true,
    );

    const provider = new cr.Provider(this, 'Provider', { onEventHandler: handler });

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
        reason: 'Provider framework requires lambda:InvokeFunction with :* suffix.',
      } satisfies NagPackSuppression,
    ]);

    new CustomResource(this, 'Resource', {
      serviceToken: provider.serviceToken,
      properties: { RoleArn: roleArn },
    });
  }
}
