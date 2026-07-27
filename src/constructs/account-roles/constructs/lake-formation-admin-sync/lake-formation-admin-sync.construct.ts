import * as path from 'path';
import {
  CustomResource,
  Duration,
  Validations,
  aws_iam as iam,
  aws_lambda as lambda_,
  custom_resources as cr,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Registers an IAM role as a Lake Formation data lake administrator.
 *
 * On Create/Update: appends the role to the existing admin list.
 * On Delete: removes the role from the admin list.
 */
export class LakeFormationAdminSync extends Construct {
  constructor(scope: Construct, id: string, roleArn: string) {
    super(scope, id);

    const assetDir = path.join(__dirname, '..', '..', '..', '..', '..', 'assets', 'lake-formation-admin-sync');

    const handler = new lambda_.Function(this, 'Handler', {
      runtime: lambda_.Runtime.NODEJS_24_X,
      architecture: lambda_.Architecture.ARM_64,
      handler: 'index.handler',
      timeout: Duration.seconds(30),
      code: lambda_.Code.fromAsset(assetDir, {
        bundling: {
          image: lambda_.Runtime.NODEJS_24_X.bundlingImage,
          local: {
            tryBundle: (outputDir: string): boolean => {
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              const { execSync } = require('child_process');
              try {
                const entrypoint = path.join(assetDir, 'index.ts');
                const outfile = path.join(outputDir, 'index.js');
                execSync(`esbuild ${entrypoint} --bundle --platform=node --target=node22 --outfile=${outfile}`, {
                  stdio: 'inherit',
                });
                return true;
              } catch {
                /* istanbul ignore next */
                return false;
              }
            },
          },
        },
      }),
    });

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['lakeformation:GetDataLakeSettings', 'lakeformation:PutDataLakeSettings'],
        resources: ['*'],
      }),
    );

    Validations.of(handler).acknowledge(
      {
        id: 'AwsSolutions-IAM4',
        reason: 'Lambda basic execution role is required for CloudWatch logging.',
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'Lake Formation settings are account-level and do not support resource-level permissions.',
      },
    );

    const provider = new cr.Provider(this, 'Provider', { onEventHandler: handler });

    Validations.of(provider).acknowledge(
      {
        id: 'AwsSolutions-IAM4',
        reason: 'Provider framework Lambda requires basic execution role for CloudWatch logging.',
      },
      {
        id: 'AwsSolutions-L1',
        reason: 'Provider framework manages its own Lambda runtime version.',
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'Provider framework requires lambda:InvokeFunction with :* suffix.',
      },
    );

    new CustomResource(this, 'Resource', {
      serviceToken: provider.serviceToken,
      properties: { RoleArn: roleArn },
    });
  }
}
