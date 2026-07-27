# cdk-sagemaker-unified-studio — Improvement Recommendations

## 1. Security

### `datazoneApiRole` has `datazone:*` on `*` — overly broad

**File:** `src/constructs/domain/domain.construct.ts`

The role grants all DataZone actions on all resources. The actual operations needed (membership lookups, `ListEnvironments`, `ListConnections`) are a small, enumerable set. Scoping this down reduces blast radius if the Lambda is ever compromised.

### `fromAttributes` uses `undefined as unknown as iam.IRole` — type lie

**File:** `src/constructs/domain/domain.construct.ts`

Callers who destructure `domainExecutionRole` or `manageAccessRole` from an imported domain will get a runtime crash instead of a compile-time error. Optional fields should be typed as `iam.IRole | undefined` in `IDomain` and `DomainAttributes`, with callers required to handle the undefined case.

---

## 2. API Design

### `crRole` is a confusing prop name on `ProjectProps`

**File:** `src/constructs/project/project.interface.ts`

The prop is documented as "the domain-level DataZone API role", but `crRole` is opaque. Rename it to `datazoneApiRole` to match the `Domain` construct's naming and make the intent obvious.

### `DataZoneApiCall` silently shares a singleton Lambda across all instances

**File:** `src/constructs/datazone-api-call/datazone-api-call.construct.ts`

The comment warns about this constraint but doesn't enforce it. If two `DataZoneApiCall` instances in the same stack use different roles, the second one silently uses the first role. Consider adding a stack-level check (e.g. via a `Stack` metadata annotation) that throws at synth time if mismatched roles are detected.

### `LookupEnvironment` uses `items.0.id` — fragile ordering assumption

**File:** `src/constructs/environment/lookup/lookup-environment.construct.ts`

`ListEnvironments` returns results in an unspecified order. If there are multiple environments with similar names, or the target environment isn't index 0, this silently returns the wrong ID. Add a `status` filter (`ACTIVE`) and document the ordering assumption, or use a custom Lambda that filters by exact name.

---

## 3. Construct Completeness

### `Blueprint` has no `IBlueprint` interface or `fromAttributes` factory

**File:** `src/constructs/blueprint/blueprint.construct.ts`

Every other construct has an `I*` interface and `fromAttributes`. `Blueprint` exposes `environmentBlueprintId` and `configuration` directly on the class but has no interface or import factory. This breaks the library's own convention and makes cross-stack referencing of blueprints impossible without re-activating them.

### `DataCatalogTable.addDataQualityRuleset` reaches into child construct internals

**File:** `src/constructs/data-catalog-table/data-catalog-table.construct.ts`

The cast `(dqr.node.defaultChild as glue.CfnDataQualityRuleset).addResourceDependency(this.cfnTable)` reaches into the child construct's internals. Expose a `grantRead` or `addDependency` method on `DataQualityRuleset` instead.

### `IProjectProfile` only exposes `projectProfileId`

**File:** `src/constructs/project-profile/project-profile.construct.ts`

The interface only exposes the ID. At minimum, `domainId` should be on `IProjectProfile` for consistency with `IProject`.

---

## 4. Resilience

### `lake-formation-cleanup` handler swallows all errors with `response.SUCCESS`

**File:** `src/constructs/domain/constructs/lake-formation-cleanup/lake-formation-cleanup.handler.ts`

The outer `catch` sends `SUCCESS` even on unexpected failures. This means a broken cleanup silently succeeds from CloudFormation's perspective, leaving Lake Formation in a dirty state. Non-retryable errors (e.g. permission denied) should send `FAILED` so the operator is alerted.

### `ListProjects` / `ListEnvironments` in the cleanup handler has no pagination

**File:** `src/constructs/domain/constructs/lake-formation-cleanup/lake-formation-cleanup.handler.ts`

Both calls return the first page only. A domain with many projects will silently skip cleanup for projects beyond the first page. Add pagination loops.

---

## 5. Minor / Code Quality

### `Domain.topologicalSort` is `public static` but is an implementation detail

**File:** `src/constructs/domain/domain.construct.ts`

It's only public to be testable. Move the tests to use the `Domain` constructor directly, and make the method `private static`.

### `ProjectProfile` has a fragile Tooling-name-based heuristic for `deploymentOrder`

**File:** `src/constructs/project-profile/project-profile.construct.ts`

The constructor checks `c.name === ManagedBlueprintIdentifier.TOOLING` to auto-assign `deploymentOrder: 0`. This breaks if a user names a non-Tooling environment "Tooling". Remove the heuristic; callers should always set `deploymentOrder` explicitly.

### `assumeRoleArns` uses the last ARN path segment as the construct ID

**File:** `src/constructs/domain/domain.construct.ts`

`roleArn.split('/').pop()` is used as the construct ID. If two ARNs share the same role name (e.g. from different paths), this produces a duplicate construct ID and a synth error. Use a stable index or a hash instead.
