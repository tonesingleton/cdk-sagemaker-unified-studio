import {
  CustomResource,
  Duration,
  Validations,
  aws_iam as iam,
  aws_lambda as lambda_,
  custom_resources as cr,
} from 'aws-cdk-lib';
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

    Validations.of(handler).acknowledge({
      id: 'AwsSolutions-IAM4',
      reason: 'Lambda basic execution role is required for CloudWatch logging.',
    });

    Validations.of(handler).acknowledge({
      id: 'AwsSolutions-IAM5',
      reason: 'Lake Formation settings are account-level and do not support resource-level permissions.',
    });

    const provider = new cr.Provider(this, 'Provider', { onEventHandler: handler });

    Validations.of(provider).acknowledge({
      id: 'AwsSolutions-IAM4',
      reason: 'Provider framework Lambda requires basic execution role for CloudWatch logging.',
    });

    Validations.of(provider).acknowledge({
      id: 'AwsSolutions-L1',
      reason: 'Provider framework manages its own Lambda runtime version.',
    });

    Validations.of(provider).acknowledge({
      id: 'AwsSolutions-IAM5',
      reason: 'Provider framework requires lambda:InvokeFunction with :* suffix.',
    });

    new CustomResource(this, 'Resource', {
      serviceToken: provider.serviceToken,
      properties: { RoleArn: roleArn },
    });
  }
}
