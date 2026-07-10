import { aws_glue as glue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { DqdlRulesetProps } from './dqdl-ruleset.interface';

/**
 * A Glue Data Quality ruleset using DQDL (Data Quality Definition Language).
 *
 * @see https://docs.aws.amazon.com/glue/latest/dg/dqdl.html
 */
export class DqdlRuleset extends Construct {
  public readonly name: string;

  constructor(scope: Construct, id: string, props: DqdlRulesetProps) {
    super(scope, id);

    this.name = props.name;

    new glue.CfnDataQualityRuleset(this, 'Resource', {
      name: props.name,
      description: props.description,
      ruleset: props.ruleset,
      targetTable: {
        databaseName: props.databaseName,
        tableName: props.tableName,
      },
      tags: props.tags,
    });
  }
}
