/**
 * SSE algorithm for data export encryption.
 */
export enum SseAlgorithm {
  AES256 = 'AES256',
  AWS_KMS = 'aws:kms',
}

/**
 * Encryption configuration for data export.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_EncryptionConfiguration.html
 */
export interface ExportEncryptionConfiguration {
  /** The SSE algorithm to use. */
  readonly sseAlgorithm: SseAlgorithm;
  /**
   * The ARN of the KMS key. Required when `sseAlgorithm` is `aws:kms`.
   *
   * @default - no KMS key (AES256 only)
   */
  readonly kmsKeyArn?: string;
}

/**
 * Properties for a DataExportConfiguration construct.
 *
 * There is no CloudFormation resource for DataZone data export configuration.
 * This construct uses AwsCustomResource to call the DataZone API directly
 * (PutDataExportConfiguration / DeleteDataExportConfiguration).
 *
 * Only one export configuration can be active per account per region.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_PutDataExportConfiguration.html
 */
export interface DataExportConfigurationProps {
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /**
   * Whether to enable the export.
   *
   * @default true
   */
  readonly enableExport?: boolean;
  /**
   * Encryption configuration for the exported S3 table.
   *
   * @default - no encryption configuration (S3 default encryption)
   */
  readonly encryptionConfiguration?: ExportEncryptionConfiguration;
  /**
   * ARN of a role that DataZone trusts for export configuration operations.
   *
   * @default - no role assumption; Lambda calls DataZone directly
   */
  readonly executionRoleArn?: string;
}
