import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { FormType } from './form-type.construct';
import { FormFieldType, FormTypeStatus } from './form-type.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'MyFormType',
  domainIdentifier: 'dzd-abc123',
  owningProjectIdentifier: 'proj-abc123',
  model: { smithy: 'structure MyFormType { name: String }' },
};

describe('FormType', () => {
  test('creates a form type with raw smithy model', () => {
    const stack = createStack();
    new FormType(stack, 'Form', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::FormType', {
      Name: 'MyFormType',
      DomainIdentifier: 'dzd-abc123',
      OwningProjectIdentifier: 'proj-abc123',
      Model: { Smithy: 'structure MyFormType { name: String }' },
    });
  });

  test('creates a form type with typed fields', () => {
    const stack = createStack();
    new FormType(stack, 'Form', {
      ...validProps,
      model: {
        fields: [
          { name: 'sensitivity', type: FormFieldType.STRING, required: true, documentation: 'Level' },
          { name: 'retentionDays', type: FormFieldType.INTEGER, range: { min: 1, max: 365 } },
        ],
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::FormType', {
      Model: {
        Smithy: [
          'structure MyFormType {',
          '    @required',
          '    @documentation("Level")',
          '    sensitivity: String',
          '    @range(min: 1, max: 365)',
          '    retentionDays: Integer',
          '}',
        ].join('\n'),
      },
    });
  });

  test('typed fields with displayName annotation', () => {
    const stack = createStack();
    new FormType(stack, 'Form', {
      ...validProps,
      model: {
        fields: [{ name: 'owner', type: FormFieldType.STRING, displayName: 'Data Owner' }],
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::FormType', {
      Model: {
        Smithy: [
          'structure MyFormType {',
          '    @amazon.datazone#displayname(defaultName: "Data Owner")',
          '    owner: String',
          '}',
        ].join('\n'),
      },
    });
  });

  test('typed fields take precedence over raw smithy', () => {
    const stack = createStack();
    new FormType(stack, 'Form', {
      ...validProps,
      model: {
        fields: [{ name: 'x', type: FormFieldType.BOOLEAN }],
        smithy: 'structure Ignored { y: String }',
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::FormType', {
      Model: {
        Smithy: ['structure MyFormType {', '    x: Boolean', '}'].join('\n'),
      },
    });
  });

  test('creates a form type with all optional props', () => {
    const stack = createStack();
    new FormType(stack, 'Form', {
      ...validProps,
      description: 'A test form type',
      status: FormTypeStatus.DISABLED,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::FormType', {
      Description: 'A test form type',
      Status: 'DISABLED',
    });
  });

  test('exposes formTypeIdentifier and revision', () => {
    const stack = createStack();
    const form = new FormType(stack, 'Form', validProps);
    expect(form.formTypeIdentifier).toBeDefined();
    expect(form.revision).toBeDefined();
  });

  describe('validation', () => {
    test('throws on invalid name pattern', () => {
      const stack = createStack();
      expect(() => new FormType(stack, 'F', { ...validProps, name: '9invalid' })).toThrow(/name/);
    });

    test('throws on name exceeding 128 characters', () => {
      const stack = createStack();
      expect(() => new FormType(stack, 'F', { ...validProps, name: 'a'.repeat(129) })).toThrow(/name/);
    });

    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new FormType(stack, 'F', { ...validProps, name: '' })).toThrow(/name/);
    });

    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new FormType(stack, 'F', { ...validProps, domainIdentifier: 'bad' })).toThrow(/domainIdentifier/);
    });

    test('throws on invalid owningProjectIdentifier', () => {
      const stack = createStack();
      expect(() => new FormType(stack, 'F', { ...validProps, owningProjectIdentifier: 'has spaces!' })).toThrow(
        /owningProjectIdentifier/,
      );
    });

    test('throws when neither fields nor smithy is provided', () => {
      const stack = createStack();
      expect(() => new FormType(stack, 'F', { ...validProps, model: {} })).toThrow(/fields.*smithy/);
    });

    test('throws when generated smithy exceeds 100000 characters', () => {
      const stack = createStack();
      expect(() => new FormType(stack, 'F', { ...validProps, model: { smithy: 'x'.repeat(100001) } })).toThrow(
        /100000 characters/,
      );
    });

    test('throws on description exceeding 2048 characters', () => {
      const stack = createStack();
      expect(() => new FormType(stack, 'F', { ...validProps, description: 'x'.repeat(2049) })).toThrow(/description/);
    });
  });

  describe('fromAttributes', () => {
    test('returns an IFormType with provided attributes', () => {
      const stack = createStack();
      const imported = FormType.fromAttributes(stack, 'Imported', {
        formTypeIdentifier: 'proj-123:MyForm',
        revision: '1',
      });
      expect(imported.formTypeIdentifier).toBe('proj-123:MyForm');
      expect(imported.revision).toBe('1');
    });

    test('does not create any CloudFormation resources', () => {
      const stack = createStack();
      FormType.fromAttributes(stack, 'Imported', { formTypeIdentifier: 'proj-123:MyForm', revision: '1' });
      expect(stack.node.children.length).toBe(1);
    });
  });
});
