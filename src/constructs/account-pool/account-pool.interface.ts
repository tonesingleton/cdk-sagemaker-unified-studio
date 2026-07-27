/**
 * Read-only contract for an AccountPool.
 */
export interface IAccountPool {
  /** The ID of the account pool. */
  readonly accountPoolId: string;
}

/**
 * Attributes required to import an existing AccountPool.
 */
export interface AccountPoolAttributes {
  /** The account pool ID. */
  readonly accountPoolId: string;
}

/** The mechanism used to resolve account selection from the pool. Currently only `MANUAL` is supported. */
export enum ResolutionStrategy {
  MANUAL = 'MANUAL',
}

/**
 * A static account entry within an account pool.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_AccountInfo.html
 */
export interface AccountInfo {
  /** The 12-digit AWS account ID. */
  readonly awsAccountId: string;
  /** The regions supported for this account (1–3 regions). */
  readonly supportedRegions: Array<string>;
  /**
   * A human-readable name for the account.
   *
   * @default - no name
   */
  readonly awsAccountName?: string;
}

/**
 * A custom Lambda handler that dynamically provides accounts for the pool.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CustomAccountPoolHandler.html
 */
export interface CustomAccountPoolHandler {
  /** The ARN of the Lambda function. */
  readonly lambdaFunctionArn: string;
  /**
   * The ARN of the IAM role that SageMaker Unified Studio uses to invoke the Lambda function.
   *
   * @default - no execution role
   */
  readonly lambdaExecutionRoleArn?: string;
}

/**
 * The source of accounts for the pool (union — specify exactly one).
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_AccountSource.html
 */
export interface AccountSource {
  /**
   * A static list of accounts (1–25 items).
   */
  readonly accounts?: Array<AccountInfo>;
  /**
   * A custom Lambda handler that provides accounts dynamically.
   */
  readonly customAccountPoolHandler?: CustomAccountPoolHandler;
}

/**
 * Properties for an AccountPool construct.
 *
 * There is no CloudFormation resource for DataZone account pools.
 * This construct uses AwsCustomResource to call the DataZone API directly.
 *
 * @see https://docs.aws.amazon.com/datazone/latest/APIReference/API_CreateAccountPool.html
 */
export interface AccountPoolProps {
  /** The ID of the domain (e.g. `dzd_abc123`). */
  readonly domainIdentifier: string;
  /** The pool name (1–64 characters, pattern `[\w -]+`). */
  readonly name: string;
  /** The source of accounts for the pool. Specify either `accounts` or `customAccountPoolHandler`. */
  readonly accountSource: AccountSource;
  /**
   * The mechanism used to resolve account selection.
   *
   * @default ResolutionStrategy.MANUAL
   */
  readonly resolutionStrategy?: ResolutionStrategy;
  /**
   * Human-readable description of the pool.
   *
   * @default - no description
   */
  readonly description?: string;
  /**
   * ARN of a role that DataZone trusts for account pool operations.
   *
   * @default - no role assumption; Lambda calls DataZone directly
   */
  readonly executionRoleArn?: string;
}
