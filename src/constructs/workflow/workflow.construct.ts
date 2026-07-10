import { CfnResource } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { IWorkflow, WorkflowProps } from './workflow.interface';
import { TriggerMode } from './workflow.interface';

/**
 * An MWAA Serverless Workflow for orchestrating tasks in SageMaker Unified Studio.
 *
 * Creates an `AWS::MWAAServerless::Workflow` resource that references a YAML
 * workflow definition stored in S3. The YAML defines the DAG structure using
 * supported AWS operators (e.g. GlueJobOperator, RedshiftSQLOperator).
 *
 * @see https://docs.aws.amazon.com/mwaa/latest/mwaa-serverless-userguide/workflows.html
 */
export class Workflow extends Construct implements IWorkflow {
  public readonly workflowArn: string;
  public readonly workflowName: string;

  constructor(scope: Construct, id: string, props: WorkflowProps) {
    super(scope, id);

    this.workflowName = props.name;

    const properties: Record<string, unknown> = {
      Name: props.name,
      DefinitionS3Location: {
        Bucket: props.definitionLocation.bucket.bucketName,
        ObjectKey: props.definitionLocation.objectKey,
      },
      RoleArn: props.roleArn,
      TriggerMode: props.triggerMode ?? TriggerMode.MANUAL_ONLY,
    };

    if (props.description) {
      properties.Description = props.description;
    }

    if (props.networkConfiguration) {
      properties.NetworkConfiguration = {
        SecurityGroupIds: props.networkConfiguration.securityGroupIds,
        SubnetIds: props.networkConfiguration.subnetIds,
      };
    }

    if (props.tags) {
      properties.Tags = props.tags;
    }

    const resource = new CfnResource(this, 'Resource', {
      type: 'AWS::MWAAServerless::Workflow',
      properties,
    });

    this.workflowArn = resource.getAtt('WorkflowArn').toString();
  }
}
