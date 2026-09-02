import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PolicyGrant } from './policy-grant.construct';
import { PolicyGrantEntityType, PolicyType } from './policy-grant.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  domainIdentifier: 'dzd-abc123',
  entityIdentifier: '123456789012:my-blueprint-id',
  entityType: PolicyGrantEntityType.ENVIRONMENT_BLUEPRINT_CONFIGURATION,
  policyType: PolicyType.CREATE_ENVIRONMENT_FROM_BLUEPRINT,
  principal: {
    project: {
      projectDesignation: 'CONTRIBUTOR' as const,
      projectGrantFilter: {
        domainUnitFilter: {
          domainUnit: 'root-unit-id',
          includeChildDomainUnits: true,
        },
      },
    },
  },
  detail: { createEnvironmentFromBlueprint: {} },
};

describe('PolicyGrant', () => {
  test('creates a policy grant with required props', () => {
    const stack = createStack();
    new PolicyGrant(stack, 'Grant', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::PolicyGrant', {
      DomainIdentifier: 'dzd-abc123',
      EntityIdentifier: '123456789012:my-blueprint-id',
      EntityType: 'ENVIRONMENT_BLUEPRINT_CONFIGURATION',
      PolicyType: 'CREATE_ENVIRONMENT_FROM_BLUEPRINT',
      Principal: {
        Project: {
          ProjectDesignation: 'CONTRIBUTOR',
          ProjectGrantFilter: {
            DomainUnitFilter: {
              DomainUnit: 'root-unit-id',
              IncludeChildDomainUnits: true,
            },
          },
        },
      },
      Detail: { CreateEnvironmentFromBlueprint: {} },
    });
  });

  test('creates a policy grant with domain unit principal', () => {
    const stack = createStack();
    new PolicyGrant(stack, 'Grant', {
      domainIdentifier: 'dzd-abc123',
      entityIdentifier: 'my-domain-unit-id',
      entityType: PolicyGrantEntityType.DOMAIN_UNIT,
      policyType: PolicyType.CREATE_PROJECT,
      principal: {
        domainUnit: {
          domainUnitDesignation: 'OWNER',
          domainUnitIdentifier: 'du-123',
        },
      },
      detail: { createProject: {} },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::PolicyGrant', {
      EntityType: 'DOMAIN_UNIT',
      PolicyType: 'CREATE_PROJECT',
      Principal: {
        DomainUnit: {
          DomainUnitDesignation: 'OWNER',
          DomainUnitIdentifier: 'du-123',
        },
      },
      Detail: { CreateProject: {} },
    });
  });

  test('creates a policy grant without optional principal and detail', () => {
    const stack = createStack();
    new PolicyGrant(stack, 'Grant', {
      domainIdentifier: 'dzd-abc123',
      entityIdentifier: 'entity-id',
      entityType: PolicyGrantEntityType.ASSET_TYPE,
      policyType: PolicyType.CREATE_ASSET_TYPE,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::PolicyGrant', {
      DomainIdentifier: 'dzd-abc123',
      EntityIdentifier: 'entity-id',
      EntityType: 'ASSET_TYPE',
      PolicyType: 'CREATE_ASSET_TYPE',
    });
  });

  test('exposes the grant ID', () => {
    const stack = createStack();
    const grant = new PolicyGrant(stack, 'Grant', validProps);
    expect(grant.grantId).toBeDefined();
  });

  describe('validation', () => {
    test('throws on invalid domainIdentifier pattern', () => {
      const stack = createStack();
      expect(() => new PolicyGrant(stack, 'G', { ...validProps, domainIdentifier: 'invalid' })).toThrow(
        /domainIdentifier/,
      );
    });

    test('throws on empty entityIdentifier', () => {
      const stack = createStack();
      expect(() => new PolicyGrant(stack, 'G', { ...validProps, entityIdentifier: '' })).toThrow(
        /entityIdentifier must not be empty/,
      );
    });
  });

  describe('fromAttributes', () => {
    test('returns an IPolicyGrant with the provided grant ID', () => {
      const stack = createStack();
      const imported = PolicyGrant.fromAttributes(stack, 'Imported', { grantId: 'grant-123' });
      expect(imported.grantId).toBe('grant-123');
    });

    test('does not create any CloudFormation resources', () => {
      const stack = createStack();
      PolicyGrant.fromAttributes(stack, 'Imported', { grantId: 'grant-123' });
      expect(stack.node.children.length).toBe(1);
    });
  });
});
