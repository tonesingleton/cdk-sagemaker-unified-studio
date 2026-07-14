import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { FormType } from './form-type.construct';
import { FormTypeStatus } from './form-type.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  name: 'MyFormType',
  domainIdentifier: 'dzd-abc123',
  owningProjectIdentifier: 'proj-abc123',
  model: { smithy: 'string MyForm { @required name: String }' },
};

describe('FormType', () => {
  test('creates a form type with required props', () => {
    const stack = createStack();
    new FormType(stack, 'Form', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::FormType', {
      Name: 'MyFormType',
      DomainIdentifier: 'dzd-abc123',
      OwningProjectIdentifier: 'proj-abc123',
      Model: { Smithy: 'string MyForm { @required name: String }' },
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

    test('throws on empty smithy model', () => {
      const stack = createStack();
      expect(() => new FormType(stack, 'F', { ...validProps, model: { smithy: '' } })).toThrow(/smithy/);
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
      Template.fromStack(stack).resourceCountIs('AWS::DataZone::FormType', 0);
    });
  });
});
