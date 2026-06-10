import { App, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { DataCatalogTable } from './data-catalog-table.construct';
import { DataFormat } from './data-catalog-table.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

describe('DataCatalogTable', () => {
  test('creates an external parquet table by default', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'dos',
      databaseName: 'guidewire',
      location: 's3://my-bucket/data/dos',
      columns: [
        { name: 'pol_no', type: 'string' },
        { name: 'amount', type: 'double' },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Table', {
      DatabaseName: 'guidewire',
      TableInput: Match.objectLike({
        Name: 'dos',
        TableType: 'EXTERNAL_TABLE',
        Parameters: Match.objectLike({ EXTERNAL: 'TRUE', classification: 'parquet' }),
        StorageDescriptor: Match.objectLike({
          Location: 's3://my-bucket/data/dos',
          InputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat',
          OutputFormat: 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat',
          SerdeInfo: {
            SerializationLibrary: 'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe',
            Parameters: { 'serialization.format': '1' },
          },
          Columns: [
            { Name: 'pol_no', Type: 'string' },
            { Name: 'amount', Type: 'double' },
          ],
        }),
      }),
    });
  });

  test('supports partition keys', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'dos',
      databaseName: 'guidewire',
      location: 's3://my-bucket/data/dos',
      columns: [{ name: 'pol_no', type: 'string' }],
      partitionKeys: [
        { name: 'year', type: 'int' },
        { name: 'month', type: 'int' },
      ],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Table', {
      TableInput: Match.objectLike({
        PartitionKeys: [
          { Name: 'year', Type: 'int' },
          { Name: 'month', Type: 'int' },
        ],
      }),
    });
  });

  test('supports CSV format', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'data',
      databaseName: 'db',
      location: 's3://bucket/csv',
      columns: [{ name: 'id', type: 'string' }],
      dataFormat: DataFormat.CSV,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Table', {
      TableInput: Match.objectLike({
        Parameters: Match.objectLike({ classification: 'csv' }),
        StorageDescriptor: Match.objectLike({
          InputFormat: 'org.apache.hadoop.mapred.TextInputFormat',
          OutputFormat: 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
          SerdeInfo: Match.objectLike({
            SerializationLibrary: 'org.apache.hadoop.hive.serde2.OpenCSVSerde',
          }),
        }),
      }),
    });
  });

  test('supports JSON format', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'events',
      databaseName: 'db',
      location: 's3://bucket/json',
      columns: [{ name: 'event_id', type: 'string' }],
      dataFormat: DataFormat.JSON,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Table', {
      TableInput: Match.objectLike({
        StorageDescriptor: Match.objectLike({
          SerdeInfo: Match.objectLike({
            SerializationLibrary: 'org.openx.data.jsonserde.JsonSerDe',
          }),
        }),
      }),
    });
  });

  test('supports ORC format', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'logs',
      databaseName: 'db',
      location: 's3://bucket/orc',
      columns: [{ name: 'ts', type: 'timestamp' }],
      dataFormat: DataFormat.ORC,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Table', {
      TableInput: Match.objectLike({
        StorageDescriptor: Match.objectLike({
          SerdeInfo: Match.objectLike({
            SerializationLibrary: 'org.apache.hadoop.hive.ql.io.orc.OrcSerde',
          }),
        }),
      }),
    });
  });

  test('includes description when provided', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'dos',
      databaseName: 'db',
      location: 's3://bucket/dos',
      columns: [{ name: 'id', type: 'string' }],
      description: 'DOS policy table',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Table', {
      TableInput: Match.objectLike({ Description: 'DOS policy table' }),
    });
  });

  test('includes column comments', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'dos',
      databaseName: 'db',
      location: 's3://bucket/dos',
      columns: [{ name: 'pol_no', type: 'string', comment: 'Policy number' }],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Table', {
      TableInput: Match.objectLike({
        StorageDescriptor: Match.objectLike({
          Columns: [{ Name: 'pol_no', Type: 'string', Comment: 'Policy number' }],
        }),
      }),
    });
  });

  test('merges additional parameters', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'dos',
      databaseName: 'db',
      location: 's3://bucket/dos',
      columns: [{ name: 'id', type: 'string' }],
      parameters: { 'spark.sql.partitionProvider': 'catalog' },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::Glue::Table', {
      TableInput: Match.objectLike({
        Parameters: Match.objectLike({ 'spark.sql.partitionProvider': 'catalog' }),
      }),
    });
  });

  test('registers with Lake Formation when enabled', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'dos',
      databaseName: 'db',
      location: 's3://my-bucket/data/dos',
      columns: [{ name: 'id', type: 'string' }],
      registeredWithLakeFormation: true,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::LakeFormation::Resource', {
      ResourceArn: 'arn:aws:s3:::my-bucket/data/dos',
      UseServiceLinkedRole: true,
    });
  });

  test('does not register with Lake Formation by default', () => {
    const stack = createStack();
    new DataCatalogTable(stack, 'Table', {
      tableName: 'dos',
      databaseName: 'db',
      location: 's3://my-bucket/data/dos',
      columns: [{ name: 'id', type: 'string' }],
    });
    Template.fromStack(stack).resourceCountIs('AWS::LakeFormation::Resource', 0);
  });
});
