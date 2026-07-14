import { Token, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { IPolicyGrant, PolicyGrantAttributes, PolicyGrantProps } from './policy-grant.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;

/**
 * A standalone DataZone policy grant that authorizes fine-grained permissions
 * (e.g. USE_BLUEPRINT, CREATE_PROJECT) on domain units, environment blueprint
 * configurations, environment profiles, or asset types.
 *
 * This construct wraps `AWS::DataZone::PolicyGrant` and can be used independently
 * of the `Domain` construct to build custom governance topologies.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-policygrant.html
 */
export class PolicyGrant extends Construct implements IPolicyGrant {
  /**
   * Import an existing policy grant from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: PolicyGrantAttributes): IPolicyGrant {
    class ImportedPolicyGrant extends Construct implements IPolicyGrant {
      public readonly grantId = attrs.grantId;
    }
    return new ImportedPolicyGrant(scope, id);
  }

  /** The grant ID assigned by DataZone. */
  public readonly grantId: string;

  constructor(scope: Construct, id: string, props: PolicyGrantProps) {
    super(scope, id);

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `PolicyGrant domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!Token.isUnresolved(props.entityIdentifier) && !props.entityIdentifier) {
      throw new Error('PolicyGrant entityIdentifier must not be empty.');
    }

    const resource = new datazone.CfnPolicyGrant(this, 'Resource', {
      domainIdentifier: props.domainIdentifier,
      entityIdentifier: props.entityIdentifier,
      entityType: props.entityType,
      policyType: props.policyType,
      principal: props.principal,
      detail: props.detail,
    });

    this.grantId = resource.attrGrantId;
  }
}
