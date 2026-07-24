import type { aws_iam as iam } from 'aws-cdk-lib';

/**
 * Properties for a Subscription construct.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateSubscriptionRequest.html
 */
export interface SubscriptionProps {
  /**
   * The DataZone-enrolled role that creates the subscription request.
   *
   * When this role owns or contributes to BOTH the publishing project and the
   * consuming project, DataZone auto-approves the request; for managed assets
   * (Glue Data Catalog / Redshift tables) it also auto-fulfills the grant, so no
   * explicit approval is needed. Typically `domain.datazoneApiRole`.
   */
  readonly role: iam.IRole;
  /** The SageMaker Unified Studio / DataZone domain ID. */
  readonly domainIdentifier: string;
  /**
   * The catalog listing ID of the published asset to subscribe to. Resolve it at
   * deploy time with a `DataZoneApiCall` (`SearchListings`) when it is not known
   * statically.
   */
  readonly subscribedListingId: string;
  /** The consumer project that receives access to the asset. */
  readonly subscribedProjectId: string;
  /**
   * The justification recorded on the subscription request.
   *
   * @default - a generic CDK-managed reason
   */
  readonly requestReason?: string;
  /**
   * Explicitly accept the request after creating it (`AcceptSubscriptionRequest`).
   *
   * Leave `false` when `role` already triggers auto-approval (owner/contributor of
   * both projects): accepting an already-approved request fails.
   *
   * @default false
   */
  readonly autoApprove?: boolean;
  /**
   * The decision comment recorded when `autoApprove` is enabled.
   *
   * @default - a generic CDK-managed comment
   */
  readonly decisionComment?: string;
}
