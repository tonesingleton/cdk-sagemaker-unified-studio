import { aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { EnvironmentProps } from './environment.interface';

const GLOSSARY_TERM_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;

/**
 * A SageMaker Unified Studio environment within a project.
 *
 * Environments provide the runtime infrastructure (e.g. compute, storage)
 * for a project, based on the project's configured blueprints.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/environments.html
 */
export class Environment extends Construct {
  /** The environment ID. */
  public readonly environmentId: string;

  constructor(scope: Construct, id: string, props: EnvironmentProps) {
    super(scope, id);

    for (const term of props.glossaryTerms ?? []) {
      if (!GLOSSARY_TERM_PATTERN.test(term)) {
        throw new Error(`Invalid glossary term '${term}'. Must match ${GLOSSARY_TERM_PATTERN}.`);
      }
    }

    const environment = new datazone.CfnEnvironment(this, 'Resource', {
      domainIdentifier: props.domainId,
      projectIdentifier: props.projectId,
      name: props.name,
      description: props.description,
      environmentBlueprintIdentifier: props.environmentBlueprintId,
      environmentConfigurationId: props.environmentConfigurationId,
      userParameters: props.userParameters?.map((p) => ({ name: p.name, value: p.value })),
      glossaryTerms: props.glossaryTerms && props.glossaryTerms.length > 0 ? [...props.glossaryTerms] : undefined,
    });

    this.environmentId = environment.attrId;
  }
}
