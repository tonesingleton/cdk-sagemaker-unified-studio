/**
 * Service principals trusted to assume SageMaker Unified Studio execution roles.
 *
 * Both the account-level execution role (AmazonSageMakerExecution) and per-project
 * execution roles share this same trust principal list, as prescribed by the AWS
 * documentation.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/setup-iam-based-domains.html
 */
export const EXECUTION_ROLE_TRUST_PRINCIPALS: ReadonlyArray<string> = [
  'datazone.amazonaws.com',
  'sagemaker.amazonaws.com',
  'glue.amazonaws.com',
  'bedrock.amazonaws.com',
  'scheduler.amazonaws.com',
  'lakeformation.amazonaws.com',
  'airflow-serverless.amazonaws.com',
  'athena.amazonaws.com',
  'redshift.amazonaws.com',
  'emr-serverless.amazonaws.com',
  'lambda.amazonaws.com',
];
