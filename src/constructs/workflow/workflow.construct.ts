import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { CfnResource, aws_s3_deployment as s3deploy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { IWorkflow, WorkflowProps } from './workflow.interface';
import { TriggerMode } from './workflow.interface';

// ---------------------------------------------------------------------------
// CloudFormation property interfaces (internal)
// Mirror the AWS::MWAAServerless::Workflow resource shape exactly.
// @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-mwaaserverless-workflow.html
// ---------------------------------------------------------------------------

interface CfnS3Location {
  readonly Bucket: string;
  readonly ObjectKey: string;
  readonly VersionId?: string;
}

interface CfnEncryptionConfiguration {
  readonly Type: string;
  readonly KmsKeyId?: string;
}

interface CfnLoggingConfiguration {
  readonly LogGroupName: string;
}

interface CfnNetworkConfiguration {
  readonly SecurityGroupIds?: Array<string>;
  readonly SubnetIds?: Array<string>;
}

interface CfnWorkflowProperties {
  readonly Name: string;
  readonly DefinitionS3Location: CfnS3Location;
  readonly RoleArn: string;
  readonly TriggerMode: string;
  readonly Description?: string;
  readonly EncryptionConfiguration?: CfnEncryptionConfiguration;
  readonly LoggingConfiguration?: CfnLoggingConfiguration;
  readonly NetworkConfiguration?: CfnNetworkConfiguration;
  readonly Tags?: Record<string, string>;
}

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
  public readonly workflowArn: string;
  public readonly workflowName: string;

  constructor(scope: Construct, id: string, props: WorkflowProps) {
    super(scope, id);

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

    const cfnProps: CfnWorkflowProperties = {
      Name: props.name,
      DefinitionS3Location: {
        Bucket: props.definitionFile.bucket.bucketName,
        ObjectKey: objectKey,
      },
      RoleArn: props.roleArn,
      TriggerMode: props.triggerMode ?? TriggerMode.MANUAL_ONLY,
      ...(props.description && { Description: props.description }),
      ...(props.encryptionConfiguration && {
        EncryptionConfiguration: {
          Type: props.encryptionConfiguration.type,
          ...(props.encryptionConfiguration.kmsKey && { KmsKeyId: props.encryptionConfiguration.kmsKey.keyArn }),
        },
      }),
      ...(props.loggingConfiguration && {
        LoggingConfiguration: { LogGroupName: props.loggingConfiguration.logGroupName },
      }),
      ...(props.networkConfiguration && {
        NetworkConfiguration: {
          ...(props.networkConfiguration.securityGroupIds && {
            SecurityGroupIds: props.networkConfiguration.securityGroupIds,
          }),
          ...(props.networkConfiguration.subnetIds && { SubnetIds: props.networkConfiguration.subnetIds }),
        },
      }),
      ...(props.tags && { Tags: props.tags }),
    };

    const resource = new CfnResource(this, 'Resource', {
      type: 'AWS::MWAAServerless::Workflow',
      properties: cfnProps as unknown as Record<string, unknown>,
    });

    resource.node.addDependency(deployment);

    this.workflowArn = resource.getAtt('WorkflowArn').toString();
  }
}
