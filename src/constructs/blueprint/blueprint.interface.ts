/**
 * Per-region parameters for a blueprint configuration.
 *
 * Used to pass region-specific settings (e.g. S3Location, VpcId, Subnets)
 * to the Tooling blueprint.
 */
export interface RegionalParameter {
  /** The AWS region this parameter set applies to. */
  readonly region: string;
  /** Key-value pairs of parameters for this region. */
  readonly parameters: { [key: string]: string };
}

/**
 * Managed blueprint identifiers for AWS SageMaker Unified Studio.
 *
 * Use these constants or pass any custom blueprint identifier as a plain string.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/supported-blueprints.html
 */
export class ManagedBlueprintIdentifier {
  /**
   * Creates project resources including IAM user roles, security groups, and
   * Amazon SageMaker unified domains.
   */
  public static readonly TOOLING = 'Tooling';

  /**
   * Creates a data lake environment with an AWS Glue database for data
   * management and an Amazon Athena workgroup for querying data.
   *
   * Note: The UI displays this as "LakeHouseDatabase", but the API/CLI
   * identifier is `DataLake`.
   */
  public static readonly LAKEHOUSE_DATABASE = 'DataLake';

  /**
   * Provisions a new catalog in the Amazon SageMaker Lakehouse backed by
   * Amazon Redshift Managed Storage.
   */
  public static readonly LAKEHOUSE_CATALOG = 'LakehouseCatalog';

  /**
   * Creates an Amazon Redshift Serverless environment to get insights from
   * data without managing infrastructure.
   */
  public static readonly REDSHIFT_SERVERLESS = 'RedshiftServerless';

  /**
   * Creates an MWAA environment for Airflow-based workflows.
   */
  public static readonly WORKFLOWS = 'Workflows';

  /**
   * Enables an MLflow tracking server for experimentation inside a project.
   */
  public static readonly ML_EXPERIMENTS = 'MLExperiments';

  /** MLflow App for Unified Studio. */
  public static readonly MLFLOW_APP = 'MLflowApp';

  /**
   * Creates an Amazon Bedrock Agent with an execution role and a consumption role.
   */
  public static readonly AMAZON_BEDROCK_CHAT_AGENT = 'AmazonBedrockChatAgent';

  /**
   * Creates an IAM service role for an Amazon Bedrock evaluation job.
   */
  public static readonly AMAZON_BEDROCK_EVALUATION = 'AmazonBedrockEvaluation';

  /**
   * Creates an Amazon Bedrock Prompt Flow with an execution role.
   */
  public static readonly AMAZON_BEDROCK_FLOW = 'AmazonBedrockFlow';

  /**
   * Creates an AWS Lambda function with an execution role and a Secrets Manager secret.
   */
  public static readonly AMAZON_BEDROCK_FUNCTION = 'AmazonBedrockFunction';

  /**
   * Creates an Amazon Bedrock Guardrail with an execution role.
   */
  public static readonly AMAZON_BEDROCK_GUARDRAIL = 'AmazonBedrockGuardrail';

  /**
   * Creates an Amazon Bedrock Knowledge Base with an OpenSearch Serverless
   * collection, execution role, Lambda functions, and a data source.
   */
  public static readonly AMAZON_BEDROCK_KNOWLEDGE_BASE = 'AmazonBedrockKnowledgeBase';

  /**
   * Creates an Amazon Bedrock Prompt with a consumption role.
   */
  public static readonly AMAZON_BEDROCK_PROMPT = 'AmazonBedrockPrompt';

  /**
   * Creates an Amazon EMR on EC2 cluster to run and scale Apache Spark, Hive,
   * and other big data workloads.
   *
   * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/enable-emr-on-ec2-blueprint.html
   */
  public static readonly EMR_ON_EC2 = 'EmrOnEc2';

  /** Creates an Amazon EMR on EKS environment. */
  public static readonly EMR_ON_EKS = 'EmrOnEks';

  /**
   * Creates an Amazon EMR Serverless application for Apache Spark batch jobs
   * and interactive sessions.
   */
  public static readonly EMR_SERVERLESS = 'EmrServerless';

  /**
   * Creates an IAM role and a Connection that enables access to Partner AI Apps
   * for integrated third-party AI/ML solutions.
   */
  public static readonly PARTNER_APPS = 'PartnerApps';

  /**
   * Enables visualization of data within a project using Amazon QuickSight.
   *
   * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/quicksight-integration.html
   */
  public static readonly QUICKSIGHT = 'QuickSight';

  /**
   * A lightweight version of the Tooling blueprint that provisions basic
   * networking (Glue network connections, security groups) without the full
   * SageMaker domain setup.
   */
  public static readonly TOOLING_LITE = 'ToolingLite';

  /**
   * Provisions a Lakehouse admin environment for managing Lake Formation
   * permissions and data governance.
   */
  public static readonly LAKEHOUSE_ADMIN = 'LakehouseAdmin';

  /**
   * Creates an S3 Table Catalog environment for managing S3-backed table formats.
   */
  public static readonly S3_TABLE_CATALOG = 'S3TableCatalog';

  /**
   * Creates an S3 Bucket environment for data storage within a project.
   */
  public static readonly S3_BUCKET = 'S3Bucket';

  /**
   * Returns the blueprint identifiers for the Amazon Bedrock Generative AI group.
   *
   * Includes: ChatAgent, Evaluation, Flow, Function, Guardrail, KnowledgeBase, Prompt.
   */
  public static bedrockGenerativeAi(): Array<string> {
    return [
      ManagedBlueprintIdentifier.AMAZON_BEDROCK_CHAT_AGENT,
      ManagedBlueprintIdentifier.AMAZON_BEDROCK_EVALUATION,
      ManagedBlueprintIdentifier.AMAZON_BEDROCK_FLOW,
      ManagedBlueprintIdentifier.AMAZON_BEDROCK_FUNCTION,
      ManagedBlueprintIdentifier.AMAZON_BEDROCK_GUARDRAIL,
      ManagedBlueprintIdentifier.AMAZON_BEDROCK_KNOWLEDGE_BASE,
      ManagedBlueprintIdentifier.AMAZON_BEDROCK_PROMPT,
    ];
  }

  private constructor() {}
}

/**
 * Properties for a Blueprint construct.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-environmentblueprintconfiguration.html
 */
export interface BlueprintProps {
  /**
   * The blueprint type to activate.
   *
   * Use a `ManagedBlueprintIdentifier` constant for known blueprints,
   * or pass a custom identifier string.
   *
   * @example ManagedBlueprintIdentifier.TOOLING
   */
  readonly identifier: string;
  /** The SageMaker Unified Studio domain ID this blueprint belongs to. */
  readonly domainId: string;
  /**
   * AWS regions where this blueprint is available.
   *
   * @default [Stack.of(this).region]
   */
  readonly enabledRegions?: Array<string>;
  /** ARN of the domain-specific manage access role. */
  readonly manageAccessRoleArn: string;
  /** ARN of the account-level provisioning role. */
  readonly provisioningRoleArn: string;
  /**
   * Per-region parameters (e.g. S3Location, VpcId, Subnets for the Tooling blueprint).
   *
   * @default - no regional parameters
   */
  readonly regionalParameters?: Array<RegionalParameter>;
}
