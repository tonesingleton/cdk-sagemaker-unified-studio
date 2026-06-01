import { aws_codeconnections as codeconnections } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { GitConnectionProps, IGitConnection } from './git-connection.interface';

/**
 * A Git connection for AWS SageMaker Unified Studio.
 *
 * Creates an AWS CodeConnections connection for the specified Git provider.
 * The connection is then available in the SageMaker Unified Studio console
 * for linking Git repositories to projects.
 *
 * New CodeConnections are created in `PENDING` status and must be authorized
 * in the AWS Console before they can be used. To skip this manual step,
 * pass a pre-authorized `codeConnectionArn`.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/git-connections.html
 */
export class GitConnection extends Construct implements IGitConnection {
  /** The ARN of the CodeConnections connection. */
  public readonly codeConnectionArn: string;
  /** The status of the CodeConnections connection (e.g. PENDING, AVAILABLE). */
  public readonly connectionStatus?: string;

  constructor(scope: Construct, id: string, props: GitConnectionProps) {
    super(scope, id);

    if (!props.codeConnectionArn && !props.providerType) {
      throw new Error("Either 'codeConnectionArn' or 'providerType' must be provided.");
    }

    if (props.codeConnectionArn) {
      this.codeConnectionArn = props.codeConnectionArn;
    } else {
      const codeConnection = new codeconnections.CfnConnection(this, 'CodeConnection', {
        connectionName: props.name,
        providerType: props.hostArn ? undefined : props.providerType!,
        hostArn: props.hostArn,
        tags: [{ key: 'for-use-with-all-datazone-projects', value: 'true' }],
      });
      this.codeConnectionArn = codeConnection.attrConnectionArn;
      this.connectionStatus = codeConnection.attrConnectionStatus;
    }
  }
}
