import { Stack, aws_glue as glue, aws_lakeformation as lakeformation } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { DataCatalogTableProps, IDataCatalogTable } from './data-catalog-table.interface';
import { DataFormat } from './data-catalog-table.interface';

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
 * A Glue Data Catalog table with configurable schema, format, and Lake Formation registration.
 *
 * @see https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-tables.html
 */
export class DataCatalogTable extends Construct implements IDataCatalogTable {
  public readonly tableName: string;
  public readonly databaseName: string;

  constructor(scope: Construct, id: string, props: DataCatalogTableProps) {
    super(scope, id);

    this.tableName = props.tableName;
    this.databaseName = props.databaseName;

    const format = props.dataFormat ?? DataFormat.PARQUET;
    const config = FORMAT_CONFIG[format];

    const table = new glue.CfnTable(this, 'Resource', {
      catalogId: Stack.of(this).account,
      databaseName: props.databaseName,
      tableInput: {
        name: props.tableName,
        description: props.description,
        tableType: 'EXTERNAL_TABLE',
        parameters: {
          EXTERNAL: 'TRUE',
          classification: format.toLowerCase(),
          ...props.parameters,
        },
        partitionKeys: props.partitionKeys?.map((col) => ({
          name: col.name,
          type: col.type,
          comment: col.comment,
        })),
        storageDescriptor: {
          columns: props.columns.map((col) => ({
            name: col.name,
            type: col.type,
            comment: col.comment,
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

    if (props.registeredWithLakeFormation) {
      const resource = new lakeformation.CfnResource(this, 'LakeFormationResource', {
        resourceArn: `arn:aws:s3:::${props.location.replace('s3://', '')}`,
        useServiceLinkedRole: true,
      });
      resource.addDependency(table);
    }
  }
}
