import { Stack, Validations, aws_glue as glue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { DataCatalogTableProps, IDataCatalogTable } from './data-catalog-table.interface';
import { DataFormat, TableType } from './data-catalog-table.interface';
import { DataQualityRuleset } from '../data-quality-ruleset/data-quality-ruleset.construct';

const FORMAT_CONFIG: Record<DataFormat, { inputFormat: string; outputFormat: string; serializationLibrary: string }> = {
  [DataFormat.PARQUET]: {
    inputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat',
    outputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat',
    serializationLibrary: 'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe',
  },
  [DataFormat.ORC]: {
    inputFormat: 'org.apache.hadoop.hive.ql.io.orc.OrcInputFormat',
    outputFormat: 'org.apache.hadoop.hive.ql.io.orc.OrcOutputFormat',
    serializationLibrary: 'org.apache.hadoop.hive.ql.io.orc.OrcSerde',
  },
  [DataFormat.JSON]: {
    inputFormat: 'org.apache.hadoop.mapred.TextInputFormat',
    outputFormat: 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
    serializationLibrary: 'org.openx.data.jsonserde.JsonSerDe',
  },
  [DataFormat.CSV]: {
    inputFormat: 'org.apache.hadoop.mapred.TextInputFormat',
    outputFormat: 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
    serializationLibrary: 'org.apache.hadoop.hive.serde2.OpenCSVSerde',
  },
};

/**
 * A Glue Data Catalog table with configurable schema, format, and governance mode.
 *
 * @see https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-tables.html
 */
export class DataCatalogTable extends Construct implements IDataCatalogTable {
  public readonly tableName: string;
  public readonly databaseName: string;
  private readonly projectId: string;
  private readonly cfnTable: glue.CfnTable;

  constructor(scope: Construct, id: string, props: DataCatalogTableProps) {
    super(scope, id);

    this.tableName = props.tableName;
    this.databaseName = props.databaseName;
    this.projectId = props.projectId;

    const format = props.dataFormat ?? DataFormat.PARQUET;
    const config = FORMAT_CONFIG[format];
    const tableType = props.tableType ?? TableType.EXTERNAL;
    const isExternal = tableType === TableType.EXTERNAL;

    this.cfnTable = new glue.CfnTable(this, 'Resource', {
      catalogId: Stack.of(this).account,
      databaseName: props.databaseName,
      tableInput: {
        name: props.tableName,
        description: props.description,
        tableType: tableType,
        parameters: {
          ...(isExternal ? { EXTERNAL: 'TRUE' } : {}),
          classification: format.toLowerCase(),
          ...props.parameters,
        },
        partitionKeys: props.partitionKeys?.map((col) => ({
          name: col.name,
          type: col.type,
          comment: col.comment,
          parameters: col.parameters,
        })),
        storageDescriptor: {
          columns: props.columns.map((col) => ({
            name: col.name,
            type: col.type,
            comment: col.comment,
            parameters: col.parameters,
          })),
          location: props.location,
          inputFormat: config.inputFormat,
          outputFormat: config.outputFormat,
          serdeInfo: {
            serializationLibrary: config.serializationLibrary,
            parameters: { 'serialization.format': '1' },
          },
        },
      },
    });

    if (tableType === TableType.GOVERNED) {
      Validations.of(this.cfnTable).acknowledge({
        id: 'CloudFormation-Validate::W3030',
        reason:
          'GOVERNED is a valid Lake Formation table type used for governed tables; the CFN schema enum is incomplete.',
      });
    }
  }

  /**
   * Attaches a Data Quality ruleset to this table.
   *
   * @param id Construct ID for the ruleset.
   * @param name Unique name for the ruleset.
   * @param ruleset The DQDL rules string (e.g. 'Rules = [ Completeness "col" = 1.0 ]').
   * @param description Optional description.
   * @param tags Optional tags to apply to the ruleset.
   */
  public addDataQualityRuleset(
    id: string,
    name: string,
    ruleset: string,
    description?: string,
    tags?: Record<string, string>,
  ): DataQualityRuleset {
    const mergedTags = {
      AmazonDataZoneProject: this.projectId,
      ...tags,
    };
    const dqr = new DataQualityRuleset(this, id, {
      name,
      ruleset,
      targetTable: {
        databaseName: this.databaseName,
        tableName: this.tableName,
      },
      description,
      tags: mergedTags,
    });
    (dqr.node.defaultChild as glue.CfnDataQualityRuleset).addResourceDependency(this.cfnTable);
    return dqr;
  }
}
