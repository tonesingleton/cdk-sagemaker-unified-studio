/**
 * The type of entity to which an owner is being assigned.
 */
export enum OwnerEntityType {
  /** A domain unit. */
  DOMAIN_UNIT = 'DOMAIN_UNIT',
}

/**
 * Properties for an Owner construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-owner.html
 */
export interface OwnerProps {
  /** The ID of the domain. */
  readonly domainIdentifier: string;

  /** The ID of the entity (e.g. domain unit ID) to which the owner is added. */
  readonly entityIdentifier: string;

  /** The type of entity. Currently only DOMAIN_UNIT is supported. */
  readonly entityType: OwnerEntityType;

  /**
   * The IAM role ARN of the user to designate as owner.
   *
   * Exactly one of `userIdentifier` or `groupIdentifier` must be provided.
   */
  readonly userIdentifier?: string;

  /**
   * The group identifier to designate as owner.
   *
   * Exactly one of `userIdentifier` or `groupIdentifier` must be provided.
   */
  readonly groupIdentifier?: string;
}
