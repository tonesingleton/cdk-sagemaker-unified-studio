import { Token, aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { OwnerProps } from './owner.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;

/**
 * Assigns an IAM role or group as the owner of a DataZone entity (domain unit).
 *
 * Owning the root domain unit is what the SageMaker Unified Studio portal
 * surfaces as the "Administrator" designation for a user or role.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-owner.html
 */
export class Owner extends Construct {
  constructor(scope: Construct, id: string, props: OwnerProps) {
    super(scope, id);

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(`Owner domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`);
    }

    if (!props.userIdentifier && !props.groupIdentifier) {
      throw new Error('Owner requires exactly one of userIdentifier or groupIdentifier.');
    }

    if (props.userIdentifier && props.groupIdentifier) {
      throw new Error('Owner requires exactly one of userIdentifier or groupIdentifier, not both.');
    }

    const owner: datazone.CfnOwner.OwnerPropertiesProperty = props.userIdentifier
      ? { user: { userIdentifier: props.userIdentifier } }
      : { group: { groupIdentifier: props.groupIdentifier! } };

    new datazone.CfnOwner(this, 'Resource', {
      domainIdentifier: props.domainIdentifier,
      entityIdentifier: props.entityIdentifier,
      entityType: props.entityType,
      owner,
    });
  }
}
