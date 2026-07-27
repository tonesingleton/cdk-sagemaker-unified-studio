import * as path from 'path';
import { App, Stack, aws_iam as iam, aws_kms as kms, aws_s3 as s3 } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Workflow } from './workflow.construct';
import { EncryptionType, TriggerMode } from './workflow.interface';

const FIXTURE = path.join(__dirname, '..', '..', '..', 'test', 'fixtures', 'workflow.yml');

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

function importRole(stack: Stack, id = 'Role'): iam.IRole {
  return iam.Role.fromRoleArn(stack, id, 'arn:aws:iam::123456789012:role/execution-role');
}

describe('Workflow', () => {
  test('creates workflow with content-hashed S3 key', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'motor-portfolio-kpi',
      definitionFile: { path: FIXTURE, bucket },
      role: importRole(stack),
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
      role: importRole(stack),
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
      role: importRole(stack),
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
      role: importRole(stack),
      networkConfiguration: {
        securityGroupIds: ['sg-12345678'],
        subnetIds: ['subnet-a', 'subnet-b'],
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::MWAAServerless::Workflow', {
      NetworkConfiguration: {
        SecurityGroupIds: ['sg-12345678'],
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
      role: importRole(stack),
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
      role: importRole(stack),
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
      role: importRole(stack),
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
      role: importRole(stack),
    });
    expect(wf.workflowName).toBe('my-wf');
  });
});

describe('Workflow validation', () => {
  test('throws on invalid name pattern', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    expect(
      () =>
        new Workflow(stack, 'Workflow', {
          name: '-invalid',
          definitionFile: { path: FIXTURE, bucket },
          role: importRole(stack),
        }),
    ).toThrow(/Workflow name/);
  });

  test('throws on name exceeding 255 characters', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    expect(
      () =>
        new Workflow(stack, 'Workflow', {
          name: 'a'.repeat(256),
          definitionFile: { path: FIXTURE, bucket },
          role: importRole(stack),
        }),
    ).toThrow(/Workflow name/);
  });

  test('throws on description exceeding 1024 characters', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    expect(
      () =>
        new Workflow(stack, 'Workflow', {
          name: 'valid-name',
          definitionFile: { path: FIXTURE, bucket },
          role: importRole(stack),
          description: 'x'.repeat(1025),
        }),
    ).toThrow(/description must be at most 1024/);
  });
});

describe('Workflow.fromAttributes', () => {
  test('imports workflow with attributes', () => {
    const stack = createStack();
    const imported = Workflow.fromAttributes(stack, 'Imported', {
      workflowArn: 'arn:aws:airflow-serverless:eu-central-1:123456789012:workflow/my-wf',
      workflowName: 'my-wf',
    });
    expect(imported.workflowArn).toBe('arn:aws:airflow-serverless:eu-central-1:123456789012:workflow/my-wf');
    expect(imported.workflowName).toBe('my-wf');
  });

  test('does not create any CloudFormation resources', () => {
    const stack = createStack();
    Workflow.fromAttributes(stack, 'Imported', {
      workflowArn: 'arn:aws:airflow-serverless:eu-central-1:123456789012:workflow/my-wf',
      workflowName: 'my-wf',
    });
    expect(stack.node.children.length).toBe(1);
  });
});
