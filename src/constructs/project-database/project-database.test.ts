import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { ProjectDatabase } from './project-database.construct';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('ProjectDatabase', () => {
  test('creates a Glue database', () => {
    const stack = createStack();
    new ProjectDatabase(stack, 'Db', {
      databaseName: 'my_database',
      projectExecutionRoleArn: 'arn:aws:iam::123456789012:role/MyRole',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Database', {
      CatalogId: '123456789012',
      DatabaseInput: {
        Name: 'my_database',
      },
    });
  });

  test('creates database with description', () => {
    const stack = createStack();
    new ProjectDatabase(stack, 'Db', {
      databaseName: 'my_database',
      description: 'Test database',
      projectExecutionRoleArn: 'arn:aws:iam::123456789012:role/MyRole',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Database', {
      DatabaseInput: Match.objectLike({
        Description: 'Test database',
      }),
    });
  });

  test('creates database with locationUri', () => {
    const stack = createStack();
    new ProjectDatabase(stack, 'Db', {
      databaseName: 'my_database',
      projectExecutionRoleArn: 'arn:aws:iam::123456789012:role/MyRole',
      locationUri: 's3://my-bucket/my-prefix/',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Database', {
      DatabaseInput: Match.objectLike({
        LocationUri: 's3://my-bucket/my-prefix/',
      }),
    });
  });

  test('grants Lake Formation database permissions to the project execution role', () => {
    const stack = createStack();
    new ProjectDatabase(stack, 'Db', {
      databaseName: 'my_database',
      projectExecutionRoleArn: 'arn:aws:iam::123456789012:role/MyRole',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::LakeFormation::PrincipalPermissions', {
      Principal: {
        DataLakePrincipalIdentifier: 'arn:aws:iam::123456789012:role/MyRole',
      },
      Resource: {
        Database: {
          CatalogId: '123456789012',
          DatabaseName: 'my_database',
        },
      },
      Permissions: Match.arrayWith(['ALL', 'CREATE_TABLE']),
      PermissionsWithGrantOption: Match.arrayWith(['ALL', 'CREATE_TABLE']),
    });
  });

  test('grants Lake Formation table wildcard permissions to the project execution role', () => {
    const stack = createStack();
    new ProjectDatabase(stack, 'Db', {
      databaseName: 'my_database',
      projectExecutionRoleArn: 'arn:aws:iam::123456789012:role/MyRole',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::LakeFormation::PrincipalPermissions', {
      Principal: {
        DataLakePrincipalIdentifier: 'arn:aws:iam::123456789012:role/MyRole',
      },
      Resource: {
        Table: {
          CatalogId: '123456789012',
          DatabaseName: 'my_database',
          TableWildcard: {},
        },
      },
      Permissions: Match.arrayWith(['ALL', 'SELECT', 'INSERT', 'DELETE', 'DESCRIBE']),
      PermissionsWithGrantOption: Match.arrayWith(['ALL', 'SELECT', 'INSERT', 'DELETE', 'DESCRIBE']),
    });
  });

  test('exposes databaseName', () => {
    const stack = createStack();
    const db = new ProjectDatabase(stack, 'Db', {
      databaseName: 'my_database',
      projectExecutionRoleArn: 'arn:aws:iam::123456789012:role/MyRole',
    });
    expect(db.databaseName).toBe('my_database');
  });
});
