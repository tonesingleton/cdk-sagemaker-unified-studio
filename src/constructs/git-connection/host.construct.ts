import { Stack, Validations, aws_iam as iam, aws_lambda as lambda_, custom_resources as cr } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { HostProps, HostVpcConfiguration, IHost } from './host.interface';

/**
 * A CodeConnections host for a self-managed Git provider.
 *
 * Required for GitHub Enterprise Server, GitLab Self-Managed, and other
 * providers that are not hosted on the public cloud. After deployment,
 * the host must be set up in the AWS Console to complete the TLS/OAuth
 * handshake with the Git provider.
 *
 * Implemented as an `AwsCustomResource` because CloudFormation does not
 * support the `AWS::CodeConnections::Host` resource type in all regions.
 *
 * @see https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-host-setup.html
 */
export class Host extends Construct implements IHost {
  /** The ARN of the CodeConnections host. */
  public readonly hostArn: string;

  constructor(scope: Construct, id: string, props: HostProps) {
    super(scope, id);

    const account = Stack.of(this).account;
    const region = Stack.of(this).region;

    const vpcConfig = props.vpcConfiguration ? this.buildVpcConfiguration(props.vpcConfiguration) : undefined;

    const policyStatements = [
      new iam.PolicyStatement({
        actions: ['codeconnections:CreateHost', 'codeconnections:TagResource'],
        resources: ['*'],
      }),
      new iam.PolicyStatement({
        actions: ['codeconnections:DeleteHost', 'codeconnections:UpdateHost'],
        resources: [`arn:aws:codeconnections:${region}:${account}:host/*`],
      }),
    ];

    if (props.vpcConfiguration) {
      policyStatements.push(
        new iam.PolicyStatement({
          actions: [
            'ec2:CreateNetworkInterface',
            'ec2:CreateTags',
            'ec2:DescribeNetworkInterfaces',
            'ec2:DescribeVpcs',
            'ec2:DescribeSubnets',
            'ec2:DescribeSecurityGroups',
            'ec2:DeleteNetworkInterface',
          ],
          resources: ['*'],
        }),
      );
    }

    const host = new cr.AwsCustomResource(this, 'Resource', {
      onCreate: {
        service: '@aws-sdk/client-codeconnections',
        action: 'CreateHost',
        parameters: {
          Name: props.name,
          ProviderEndpoint: props.providerEndpoint,
          ProviderType: props.providerType,
          VpcConfiguration: vpcConfig,
          Tags: props.tags ? Object.entries(props.tags).map(([key, value]) => ({ Key: key, Value: value })) : undefined,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('HostArn'),
      },
      onUpdate: {
        service: '@aws-sdk/client-codeconnections',
        action: 'UpdateHost',
        parameters: {
          HostArn: new cr.PhysicalResourceIdReference(),
          ProviderEndpoint: props.providerEndpoint,
          VpcConfiguration: vpcConfig,
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('HostArn'),
      },
      onDelete: {
        service: '@aws-sdk/client-codeconnections',
        action: 'DeleteHost',
        parameters: {
          HostArn: new cr.PhysicalResourceIdReference(),
        },
        ignoreErrorCodesMatching: 'ValidationException|ResourceNotFoundException',
      },
      policy: cr.AwsCustomResourcePolicy.fromStatements(policyStatements),
    });

    Validations.of(host).acknowledge({
      id: 'AwsSolutions-IAM5',
      reason: props.vpcConfiguration
        ? 'codeconnections:CreateHost and EC2 network interface actions require wildcard resource because the host ARN and ENI IDs are not known before creation.'
        : 'codeconnections:CreateHost requires wildcard resource because the host ARN is not known before creation.',
    });

    Validations.of(host).acknowledge({
      id: 'AwsSolutions-IAM5',
      reason: 'Host ARN contains a generated ID that is not known at deploy time.',
    });

    // AwsCustomResource creates a singleton Lambda at the stack level that is
    // shared across all AwsCustomResource instances. Suppressions must target
    // it directly since it lives outside this construct's tree.
    const stack = Stack.of(this);
    for (const child of stack.node.children) {
      if (child instanceof lambda_.Function && child.node.id.startsWith('AWS')) {
        Validations.of(child).acknowledge({
          id: 'AwsSolutions-L1',
          reason: 'AwsCustomResource singleton Lambda runtime is managed by the CDK framework.',
        });
        Validations.of(child).acknowledge({
          id: 'AwsSolutions-IAM4',
          reason: 'AwsCustomResource singleton Lambda requires basic execution role for CloudWatch logging.',
        });
        break;
      }
    }

    this.hostArn = host.getResponseField('HostArn');
  }

  private buildVpcConfiguration(vpc: HostVpcConfiguration) {
    return {
      VpcId: vpc.vpcId,
      SubnetIds: vpc.subnetIds,
      SecurityGroupIds: vpc.securityGroupIds,
      ...(vpc.tlsCertificate ? { TlsCertificate: vpc.tlsCertificate } : {}),
    };
  }
}
