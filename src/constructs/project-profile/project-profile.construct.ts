import { Stack, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { EnvironmentConfiguration, ProjectProfileProps } from './project-profile.interface';
import { DeploymentMode, ProjectProfileStatus } from './project-profile.interface';
import { ManagedBlueprintIdentifier } from '../blueprint/blueprint.interface';

/**
 * A project profile that defines the default set of environment blueprints
 * provisioned when a project is created.
 *
 * Non-Tooling environments default to ON_DEMAND deployment mode to avoid
 * unnecessary costs from auto-provisioned resources.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/project-profiles.html
 */
export class ProjectProfile extends Construct {
  /** The project profile ID. */
  public readonly projectProfileId: string;

  constructor(scope: Construct, id: string, props: ProjectProfileProps) {
    super(scope, id);

    for (const c of props.environmentConfigurations ?? []) {
      if (c.deploymentOrder !== undefined && (!Number.isInteger(c.deploymentOrder) || c.deploymentOrder < 0)) {
        throw new Error(`deploymentOrder for '${c.name}' must be a non-negative integer, got ${c.deploymentOrder}.`);
      }
    }

    const account = Stack.of(this).account;
    const region = Stack.of(this).region;

    const profile = new datazone.CfnProjectProfile(this, 'Resource', {
      domainIdentifier: props.domainId,
      domainUnitIdentifier: props.domainUnitId,
      name: props.name,
      description: props.description,
      status: props.status ?? ProjectProfileStatus.ENABLED,
      environmentConfigurations: props.environmentConfigurations?.length
        ? props.environmentConfigurations.map(
            (c: EnvironmentConfiguration): datazone.CfnProjectProfile.EnvironmentConfigurationProperty => ({
              name: c.name,
              environmentBlueprintId: c.environmentBlueprintId,
              awsAccount: { awsAccountId: c.accountId ?? account },
              awsRegion: { regionName: c.region ?? region },
              description: c.description,
              deploymentOrder: c.deploymentOrder,
              deploymentMode:
                c.deploymentMode ??
                (c.name === ManagedBlueprintIdentifier.TOOLING ? undefined : DeploymentMode.ON_DEMAND),
              configurationParameters: c.parameters
                ? {
                    parameterOverrides: Object.entries(c.parameters).map(([name, value]) => ({ name, value })),
                  }
                : undefined,
            }),
          )
        : undefined,
    });

    this.projectProfileId = profile.attrId;
  }
}
