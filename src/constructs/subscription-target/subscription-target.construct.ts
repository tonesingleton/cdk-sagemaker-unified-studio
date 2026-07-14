import { Token, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type {
  ISubscriptionTarget,
  SubscriptionTargetAttributes,
  SubscriptionTargetProps,
} from './subscription-target.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const ENV_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_AUTHORIZED_PRINCIPALS = 10;

/**
 * A DataZone subscription target that defines how subscribed data is fulfilled.
 *
 * Subscription targets enable the publish/subscribe workflow by specifying
 * the mechanism through which subscribers receive access to data assets
 * (e.g. Glue table grants, Redshift data shares).
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-subscriptiontarget.html
 */
export class SubscriptionTarget extends Construct implements ISubscriptionTarget {
  /**
   * Import an existing subscription target from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: SubscriptionTargetAttributes): ISubscriptionTarget {
    class ImportedSubscriptionTarget extends Construct implements ISubscriptionTarget {
      public readonly subscriptionTargetId = attrs.subscriptionTargetId;
    }
    return new ImportedSubscriptionTarget(scope, id);
  }

  /** The subscription target ID assigned by DataZone. */
  public readonly subscriptionTargetId: string;

  constructor(scope: Construct, id: string, props: SubscriptionTargetProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`SubscriptionTarget name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `SubscriptionTarget domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!Token.isUnresolved(props.environmentIdentifier) && !ENV_ID_PATTERN.test(props.environmentIdentifier)) {
      throw new Error(
        `SubscriptionTarget environmentIdentifier '${props.environmentIdentifier}' must match pattern ${ENV_ID_PATTERN}.`,
      );
    }

    if (!props.type) {
      throw new Error('SubscriptionTarget type must not be empty.');
    }

    if (!props.applicableAssetTypes.length) {
      throw new Error('SubscriptionTarget applicableAssetTypes must contain at least one entry.');
    }

    if (!props.authorizedPrincipals.length || props.authorizedPrincipals.length > MAX_AUTHORIZED_PRINCIPALS) {
      throw new Error(`SubscriptionTarget authorizedPrincipals must contain 1–${MAX_AUTHORIZED_PRINCIPALS} entries.`);
    }

    if (!props.subscriptionTargetConfig.length) {
      throw new Error('SubscriptionTarget subscriptionTargetConfig must contain at least one form.');
    }

    const resource = new datazone.CfnSubscriptionTarget(this, 'Resource', {
      name: props.name,
      domainIdentifier: props.domainIdentifier,
      environmentIdentifier: props.environmentIdentifier,
      type: props.type,
      applicableAssetTypes: props.applicableAssetTypes,
      authorizedPrincipals: props.authorizedPrincipals,
      subscriptionTargetConfig: props.subscriptionTargetConfig.map((f) => ({
        content: f.content,
        formName: f.formName,
      })),
      manageAccessRole: props.manageAccessRole,
      provider: props.provider,
    });

    this.subscriptionTargetId = resource.attrId;
  }
}
