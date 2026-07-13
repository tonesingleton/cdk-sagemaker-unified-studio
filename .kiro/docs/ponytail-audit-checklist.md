# Ponytail Audit Checklist

Over-engineering findings for `cdk-sagemaker-unified-studio`, ranked biggest cut first.

---

- [ ] **shrink: `EXECUTION_ROLE_TRUST_PRINCIPALS` duplicated across two files**
      `src/constructs/account-roles/account-roles.construct.ts:6`
      `src/constructs/project/project.construct.ts:6`
      Same 10 service principals, different order. Extract to a shared constant — one source of truth.

- [ ] **yagni: `ConnectionProps` base interface has speculative width**
      `src/constructs/connection/connection.interface.ts`
      Declares `connectionScope`, `enableTrustedIdentityPropagation`, `awsLocation`, `configurations` — but only GlueConnection uses all. HyperPod/IAM use `awsLocation`; the other 5 ignore every optional field. Move Glue-specific fields to `GlueConnectionProps`.

- [ ] **yagni: 8 connection sub-folders × 4 files for thin CfnConnection wrappers**
      `src/constructs/connection/*/`
      AthenaConnection = 14 lines of logic. SparkEmrConnection = 12. These are property-mapping one-liners — no grants, no metrics, no imports. A single `connections.ts` file exporting all 8 classes would cut 24 index/routing files.

- [ ] **shrink: Duplicate `relationalFilterConfigurations` mapping in DataSource**
      `src/constructs/data-source/data-source.construct.ts:57-78`
      `buildGlueConfiguration` and `buildRedshiftConfiguration` share identical filter mapping. Extract shared helper.

- [ ] **native: `Workflow` uses raw `CfnResource` — check if L1 exists at CDK 2.261**
      `src/constructs/workflow/workflow.construct.ts`
      If `aws-cdk-lib` has added `CfnWorkflow` in MWAAServerless, switch for type safety. If not, the escape hatch is correct.

- [ ] **shrink: `Host` iterates stack children to suppress AwsCustomResource Lambda**
      `src/constructs/git-connection/host.construct.ts:118-131`
      Known CDK workaround. Move to a stack-level utility or one-time acknowledge to avoid duplication if more AwsCustomResources are added.

- [ ] **delete: Commented-out `TOOLING_LITE` blueprint activation block**
      `src/constructs/domain/domain.construct.ts:271-280`
      Dead code with a TODO. Track in an issue, delete from source.

---

## Confirmed Not Over-Engineered (no action)

- cdk-nag `Validations.of().acknowledge()` — correct v3 API usage
- Custom resource Lambdas for Lake Formation — no CFN native alternative
- Separate `.interface.ts` files — JSII cross-language convention
- 100% coverage threshold with co-located tests — lean and correct
- `bundledDependencies: ["cdk-nag"]` — required for JSII construct libs
- `Domain.topologicalSort` — hand-rolled but no stdlib alternative exists; correct implementation
