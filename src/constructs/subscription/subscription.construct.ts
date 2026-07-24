import { Construct } from 'constructs';
import type { SubscriptionProps } from './subscription.interface';
import { DataZoneApiCall } from '../datazone-api-call';

/**
 * Subscribes a consumer project to a published catalog asset — the consumer side of the
 * DataZone subscription flow, which has no CloudFormation resource.
 *
 * It issues `CreateSubscriptionRequest` (and optionally `AcceptSubscriptionRequest`) through
 * {@link DataZoneApiCall}, running as a DataZone-enrolled role. When that role owns or
 * contributes to both the publishing and consuming projects, DataZone auto-approves the
 * request and, for managed Glue/Redshift assets, auto-fulfills the grant as Lake Formation
 * permissions on the consumer project's role — so the default flow is a single request.
 *
 * The `subscribedListingId` is dynamic (created when the producer publishes); resolve it with
 * a `DataZoneApiCall` (`SearchListings`) and pass the resulting token here.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/discover-data.html
 */
export class Subscription extends Construct {
  /** The ID of the created subscription request. */
  public readonly subscriptionRequestId: string;

  constructor(scope: Construct, id: string, props: SubscriptionProps) {
    super(scope, id);

    const request = new DataZoneApiCall(this, 'Request', {
      role: props.role,
      onCreate: {
        action: 'CreateSubscriptionRequest',
        parameters: {
          domainIdentifier: props.domainIdentifier,
          requestReason: props.requestReason ?? 'Subscription created via CDK.',
          subscribedListings: [{ id: props.subscribedListingId }],
          subscribedPrincipals: [{ project: { identifier: props.subscribedProjectId } }],
        },
        outputPaths: ['id'],
        physicalResourceIdFromResponsePath: 'id',
      },
    });
    this.subscriptionRequestId = request.getResponseField('id');

    if (props.autoApprove) {
      const accept = new DataZoneApiCall(this, 'Accept', {
        role: props.role,
        onCreate: {
          action: 'AcceptSubscriptionRequest',
          parameters: {
            domainIdentifier: props.domainIdentifier,
            identifier: this.subscriptionRequestId,
            decisionComment: props.decisionComment ?? 'Approved via CDK.',
          },
          physicalResourceIdFromResponsePath: 'id',
        },
      });
      accept.node.addDependency(request);
    }
  }
}
