import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Rule } from './rule.construct';
import { RuleAction, RuleSelectionMode } from './rule.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  domainIdentifier: 'dzd-abc123',
  name: 'Require Classification Form',
  action: RuleAction.CREATE_LISTING_CHANGE_SET,
  scope: { assetType: { selectionMode: RuleSelectionMode.ALL } },
  target: { domainUnitTarget: { domainUnitId: 'du-root123', includeChildDomainUnits: true } },
  detail: {
    metadataFormEnforcementDetail: {
      requiredMetadataForms: [{ typeIdentifier: 'DataClassification', typeRevision: '1' }],
    },
  },
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('Rule', () => {
  test('creates a custom resource for the rule', () => {
    const stack = createStack();
    new Rule(stack, 'Rule', validProps);
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('creates with glossary term enforcement detail', () => {
    const stack = createStack();
    new Rule(stack, 'Rule', {
      ...validProps,
      detail: { glossaryTermEnforcementDetail: { requiredGlossaryTermIds: ['gt-abc123'] } },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('glossaryTermEnforcementDetail'),
    });
  });

  test('creates with CREATE_SUBSCRIPTION_REQUEST action', () => {
    const stack = createStack();
    new Rule(stack, 'Rule', { ...validProps, action: RuleAction.CREATE_SUBSCRIPTION_REQUEST });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('CREATE_SUBSCRIPTION_REQUEST'),
    });
  });

  test('creates with SPECIFIC project scope', () => {
    const stack = createStack();
    new Rule(stack, 'Rule', {
      ...validProps,
      scope: { project: { selectionMode: RuleSelectionMode.SPECIFIC, specificProjects: ['prj-abc123'] } },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('specificProjects'),
    });
  });

  test('creates with description', () => {
    const stack = createStack();
    new Rule(stack, 'Rule', { ...validProps, description: 'Enforce data classification' });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('Enforce data classification'),
    });
  });

  test('creates an onUpdate handler', () => {
    const stack = createStack();
    new Rule(stack, 'Rule', validProps);
    const resources = Template.fromStack(stack).findResources('Custom::AWS');
    expect(Object.values(resources)[0].Properties.Update).toBeDefined();
  });

  test('exposes ruleId', () => {
    const stack = createStack();
    const rule = new Rule(stack, 'Rule', validProps);
    expect(rule.ruleId).toBeDefined();
  });

  describe('validation', () => {
    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new Rule(stack, 'R', { ...validProps, domainIdentifier: 'bad' })).toThrow(/domainIdentifier/);
    });

    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new Rule(stack, 'R', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on name exceeding 256 characters', () => {
      const stack = createStack();
      expect(() => new Rule(stack, 'R', { ...validProps, name: 'x'.repeat(257) })).toThrow(/name/);
    });

    test('throws on name with invalid characters', () => {
      const stack = createStack();
      expect(() => new Rule(stack, 'R', { ...validProps, name: 'bad!name' })).toThrow(/name/);
    });

    test('throws on description exceeding 2048 characters', () => {
      const stack = createStack();
      expect(() => new Rule(stack, 'R', { ...validProps, description: 'x'.repeat(2049) })).toThrow(/description/);
    });

    test('throws when both detail types are set', () => {
      const stack = createStack();
      expect(
        () =>
          new Rule(stack, 'R', {
            ...validProps,
            detail: {
              metadataFormEnforcementDetail: { requiredMetadataForms: [{ typeIdentifier: 'T', typeRevision: '1' }] },
              glossaryTermEnforcementDetail: { requiredGlossaryTermIds: ['gt-abc'] },
            },
          }),
      ).toThrow(/metadataFormEnforcementDetail.*glossaryTermEnforcementDetail/);
    });
  });

  describe('fromAttributes', () => {
    test('returns an IRule with provided attributes', () => {
      const stack = createStack();
      const imported = Rule.fromAttributes(stack, 'Imported', { ruleId: 'rl-abc123' });
      expect(imported.ruleId).toBe('rl-abc123');
    });

    test('does not create any custom resources', () => {
      const stack = createStack();
      Rule.fromAttributes(stack, 'Imported', { ruleId: 'rl-abc123' });
      expect(stack.node.children.length).toBe(1);
    });
  });

  describe('without executionRoleArn', () => {
    const propsWithoutRole = { ...validProps, executionRoleArn: undefined };

    test('grants datazone permissions directly instead of sts:AssumeRole', () => {
      const stack = createStack();
      new Rule(stack, 'Rule', propsWithoutRole);
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['datazone:CreateRule', 'datazone:UpdateRule', 'datazone:DeleteRule'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      });
    });

    test('does not pass assumedRoleArn to the custom resource', () => {
      const stack = createStack();
      new Rule(stack, 'Rule', propsWithoutRole);
      const resources = Template.fromStack(stack).findResources('Custom::AWS');
      expect(JSON.stringify(Object.values(resources)[0].Properties.Create)).not.toContain('assumedRoleArn');
    });
  });
});
