import { aws_glue as glue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type {
  DataQualityRulesetAttributes,
  DataQualityRulesetProps,
  IDataQualityRuleset,
} from './data-quality-ruleset.interface';

const NAME_PATTERN = /^[a-zA-Z0-9_-]+$/;
const MAX_NAME_LENGTH = 255;
const MAX_DESCRIPTION_LENGTH = 2048;
const RULESET_PREFIX = /^\s*rules\s*=\s*\[/i;

/**
 * A Glue Data Quality Ruleset using DQDL (Data Quality Definition Language).
 *
 * Creates an `AWS::Glue::DataQualityRuleset` resource targeting a specific
 * Glue catalog table.
 *
 * @see https://docs.aws.amazon.com/glue/latest/dg/dqdl.html
 */
export class DataQualityRuleset extends Construct implements IDataQualityRuleset {
  /**
   * Import an existing data quality ruleset from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: DataQualityRulesetAttributes): IDataQualityRuleset {
    class ImportedDataQualityRuleset extends Construct implements IDataQualityRuleset {
      public readonly name = attrs.name;
    }
    return new ImportedDataQualityRuleset(scope, id);
  }

  public readonly name: string;

  constructor(scope: Construct, id: string, props: DataQualityRulesetProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH || !NAME_PATTERN.test(props.name)) {
      throw new Error(
        `DataQualityRuleset name '${props.name}' must be 1–${MAX_NAME_LENGTH} characters and match ${NAME_PATTERN}.`,
      );
    }

    if (!RULESET_PREFIX.test(props.ruleset)) {
      throw new Error("DataQualityRuleset ruleset must begin with 'Rules = [' (DQDL format).");
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `DataQualityRuleset description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
      );
    }

    if (!props.targetTable.databaseName) {
      throw new Error('DataQualityRuleset targetTable.databaseName must not be empty.');
    }

    if (!props.targetTable.tableName) {
      throw new Error('DataQualityRuleset targetTable.tableName must not be empty.');
    }

    this.name = props.name;

    const tags = props.tags ? Object.entries(props.tags).map(([key, value]) => ({ key, value })) : undefined;

    new glue.CfnDataQualityRuleset(this, 'Resource', {
      name: props.name,
      description: props.description,
      clientToken: props.clientToken,
      ruleset: props.ruleset,
      targetTable: {
        databaseName: props.targetTable.databaseName,
        tableName: props.targetTable.tableName,
      },
      tags: tags,
    });
  }
}
