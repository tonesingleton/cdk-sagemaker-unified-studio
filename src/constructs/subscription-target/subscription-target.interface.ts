/**
 * Read-only contract for a SubscriptionTarget.
 */
export interface ISubscriptionTarget {
  /** The subscription target ID assigned by DataZone. */
  readonly subscriptionTargetId: string;
}

/**
 * A form entry in the subscription target configuration.
 */
export interface SubscriptionTargetForm {
  /** The content of the subscription target configuration (JSON string). */
  readonly content: string;
  /**
   * The form name for this configuration entry.
   *
   * Must be 1–128 characters and match `^(?![0-9_])\w+$|^_\w*[a-zA-Z0-9]\w*$`.
   */
  readonly formName: string;
}

/**
 * Properties for a SubscriptionTarget construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-subscriptiontarget.html
 */
export interface SubscriptionTargetProps {
  /** The name of the subscription target (1–256 characters). */
  readonly name: string;
  /** The ID of the domain (e.g. `dzd-abc123`). */
  readonly domainIdentifier: string;
  /** The ID of the environment in which the subscription target is created. */
  readonly environmentIdentifier: string;
  /** The type of the subscription target (e.g. data asset type identifier). */
  readonly type: string;
  /** The asset types that can be fulfilled by this subscription target (1–256 characters each). */
  readonly applicableAssetTypes: Array<string>;
  /** The principals authorized to use this subscription target (max 10). */
  readonly authorizedPrincipals: Array<string>;
  /** The subscription target configuration forms. */
  readonly subscriptionTargetConfig: Array<SubscriptionTargetForm>;
  /**
   * The IAM role used to manage access when fulfilling subscriptions.
   *
   * @default - no manage access role
   */
  readonly manageAccessRole?: string;
  /**
   * The provider of this subscription target.
   *
   * @default - no provider
   */
  readonly provider?: string;
}

/**
 * Attributes required to import an existing SubscriptionTarget.
 */
export interface SubscriptionTargetAttributes {
  /** The subscription target ID. */
  readonly subscriptionTargetId: string;
}
