import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { aws_mwaaserverless as mwaa, aws_s3_deployment as s3deploy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { IWorkflow, WorkflowAttributes, WorkflowProps } from './workflow.interface';
import { TriggerMode } from './workflow.interface';

const NAME_PATTERN = /^[a-zA-Z0-9]+[a-zA-Z0-9.\-_]*$/;
const MAX_NAME_LENGTH = 255;
const MAX_DESCRIPTION_LENGTH = 1024;

/**
 * An MWAA Serverless Workflow for orchestrating tasks in SageMaker Unified Studio.
 *
 * Creates an `AWS::MWAAServerless::Workflow` resource backed by a local YAML
 * definition file. The file is deployed to S3 with a content-hash in the object
 * key so that any edit triggers a CloudFormation update and a fresh MWAA snapshot.
 *
 * @see https://docs.aws.amazon.com/mwaa/latest/mwaa-serverless-userguide/workflows.html
 */
export class Workflow extends Construct implements IWorkflow {
  /**
   * Import an existing workflow from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: WorkflowAttributes): IWorkflow {
    class ImportedWorkflow extends Construct implements IWorkflow {
      public readonly workflowArn = attrs.workflowArn;
      public readonly workflowName = attrs.workflowName;
    }
    return new ImportedWorkflow(scope, id);
  }

  public readonly workflowArn: string;
  public readonly workflowName: string;

  constructor(scope: Construct, id: string, props: WorkflowProps) {
    super(scope, id);

    if (!NAME_PATTERN.test(props.name) || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(
        `Workflow name '${props.name}' must match ${NAME_PATTERN} and be between 1–${MAX_NAME_LENGTH} characters.`,
      );
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `Workflow description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
      );
    }

    this.workflowName = props.name;

    const content = fs.readFileSync(props.definitionFile.path);
    const hash = crypto.createHash('sha256').update(content).digest('hex').slice(0, 8);
    const fileName = path.basename(props.definitionFile.path);
    const prefix = props.definitionFile.keyPrefix ?? 'workflows';
    const stem = path.basename(fileName, path.extname(fileName));
    const keyPrefix = `${prefix}/${stem}-${hash}`;
    const objectKey = `${keyPrefix}/${fileName}`;

    const deployment = new s3deploy.BucketDeployment(this, 'DefinitionDeployment', {
      sources: [s3deploy.Source.asset(path.dirname(props.definitionFile.path), { exclude: ['*.md', '*.py'] })],
      destinationBucket: props.definitionFile.bucket,
      destinationKeyPrefix: keyPrefix,
      prune: false,
    });

    const resource = new mwaa.CfnWorkflow(this, 'Resource', {
      name: props.name,
      definitionS3Location: {
        bucket: props.definitionFile.bucket.bucketName,
        objectKey,
      },
      roleArn: props.role.roleArn,
      triggerMode: props.triggerMode ?? TriggerMode.MANUAL_ONLY,
      description: props.description,
      encryptionConfiguration: props.encryptionConfiguration
        ? {
            type: props.encryptionConfiguration.type,
            kmsKeyId: props.encryptionConfiguration.kmsKey?.keyArn,
          }
        : undefined,
      loggingConfiguration: props.loggingConfiguration
        ? { logGroupName: props.loggingConfiguration.logGroupName }
        : undefined,
      networkConfiguration: props.networkConfiguration
        ? {
            securityGroupIds: props.networkConfiguration.securityGroupIds,
            subnetIds: props.networkConfiguration.subnetIds,
          }
        : undefined,
      tags: props.tags,
    });

    resource.node.addDependency(deployment);

    this.workflowArn = resource.attrWorkflowArn;
  }
}
