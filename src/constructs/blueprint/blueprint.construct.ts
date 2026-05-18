import { Stack, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { BlueprintProps } from './blueprint.interface';

/**
 * An environment blueprint configuration for an AWS SageMaker Unified Studio domain.
 *
 * Activates a specific blueprint capability (e.g. Tooling, DataLake) on a domain
 * by creating a `CfnEnvironmentBlueprintConfiguration`.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/blueprints.html
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/supported-blueprints.html
 */
export class Blueprint extends Construct {
  /** The resolved environment blueprint ID. */
  public readonly environmentBlueprintId: string;
  /** The underlying CloudFormation configuration (used by Domain for policy grants). */
  public readonly configuration: datazone.CfnEnvironmentBlueprintConfiguration;

  constructor(scope: Construct, id: string, props: BlueprintProps) {
    super(scope, id);

    if (!props.identifier) {
      throw new Error('Blueprint identifier must not be empty.');
    }

    const enabledRegions = props.enabledRegions ? [...props.enabledRegions] : [Stack.of(this).region];

    this.configuration = new datazone.CfnEnvironmentBlueprintConfiguration(this, 'Configuration', {
      domainIdentifier: props.domainId,
      enabledRegions,
      environmentBlueprintIdentifier: props.identifier,
      manageAccessRoleArn: props.manageAccessRoleArn,
      provisioningRoleArn: props.provisioningRoleArn,
      regionalParameters: props.regionalParameters ? [...props.regionalParameters] : undefined,
    });

    this.environmentBlueprintId = this.configuration.attrEnvironmentBlueprintId;
  }
}
