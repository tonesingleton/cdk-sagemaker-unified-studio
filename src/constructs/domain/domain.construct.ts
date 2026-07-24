import {
  RemovalPolicy,
  Stack,
  Validations,
  aws_datazone as datazone,
  aws_ec2 as ec2,
  aws_iam as iam,
  aws_s3 as s3,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LakeFormationCleanup } from './constructs';
import type { DomainAttributes, DomainProps, DomainUnitConfig, IDomain } from './domain.interface';

import { Blueprint } from '../blueprint/blueprint.construct';
import type { BlueprintProps } from '../blueprint/blueprint.interface';
import { ManagedBlueprintIdentifier } from '../blueprint/blueprint.interface';
import { Owner, OwnerEntityType } from '../owner';
import { UserProfile, UserType } from '../user-profile';

/**
 * An AWS SageMaker Unified Studio domain with its associated IAM roles,
 * domain units, and blueprint configurations.
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/create-domain.html
 */
export class Domain extends Construct implements IDomain {
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
   * Import an existing domain from its attributes.
   *
   * This method returns a read-only `IDomain`-compatible object for cross-stack
   * references. The imported domain does not expose domain units, blueprints,
   * policy grants, or S3 buckets — only the identifiers and roles.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: DomainAttributes): IDomain {
    class ImportedDomain extends Construct implements IDomain {
      public readonly domainId = attrs.domainId;
      public readonly domainArn = attrs.domainArn;
      public readonly rootDomainUnitId = attrs.rootDomainUnitId;
      public readonly domainExecutionRole = attrs.domainExecutionRoleArn
        ? iam.Role.fromRoleArn(this, 'DomainExecutionRole', attrs.domainExecutionRoleArn)
        : (undefined as unknown as iam.IRole);
      public readonly manageAccessRole = attrs.manageAccessRoleArn
        ? iam.Role.fromRoleArn(this, 'ManageAccessRole', attrs.manageAccessRoleArn)
        : (undefined as unknown as iam.IRole);
      public readonly datazoneApiRole = attrs.datazoneApiRoleArn
        ? iam.Role.fromRoleArn(this, 'DatazoneApiRole', attrs.datazoneApiRoleArn)
        : (undefined as unknown as iam.IRole);
      public readonly domainUnits = {};
      public readonly blueprints = {};
      public readonly blueprintPolicyGrants: Array<datazone.CfnPolicyGrant> = [];
      public readonly projectsBucket = undefined as unknown as s3.IBucket;
      public readonly accessLogsBucket = undefined as unknown as s3.IBucket;
    }
    return new ImportedDomain(scope, id);
  }

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

    const byName: Record<string, DomainUnitConfig> = {};
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
  /**
   * IAM role for Lambda-backed custom resources that call DataZone APIs.
   *
   * Trusted by `lambda.amazonaws.com`, has `datazone:*` permissions, and is
   * registered as a root domain unit owner (Administrator in the SMUS portal).
   */
  public readonly datazoneApiRole: iam.IRole;
  /** Map of domain unit name to its CloudFormation resource. */
  public readonly domainUnits: Record<string, datazone.CfnDomainUnit>;
  /** Map of blueprint identifier to its Blueprint construct. */
  public readonly blueprints: Record<string, Blueprint>;
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

    const selection = props.vpc.selectSubnets(props.vpcSubnets ?? { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS });
    const vpcId = props.vpc.vpcId;
    const subnetIds = selection.subnetIds;

    if (subnetIds.length === 0) {
      throw new Error('The selected subnets must contain at least one subnet.');
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

    Validations.of(domainExecutionRole).acknowledge({
      id: 'AwsSolutions-IAM4',
      reason:
        'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/AmazonSageMakerDomainExecution.html',
    });

    const serviceRole = new iam.Role(this, 'ServiceRole', {
      assumedBy: new iam.ServicePrincipal('datazone.amazonaws.com', {
        conditions: { StringEquals: { 'aws:SourceAccount': account } },
      }),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/SageMakerStudioDomainServiceRolePolicy'),
      ],
    });

    Validations.of(serviceRole).acknowledge({
      id: 'AwsSolutions-IAM4',
      reason:
        'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/AmazonSageMakerDomainService.html',
    });

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

    Validations.of(manageAccessRole).acknowledge(
      {
        id: 'AwsSolutions-IAM4',
        reason:
          'Required by SageMaker Unified Studio. See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-domain-manage-access-role.html',
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'Wildcard resources required for Secrets Manager access scoped by domain tag.',
      },
    );

    const units: Record<string, datazone.CfnDomainUnit> = {};
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
      if (!Domain.ALLOWED_BUCKET_PREFIXES.some((prefix) => props.projectsBucketName!.startsWith(prefix))) {
        throw new Error(
          `Bucket name '${props.projectsBucketName}' must start with one of: ${Domain.ALLOWED_BUCKET_PREFIXES.join(', ')}. ` +
            'See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html',
        );
      }
    }
    if (props.accessLogsBucketName) {
      if (!Domain.ALLOWED_BUCKET_PREFIXES.some((prefix) => props.accessLogsBucketName!.startsWith(prefix))) {
        throw new Error(
          `Bucket name '${props.accessLogsBucketName}' must start with one of: ${Domain.ALLOWED_BUCKET_PREFIXES.join(', ')}. ` +
            'See https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html',
        );
      }
    }

    const accessLogsBucket = new s3.Bucket(this, 'AccessLogsBucket', {
      bucketName: props.accessLogsBucketName,
      removalPolicy,
      autoDeleteObjects,
      enforceSSL: true,
    });

    Validations.of(accessLogsBucket).acknowledge({
      id: 'AwsSolutions-S1',
      reason: 'This is the access logs destination bucket. Logging it to itself would create an infinite loop.',
    });

    const projectsBucket = new s3.Bucket(this, 'ProjectsBucket', {
      bucketName: props.projectsBucketName,
      removalPolicy,
      autoDeleteObjects,
      versioned: true,
      serverAccessLogsBucket: accessLogsBucket,
      enforceSSL: true,
    });

    const blueprints: Record<string, Blueprint> = {};
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
            VpcId: vpcId,
            Subnets: subnetIds.join(','),
          },
        },
      ],
    };
    blueprints[ManagedBlueprintIdentifier.TOOLING] = new Blueprint(
      this,
      ManagedBlueprintIdentifier.TOOLING,
      toolingProps,
    );

    // TODO: Uncomment when recreating the domain from scratch.
    // Currently activated by the new domain management experience UI.
    // const toolingLiteProps: BlueprintProps = {
    //   identifier: ManagedBlueprintIdentifier.TOOLING_LITE,
    //   domainId: domain.attrId,
    //   manageAccessRoleArn: manageAccessRole.roleArn,
    //   provisioningRoleArn: props.provisioningRoleArn,
    // };
    // blueprints[ManagedBlueprintIdentifier.TOOLING_LITE] = new Blueprint(
    //   this,
    //   ManagedBlueprintIdentifier.TOOLING_LITE,
    //   toolingLiteProps,
    // );

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
    new LakeFormationCleanup(this, 'LakeFormationCleanup', {
      roleArns: cleanupRoleArns,
      domainId: domain.attrId,
      dataLocationGrantPrincipals: props.dataLocationGrantPrincipals ?? [],
      bucketArn: projectsBucket.bucketArn,
    });

    // DataZone API role: Lambda execution role with datazone:* permissions,
    // registered as a root domain unit owner so it can call membership-gated
    // DataZone APIs (ListEnvironments, ListConnections, etc.) during deployments.
    const datazoneApiRole = new iam.Role(this, 'DatazoneApiRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
      inlinePolicies: {
        DataZone: new iam.PolicyDocument({
          statements: [new iam.PolicyStatement({ actions: ['datazone:*'], resources: ['*'] })],
        }),
      },
    });

    Validations.of(datazoneApiRole).acknowledge(
      {
        id: 'AwsSolutions-IAM4',
        reason: 'AWSLambdaBasicExecutionRole is required for Lambda custom resource logging.',
      },
      { id: 'AwsSolutions-IAM5', reason: 'datazone:* on * is required for domain-admin custom resource operations.' },
    );

    const datazoneApiUserProfile = new UserProfile(this, 'DatazoneApiUserProfile', {
      domainIdentifier: domain.attrId,
      userIdentifier: datazoneApiRole.roleArn,
      userType: UserType.IAM_ROLE,
    });

    const datazoneApiOwner = new Owner(this, 'DatazoneApiOwner', {
      domainIdentifier: domain.attrId,
      entityIdentifier: domain.attrRootDomainUnitId,
      entityType: OwnerEntityType.DOMAIN_UNIT,
      userIdentifier: datazoneApiRole.roleArn,
    });
    datazoneApiOwner.node.addDependency(datazoneApiUserProfile);

    // NOTE: The admin project profile (Tooling + LakehouseAdmin) must be created
    // manually from the SageMaker Unified Studio UI. CDK-based creation is not
    // currently working due to service-side limitations with the LakehouseAdmin
    // blueprint provisioning via CloudFormation.

    this.domainId = domain.attrId;
    this.domainArn = domain.attrArn;
    this.rootDomainUnitId = domain.attrRootDomainUnitId;
    this.domainExecutionRole = domainExecutionRole;
    this.manageAccessRole = manageAccessRole;
    this.datazoneApiRole = datazoneApiRole;
    this.domainUnits = units;
    this.blueprints = blueprints;
    this.blueprintPolicyGrants = policyGrants;
    this.projectsBucket = projectsBucket;
    this.accessLogsBucket = accessLogsBucket;
  }
}
