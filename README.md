# AWS SageMaker Unified Studio L2 CDK Constructs

[![npm version](https://img.shields.io/npm/v/@tonesingleton/cdk-sagemaker-unified-studio)](https://www.npmjs.com/package/@tonesingleton/cdk-sagemaker-unified-studio)
[![PyPI version](https://img.shields.io/pypi/v/cdk-sagemaker-unified-studio)](https://pypi.org/project/cdk-sagemaker-unified-studio/)
[![Maven Central](https://img.shields.io/maven-central/v/io.github.tonesingleton/cdk-sagemaker-unified-studio)](https://central.sonatype.com/artifact/io.github.tonesingleton/cdk-sagemaker-unified-studio)
[![NuGet](https://img.shields.io/nuget/v/ToneSingleton.CdkSageMakerUnifiedStudio)](https://www.nuget.org/packages/ToneSingleton.CdkSageMakerUnifiedStudio)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

> **Status: Developer Preview** — APIs may change between minor versions.

Higher-level (L2) CDK constructs for [AWS SageMaker Unified Studio](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/what-is-sagemaker-unified-studio.html) (formerly Amazon DataZone V2). These constructs simplify the provisioning of domains, projects, blueprints, and IAM roles required to operate a data mesh on AWS.

## Installation

### TypeScript / JavaScript

```bash
npm install @tonesingleton/cdk-sagemaker-unified-studio
```

### Python

```bash
pip install cdk-sagemaker-unified-studio
```

### Java

```xml
<dependency>
  <groupId>io.github.tonesingleton</groupId>
  <artifactId>cdk-sagemaker-unified-studio</artifactId>
</dependency>
```

### C# / .NET

```bash
dotnet add package ToneSingleton.CdkSageMakerUnifiedStudio
```

### Go

```bash
go get github.com/tonesingleton/cdk-sagemaker-unified-studio-go
```

## Overview

AWS SageMaker Unified Studio provides a unified experience for data engineering, analytics, and machine learning. Setting it up via CloudFormation requires orchestrating many resources with specific dependency ordering, IAM roles, blueprint configurations, and policy grants.

This library provides opinionated L2 constructs that handle all of this automatically.

## Account Roles

Before creating a domain, provision the account-level IAM roles required by SageMaker Unified Studio. These are shared across all domains in an account.

```ts
import { AccountRoles } from '@tonesingleton/cdk-sagemaker-unified-studio';

const roles = new AccountRoles(stack, 'Roles', {
  kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/my-key-id',
});
```

The construct creates:

| Role                     | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| **Provisioning Role**    | Provisions and manages blueprint resources   |
| **Query Execution Role** | Vends credentials for Athena query execution |

See the [SageMaker Unified Studio documentation](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html) for details.

## Domain

A `Domain` creates a SageMaker Unified Studio domain with its associated IAM roles, domain units, S3 buckets, blueprint configurations, and policy grants.

```ts
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { Domain, ManagedBlueprintIdentifier } from '@tonesingleton/cdk-sagemaker-unified-studio';

const vpc = ec2.Vpc.fromLookup(stack, 'Vpc', { vpcId: 'vpc-0123456789abcdef0' });

const domain = new Domain(stack, 'Domain', {
  name: 'Analytics',
  description: 'Central analytics domain',
  provisioningRoleArn: roles.provisioningRole.roleArn,
  vpc,
  vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
  assumeRoleArns: ['arn:aws:iam::123456789012:role/SSOContributor'],
  domainUnits: [
    { name: 'Data', description: 'Data engineering team' },
    { name: 'Analytics', description: 'Analytics team', parentDomainUnitName: 'Data' },
  ],
  additionalBlueprintIdentifiers: [
    ManagedBlueprintIdentifier.LAKEHOUSE_DATABASE,
    ManagedBlueprintIdentifier.LAKEHOUSE_CATALOG,
  ],
});
```

The construct automatically:

- Creates domain execution, service, and manage access IAM roles
- Configures the Tooling blueprint with VPC and S3 parameters
- Creates versioned projects and access logs S3 buckets
- Sorts domain units topologically (parents created before children)
- Grants blueprint usage permissions via policy grants
- Registers Lake Formation cleanup on stack deletion

### Importing an existing Domain

To reference a domain created in another stack:

```ts
const imported = Domain.fromAttributes(stack, 'ImportedDomain', {
  domainId: 'dzd-abc123',
  domainArn: 'arn:aws:datazone:eu-central-1:123456789012:domain/dzd-abc123',
  rootDomainUnitId: 'du-root123',
  domainExecutionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecution',
  manageAccessRoleArn: 'arn:aws:iam::123456789012:role/ManageAccess',
});
```

### Bucket naming

S3 bucket names must start with `amazon-sagemaker-` or `sagemaker-` to comply with the provisioning role's IAM policy:

```ts
new Domain(stack, 'Domain', {
  // ...
  projectsBucketName: 'amazon-sagemaker-projects-123456789012',
  accessLogsBucketName: 'sagemaker-logs-123456789012',
});
```

### Removal policy

By default, S3 buckets are retained on stack deletion. To enable cleanup in development:

```ts
import { RemovalPolicy } from 'aws-cdk-lib';

new Domain(stack, 'Domain', {
  // ...
  removalPolicy: RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});
```

## Project Profile

A `ProjectProfile` defines which environment blueprints are provisioned when a project is created.

```ts
import { ProjectProfile, DeploymentMode } from '@tonesingleton/cdk-sagemaker-unified-studio';

const profile = new ProjectProfile(stack, 'Profile', {
  name: 'DataEngineering',
  description: 'Standard data engineering project profile',
  domainId: domain.domainId,
  domainUnitId: domain.domainUnits['Data'].attrId,
  environmentConfigurations: [
    {
      name: 'Tooling',
      environmentBlueprintId: domain.blueprints['Tooling'].environmentBlueprintId,
      deploymentOrder: 0,
    },
    {
      name: 'DataLake',
      environmentBlueprintId: domain.blueprints['LakehouseDatabase'].environmentBlueprintId,
      deploymentOrder: 1,
      deploymentMode: DeploymentMode.ON_CREATE,
    },
  ],
});
```

Non-Tooling environments default to `ON_DEMAND` deployment mode to avoid unnecessary costs.

### Importing an existing Project Profile

```ts
const imported = ProjectProfile.fromAttributes(stack, 'ImportedProfile', {
  projectProfileId: 'pp-abc123',
});
```

## Project

A `Project` creates a collaborative workspace within a domain. It automatically provisions an execution role with the necessary trust policy for SageMaker Unified Studio services.

```ts
import { Project, Designation } from '@tonesingleton/cdk-sagemaker-unified-studio';

const project = new Project(stack, 'Project', {
  name: 'CustomerAnalytics',
  description: 'Customer behavior analytics project',
  domainIdentifier: domain.domainId,
  domainUnitId: domain.domainUnits['Analytics'].attrId,
  projectProfileId: profile.projectProfileId,
  membershipAssignments: [
    {
      designation: Designation.PROJECT_OWNER,
      member: { userIdentifier: 'arn:aws:iam::123456789012:role/DataLead' },
    },
  ],
});
```

### Custom execution role

To bring your own execution role instead of auto-creating one:

```ts
import { aws_iam as iam } from 'aws-cdk-lib';

const role = iam.Role.fromRoleArn(stack, 'ExecRole', 'arn:aws:iam::123456789012:role/MyExecRole');

new Project(stack, 'Project', {
  name: 'CustomProject',
  domainIdentifier: domain.domainId,
  projectExecutionRole: role,
});
```

### Importing an existing Project

```ts
const imported = Project.fromAttributes(stack, 'ImportedProject', {
  projectId: 'dzp-abc123',
  domainId: 'dzd-test',
  projectExecutionRoleArn: 'arn:aws:iam::123456789012:role/ProjectExec',
});
```

## Environment

An `Environment` provisions runtime infrastructure within a project based on a blueprint.

```ts
import { Environment } from '@tonesingleton/cdk-sagemaker-unified-studio';

const env = new Environment(stack, 'DataLakeEnv', {
  name: 'DataLake',
  description: 'Glue database and Athena workgroup',
  domainId: domain.domainId,
  projectId: project.id,
  environmentBlueprintId: domain.blueprints['LakehouseDatabase'].environmentBlueprintId,
  userParameters: [{ name: 'glueDbName', value: 'customer_analytics' }],
});
```

### Importing an existing Environment

```ts
const imported = Environment.fromAttributes(stack, 'ImportedEnv', {
  environmentId: 'env-abc123',
});
```

## Blueprint

The `Blueprint` construct activates an environment blueprint on a domain. The `Domain` construct creates blueprints automatically, but you can also use it directly:

```ts
import { Blueprint, ManagedBlueprintIdentifier } from '@tonesingleton/cdk-sagemaker-unified-studio';

const blueprint = new Blueprint(stack, 'RedshiftBP', {
  identifier: ManagedBlueprintIdentifier.REDSHIFT_SERVERLESS,
  domainId: domain.domainId,
  manageAccessRoleArn: domain.manageAccessRole.roleArn,
  provisioningRoleArn: roles.provisioningRole.roleArn,
});
```

### Available Blueprints

| Identifier                      | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `TOOLING`                       | SageMaker domain, security groups, IAM user roles       |
| `TOOLING_LITE`                  | Lightweight tooling (no SageMaker domain)               |
| `LAKEHOUSE_DATABASE`            | Glue database and Athena workgroup                      |
| `LAKEHOUSE_CATALOG`             | Lakehouse catalog backed by Redshift Managed Storage    |
| `REDSHIFT_SERVERLESS`           | Amazon Redshift Serverless warehouse                    |
| `WORKFLOWS`                     | MWAA environment for Airflow workflows                  |
| `ML_EXPERIMENTS`                | MLflow tracking server                                  |
| `EMR_SERVERLESS`                | EMR Serverless for Spark batch and interactive sessions |
| `EMR_ON_EC2`                    | EMR on EC2 for Spark, Hive, and big data workloads      |
| `AMAZON_BEDROCK_CHAT_AGENT`     | Bedrock Agent with execution and consumption roles      |
| `AMAZON_BEDROCK_KNOWLEDGE_BASE` | Bedrock Knowledge Base with OpenSearch Serverless       |

See `ManagedBlueprintIdentifier` for the full list.

### QuickSight

Enable the QuickSight blueprint to allow data visualization directly from the SageMaker Catalog. Requires IAM Identity Center integration and a QuickSight account in the same AWS account.

```ts
import { Blueprint, ManagedBlueprintIdentifier } from '@tonesingleton/cdk-sagemaker-unified-studio';

new Blueprint(stack, 'QuickSight', {
  identifier: ManagedBlueprintIdentifier.QUICKSIGHT,
  domainId: domain.domainId,
  manageAccessRoleArn: domain.manageAccessRole.roleArn,
  provisioningRoleArn: roles.provisioningRole.roleArn,
  globalParameters: {
    QuickSightVpcManagerRoleArn: 'arn:aws:iam::123456789012:role/AmazonSageMakerQuickSightVPC',
  },
});
```

Or add it to the Domain's `additionalBlueprintIdentifiers` for automatic activation (note: `globalParameters` can only be set via standalone `Blueprint`).

### Partner Apps

Partner AI apps (Domino, Dataiku, etc.) run as EKS-based application stacks within SageMaker. Enable the blueprint:

```ts
new Blueprint(stack, 'PartnerApps', {
  identifier: ManagedBlueprintIdentifier.PARTNER_APPS,
  domainId: domain.domainId,
  manageAccessRoleArn: domain.manageAccessRole.roleArn,
  provisioningRoleArn: roles.provisioningRole.roleArn,
});
```

After activation, subscribe to specific partner apps through the SageMaker console.

### Power BI (Server & Cloud)

Power BI connects to SageMaker Unified Studio via the **Athena JDBC driver** — no AWS infrastructure to provision. Users download the driver, paste the JDBC connection string from the SMUS portal, and authenticate via SSO.

This means Power BI integration requires:

1. A project with data assets (subscribed or owned)
2. The Athena JDBC driver installed on the Power BI Server/Desktop
3. IAM Identity Center SSO configured on the domain

No CDK construct is needed. The JDBC connection string is available in the project's "Connect" menu in SageMaker Unified Studio.

## Data Source

A `DataSource` connects a project to existing data in Glue or Redshift for cataloging and access management.

```ts
import { DataSource } from '@tonesingleton/cdk-sagemaker-unified-studio';

new DataSource(stack, 'GlueSource', {
  name: 'CustomerData',
  domainId: domain.domainId,
  projectId: project.id,
  connectionId: 'conn-abc123',
  glueConfiguration: {
    dataAccessRole: 'arn:aws:iam::123456789012:role/GlueAccess',
    relationalFilterConfigurations: [{ databaseName: 'customer_db', filterExpressions: [] }],
  },
});
```

## Git Connection

A `GitConnection` integrates source control with a CodeConnections-based connection.

```ts
import { GitConnection, GitProviderType } from '@tonesingleton/cdk-sagemaker-unified-studio';

new GitConnection(stack, 'Git', {
  name: 'MyGitHub',
  providerType: GitProviderType.GITHUB,
});
```

After deployment, the connection must be authorized manually in the AWS Console.

## Governance & Data Mesh

### PolicyGrant

A `PolicyGrant` authorizes fine-grained permissions on domain units, environment blueprint configurations, environment profiles, or asset types.

```ts
import { PolicyGrant, PolicyGrantEntityType, PolicyType } from '@tonesingleton/cdk-sagemaker-unified-studio';

new PolicyGrant(stack, 'AllowCreateProject', {
  domainIdentifier: domain.domainId,
  entityIdentifier: domain.rootDomainUnitId,
  entityType: PolicyGrantEntityType.DOMAIN_UNIT,
  policyType: PolicyType.CREATE_PROJECT,
  principal: {
    project: {
      projectDesignation: 'CONTRIBUTOR',
      projectGrantFilter: {
        domainUnitFilter: {
          domainUnit: domain.rootDomainUnitId,
          includeChildDomainUnits: true,
        },
      },
    },
  },
  detail: { createProject: {} },
});
```

### FormType

A `FormType` defines a custom metadata schema (Smithy model) that can be attached to assets for structured classification.

```ts
import { FormType, FormTypeStatus } from '@tonesingleton/cdk-sagemaker-unified-studio';

new FormType(stack, 'Classification', {
  name: 'DataClassification',
  domainIdentifier: domain.domainId,
  owningProjectIdentifier: project.id,
  model: {
    smithy: [
      '$version: "2"',
      'namespace com.example',
      'structure DataClassification {',
      '  sensitivity: String',
      '  retentionDays: Integer',
      '}',
    ].join('\n'),
  },
  description: 'Classifies data assets by sensitivity and retention.',
  status: FormTypeStatus.ENABLED,
});
```

### SubscriptionTarget

A `SubscriptionTarget` defines how subscribed data is fulfilled (e.g. Glue table grants, Redshift data shares), enabling the publish/subscribe workflow.

```ts
import { SubscriptionTarget } from '@tonesingleton/cdk-sagemaker-unified-studio';

new SubscriptionTarget(stack, 'GlueGrant', {
  name: 'GlueTableGrant',
  domainIdentifier: domain.domainId,
  environmentIdentifier: 'env-abc123',
  type: 'amazon.datazone.GlueTableGrantType',
  applicableAssetTypes: ['amazon.datazone.GlueTableAssetType'],
  authorizedPrincipals: ['arn:aws:iam::123456789012:role/DataZoneAdmin'],
  subscriptionTargetConfig: [{ content: '{}', formName: 'GlueTableForm' }],
  manageAccessRole: 'arn:aws:iam::123456789012:role/ManageAccess',
});
```

### Glossary & GlossaryTerm

A `Glossary` defines a business glossary for catalog standardization. Since no CloudFormation resource exists, this uses `AwsCustomResource` to call the DataZone API directly.

```ts
import { Glossary, GlossaryStatus, GlossaryTerm } from '@tonesingleton/cdk-sagemaker-unified-studio';

const glossary = new Glossary(stack, 'Glossary', {
  name: 'Business Terms',
  domainIdentifier: domain.domainId,
  owningProjectIdentifier: project.id,
  description: 'Central glossary for standardized business terminology.',
  status: GlossaryStatus.ENABLED,
});

new GlossaryTerm(stack, 'TermRevenue', {
  name: 'Revenue',
  domainIdentifier: domain.domainId,
  glossaryIdentifier: glossary.glossaryId,
  shortDescription: 'Total income from all sources.',
  longDescription: 'Revenue encompasses written premiums, earned premiums, and investment income.',
});
```

## Connections

Connection constructs correspond to the tiles available in the SageMaker Unified Studio "Add Connection" interface. Each provides a focused, validated interface tailored to its data source.

### Databases & Data Warehouses

| Construct | Target | Key Props |
| --- | --- | --- |
| `OracleConnection` | Oracle (RDS / on-prem) | host, port (1521), VPC, Spark only |
| `MySqlConnection` | MySQL / Aurora MySQL | host, port (3306), VPC, Spark + Athena |
| `PostgreSqlConnection` | PostgreSQL / Aurora PostgreSQL | host, port (5432), VPC, Spark + Athena |
| `SqlServerConnection` | Microsoft SQL Server | host, port (1433), VPC, Spark + Athena |
| `SnowflakeConnection` | Snowflake | accountUrl, warehouse, no VPC, Spark + Athena |
| `DocumentDbConnection` | Amazon DocumentDB | connectionUrl (MongoDB protocol), VPC |
| `DynamoDbConnection` | Amazon DynamoDB | tableArn, no VPC, no credentials |
| `BigQueryConnection` | Google BigQuery | projectId, OAuth2, no VPC |
| `AzureSqlConnection` | Azure SQL Database | host, port (1433), Basic/OAuth2, no VPC |
| `RedshiftConnection` | Amazon Redshift | host, port (5439), credentials, storage |
| `GlueConnection` | Generic (any Glue type) | Full control — use when no dedicated construct exists |

### Storage

| Construct | Target |
| --- | --- |
| `S3Connection` | Amazon S3 |

### Compute

| Construct | Target |
| --- | --- |
| `SparkGlueConnection` | AWS Glue Interactive Sessions |
| `SparkEmrConnection` | EMR Serverless |
| `MwaaConnection` | MWAA (Managed Apache Airflow) |
| `AthenaConnection` | Amazon Athena |

### Example: Oracle database connection

```ts
import { OracleConnection, ConnectionScope } from '@tonesingleton/cdk-sagemaker-unified-studio';

new OracleConnection(stack, 'OracleDataStore', {
  name: 'datastore-oracle',
  domainIdentifier: domain.domainId,
  projectIdentifier: project.id,
  environmentIdentifier: 'env-abc123',
  connectionScope: ConnectionScope.PROJECT,
  host: 'oracle.internal.example.com',
  port: 1521,
  databaseName: 'ORCL',
  roleArn: 'arn:aws:iam::123456789012:role/GlueOracleRole',
  subnetId: 'subnet-abc123',
  securityGroupIds: ['sg-111111'],
  availabilityZone: 'eu-central-1a',
  secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:oracle-creds',
});
```

### Example: Snowflake connection (no VPC)

```ts
import { SnowflakeConnection } from '@tonesingleton/cdk-sagemaker-unified-studio';

new SnowflakeConnection(stack, 'Snowflake', {
  name: 'analytics-warehouse',
  domainIdentifier: domain.domainId,
  environmentIdentifier: 'env-abc123',
  accountUrl: 'https://myorg.snowflakecomputing.com',
  databaseName: 'ANALYTICS',
  warehouse: 'COMPUTE_WH',
  roleArn: 'arn:aws:iam::123456789012:role/GlueSnowflakeRole',
  secretArn: 'arn:aws:secretsmanager:eu-central-1:123456789012:secret:snowflake-creds',
});
```

## Workflow

A `Workflow` creates a managed Airflow workflow (MWAA Serverless).

```ts
import { aws_iam as iam, aws_s3 as s3 } from 'aws-cdk-lib';
import { Workflow, TriggerMode } from '@tonesingleton/cdk-sagemaker-unified-studio';

const dagsBucket = s3.Bucket.fromBucketName(stack, 'DagsBucket', 'my-dags-bucket');
const executionRole = iam.Role.fromRoleArn(stack, 'MWAARole', 'arn:aws:iam::123456789012:role/MWAAExecution');

new Workflow(stack, 'ETL', {
  name: 'DailyETL',
  role: executionRole,
  definitionFile: {
    path: 'workflows/etl.yaml',
    bucket: dagsBucket,
  },
  triggerMode: TriggerMode.MANUAL_ONLY,
});
```

## CDK Nag Compliance

All constructs are validated against the [AWS Solutions](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#awssolutions) rule pack via [cdk-nag](https://github.com/cdklabs/cdk-nag). Where AWS managed policies are required by the service, suppressions are applied with documentation links as justification.

## VPC Requirements

When using `VpcOnly` network access (the default for SageMaker Unified Studio), the following VPC endpoints must be available.

**Important:**

- All interface endpoints must be associated with the **same subnets** used by the Tooling blueprint.
- The `datazone` and `glue` endpoints **must have Private DNS enabled**.
- The VPC must have `enableDnsSupport` and `enableDnsHostnames` set to `true`.
- VPC endpoint security groups must allow **inbound port 443** from the SageMaker domain's security groups.

| Endpoint                                   | Required For                                   | Private DNS  |
| ------------------------------------------ | ---------------------------------------------- | ------------ |
| `com.amazonaws.<region>.datazone`          | Personal notebooks (kernel ↔ DataZone API)     | **Required** |
| `com.amazonaws.<region>.glue`              | Personal notebooks (Glue Interactive Sessions) | **Required** |
| `com.amazonaws.<region>.athena`            | Athena Spark sessions                          | **Required** |
| `com.amazonaws.<region>.sagemaker.api`     | SageMaker API (JupyterLab, spaces)             | Recommended  |
| `com.amazonaws.<region>.sagemaker.runtime` | Model inference                                | Recommended  |
| `com.amazonaws.<region>.sts`               | Token service                                  | Recommended  |
| `com.amazonaws.<region>.s3`                | Data and notebook storage (Gateway endpoint)   | N/A          |
| `com.amazonaws.<region>.ssm`               | Parameter lookups for container images         | Recommended  |
| `com.amazonaws.<region>.ecr.api`           | Container image registry                       | Recommended  |
| `com.amazonaws.<region>.ecr.dkr`           | Container image pulls                          | Recommended  |
| `com.amazonaws.<region>.logs`              | CloudWatch logging                             | Recommended  |

## Known Limitations

- **IAM Identity Center**: SageMaker Unified Studio works best with AWS IAM Identity Center for per-user attribution. With IAM federation, all users sharing a role appear as a single identity.
- **Lake Formation cleanup**: The `Domain` construct automatically deregisters admin roles from Lake Formation on stack deletion via a custom resource.
- **Domain deletion**: CloudFormation cannot delete a domain with active projects. Projects created through the UI must be deleted manually before `cdk destroy`:

```bash
# List projects
aws datazone list-projects --domain-identifier <domain-id> \
  --query "items[].{id:id,name:name}" --output table

# Delete each project (admin project last)
aws datazone delete-project --domain-identifier <domain-id> \
  --identifier <project-id> --skip-deletion-check
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

This project is licensed under the Apache-2.0 License.
