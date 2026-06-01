import { Stack, aws_glue as glue, aws_lakeformation as lakeformation } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { IProjectDatabase, ProjectDatabaseProps } from './project-database.interface';

/**
 * Creates a Glue database and grants Lake Formation permissions to the project execution role.
 *
 * This construct replicates what SageMaker Unified Studio does when a user creates
 * a database via the UI: it creates the Glue database and grants the project execution
 * role full Lake Formation permissions on it.
 *
 * Use this instead of the DataZone Environment construct (which requires UI-provisioned
 * identity authorization that CloudFormation cannot satisfy).
 *
 * @see https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-databases.html
 */
export class ProjectDatabase extends Construct implements IProjectDatabase {
  /** The name of the Glue database. */
  public readonly databaseName: string;

  constructor(scope: Construct, id: string, props: ProjectDatabaseProps) {
    super(scope, id);

    const account = Stack.of(this).account;

    this.databaseName = props.databaseName;

    const database = new glue.CfnDatabase(this, 'Resource', {
      catalogId: account,
      databaseInput: {
        name: props.databaseName,
        description: props.description,
        locationUri: props.locationUri,
      },
    });

    const databasePermissions = new lakeformation.CfnPermissions(this, 'DatabasePermissions', {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: props.projectExecutionRoleArn,
      },
      resource: {
        databaseResource: {
          catalogId: account,
          name: props.databaseName,
        },
      },
      permissions: ['ALL', 'CREATE_TABLE', 'ALTER', 'DROP', 'DESCRIBE'],
      permissionsWithGrantOption: ['ALL', 'CREATE_TABLE', 'ALTER', 'DROP', 'DESCRIBE'],
    });
    databasePermissions.addDependency(database);

    const tablePermissions = new lakeformation.CfnPermissions(this, 'TablePermissions', {
      dataLakePrincipal: {
        dataLakePrincipalIdentifier: props.projectExecutionRoleArn,
      },
      resource: {
        tableResource: {
          catalogId: account,
          databaseName: props.databaseName,
          tableWildcard: {},
        },
      },
      permissions: ['ALL', 'SELECT', 'INSERT', 'DELETE', 'DESCRIBE', 'ALTER', 'DROP'],
      permissionsWithGrantOption: ['ALL', 'SELECT', 'INSERT', 'DELETE', 'DESCRIBE', 'ALTER', 'DROP'],
    });
    tablePermissions.addDependency(database);
  }
}
