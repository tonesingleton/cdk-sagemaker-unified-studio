import { Stack, aws_glue as glue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { DataCatalogTableProps, IDataCatalogTable } from './data-catalog-table.interface';
import { DataFormat, TableType } from './data-catalog-table.interface';
import { DqdlRuleset } from '../dqdl-ruleset/dqdl-ruleset.construct';

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

  constructor(scope: Construct, id: string, props: DataCatalogTableProps) {
    super(scope, id);

    this.tableName = props.tableName;
    this.databaseName = props.databaseName;
    this.projectId = props.projectId;

    const format = props.dataFormat ?? DataFormat.PARQUET;
    const config = FORMAT_CONFIG[format];
    const tableType = props.tableType ?? TableType.EXTERNAL;
    const isExternal = tableType === TableType.EXTERNAL;

    new glue.CfnTable(this, 'Resource', {
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
  }

  /**
   * Attaches a DQDL ruleset to this table.
   *
   * @param id Construct ID for the ruleset.
   * @param name Unique name for the ruleset.
   * @param ruleset The DQDL rules string (e.g. 'Rules = [ Completeness "col" = 1.0 ]').
   * @param description Optional description.
   * @param tags Optional tags to apply to the ruleset.
   */
  public addDqdlRuleset(
    id: string,
    name: string,
    ruleset: string,
    description?: string,
    tags?: Record<string, string>,
  ): DqdlRuleset {
    const mergedTags = {
      AmazonDataZoneProject: this.projectId,
      ...tags,
    };
    const dqdl = new DqdlRuleset(this, id, {
      name,
      ruleset,
      databaseName: this.databaseName,
      tableName: this.tableName,
      description,
      tags: mergedTags,
    });
    dqdl.node.addDependency(this);
    return dqdl;
  }
}
