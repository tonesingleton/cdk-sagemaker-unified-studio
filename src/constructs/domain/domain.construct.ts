import {
  CustomResource,
  Duration,
  RemovalPolicy,
  Stack,
  aws_datazone as datazone,
  aws_iam as iam,
  aws_lambda as lambda_,
  aws_s3 as s3,
  custom_resources as cr,
} from 'aws-cdk-lib';
import type { NagPackSuppression } from 'cdk-nag';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { CLEANUP_HANDLER_CODE } from './domain.cleanup-handler';
import type { DomainProps, DomainUnitConfig } from './domain.interface';

import { Blueprint } from '../blueprint/blueprint.construct';
import type { BlueprintProps } from '../blueprint/blueprint.interface';
import { ManagedBlueprintIdentifier } from '../blueprint/blueprint.interface';

/**
 * Validates that a bucket name starts with one of the allowed prefixes.
 *
 * @throws Error if the bucket name does not start with an allowed prefix.
 */
function validateBucketName(bucketName: string): void {
  if (!Domain.ALLOWED_BUCKET_PREFIXES.some((prefix) => bucketName.startsWith(prefix))) {
    throw new Error(
      `Bucket name '${bucketName}' must start with one of: ${Domain.ALLOWED_BUCKET_PREFIXES.join(', ')}. ` +
        'See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html',
    );
  }
}

/**
 * An AWS SageMaker Unified Studio domain with its associated IAM roles,
 * domain units, and blueprint configurations.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/create-domain.html
 */
export class Domain extends Construct {
  /**
   * Allowed S3 bucket name prefixes for SageMaker Unified Studio.
   *
   * The `SageMakerStudioProjectProvisioningRolePolicy` scopes S3 actions to
   * buckets whose names start with one of these prefixes.
   *
   * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html
   */
  public static readonly ALLOWED_BUCKET_PREFIXES: Array<string> = ['amazon-sagemaker-', 'sagemaker-'];

  /**
   * Sort domain units topologically so that parents are created before children.
   *
   * @throws Error if duplicate names, circular references, or missing parents are detected.
   */
  public static topologicalSort(domainUnits: Array<DomainUnitConfig>): Array<DomainUnitConfig> {
    const names = domainUnits.map((u) => u.name);
    const duplicates = names.filter((n, i) => names.indexOf(n) !== i);
    if (duplicates.length > 0) {
      throw new Error(`Duplicate domain unit names: ${[...new Set(duplicates)].join(', ')}.`);
    }

    const byName: { [name: string]: DomainUnitConfig } = {};
    for (const u of domainUnits) {
      byName[u.name] = u;
    }

    const visiting = new Set<string>();
    const visited = new Set<string>();
    const result: Array<DomainUnitConfig> = [];

    function visit(unit: DomainUnitConfig): void {
      if (visited.has(unit.name)) return;
      if (visiting.has(unit.name)) {
        throw new Error(`Circular dependency detected for domain unit '${unit.name}'.`);
      }
      visiting.add(unit.name);
      if (unit.parentDomainUnitName) {
        if (!byName[unit.parentDomainUnitName]) {
          throw new Error(`Parent domain unit '${unit.parentDomainUnitName}' not found for '${unit.name}'.`);
        }
        visit(byName[unit.parentDomainUnitName]);
      }
      visiting.delete(unit.name);
      visited.add(unit.name);
      result.push(unit);
    }

    for (const unit of domainUnits) {
      visit(unit);
    }

    return result;
  }

  /** The domain ID (e.g. `dzd-abc123`). */
  public readonly domainId: string;
  /** The domain ARN. */
  public readonly domainArn: string;
  /** The root domain unit ID. */
  public readonly rootDomainUnitId: string;
  /** The domain execution role. */
  public readonly domainExecutionRole: iam.IRole;
  /** The manage access role. */
  public readonly manageAccessRole: iam.IRole;
  /** Map of domain unit name to its CloudFormation resource. */
  public readonly domainUnits: { [name: string]: datazone.CfnDomainUnit };
  /** Map of blueprint identifier to its Blueprint construct. */
  public readonly blueprints: { [identifier: string]: Blueprint };
  /**
   * Policy grants that authorize blueprint usage. Downstream resources
   * (e.g. projects) should depend on these to ensure correct ordering.
   */
  public readonly blueprintPolicyGrants: Array<datazone.CfnPolicyGrant>;
  /** The S3 bucket used for project files. */
  public readonly projectsBucket: s3.IBucket;
  /** The S3 bucket used for access logs. */
  public readonly accessLogsBucket: s3.IBucket;

  constructor(scope: Construct, id: string, props: DomainProps) {
    super(scope, id);

    if (props.subnetIds.length === 0) {
      throw new Error('subnetIds must contain at least one subnet ID.');
    }

    const account = Stack.of(this).account;
    const region = Stack.of(this).region;

    const domainExecutionRole = new iam.Role(this, 'DomainExecutionRole', {
      assumedBy: new iam.ServicePrincipal('datazone.amazonaws.com', {
        conditions: {
          StringEquals: { 'aws:SourceAccount': account },
          'ForAllValues:StringLike': { 'aws:TagKeys': 'datazone*' },
        },
      }),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/SageMakerStudioDomainExecutionRolePolicy'),
      ],
    });

    domainExecutionRole.assumeRolePolicy!.addStatements(
      new iam.PolicyStatement({
        actions: ['sts:TagSession', 'sts:SetContext'],
        principals: [new iam.ServicePrincipal('datazone.amazonaws.com')],
        conditions: {
          StringEquals: { 'aws:SourceAccount': account },
          'ForAllValues:StringLike': { 'aws:TagKeys': 'datazone*' },
        },
      }),
    );

    for (const roleArn of props.assumeRoleArns ?? []) {
      const importedRole = iam.Role.fromRoleArn(this, `AssumeRole-${roleArn.split('/').pop()}`, roleArn);
      domainExecutionRole.grantAssumeRole(importedRole);
    }

    NagSuppressions.addResourceSuppressions(domainExecutionRole, [
      {
        id: 'AwsSolutions-IAM4',
        reason:
          'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/AmazonSageMakerDomainExecution.html',
        appliesTo: [
          'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/SageMakerStudioDomainExecutionRolePolicy',
        ],
      } satisfies NagPackSuppression,
    ]);

    const serviceRole = new iam.Role(this, 'ServiceRole', {
      assumedBy: new iam.ServicePrincipal('datazone.amazonaws.com', {
        conditions: { StringEquals: { 'aws:SourceAccount': account } },
      }),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/SageMakerStudioDomainServiceRolePolicy'),
      ],
    });

    NagSuppressions.addResourceSuppressions(serviceRole, [
      {
        id: 'AwsSolutions-IAM4',
        reason:
          'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/AmazonSageMakerDomainService.html',
        appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/SageMakerStudioDomainServiceRolePolicy'],
      } satisfies NagPackSuppression,
    ]);

    const domain = new datazone.CfnDomain(this, 'Resource', {
      name: props.name,
      description: props.description,
      domainVersion: 'V2',
      domainExecutionRole: domainExecutionRole.roleArn,
      serviceRole: serviceRole.roleArn,
    });

    const manageAccessRole = new iam.Role(this, 'ManageAccessRole', {
      roleName: `AmazonSageMakerManageAccess-${region}-${domain.attrId}`,
      description:
        'Grants Amazon SageMaker Unified Studio permissions to publish, grant, and revoke ' +
        'access to Amazon SageMaker Lakehouse, AWS Glue Data Catalog, and Amazon Redshift data.',
      assumedBy: new iam.ServicePrincipal('datazone.amazonaws.com', {
        conditions: {
          StringEquals: { 'aws:SourceAccount': account },
          ArnEquals: { 'aws:SourceArn': domain.attrArn },
        },
      }),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonDataZoneGlueManageAccessRolePolicy'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonDataZoneRedshiftManageAccessRolePolicy'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDataZoneSageMakerManageAccessRolePolicy'),
      ],
      inlinePolicies: {
        RedshiftSecretAccess: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              sid: 'RedshiftSecretStatement',
              actions: ['secretsmanager:GetSecretValue'],
              resources: ['*'],
              conditions: { StringEquals: { 'secretsmanager:ResourceTag/AmazonDataZoneDomain': domain.attrId } },
            }),
          ],
        }),
      },
    });

    NagSuppressions.addResourceSuppressions(manageAccessRole, [
      {
        id: 'AwsSolutions-IAM4',
        reason:
          'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-domain-manage-access-role.html',
        appliesTo: [
          'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonDataZoneGlueManageAccessRolePolicy',
          'Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AmazonDataZoneRedshiftManageAccessRolePolicy',
          'Policy::arn:<AWS::Partition>:iam::aws:policy/AmazonDataZoneSageMakerManageAccessRolePolicy',
        ],
      } satisfies NagPackSuppression,
      {
        id: 'AwsSolutions-IAM5',
        reason: 'Wildcard resources required for Secrets Manager access scoped by domain tag.',
        appliesTo: ['Resource::*'],
      } satisfies NagPackSuppression,
    ]);

    const units: { [name: string]: datazone.CfnDomainUnit } = {};
    for (const config of Domain.topologicalSort(props.domainUnits ?? [])) {
      const parentId = config.parentDomainUnitName
        ? units[config.parentDomainUnitName].attrId
        : domain.attrRootDomainUnitId;
      units[config.name] = new datazone.CfnDomainUnit(this, `DomainUnit${config.name}`, {
        parentDomainUnitIdentifier: parentId,
        domainIdentifier: domain.attrId,
        name: config.name,
        description: config.description,
      });
    }

    const removalPolicy = props.removalPolicy ?? RemovalPolicy.RETAIN;
    const autoDeleteObjects = props.autoDeleteObjects ?? false;

    if (props.projectsBucketName) {
      validateBucketName(props.projectsBucketName);
    }
    if (props.accessLogsBucketName) {
      validateBucketName(props.accessLogsBucketName);
    }

    const accessLogsBucket = new s3.Bucket(this, 'AccessLogsBucket', {
      bucketName: props.accessLogsBucketName,
      removalPolicy,
      autoDeleteObjects,
      enforceSSL: true,
    });

    NagSuppressions.addResourceSuppressions(
      accessLogsBucket,
      [
        {
          id: 'AwsSolutions-S1',
          reason: 'This is the access logs destination bucket. Logging it to itself would create an infinite loop.',
        } satisfies NagPackSuppression,
      ],
      true,
    );

    const projectsBucket = new s3.Bucket(this, 'ProjectsBucket', {
      bucketName: props.projectsBucketName,
      removalPolicy,
      autoDeleteObjects,
      versioned: true,
      serverAccessLogsBucket: accessLogsBucket,
      enforceSSL: true,
    });

    const blueprints: { [identifier: string]: Blueprint } = {};
    const toolingProps: BlueprintProps = {
      identifier: ManagedBlueprintIdentifier.TOOLING,
      domainId: domain.attrId,
      manageAccessRoleArn: manageAccessRole.roleArn,
      provisioningRoleArn: props.provisioningRoleArn,
      regionalParameters: [
        {
          region: region,
          parameters: {
            S3Location: projectsBucket.s3UrlForObject(),
            VpcId: props.vpcId,
            Subnets: props.subnetIds.join(','),
          },
        },
      ],
    };
    blueprints[ManagedBlueprintIdentifier.TOOLING] = new Blueprint(
      this,
      ManagedBlueprintIdentifier.TOOLING,
      toolingProps,
    );

    for (const identifier of props.additionalBlueprintIdentifiers ?? []) {
      blueprints[identifier] = new Blueprint(this, identifier, {
        identifier,
        domainId: domain.attrId,
        manageAccessRoleArn: manageAccessRole.roleArn,
        provisioningRoleArn: props.provisioningRoleArn,
      });
    }

    const policyGrants: Array<datazone.CfnPolicyGrant> = [];
    for (const [identifier, blueprint] of Object.entries(blueprints)) {
      const entityId = `${account}:${blueprint.environmentBlueprintId}`;
      const grant = new datazone.CfnPolicyGrant(this, `${identifier}BlueprintPolicyGrant`, {
        domainIdentifier: domain.attrId,
        entityIdentifier: entityId,
        entityType: 'ENVIRONMENT_BLUEPRINT_CONFIGURATION',
        policyType: 'CREATE_ENVIRONMENT_FROM_BLUEPRINT',
        principal: {
          project: {
            projectDesignation: 'CONTRIBUTOR',
            projectGrantFilter: {
              domainUnitFilter: {
                domainUnit: domain.attrRootDomainUnitId,
                includeChildDomainUnits: true,
              },
            },
          },
        },
        detail: { createEnvironmentFromBlueprint: {} },
      });
      policyGrants.push(grant);
    }

    // Lake Formation cleanup: deregister admin roles on stack deletion.
    // Includes the manage access role, provisioning role, and the Redshift
    // service-linked role which is registered as a ReadOnlyAdmin by the
    // Redshift Serverless blueprint.
    // Also cleans up Glue databases created by DataLake environments.
    const cleanupRoleArns = [
      manageAccessRole.roleArn,
      props.provisioningRoleArn,
      `arn:aws:iam::${account}:role/aws-service-role/redshift.amazonaws.com/AWSServiceRoleForRedshift`,
    ];
    this.createLakeFormationCleanup(
      cleanupRoleArns,
      domain.attrId,
      props.dataLocationGrantPrincipals ?? [],
      projectsBucket.bucketArn,
    );

    this.domainId = domain.attrId;
    this.domainArn = domain.attrArn;
    this.rootDomainUnitId = domain.attrRootDomainUnitId;
    this.domainExecutionRole = domainExecutionRole;
    this.manageAccessRole = manageAccessRole;
    this.domainUnits = units;
    this.blueprints = blueprints;
    this.blueprintPolicyGrants = policyGrants;
    this.projectsBucket = projectsBucket;
    this.accessLogsBucket = accessLogsBucket;
  }

  /**
   * Creates a custom resource that removes the specified role ARNs from
   * Lake Formation data lake administrators when the stack is deleted.
   *
   * This addresses a known limitation where the Tooling blueprint registers
   * the manage access and provisioning roles as Lake Formation admins, but
   * CloudFormation does not deregister them on stack deletion.
   *
   * A full `Provider`-backed custom resource is used instead of `AwsCustomResource`
   * because the cleanup requires two sequential SDK calls: `GetDataLakeSettings`
   * to read the current admin list, then `PutDataLakeSettings` with the target
   * roles filtered out. `AwsCustomResource` only supports a single SDK call per
   * lifecycle event.
   *
   * @see https://docs.aws.amazon.com/lake-formation/latest/dg/getting-started-setup.html
   */
  private createLakeFormationCleanup(
    roleArns: ReadonlyArray<string>,
    domainId: string,
    dataLocationGrantPrincipals: ReadonlyArray<string>,
    bucketArn: string,
  ): void {
    const handler = new lambda_.Function(this, 'LakeFormationCleanupHandler', {
      runtime: lambda_.Runtime.NODEJS_24_X,
      handler: 'index.handler',
      timeout: Duration.minutes(1),
      code: lambda_.Code.fromInline(CLEANUP_HANDLER_CODE),
    });

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          'lakeformation:GetDataLakeSettings',
          'lakeformation:PutDataLakeSettings',
          'lakeformation:GrantPermissions',
          'lakeformation:RevokePermissions',
        ],
        resources: ['*'],
      }),
    );

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['datazone:ListProjects', 'datazone:ListEnvironments'],
        resources: ['*'],
      }),
    );

    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['glue:DeleteDatabase'],
        resources: [
          `arn:aws:glue:${Stack.of(this).region}:${Stack.of(this).account}:catalog`,
          `arn:aws:glue:${Stack.of(this).region}:${Stack.of(this).account}:database/glue_db_*`,
        ],
      }),
    );

    NagSuppressions.addResourceSuppressions(
      handler,
      [
        {
          id: 'AwsSolutions-IAM4',
          reason: 'Lambda basic execution role is required for CloudWatch logging.',
          appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'],
        } satisfies NagPackSuppression,
        {
          id: 'AwsSolutions-IAM5',
          reason:
            'Lake Formation settings, SageMaker Unified Studio list operations, and Glue database cleanup are account-level and do not support resource-level permissions.',
          appliesTo: [
            'Resource::*',
            `Resource::arn:aws:glue:${Stack.of(this).region}:${Stack.of(this).account}:database/glue_db_*`,
          ],
        } satisfies NagPackSuppression,
      ],
      true,
    );

    const provider = new cr.Provider(this, 'LakeFormationCleanupProvider', {
      onEventHandler: handler,
    });

    NagSuppressions.addResourceSuppressions(
      provider,
      [
        {
          id: 'AwsSolutions-IAM4',
          reason: 'Provider framework Lambda requires basic execution role for CloudWatch logging.',
          appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'],
        } satisfies NagPackSuppression,
        {
          id: 'AwsSolutions-L1',
          reason: 'Provider framework manages its own Lambda runtime version.',
        } satisfies NagPackSuppression,
      ],
      true,
    );

    // The Provider framework's onEvent Lambda gets an IAM policy with
    // lambda:InvokeFunction on `<handler.Arn>:*` (all versions). cdk-nag
    // reports this as a wildcard resource finding. We suppress by path
    // because the `appliesTo` value contains the CloudFormation logical ID
    // which is only deterministic relative to the construct tree.
    const policyPath = `${provider.node.path}/framework-onEvent/ServiceRole/DefaultPolicy/Resource`;
    NagSuppressions.addResourceSuppressionsByPath(Stack.of(this), policyPath, [
      {
        id: 'AwsSolutions-IAM5',
        reason:
          'Provider framework requires lambda:InvokeFunction with a :* suffix to invoke all versions of the cleanup handler.',
      } satisfies NagPackSuppression,
    ]);

    new CustomResource(this, 'LakeFormationCleanup', {
      serviceToken: provider.serviceToken,
      properties: {
        RoleArns: roleArns,
        DomainId: domainId,
        DataLocationGrantPrincipals: dataLocationGrantPrincipals,
        BucketArn: bucketArn,
      },
    });
  }
}
