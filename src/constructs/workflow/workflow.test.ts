import { App, Stack, aws_s3 as s3 } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Workflow } from './workflow.construct';
import { TriggerMode } from './workflow.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('Workflow', () => {
  test('creates a workflow with required props', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'motor-portfolio-kpi',
      definitionLocation: { bucket, objectKey: 'dags/motor_portfolio_kpi.yml' },
      roleArn: 'arn:aws:iam::123456789012:role/execution-role',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::MWAAServerless::Workflow', {
      Name: 'motor-portfolio-kpi',
      DefinitionS3Location: { Bucket: 'my-bucket', ObjectKey: 'dags/motor_portfolio_kpi.yml' },
      RoleArn: 'arn:aws:iam::123456789012:role/execution-role',
      TriggerMode: 'MANUAL_ONLY',
    });
  });

  test('supports scheduled trigger mode', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'scheduled-wf',
      definitionLocation: { bucket, objectKey: 'dags/wf.yml' },
      roleArn: 'arn:aws:iam::123456789012:role/role',
      triggerMode: TriggerMode.SCHEDULED,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::MWAAServerless::Workflow', {
      TriggerMode: 'SCHEDULED',
    });
  });

  test('includes description and tags', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    new Workflow(stack, 'Workflow', {
      name: 'tagged-wf',
      definitionLocation: { bucket, objectKey: 'dags/wf.yml' },
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
      definitionLocation: { bucket, objectKey: 'dags/wf.yml' },
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

  test('exposes workflowName', () => {
    const stack = createStack();
    const bucket = s3.Bucket.fromBucketName(stack, 'Bucket', 'my-bucket');
    const wf = new Workflow(stack, 'Workflow', {
      name: 'my-wf',
      definitionLocation: { bucket, objectKey: 'dags/wf.yml' },
      roleArn: 'arn:aws:iam::123456789012:role/role',
    });
    expect(wf.workflowName).toBe('my-wf');
  });
});
