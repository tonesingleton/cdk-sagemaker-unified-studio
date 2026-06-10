import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { DqdlRuleset } from './dqdl-ruleset.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('DqdlRuleset', () => {
  test('creates a data quality ruleset', () => {
    const stack = createStack();
    new DqdlRuleset(stack, 'Ruleset', {
      name: 'my-ruleset',
      ruleset: 'Rules = [ Completeness "col" = 1.0 ]',
      databaseName: 'my_db',
      tableName: 'my_table',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::DataQualityRuleset', {
      Name: 'my-ruleset',
      Ruleset: 'Rules = [ Completeness "col" = 1.0 ]',
      TargetTable: { DatabaseName: 'my_db', TableName: 'my_table' },
    });
  });

  test('includes description when provided', () => {
    const stack = createStack();
    new DqdlRuleset(stack, 'Ruleset', {
      name: 'my-ruleset',
      ruleset: 'Rules = [ Completeness "col" = 1.0 ]',
      databaseName: 'my_db',
      tableName: 'my_table',
      description: 'Quality checks for my_table',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::DataQualityRuleset', {
      Description: 'Quality checks for my_table',
    });
  });

  test('exposes the name', () => {
    const stack = createStack();
    const ruleset = new DqdlRuleset(stack, 'Ruleset', {
      name: 'my-ruleset',
      ruleset: 'Rules = [ Completeness "col" = 1.0 ]',
      databaseName: 'my_db',
      tableName: 'my_table',
    });
    expect(ruleset.name).toBe('my-ruleset');
  });
});
