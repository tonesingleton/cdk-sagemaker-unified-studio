import { App, Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DataZoneApiCall } from '.';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

function createRole(stack: Stack): iam.Role {
  return new iam.Role(stack, 'DatazoneApiRole', { assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com') });
}

describe('DataZoneApiCall', () => {
  test('throws when no lifecycle call is provided', () => {
    const stack = createStack();
    expect(() => new DataZoneApiCall(stack, 'Call', { role: createRole(stack) })).toThrow(
      /at least one of onCreate, onUpdate, or onDelete/,
    );
  });

  test('creates a Custom::AWS resource for the DataZone action', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onCreate: {
        action: 'ListConnections',
        parameters: { domainIdentifier: 'dzd-abc', projectIdentifier: 'dzp-xyz', type: 'LAKEHOUSE' },
        outputPaths: ['items.0.connectionId'],
      },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(
        Match.objectLike({
          service: 'DataZone',
          action: 'ListConnections',
          parameters: Match.objectLike({
            domainIdentifier: 'dzd-abc',
            projectIdentifier: 'dzp-xyz',
            type: 'LAKEHOUSE',
          }),
        }),
      ),
    });
  });

  test('defaults onUpdate to the onCreate call', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onCreate: { action: 'ListEnvironments', parameters: { domainIdentifier: 'dzd-abc' } },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Update: Match.serializedJson(Match.objectLike({ action: 'ListEnvironments' })),
    });
  });

  test('runs as the provided role', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onCreate: { action: 'ListEnvironments', parameters: { domainIdentifier: 'dzd-abc' } },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
      Role: { 'Fn::GetAtt': [Match.stringLikeRegexp('DatazoneApiRole'), 'Arn'] },
    });
  });

  test('does not install the latest AWS SDK by default', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onCreate: { action: 'ListEnvironments', parameters: { domainIdentifier: 'dzd-abc' } },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', { InstallLatestAwsSdk: false });
  });

  test('uses an explicit physicalResourceId when provided', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onCreate: {
        action: 'ListEnvironments',
        parameters: { domainIdentifier: 'dzd-abc' },
        physicalResourceId: 'my-stable-id',
      },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(Match.objectLike({ physicalResourceId: { id: 'my-stable-id' } })),
    });
  });

  test('exposes response fields as tokens', () => {
    const stack = createStack();
    const call = new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onCreate: { action: 'ListConnections', parameters: {}, outputPaths: ['items.0.connectionId'] },
    });
    expect(call.getResponseField('items.0.connectionId')).toBeDefined();
  });

  test('accepts an onUpdate-only call', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onUpdate: { action: 'UpdateGlossary', parameters: { domainIdentifier: 'dzd-abc' } },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Update: Match.serializedJson(Match.objectLike({ action: 'UpdateGlossary' })),
    });
  });

  test('accepts an onDelete-only call without forcing a physical id', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onDelete: { action: 'DeleteGlossary', parameters: { domainIdentifier: 'dzd-abc', identifier: 'g-1' } },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Delete: Match.serializedJson(Match.objectLike({ action: 'DeleteGlossary' })),
    });
  });

  test('derives the physical resource id from a response field', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onCreate: {
        action: 'CreateGlossary',
        parameters: { domainIdentifier: 'dzd-abc', name: 'x' },
        physicalResourceIdFromResponsePath: 'id',
        outputPaths: ['id'],
      },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(Match.objectLike({ physicalResourceId: { responsePath: 'id' } })),
    });
  });

  test('references the physical resource id in update parameters', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onCreate: {
        action: 'CreateGlossary',
        parameters: { domainIdentifier: 'dzd-abc', name: 'x' },
        physicalResourceIdFromResponsePath: 'id',
      },
      onUpdate: {
        action: 'UpdateGlossary',
        parameters: { domainIdentifier: 'dzd-abc', identifier: DataZoneApiCall.PHYSICAL_RESOURCE_ID },
        physicalResourceIdFromResponsePath: 'id',
      },
      onDelete: {
        action: 'DeleteGlossary',
        parameters: { domainIdentifier: 'dzd-abc', identifier: DataZoneApiCall.PHYSICAL_RESOURCE_ID },
      },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Delete: Match.serializedJson(
        Match.objectLike({
          action: 'DeleteGlossary',
          parameters: Match.objectLike({ identifier: 'PHYSICAL:RESOURCEID:' }),
        }),
      ),
    });
  });

  test('installs the latest AWS SDK when requested', () => {
    const stack = createStack();
    new DataZoneApiCall(stack, 'Call', {
      role: createRole(stack),
      onCreate: { action: 'ListEnvironments', parameters: { domainIdentifier: 'dzd-abc' } },
      installLatestAwsSdk: true,
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', { InstallLatestAwsSdk: true });
  });
});
