import * as path from 'path';
import { App, Stack, aws_kms as kms, aws_s3 as s3 } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Workflow } from './workflow.construct';
import { EncryptionType, TriggerMode } from './workflow.interface';

const FIXTURE = path.join(__dirname, '..', '..', '..', 'test', 'fixtures', 'workflow.yml');

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('Workflow', () => {
  test('creates workflow with content-hashed S3 key', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'motor-portfolio-kpi',
      definitionFile: { path: FIXTURE, bucket },
      roleArn: 'arn:aws:iam::123456789012:role/execution-role',
    });
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::MWAAServerless::Workflow', {
      Name: 'motor-portfolio-kpi',
      DefinitionS3Location: {
        Bucket: 'my-bucket',
        ObjectKey: Match.stringLikeRegexp('^workflows/workflow-[0-9a-f]{8}/workflow\\.yml$'),
      },
      RoleArn: 'arn:aws:iam::123456789012:role/execution-role',
      TriggerMode: 'manual_only',
    });
  });

  test('supports scheduled trigger mode', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'scheduled-wf',
      definitionFile: { path: FIXTURE, bucket },
      roleArn: 'arn:aws:iam::123456789012:role/role',
      triggerMode: TriggerMode.SCHEDULED,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::MWAAServerless::Workflow', {
      TriggerMode: 'scheduled',
    });
  });

  test('includes description and tags', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'tagged-wf',
      definitionFile: { path: FIXTURE, bucket },
      roleArn: 'arn:aws:iam::123456789012:role/role',
      description: 'My workflow',
      tags: { AmazonDataZoneProject: 'proj-123' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::MWAAServerless::Workflow', {
      Description: 'My workflow',
      Tags: { AmazonDataZoneProject: 'proj-123' },
    });
  });

  test('includes network configuration', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'vpc-wf',
      definitionFile: { path: FIXTURE, bucket },
      roleArn: 'arn:aws:iam::123456789012:role/role',
      networkConfiguration: {
        securityGroupIds: ['sg-123'],
        subnetIds: ['subnet-a', 'subnet-b'],
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::MWAAServerless::Workflow', {
      NetworkConfiguration: {
        SecurityGroupIds: ['sg-123'],
        SubnetIds: ['subnet-a', 'subnet-b'],
      },
    });
  });

  test('includes encryption configuration with AWS managed key', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'enc-wf',
      definitionFile: { path: FIXTURE, bucket },
      roleArn: 'arn:aws:iam::123456789012:role/role',
      encryptionConfiguration: { type: EncryptionType.AWS_MANAGED_KEY },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::MWAAServerless::Workflow', {
      EncryptionConfiguration: { Type: 'AWS_MANAGED_KEY' },
    });
  });

  test('includes encryption configuration with customer managed key', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    const key = kms.Key.fromKeyArn(stack, 'Key', 'arn:aws:kms:eu-central-1:123456789012:key/my-key-id');
    new Workflow(stack, 'Workflow', {
      name: 'cmk-wf',
      definitionFile: { path: FIXTURE, bucket },
      roleArn: 'arn:aws:iam::123456789012:role/role',
      encryptionConfiguration: { type: EncryptionType.CUSTOMER_MANAGED_KEY, kmsKey: key },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::MWAAServerless::Workflow', {
      EncryptionConfiguration: {
        Type: 'CUSTOMER_MANAGED_KEY',
        KmsKeyId: 'arn:aws:kms:eu-central-1:123456789012:key/my-key-id',
      },
    });
  });

  test('includes logging configuration', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'log-wf',
      definitionFile: { path: FIXTURE, bucket },
      roleArn: 'arn:aws:iam::123456789012:role/role',
      loggingConfiguration: { logGroupName: '/aws/mwaa/my-workflow' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::MWAAServerless::Workflow', {
      LoggingConfiguration: { LogGroupName: '/aws/mwaa/my-workflow' },
    });
  });

  test('exposes workflowName', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    const wf = new Workflow(stack, 'Workflow', {
      name: 'my-wf',
      definitionFile: { path: FIXTURE, bucket },
      roleArn: 'arn:aws:iam::123456789012:role/role',
    });
    expect(wf.workflowName).toBe('my-wf');
  });
});
