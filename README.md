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

This library provides opinionated L2 constructs that handle:

- **Domain** — Creates a SageMaker Unified Studio (DataZone V2) domain with its execution, service, and manage access IAM roles, domain units, blueprint configurations, and policy grants.
- **Blueprint** — Activates an environment blueprint on a domain with the correct manage access and provisioning role configuration.
- **ProjectProfile** — Defines a reusable project profile with environment configurations and deployment ordering.
- **Project** — Creates a project within a domain, with membership management.
- **Roles** — Creates the account-level provisioning and query execution roles required by SageMaker Unified Studio.

## Usage

### Full Data Mesh Setup

```ts
import { App, Stack } from 'aws-cdk-lib';
import {
  Domain,
  DomainUnitConfig,
  ManagedBlueprintIdentifier,
  AccountRoles,
  ProjectProfile,
  Project,
} from '@tonesingleton/cdk-sagemaker-unified-studio';

const app = new App();
const stack = new Stack(app, 'DataMeshStack');

// Account-level roles (shared across domains)
const roles = new AccountRoles(stack, 'Roles', {
  account: '123456789012',
});

// SageMaker Unified Studio domain
const domain = new Domain(stack, 'Domain', {
  name: 'Analytics',
  description: 'Central analytics domain',
  assumeRoleArns: ['arn:aws:iam::123456789012:role/data-contributor'],
  provisioningRoleArn: roles.provisioningRole.roleArn,
  vpcId: 'vpc-0123456789abcdef0',
  subnetIds: ['subnet-0123456789abcdef0', 'subnet-0123456789abcdef1'],
  domainUnits: [
    { name: 'Data', description: 'Data engineering team' },
    { name: 'Analytics', description: 'Analytics team' },
  ],
  additionalBlueprintIdentifiers: [
    ManagedBlueprintIdentifier.LAKEHOUSE_DATABASE,
    ManagedBlueprintIdentifier.LAKEHOUSE_CATALOG,
    ManagedBlueprintIdentifier.REDSHIFT_SERVERLESS,
  ],
});
```

### Domain with Nested Domain Units

```ts
const domain = new Domain(stack, 'Domain', {
  // ...
  domainUnits: [
    { name: 'Engineering', description: 'Engineering division' },
    {
      name: 'DataPlatform',
      description: 'Data platform team',
      parentDomainUnitName: 'Engineering',
    },
  ],
});
```

Domain units are automatically sorted topologically — parents are always created before their children, regardless of the order you specify them.

### Available Blueprints

The following blueprint identifiers are supported:

| Identifier                      | Description                                                        | Auto-Provision     |
| ------------------------------- | ------------------------------------------------------------------ | ------------------ |
| `TOOLING`                       | IAM user roles, security groups, and SageMaker unified domains     | ✅ Always included |
| `LAKEHOUSE_DATABASE`            | AWS Glue database and Amazon Athena workgroup (API name: DataLake) | ✅                 |
| `LAKEHOUSE_CATALOG`             | SageMaker Lakehouse catalog backed by Redshift Managed Storage     | ✅                 |
| `REDSHIFT_SERVERLESS`           | Amazon Redshift Serverless warehouse                               | ✅                 |
| `WORKFLOWS`                     | MWAA environment for Airflow-based workflows                       | ✅                 |
| `ML_EXPERIMENTS`                | MLflow tracking server for experimentation                         | ✅                 |
| `MLFLOW_APP`                    | MLflow App for Unified Studio                                      | ✅                 |
| `EMR_SERVERLESS`                | EMR Serverless for Spark batch jobs and interactive sessions       | ✅                 |
| `EMR_ON_EC2`                    | EMR on EC2 for Spark, Hive, and big data workloads                 | ✅                 |
| `EMR_ON_EKS`                    | EMR on EKS environment                                             | ✅                 |
| `PARTNER_APPS`                  | IAM role and Connection for Partner AI Apps                        | ✅                 |
| `QUICKSIGHT`                    | Amazon QuickSight data visualization                               | ✅                 |
| `AMAZON_BEDROCK_CHAT_AGENT`     | Bedrock Agent with execution and consumption roles                 | ❌ On-demand       |
| `AMAZON_BEDROCK_EVALUATION`     | Bedrock evaluation job service role                                | ❌ On-demand       |
| `AMAZON_BEDROCK_FLOW`           | Bedrock Prompt Flow with execution role                            | ❌ On-demand       |
| `AMAZON_BEDROCK_FUNCTION`       | Lambda function with execution role and Secrets Manager             | ❌ On-demand       |
| `AMAZON_BEDROCK_GUARDRAIL`      | Bedrock Guardrail with execution role                              | ❌ On-demand       |
| `AMAZON_BEDROCK_KNOWLEDGE_BASE` | Bedrock Knowledge Base with OpenSearch Serverless                   | ❌ On-demand       |
| `AMAZON_BEDROCK_PROMPT`         | Bedrock Prompt with consumption role                               | ❌ On-demand       |

Blueprints marked **Auto-Provision** can be included in a project profile and will be automatically provisioned when a project is created. **On-demand** blueprints require additional parameters and are created from the SageMaker Unified Studio UI.

### Tooling Blueprint Regional Parameters

The Tooling blueprint requires VPC configuration via regional parameters. The parameter names are PascalCase:

```ts
// These are set automatically by the Domain construct:
// - S3Location: s3://bucket-name
// - VpcId: vpc-0123456789abcdef0
// - Subnets: subnet-abc,subnet-def,subnet-ghi
```

### Deployment Ordering

When creating a project profile with multiple blueprints, the Tooling blueprint must be deployed first (it sets up the SageMaker domain and S3 bucket that other blueprints depend on). The DataLake blueprint should be deployed after Tooling has registered the manage access role as a Lake Formation admin.

```ts
// Deployment order is handled automatically:
// 0: Tooling (first — creates SageMaker domain, S3 bucket, Lake Formation admin)
// 1: All other auto-provision blueprints (parallel)
// 2: DataLake (after Tooling has set up Lake Formation)
```

## IAM Roles

The library creates several IAM roles following the [SageMaker Unified Studio documentation](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html):

| Role                      | Scope         | Purpose                                      |
| ------------------------- | ------------- | -------------------------------------------- |
| **Provisioning Role**     | Account-level | Provisions and manages blueprint resources   |
| **Query Execution Role**  | Account-level | Vends credentials for Athena query execution |
| **Domain Execution Role** | Per-domain    | Manages the domain and its resources         |
| **Service Role**          | Per-domain    | SageMaker service operations                 |
| **Manage Access Role**    | Per-domain    | Publishes, grants, and revokes data access   |

## CDK Nag Compliance

All constructs are validated against the [AWS Solutions](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#awssolutions) rule pack via [cdk-nag](https://github.com/cdklabs/cdk-nag). Where AWS managed policies are required by the service, suppressions are applied with documentation links as justification.

## VPC Requirements

When using `VpcOnly` network access (the default for SageMaker Unified Studio), the following VPC endpoints must be available in the configured VPC.

**Important:**
- All interface endpoints must be associated with the **same subnets** used by the Tooling blueprint.
- The `datazone` endpoint **must have Private DNS enabled** for personal notebooks to function.
- The `glue` endpoint **must have Private DNS enabled** for Spark/Athena connectivity.
- The VPC must have `enableDnsSupport` and `enableDnsHostnames` set to `true`.
- The security groups on VPC endpoints must allow **inbound port 443** from the SageMaker domain's security groups. The Tooling blueprint creates security groups for the SageMaker domain (e.g. `sagemaker_<domain-name>`) — these must be allowed as sources on the VPC endpoint security groups.

| Endpoint                                   | Required For                                      | Private DNS |
| ------------------------------------------ | ------------------------------------------------- | ----------- |
| `com.amazonaws.<region>.datazone`          | Personal notebooks (kernel ↔ DataZone API)        | **Required** |
| `com.amazonaws.<region>.glue`              | Personal notebooks (Glue Interactive Sessions)    | **Required** |
| `com.amazonaws.<region>.athena`            | Athena Spark sessions                             | **Required** |
| `com.amazonaws.<region>.sagemaker.api`     | SageMaker API (JupyterLab, spaces)                | Recommended |
| `com.amazonaws.<region>.sagemaker.runtime` | Model inference                                   | Recommended |
| `com.amazonaws.<region>.sts`               | Token service                                     | Recommended |
| `com.amazonaws.<region>.s3`                | Data and notebook storage (Gateway endpoint)      | N/A         |
| `com.amazonaws.<region>.ssm`               | Parameter lookups for container images             | Recommended |
| `com.amazonaws.<region>.ssmmessages`       | SSM Session Manager messaging                     | Recommended |
| `com.amazonaws.<region>.ec2messages`       | SSM agent messaging                               | Recommended |
| `com.amazonaws.<region>.ecr.api`           | Container image registry                          | Recommended |
| `com.amazonaws.<region>.ecr.dkr`           | Container image pulls                             | Recommended |
| `com.amazonaws.<region>.logs`              | CloudWatch logging                                | Recommended |

### Security Group Configuration

The Tooling blueprint creates a SageMaker domain with its own security groups. For VPC endpoints to be reachable from JupyterLab spaces and personal notebooks, the endpoint security groups must allow inbound HTTPS (port 443) from the SageMaker domain's security groups.

To find the SageMaker domain's security groups:

```bash
aws ec2 describe-network-interfaces \
  --filters "Name=description,Values=*<sagemaker-domain-id>*" \
  --query "NetworkInterfaces[0].Groups[].GroupId"
```

Then add inbound rules on each VPC endpoint's security group:

```bash
aws ec2 authorize-security-group-ingress \
  --group-id <endpoint-security-group-id> \
  --protocol tcp --port 443 \
  --source-group <sagemaker-domain-security-group-id>
```

## Known Limitations

- **IAM Identity Center**: SageMaker Unified Studio works best with AWS IAM Identity Center for per-user attribution. With IAM federation, all users sharing a role appear as a single identity within Unified Studio.
- **Lake Formation cleanup**: The `Domain` construct automatically deregisters the manage access and provisioning roles from Lake Formation data lake administrators on stack deletion via a custom resource.
- **Domain deletion**: If a deployment fails and CloudFormation rolls back, the SageMaker Unified Studio domain may not be deleted automatically due to orphaned projects. Manual cleanup via the AWS CLI is required.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

This project is licensed under the Apache-2.0 License.
