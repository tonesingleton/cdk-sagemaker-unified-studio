import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Blueprint } from './blueprint.construct';
import { ManagedBlueprintIdentifier } from './blueprint.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('Blueprint', () => {
  test('creates blueprint configuration', () => {
    const stack = createStack();
    new Blueprint(stack, 'Blueprint', {
      identifier: ManagedBlueprintIdentifier.TOOLING,
      domainId: 'dzd-test',
      enabledRegions: ['eu-central-1'],
      manageAccessRoleArn: 'arn:aws:iam::123456789012:role/manage-access',
      provisioningRoleArn: 'arn:aws:iam::123456789012:role/provisioning',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::EnvironmentBlueprintConfiguration', {
      EnvironmentBlueprintIdentifier: 'Tooling',
      EnabledRegions: ['eu-central-1'],
    });
  });

  test('creates with regional parameters', () => {
    const stack = createStack();
    new Blueprint(stack, 'Blueprint', {
      identifier: ManagedBlueprintIdentifier.TOOLING,
      domainId: 'dzd-test',
      enabledRegions: ['eu-central-1'],
      manageAccessRoleArn: 'arn:aws:iam::123456789012:role/manage-access',
      provisioningRoleArn: 'arn:aws:iam::123456789012:role/provisioning',
      regionalParameters: [
        { region: 'eu-central-1', parameters: { S3Location: 's3://my-bucket', VpcId: 'vpc-123', Subnets: 'subnet-a' } },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::EnvironmentBlueprintConfiguration', {
      RegionalParameters: Match.anyValue(),
    });
  });
});
