import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DataQualityRuleset } from './data-quality-ruleset.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'my-ruleset',
  ruleset: 'Rules = [ Completeness "col" = 1.0 ]',
  targetTable: { databaseName: 'my_db', tableName: 'my_table' },
};

describe('DataQualityRuleset', () => {
  test('creates a data quality ruleset with required props', () => {
    const stack = createStack();
    new DataQualityRuleset(stack, 'Ruleset', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::DataQualityRuleset', {
      Name: 'my-ruleset',
      Ruleset: 'Rules = [ Completeness "col" = 1.0 ]',
      TargetTable: { DatabaseName: 'my_db', TableName: 'my_table' },
    });
  });

  test('includes description when provided', () => {
    const stack = createStack();
    new DataQualityRuleset(stack, 'Ruleset', { ...validProps, description: 'Quality checks' });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::DataQualityRuleset', {
      Description: 'Quality checks',
    });
  });

  test('includes clientToken when provided', () => {
    const stack = createStack();
    new DataQualityRuleset(stack, 'Ruleset', { ...validProps, clientToken: 'abc-123' });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::DataQualityRuleset', {
      ClientToken: 'abc-123',
    });
  });

  test('passes tags as record to CloudFormation', () => {
    const stack = createStack();
    new DataQualityRuleset(stack, 'Ruleset', { ...validProps, tags: { env: 'prod', team: 'data' } });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::DataQualityRuleset', {
      Tags: { env: 'prod', team: 'data' },
    });
  });

  test('exposes the name', () => {
    const stack = createStack();
    const ruleset = new DataQualityRuleset(stack, 'Ruleset', validProps);
    expect(ruleset.name).toBe('my-ruleset');
  });

  describe('validation', () => {
    test('throws on empty name', () => {
      const stack = createStack();
      expect(() => new DataQualityRuleset(stack, 'R', { ...validProps, name: '' })).toThrow(/name ''/);
    });

    test('throws on name exceeding 255 characters', () => {
      const stack = createStack();
      expect(() => new DataQualityRuleset(stack, 'R', { ...validProps, name: 'a'.repeat(256) })).toThrow(
        /1–255 characters/,
      );
    });

    test('throws on name with invalid characters', () => {
      const stack = createStack();
      expect(() => new DataQualityRuleset(stack, 'R', { ...validProps, name: 'has spaces' })).toThrow(/must be 1–255/);
    });

    test('throws when ruleset does not start with Rules = [', () => {
      const stack = createStack();
      expect(() => new DataQualityRuleset(stack, 'R', { ...validProps, ruleset: 'Completeness "col" = 1.0' })).toThrow(
        /must begin with/,
      );
    });

    test('accepts ruleset with flexible whitespace', () => {
      const stack = createStack();
      new DataQualityRuleset(stack, 'R', { ...validProps, ruleset: '  rules  =  [ Completeness "x" = 1.0 ]' });
      Template.fromStack(stack).hasResourceProperties('AWS::Glue::DataQualityRuleset', {
        Ruleset: '  rules  =  [ Completeness "x" = 1.0 ]',
      });
    });

    test('throws on description exceeding 2048 characters', () => {
      const stack = createStack();
      expect(() => new DataQualityRuleset(stack, 'R', { ...validProps, description: 'x'.repeat(2049) })).toThrow(
        /at most 2048 characters/,
      );
    });

    test('throws on empty targetTable.databaseName', () => {
      const stack = createStack();
      expect(
        () =>
          new DataQualityRuleset(stack, 'R', {
            ...validProps,
            targetTable: { databaseName: '', tableName: 'tbl' },
          }),
      ).toThrow(/databaseName must not be empty/);
    });

    test('throws on empty targetTable.tableName', () => {
      const stack = createStack();
      expect(
        () =>
          new DataQualityRuleset(stack, 'R', {
            ...validProps,
            targetTable: { databaseName: 'db', tableName: '' },
          }),
      ).toThrow(/tableName must not be empty/);
    });
  });

  describe('fromAttributes', () => {
    test('returns an IDataQualityRuleset with the provided name', () => {
      const stack = createStack();
      const imported = DataQualityRuleset.fromAttributes(stack, 'Imported', { name: 'existing-ruleset' });
      expect(imported.name).toBe('existing-ruleset');
    });

    test('does not create any CloudFormation resources', () => {
      const stack = createStack();
      DataQualityRuleset.fromAttributes(stack, 'Imported', { name: 'existing-ruleset' });
      expect(stack.node.children.length).toBe(1);
    });
  });
});
