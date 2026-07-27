import { App, Stack, aws_iam as iam } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Subscription } from './subscription.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

function createRole(stack: Stack): iam.Role {
  return new iam.Role(stack, 'DatazoneApiRole', { assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com') });
}

function hasAction(stack: Stack, action: string): boolean {
  const customs = Template.fromStack(stack).findResources('Custom::AWS');
  return Object.values(customs).some((r) => JSON.stringify(r).includes(action));
}

describe('Subscription', () => {
  test('creates a CreateSubscriptionRequest custom resource', () => {
    const stack = createStack();
    new Subscription(stack, 'Sub', {
      role: createRole(stack),
      domainIdentifier: 'dzd-abc',
      subscribedListingId: 'listing-123',
      subscribedProjectId: 'dzp-consumer',
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.serializedJson(
        Match.objectLike({
          service: 'DataZone',
          action: 'CreateSubscriptionRequest',
          parameters: Match.objectLike({
            domainIdentifier: 'dzd-abc',
            subscribedListings: [{ identifier: 'listing-123' }],
            subscribedPrincipals: [{ project: { identifier: 'dzp-consumer' } }],
          }),
        }),
      ),
    });
  });

  test('does not accept the request by default', () => {
    const stack = createStack();
    new Subscription(stack, 'Sub', {
      role: createRole(stack),
      domainIdentifier: 'dzd-abc',
      subscribedListingId: 'l',
      subscribedProjectId: 'p',
    });
    expect(hasAction(stack, 'AcceptSubscriptionRequest')).toBe(false);
  });

  test('accepts the request when autoApprove is true', () => {
    const stack = createStack();
    new Subscription(stack, 'Sub', {
      role: createRole(stack),
      domainIdentifier: 'dzd-abc',
      subscribedListingId: 'l',
      subscribedProjectId: 'p',
      autoApprove: true,
    });
    expect(hasAction(stack, 'AcceptSubscriptionRequest')).toBe(true);
  });

  test('throws when autoApprove is combined with ignoreErrorCodesMatching', () => {
    const stack = createStack();
    expect(
      () =>
        new Subscription(stack, 'Sub', {
          role: createRole(stack),
          domainIdentifier: 'dzd-abc',
          subscribedListingId: 'l',
          subscribedProjectId: 'p',
          autoApprove: true,
          ignoreErrorCodesMatching: 'ConflictException',
        }),
    ).toThrow(/autoApprove cannot be used together with ignoreErrorCodesMatching/);
  });

  test('exposes subscriptionRequestId', () => {
    const stack = createStack();
    const sub = new Subscription(stack, 'Sub', {
      role: createRole(stack),
      domainIdentifier: 'dzd-abc',
      subscribedListingId: 'l',
      subscribedProjectId: 'p',
    });
    expect(sub.subscriptionRequestId).toBeDefined();
  });
});
