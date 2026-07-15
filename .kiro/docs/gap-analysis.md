# Gap Analysis: SMUS Capabilities vs L2 Library Coverage

> Generated: 2026-07-14
> Last updated: 2026-07-14
> Purpose: Identify missing atomic constructs needed to cover the full SageMaker Unified Studio feature set.

## Current Coverage

| SMUS Capability | Construct(s) | Status |
|---|---|---|
| Domains | `Domain` | ✓ |
| Domain Units | via `Domain` (topological sort) | ✓ |
| Projects | `Project` | ✓ |
| Project Profiles | `ProjectProfile` | ✓ |
| Environments | `Environment` | ✓ |
| Blueprints | `Blueprint` (with `globalParameters` for QuickSight etc.) | ✓ |
| Account-level IAM roles | `AccountRoles` | ✓ |
| Connections (all 15 SMUS tiles) | `OracleConnection`, `MySqlConnection`, `PostgreSqlConnection`, `SqlServerConnection`, `SnowflakeConnection`, `DocumentDbConnection`, `DynamoDbConnection`, `BigQueryConnection`, `AzureSqlConnection`, `RedshiftConnection`, `S3Connection`, `SparkGlueConnection`, `SparkEmrConnection`, `MwaaConnection`, `AthenaConnection` | ✓ |
| Data Sources (Glue/Redshift) | `DataSource` | ✓ |
| Data Catalog Tables | `DataCatalogTable` | ✓ |
| Data Quality Rulesets | `DataQualityRuleset` | ✓ |
| Glue Databases | `ProjectDatabase` | ✓ |
| Workflows (MWAA Serverless) | `Workflow` | ✓ |
| Git source control | `GitConnection`, `Host` | ✓ |
| Policy Grants | `PolicyGrant` | ✓ (Phase 1) |
| Form Types | `FormType` | ✓ (Phase 1) |
| Subscription Targets | `SubscriptionTarget` | ✓ (Phase 1) |
| Business Glossary | `Glossary`, `GlossaryTerm` (AwsCustomResource) | ✓ (Phase 1) |
| Group Profiles | `GroupProfile` | ✓ (Phase 3) |
| User Profiles | `UserProfile` | ✓ (Phase 3) |
| QuickSight | via `Blueprint` + `ManagedBlueprintIdentifier.QUICKSIGHT` + `globalParameters` | ✓ |
| Partner Apps | via `Blueprint` + `ManagedBlueprintIdentifier.PARTNER_APPS` | ✓ |
| Power BI (Server & Cloud) | No construct needed — client-side Athena JDBC driver + SSO | N/A |

---

## Tier 1 — Missing, CFN-addressable, atomic leaves (build now)

These have `AWS::` CloudFormation resource types and are clear L2 construct candidates.

### Governance & Data Mesh

| Gap | CFN Resource | What it does | Priority | Status |
|---|---|---|---|---|
| ~~PolicyGrant~~ | `AWS::DataZone::PolicyGrant` | Grants fine-grained permissions (USE_BLUEPRINT, CREATE_PROJECT, etc.) to domain units/projects. | HIGH | ✓ Done |
| ~~SubscriptionTarget~~ | `AWS::DataZone::SubscriptionTarget` | Defines how subscribed data is fulfilled (Glue table grants, Redshift data shares). | HIGH | ✓ Done |
| ~~FormType~~ | `AWS::DataZone::FormType` | Defines custom metadata form schemas (structured fields attached to assets). | HIGH | ✓ Done |
| ~~ProjectMembership~~ | `AWS::DataZone::ProjectMembership` | Adds a member (user/group) to a project with a designation. Currently baked into `ProjectProps.membershipAssignments` but not independently manageable. | MEDIUM | ✓ Done |
| **GroupProfile** | `AWS::DataZone::GroupProfile` | Maps an IAM/SSO group to a DataZone group for access control. | MEDIUM | ✓ Done |
| **UserProfile** | `AWS::DataZone::UserProfile` | Maps an IAM/SSO user to a DataZone user profile. | MEDIUM | ✓ Done |
| **EnvironmentProfile** | `AWS::DataZone::EnvironmentProfile` | Reusable environment configuration template (different from ProjectProfile). | LOW | |
| **EnvironmentActions** | `AWS::DataZone::EnvironmentActions` | Custom actions (URLs/parameters) associated with environments. | LOW | |

### Generative AI

| Gap | CFN Resource | What it does | Priority |
|---|---|---|---|
| **BedrockAgent** | `AWS::Bedrock::Agent` | Gen AI agent with tools, knowledge bases, guardrails. Core SMUS gen AI tile. | HIGH |
| **KnowledgeBase** | `AWS::Bedrock::KnowledgeBase` | RAG over documents (S3 + vector store). Core SMUS gen AI tile. | HIGH |
| **Guardrail** | `AWS::Bedrock::Guardrail` | Content/topic/PII filters for model responses. Responsible AI. | HIGH |

### Machine Learning

| Gap | CFN Resource | What it does | Priority |
|---|---|---|---|
| **FeatureGroup** | `AWS::SageMaker::FeatureGroup` | Feature store with online/offline storage, feature definitions. | MEDIUM |

---

## Tier 2 — Missing, partially CFN-addressable (need custom resources)

| Gap | Why partial | Notes | Status |
|---|---|---|---|
| ~~Business Glossary~~ | No `AWS::DataZone::Glossary` CFN resource. Created via DataZone API (`CreateGlossary`, `CreateGlossaryTerm`). | Wrapped in AwsCustomResource with full lifecycle (create/update/delete). | ✓ Done |
| **MLflow Tracking Server** | `AWS::SageMaker::MlflowTrackingServer` exists but SMUS integration is via blueprint config. | The `ML_EXPERIMENTS` blueprint handles this. May not need a dedicated construct. | |
| **Custom Asset Types** | Created via `CreateAssetType` API + `FormType` CFN resource. Two-step process. | FormType L2 is done. Asset type registration still needs a custom resource. | |
| **Scheduled Queries** | Created through SMUS UI -> EventBridge Scheduler. No dedicated CFN resource for "SMUS scheduled query". | Could model as EventBridge Schedule + Athena query, but that's outside DataZone's domain. | |

---

## Tier 3 — Not CFN-addressable (UI/runtime-only)

These are runtime/interactive features and cannot be modeled as CDK constructs:

| Feature | Why not |
|---|---|
| Notebooks / JupyterLab spaces | Created at runtime by users within the Tooling environment. No CFN resource. |
| Data publishing / catalog curation | UI workflow (publish, add glossary terms, metadata enrichment). |
| Subscription request/approval | User-initiated workflow via UI/API. |
| Amazon Q Developer integration | Built into the IDE, not infrastructure. |
| Visual ETL / Query Editor | UI tools, no CFN backing. |
| Model training / deployment | SageMaker AI runtime operations (training jobs, endpoints). |

---

## Recommended Build Order

### Phase 1 — Governance & Data Mesh primitives ✓ COMPLETE

1. ~~`PolicyGrant`~~ — standalone construct for fine-grained permissions ✓
2. ~~`FormType`~~ — custom metadata schemas ✓
3. ~~`SubscriptionTarget`~~ — enables the publish/subscribe pattern ✓
4. ~~`Glossary` + `GlossaryTerm`~~ — via AwsCustomResource (no CFN type exists) ✓

### Phase 2 — Generative AI

5. `BedrockAgent` — wraps `AWS::Bedrock::Agent` with SMUS-friendly defaults
6. `KnowledgeBase` — wraps `AWS::Bedrock::KnowledgeBase`
7. `Guardrail` — wraps `AWS::Bedrock::Guardrail`

### Phase 3 — Identity & ML

8. ~~`GroupProfile` / `UserProfile`~~ — identity mapping ✓
9. `ProjectMembership` — standalone membership management
10. `FeatureGroup` — feature store for ML projects

### Phase 4 — Low priority

11. `EnvironmentProfile`
12. `EnvironmentActions`

---

## Design Considerations

- **Bedrock constructs** are usable independently of SMUS. Consider whether they belong in this library or a separate `cdk-bedrock` package. If kept here, scope them to SMUS-project-aware patterns (e.g. auto-tagging with `AmazonDataZoneProject`, wiring to project execution roles).
- **Glossary** requires AwsCustomResource because AWS hasn't published a CFN type. The construct handles the full lifecycle (create/update/delete) with idempotent API calls. IAM permissions are scoped to the specific DataZone domain ARN.
- **PolicyGrant** is exposed as a standalone public construct. The Domain construct still uses `CfnPolicyGrant` internally for blueprint grants (changing that would be a breaking API change to `blueprintPolicyGrants`).
- **FormType Smithy model** must contain only the `structure` block — no `$version` or `namespace` directives. DataZone infers the namespace from the domain ID (e.g. `dzd_abc123`) automatically. Including a namespace causes a "does not match request" deployment error.
- **Token-aware validation** — all constructs skip regex validation when prop values are unresolved CDK Tokens (standard CDK pattern using `Token.isUnresolved()`). This enables cross-stack references where IDs aren't known at synth time.
- **Blueprint globalParameters** — added to support QuickSight (needs `QuickSightVpcManagerRoleArn`) and future blueprints that need account-wide config. Power BI and Tableau connect via the Athena JDBC driver with SSO — no infrastructure construct needed.
- **FeatureGroup** already has a CDK L1 (`CfnFeatureGroup`). The L2 value is: default S3 offline store path conventions matching SMUS project bucket, auto-wiring to the project execution role, and Glue Data Catalog integration for discoverability.

---

## Sources

- [AWS::DataZone CFN resource types](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/AWS_DataZone.html)
- [AWS::Bedrock::Agent](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-bedrock-agent.html)
- [AWS::Bedrock::KnowledgeBase](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-bedrock-knowledgebase.html)
- [AWS::Bedrock::Guardrail](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-bedrock-guardrail.html)
- [AWS::SageMaker::FeatureGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-sagemaker-featuregroup.html)
- [AWS::DataZone::PolicyGrant](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-policygrant.html)
- [AWS::DataZone::SubscriptionTarget](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-subscriptiontarget.html)
- [AWS::DataZone::FormType](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-formtype.html)
- [AWS::DataZone::ProjectMembership](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-datazone-projectmembership.html)
- [SMUS Business Glossary docs](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/create-maintain-business-glossary.html)
- [SMUS Data Catalog & Publishing](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-publishing.html)
- [SMUS MLflow experiments](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/use-mlflow-experiments.html)
- [SMUS Bedrock integration](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/bedrock.html)
