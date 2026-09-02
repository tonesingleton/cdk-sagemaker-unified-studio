import { aws_datazone as datazone, aws_lakeformation as lakeformation, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { EnvironmentAttributes, EnvironmentProps, IEnvironment } from './environment.interface';

const GLOSSARY_TERM_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;

/**
 * A SageMaker Unified Studio environment within a project.
 *
 * Environments provide the runtime infrastructure (e.g. compute, storage)
 * for a project, based on the project's configured blueprints.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/environments.html
 */
export class Environment extends Construct implements IEnvironment {
  /**
   * Import an existing environment from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: EnvironmentAttributes): IEnvironment {
    class ImportedEnvironment extends Construct implements IEnvironment {
      public readonly environmentId = attrs.environmentId;
    }
    return new ImportedEnvironment(scope, id);
  }

  /** The environment ID. */
  public readonly environmentId: string;

  constructor(scope: Construct, id: string, props: EnvironmentProps) {
    super(scope, id);

    if (props.glueDbName && !props.projectExecutionRoleArn) {
      throw new Error('projectExecutionRoleArn is required when glueDbName is set.');
    }

    for (const term of props.glossaryTerms ?? []) {
      if (!GLOSSARY_TERM_PATTERN.test(term)) {
        throw new Error(`Invalid glossary term '${term}'. Must match ${GLOSSARY_TERM_PATTERN}.`);
      }
    }

    const allUserParameters = [
      ...(props.userParameters ?? []),
      ...(props.glueDbName ? [{ name: 'glueDbName', value: props.glueDbName }] : []),
    ];

    const stack = Stack.of(this);
    const environment = new datazone.CfnEnvironment(this, 'Resource', {
      domainIdentifier: props.domainId,
      projectIdentifier: props.projectId,
      name: props.name ?? '',
      description: props.description,
      environmentBlueprintIdentifier: props.environmentBlueprintId,
      environmentAccountIdentifier: props.environmentBlueprintId ? stack.account : undefined,
      environmentAccountRegion: props.environmentBlueprintId ? stack.region : undefined,
      environmentConfigurationId: props.environmentConfigurationId,
      userParameters:
        allUserParameters.length > 0 ? allUserParameters.map((p) => ({ name: p.name, value: p.value })) : undefined,
      glossaryTerms: props.glossaryTerms && props.glossaryTerms.length > 0 ? [...props.glossaryTerms] : undefined,
    });

    this.environmentId = environment.attrId;

    if (props.glueDbName && props.projectExecutionRoleArn) {
      const dbPerms = new lakeformation.CfnPrincipalPermissions(this, 'GlueDbPermissions', {
        principal: { dataLakePrincipalIdentifier: props.projectExecutionRoleArn },
        resource: { database: { catalogId: stack.account, name: props.glueDbName } },
        permissions: ['ALL', 'CREATE_TABLE', 'ALTER', 'DROP', 'DESCRIBE'],
        permissionsWithGrantOption: ['ALL', 'CREATE_TABLE', 'ALTER', 'DROP', 'DESCRIBE'],
      });
      dbPerms.addResourceDependency(environment);

      const tablePerms = new lakeformation.CfnPrincipalPermissions(this, 'GlueTablePermissions', {
        principal: { dataLakePrincipalIdentifier: props.projectExecutionRoleArn },
        resource: { table: { catalogId: stack.account, databaseName: props.glueDbName, tableWildcard: {} } },
        permissions: ['ALL', 'SELECT', 'INSERT', 'DELETE', 'DESCRIBE', 'ALTER', 'DROP'],
        permissionsWithGrantOption: ['ALL', 'SELECT', 'INSERT', 'DELETE', 'DESCRIBE', 'ALTER', 'DROP'],
      });
      tablePerms.addResourceDependency(environment);
    }
  }
}
