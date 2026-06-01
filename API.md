# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AccountRoles <a name="AccountRoles" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles">IAccountRoles</a>

Account-level IAM roles shared across all SageMaker Unified Studio domains.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.Initializer"></a>

```typescript
import { AccountRoles } from '@tonesingleton/cdk-sagemaker-unified-studio'

new AccountRoles(scope: Construct, id: string, props: AccountRolesProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRolesProps">AccountRolesProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRolesProps">AccountRolesProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.isConstruct"></a>

```typescript
import { AccountRoles } from '@tonesingleton/cdk-sagemaker-unified-studio'

AccountRoles.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.bedrockFmConsumptionRole">bedrockFmConsumptionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The Bedrock FM consumption role used for model invocation via inference profiles. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.bedrockModelManagementRole">bedrockModelManagementRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The Bedrock model management role used to create inference profiles. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.executionRole">executionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The execution role defines the AWS services and data that can be accessed through Amazon SageMaker Unified Studio projects. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.provisioningRole">provisioningRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The provisioning role used by SageMaker Unified Studio to deploy blueprint resources. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.queryExecutionRole">queryExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The query execution role used by Lake Formation and Glue for Athena queries. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bedrockFmConsumptionRole`<sup>Required</sup> <a name="bedrockFmConsumptionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.bedrockFmConsumptionRole"></a>

```typescript
public readonly bedrockFmConsumptionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The Bedrock FM consumption role used for model invocation via inference profiles.

---

##### `bedrockModelManagementRole`<sup>Required</sup> <a name="bedrockModelManagementRole" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.bedrockModelManagementRole"></a>

```typescript
public readonly bedrockModelManagementRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The Bedrock model management role used to create inference profiles.

---

##### `executionRole`<sup>Required</sup> <a name="executionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.executionRole"></a>

```typescript
public readonly executionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The execution role defines the AWS services and data that can be accessed through Amazon SageMaker Unified Studio projects.

It determines which tools,
compute resources, data sources, and AI/ML assets project members can access.
Amazon SageMaker Unified Studio assumes this role to make service calls on
behalf of users within projects.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/setup-iam-based-domains.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/setup-iam-based-domains.html)

---

##### `provisioningRole`<sup>Required</sup> <a name="provisioningRole" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.provisioningRole"></a>

```typescript
public readonly provisioningRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The provisioning role used by SageMaker Unified Studio to deploy blueprint resources.

---

##### `queryExecutionRole`<sup>Required</sup> <a name="queryExecutionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles.property.queryExecutionRole"></a>

```typescript
public readonly queryExecutionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The query execution role used by Lake Formation and Glue for Athena queries.

---


### Blueprint <a name="Blueprint" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint"></a>

An environment blueprint configuration for an AWS SageMaker Unified Studio domain.

Activates a specific blueprint capability (e.g. Tooling, DataLake) on a domain
by creating a `CfnEnvironmentBlueprintConfiguration`.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/supported-blueprints.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/supported-blueprints.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.Initializer"></a>

```typescript
import { Blueprint } from '@tonesingleton/cdk-sagemaker-unified-studio'

new Blueprint(scope: Construct, id: string, props: BlueprintProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps">BlueprintProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps">BlueprintProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.isConstruct"></a>

```typescript
import { Blueprint } from '@tonesingleton/cdk-sagemaker-unified-studio'

Blueprint.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.property.configuration">configuration</a></code> | <code>aws-cdk-lib.aws_datazone.CfnEnvironmentBlueprintConfiguration</code> | The underlying CloudFormation configuration (used by Domain for policy grants). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.property.environmentBlueprintId">environmentBlueprintId</a></code> | <code>string</code> | The resolved environment blueprint ID. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `configuration`<sup>Required</sup> <a name="configuration" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.property.configuration"></a>

```typescript
public readonly configuration: CfnEnvironmentBlueprintConfiguration;
```

- *Type:* aws-cdk-lib.aws_datazone.CfnEnvironmentBlueprintConfiguration

The underlying CloudFormation configuration (used by Domain for policy grants).

---

##### `environmentBlueprintId`<sup>Required</sup> <a name="environmentBlueprintId" id="@tonesingleton/cdk-sagemaker-unified-studio.Blueprint.property.environmentBlueprintId"></a>

```typescript
public readonly environmentBlueprintId: string;
```

- *Type:* string

The resolved environment blueprint ID.

---


### Connection <a name="Connection" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IConnection">IConnection</a>

In Amazon SageMaker Unified Studio, a connection enables you to connect your resources (domains, projects, and environments) to external resources and services.

Connections allow you to connect to your data and compute resources including both
AWS resources as well as third-party data sources. A connection requires a credential
which can either be an IAM role or a secret (e.g. username and password).

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.Initializer"></a>

```typescript
import { Connection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new Connection(scope: Construct, id: string, props: ConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Connection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Connection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Connection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps">ConnectionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps">ConnectionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Connection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Connection.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Connection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.isConstruct"></a>

```typescript
import { Connection } from '@tonesingleton/cdk-sagemaker-unified-studio'

Connection.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Connection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Connection.property.connectionId">connectionId</a></code> | <code>string</code> | The connection ID. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `connectionId`<sup>Required</sup> <a name="connectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.Connection.property.connectionId"></a>

```typescript
public readonly connectionId: string;
```

- *Type:* string

The connection ID.

---


### DataSource <a name="DataSource" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDataSource">IDataSource</a>

A SageMaker Unified Studio data source that registers Glue or Redshift databases as governed assets within a domain project.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/manage-data-sources.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/manage-data-sources.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.Initializer"></a>

```typescript
import { DataSource } from '@tonesingleton/cdk-sagemaker-unified-studio'

new DataSource(scope: Construct, id: string, props: DataSourceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSource.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSource.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSource.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps">DataSourceProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps">DataSourceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSource.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSource.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSource.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.isConstruct"></a>

```typescript
import { DataSource } from '@tonesingleton/cdk-sagemaker-unified-studio'

DataSource.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSource.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSource.property.dataSourceId">dataSourceId</a></code> | <code>string</code> | The data source ID. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `dataSourceId`<sup>Required</sup> <a name="dataSourceId" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSource.property.dataSourceId"></a>

```typescript
public readonly dataSourceId: string;
```

- *Type:* string

The data source ID.

---


### Domain <a name="Domain" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain"></a>

An AWS SageMaker Unified Studio domain with its associated IAM roles, domain units, and blueprint configurations.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/create-domain.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/create-domain.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.Initializer"></a>

```typescript
import { Domain } from '@tonesingleton/cdk-sagemaker-unified-studio'

new Domain(scope: Construct, id: string, props: DomainProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps">DomainProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps">DomainProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.topologicalSort">topologicalSort</a></code> | Sort domain units topologically so that parents are created before children. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.isConstruct"></a>

```typescript
import { Domain } from '@tonesingleton/cdk-sagemaker-unified-studio'

Domain.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `topologicalSort` <a name="topologicalSort" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.topologicalSort"></a>

```typescript
import { Domain } from '@tonesingleton/cdk-sagemaker-unified-studio'

Domain.topologicalSort(domainUnits: DomainUnitConfig[])
```

Sort domain units topologically so that parents are created before children.

###### `domainUnits`<sup>Required</sup> <a name="domainUnits" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.topologicalSort.parameter.domainUnits"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig">DomainUnitConfig</a>[]

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.accessLogsBucket">accessLogsBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket used for access logs. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.blueprintPolicyGrants">blueprintPolicyGrants</a></code> | <code>aws-cdk-lib.aws_datazone.CfnPolicyGrant[]</code> | Policy grants that authorize blueprint usage. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.blueprints">blueprints</a></code> | <code>{[ key: string ]: <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint">Blueprint</a>}</code> | Map of blueprint identifier to its Blueprint construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.domainArn">domainArn</a></code> | <code>string</code> | The domain ARN. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.domainExecutionRole">domainExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The domain execution role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.domainId">domainId</a></code> | <code>string</code> | The domain ID (e.g. `dzd-abc123`). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.domainUnits">domainUnits</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_datazone.CfnDomainUnit}</code> | Map of domain unit name to its CloudFormation resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.manageAccessRole">manageAccessRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The manage access role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.projectsBucket">projectsBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket used for project files. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.rootDomainUnitId">rootDomainUnitId</a></code> | <code>string</code> | The root domain unit ID. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `accessLogsBucket`<sup>Required</sup> <a name="accessLogsBucket" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.accessLogsBucket"></a>

```typescript
public readonly accessLogsBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket used for access logs.

---

##### `blueprintPolicyGrants`<sup>Required</sup> <a name="blueprintPolicyGrants" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.blueprintPolicyGrants"></a>

```typescript
public readonly blueprintPolicyGrants: CfnPolicyGrant[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnPolicyGrant[]

Policy grants that authorize blueprint usage.

Downstream resources
(e.g. projects) should depend on these to ensure correct ordering.

---

##### `blueprints`<sup>Required</sup> <a name="blueprints" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.blueprints"></a>

```typescript
public readonly blueprints: {[ key: string ]: Blueprint};
```

- *Type:* {[ key: string ]: <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint">Blueprint</a>}

Map of blueprint identifier to its Blueprint construct.

---

##### `domainArn`<sup>Required</sup> <a name="domainArn" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.domainArn"></a>

```typescript
public readonly domainArn: string;
```

- *Type:* string

The domain ARN.

---

##### `domainExecutionRole`<sup>Required</sup> <a name="domainExecutionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.domainExecutionRole"></a>

```typescript
public readonly domainExecutionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The domain execution role.

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The domain ID (e.g. `dzd-abc123`).

---

##### `domainUnits`<sup>Required</sup> <a name="domainUnits" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.domainUnits"></a>

```typescript
public readonly domainUnits: {[ key: string ]: CfnDomainUnit};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_datazone.CfnDomainUnit}

Map of domain unit name to its CloudFormation resource.

---

##### `manageAccessRole`<sup>Required</sup> <a name="manageAccessRole" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.manageAccessRole"></a>

```typescript
public readonly manageAccessRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The manage access role.

---

##### `projectsBucket`<sup>Required</sup> <a name="projectsBucket" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.projectsBucket"></a>

```typescript
public readonly projectsBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket used for project files.

---

##### `rootDomainUnitId`<sup>Required</sup> <a name="rootDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.rootDomainUnitId"></a>

```typescript
public readonly rootDomainUnitId: string;
```

- *Type:* string

The root domain unit ID.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.ALLOWED_BUCKET_PREFIXES">ALLOWED_BUCKET_PREFIXES</a></code> | <code>string[]</code> | Allowed S3 bucket name prefixes for SageMaker Unified Studio. |

---

##### `ALLOWED_BUCKET_PREFIXES`<sup>Required</sup> <a name="ALLOWED_BUCKET_PREFIXES" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.property.ALLOWED_BUCKET_PREFIXES"></a>

```typescript
public readonly ALLOWED_BUCKET_PREFIXES: string[];
```

- *Type:* string[]

Allowed S3 bucket name prefixes for SageMaker Unified Studio.

The `SageMakerStudioProjectProvisioningRolePolicy` scopes S3 actions to
buckets whose names start with one of these prefixes.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/configure-account-roles.html)

---

### Environment <a name="Environment" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IEnvironment">IEnvironment</a>

A SageMaker Unified Studio environment within a project.

Environments provide the runtime infrastructure (e.g. compute, storage)
for a project, based on the project's configured blueprints.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/environments.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/environments.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.Initializer"></a>

```typescript
import { Environment } from '@tonesingleton/cdk-sagemaker-unified-studio'

new Environment(scope: Construct, id: string, props: EnvironmentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps">EnvironmentProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps">EnvironmentProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.isConstruct"></a>

```typescript
import { Environment } from '@tonesingleton/cdk-sagemaker-unified-studio'

Environment.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment.property.environmentId">environmentId</a></code> | <code>string</code> | The environment ID. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `environmentId`<sup>Required</sup> <a name="environmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.property.environmentId"></a>

```typescript
public readonly environmentId: string;
```

- *Type:* string

The environment ID.

---


### GitConnection <a name="GitConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IGitConnection">IGitConnection</a>

A Git connection for AWS SageMaker Unified Studio.

Creates an AWS CodeConnections connection for the specified Git provider.
The connection is then available in the SageMaker Unified Studio console
for linking Git repositories to projects.

New CodeConnections are created in `PENDING` status and must be authorized
in the AWS Console before they can be used. To skip this manual step,
pass a pre-authorized `codeConnectionArn`.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/git-connections.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/git-connections.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.Initializer"></a>

```typescript
import { GitConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new GitConnection(scope: Construct, id: string, props: GitConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps">GitConnectionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps">GitConnectionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.isConstruct"></a>

```typescript
import { GitConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

GitConnection.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.property.codeConnectionArn">codeConnectionArn</a></code> | <code>string</code> | The ARN of the CodeConnections connection. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `codeConnectionArn`<sup>Required</sup> <a name="codeConnectionArn" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.property.codeConnectionArn"></a>

```typescript
public readonly codeConnectionArn: string;
```

- *Type:* string

The ARN of the CodeConnections connection.

---


### Host <a name="Host" id="@tonesingleton/cdk-sagemaker-unified-studio.Host"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IHost">IHost</a>

A CodeConnections host for a self-managed Git provider.

Required for GitHub Enterprise Server, GitLab Self-Managed, and other
providers that are not hosted on the public cloud. After deployment,
the host must be set up in the AWS Console to complete the TLS/OAuth
handshake with the Git provider.

Implemented as an `AwsCustomResource` because CloudFormation does not
support the `AWS::CodeConnections::Host` resource type in all regions.

> [https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-host-setup.html](https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-host-setup.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.Initializer"></a>

```typescript
import { Host } from '@tonesingleton/cdk-sagemaker-unified-studio'

new Host(scope: Construct, id: string, props: HostProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Host.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Host.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Host.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostProps">HostProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostProps">HostProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Host.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Host.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Host.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.isConstruct"></a>

```typescript
import { Host } from '@tonesingleton/cdk-sagemaker-unified-studio'

Host.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Host.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Host.property.hostArn">hostArn</a></code> | <code>string</code> | The ARN of the CodeConnections host. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `hostArn`<sup>Required</sup> <a name="hostArn" id="@tonesingleton/cdk-sagemaker-unified-studio.Host.property.hostArn"></a>

```typescript
public readonly hostArn: string;
```

- *Type:* string

The ARN of the CodeConnections host.

---


### Project <a name="Project" id="@tonesingleton/cdk-sagemaker-unified-studio.Project"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject">IProject</a>

A SageMaker Unified Studio project within a domain.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/projects.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/projects.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer"></a>

```typescript
import { Project } from '@tonesingleton/cdk-sagemaker-unified-studio'

new Project(scope: Construct, id: string, props: ProjectProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps">ProjectProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps">ProjectProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.isConstruct"></a>

```typescript
import { Project } from '@tonesingleton/cdk-sagemaker-unified-studio'

Project.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.projectId">projectId</a></code> | <code>string</code> | The project ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.projectExecutionRole">projectExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | The project's execution role. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `projectId`<sup>Required</sup> <a name="projectId" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.projectId"></a>

```typescript
public readonly projectId: string;
```

- *Type:* string

The project ID.

---

##### `projectExecutionRole`<sup>Optional</sup> <a name="projectExecutionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.projectExecutionRole"></a>

```typescript
public readonly projectExecutionRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

The project's execution role.

---


### ProjectProfile <a name="ProjectProfile" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProjectProfile">IProjectProfile</a>

A project profile that defines the default set of environment blueprints provisioned when a project is created.

Non-Tooling environments default to ON_DEMAND deployment mode to avoid
unnecessary costs from auto-provisioned resources.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/project-profiles.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/project-profiles.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.Initializer"></a>

```typescript
import { ProjectProfile } from '@tonesingleton/cdk-sagemaker-unified-studio'

new ProjectProfile(scope: Construct, id: string, props: ProjectProfileProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps">ProjectProfileProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps">ProjectProfileProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.isConstruct"></a>

```typescript
import { ProjectProfile } from '@tonesingleton/cdk-sagemaker-unified-studio'

ProjectProfile.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.property.projectProfileId">projectProfileId</a></code> | <code>string</code> | The project profile ID. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `projectProfileId`<sup>Required</sup> <a name="projectProfileId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.property.projectProfileId"></a>

```typescript
public readonly projectProfileId: string;
```

- *Type:* string

The project profile ID.

---


### S3Connection <a name="S3Connection" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IS3Connection">IS3Connection</a>

A SageMaker Unified Studio S3 connection that provides access to data stored in Amazon S3 from within a project.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/connecting-amazon-s3.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/connecting-amazon-s3.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer"></a>

```typescript
import { S3Connection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new S3Connection(scope: Construct, id: string, props: S3ConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps">S3ConnectionProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps">S3ConnectionProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isConstruct"></a>

```typescript
import { S3Connection } from '@tonesingleton/cdk-sagemaker-unified-studio'

S3Connection.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.connectionId">connectionId</a></code> | <code>string</code> | The connection ID. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `connectionId`<sup>Required</sup> <a name="connectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.connectionId"></a>

```typescript
public readonly connectionId: string;
```

- *Type:* string

The connection ID.

---


## Structs <a name="Structs" id="Structs"></a>

### AccountRolesProps <a name="AccountRolesProps" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRolesProps"></a>

Properties for the AccountRoles construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRolesProps.Initializer"></a>

```typescript
import { AccountRolesProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const accountRolesProps: AccountRolesProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRolesProps.property.kmsKeyArn">kmsKeyArn</a></code> | <code>string</code> | The ARN of the KMS key used by the execution role for encrypting and decrypting data within SageMaker Unified Studio projects. |

---

##### `kmsKeyArn`<sup>Required</sup> <a name="kmsKeyArn" id="@tonesingleton/cdk-sagemaker-unified-studio.AccountRolesProps.property.kmsKeyArn"></a>

```typescript
public readonly kmsKeyArn: string;
```

- *Type:* string

The ARN of the KMS key used by the execution role for encrypting and decrypting data within SageMaker Unified Studio projects.

---

### AthenaProperties <a name="AthenaProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties"></a>

Athena-specific connection properties for federated query spill configuration.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties.Initializer"></a>

```typescript
import { AthenaProperties } from '@tonesingleton/cdk-sagemaker-unified-studio'

const athenaProperties: AthenaProperties = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties.property.spillBucket">spillBucket</a></code> | <code>string</code> | The S3 bucket name for Athena federated query spill storage. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties.property.spillPrefix">spillPrefix</a></code> | <code>string</code> | The S3 key prefix for Athena federated query spill storage. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties.property.instanceType">instanceType</a></code> | <code>string</code> | The instance type for the Athena Lambda function. |

---

##### `spillBucket`<sup>Required</sup> <a name="spillBucket" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties.property.spillBucket"></a>

```typescript
public readonly spillBucket: string;
```

- *Type:* string

The S3 bucket name for Athena federated query spill storage.

---

##### `spillPrefix`<sup>Required</sup> <a name="spillPrefix" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties.property.spillPrefix"></a>

```typescript
public readonly spillPrefix: string;
```

- *Type:* string

The S3 key prefix for Athena federated query spill storage.

---

##### `instanceType`<sup>Optional</sup> <a name="instanceType" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties.property.instanceType"></a>

```typescript
public readonly instanceType: string;
```

- *Type:* string
- *Default:* default instance type

The instance type for the Athena Lambda function.

---

### BlueprintProps <a name="BlueprintProps" id="@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps"></a>

Properties for a Blueprint construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.Initializer"></a>

```typescript
import { BlueprintProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const blueprintProps: BlueprintProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.domainId">domainId</a></code> | <code>string</code> | The SageMaker Unified Studio domain ID this blueprint belongs to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.identifier">identifier</a></code> | <code>string</code> | The blueprint type to activate. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.manageAccessRoleArn">manageAccessRoleArn</a></code> | <code>string</code> | ARN of the domain-specific manage access role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.provisioningRoleArn">provisioningRoleArn</a></code> | <code>string</code> | ARN of the account-level provisioning role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.enabledRegions">enabledRegions</a></code> | <code>string[]</code> | AWS regions where this blueprint is available. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.regionalParameters">regionalParameters</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RegionalParameter">RegionalParameter</a>[]</code> | Per-region parameters (e.g. S3Location, VpcId, Subnets for the Tooling blueprint). |

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The SageMaker Unified Studio domain ID this blueprint belongs to.

---

##### `identifier`<sup>Required</sup> <a name="identifier" id="@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.identifier"></a>

```typescript
public readonly identifier: string;
```

- *Type:* string

The blueprint type to activate.

Use a `ManagedBlueprintIdentifier` constant for known blueprints,
or pass a custom identifier string.

---

*Example*

```typescript
ManagedBlueprintIdentifier.TOOLING
```


##### `manageAccessRoleArn`<sup>Required</sup> <a name="manageAccessRoleArn" id="@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.manageAccessRoleArn"></a>

```typescript
public readonly manageAccessRoleArn: string;
```

- *Type:* string

ARN of the domain-specific manage access role.

---

##### `provisioningRoleArn`<sup>Required</sup> <a name="provisioningRoleArn" id="@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.provisioningRoleArn"></a>

```typescript
public readonly provisioningRoleArn: string;
```

- *Type:* string

ARN of the account-level provisioning role.

---

##### `enabledRegions`<sup>Optional</sup> <a name="enabledRegions" id="@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.enabledRegions"></a>

```typescript
public readonly enabledRegions: string[];
```

- *Type:* string[]
- *Default:* [Stack.of(this).region]

AWS regions where this blueprint is available.

---

##### `regionalParameters`<sup>Optional</sup> <a name="regionalParameters" id="@tonesingleton/cdk-sagemaker-unified-studio.BlueprintProps.property.regionalParameters"></a>

```typescript
public readonly regionalParameters: RegionalParameter[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RegionalParameter">RegionalParameter</a>[]
- *Default:* no regional parameters

Per-region parameters (e.g. S3Location, VpcId, Subnets for the Tooling blueprint).

---

### ConnectionAuthenticationConfiguration <a name="ConnectionAuthenticationConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration"></a>

Authentication configuration for a connection.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration.Initializer"></a>

```typescript
import { ConnectionAuthenticationConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const connectionAuthenticationConfiguration: ConnectionAuthenticationConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration.property.authenticationType">authenticationType</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationType">ConnectionAuthenticationType</a></code> | The authentication type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration.property.customAuthenticationCredentials">customAuthenticationCredentials</a></code> | <code>{[ key: string ]: string}</code> | Custom authentication credentials as key-value pairs. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration.property.kmsKeyArn">kmsKeyArn</a></code> | <code>string</code> | The ARN of the KMS key used to encrypt the secret. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration.property.secretArn">secretArn</a></code> | <code>string</code> | The ARN of the Secrets Manager secret containing credentials. |

---

##### `authenticationType`<sup>Optional</sup> <a name="authenticationType" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration.property.authenticationType"></a>

```typescript
public readonly authenticationType: ConnectionAuthenticationType;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationType">ConnectionAuthenticationType</a>
- *Default:* no authentication type

The authentication type.

---

##### `customAuthenticationCredentials`<sup>Optional</sup> <a name="customAuthenticationCredentials" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration.property.customAuthenticationCredentials"></a>

```typescript
public readonly customAuthenticationCredentials: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no custom credentials

Custom authentication credentials as key-value pairs.

Used when authenticationType is CUSTOM.

---

##### `kmsKeyArn`<sup>Optional</sup> <a name="kmsKeyArn" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration.property.kmsKeyArn"></a>

```typescript
public readonly kmsKeyArn: string;
```

- *Type:* string
- *Default:* no KMS key

The ARN of the KMS key used to encrypt the secret.

---

##### `secretArn`<sup>Optional</sup> <a name="secretArn" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string
- *Default:* no secret

The ARN of the Secrets Manager secret containing credentials.

---

### ConnectionProperties <a name="ConnectionProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties"></a>

Connection properties for relational database connections.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.Initializer"></a>

```typescript
import { ConnectionProperties } from '@tonesingleton/cdk-sagemaker-unified-studio'

const connectionProperties: ConnectionProperties = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.connectionUrl">connectionUrl</a></code> | <code>string</code> | The connection URL for MONGODB or MARKETPLACE connections. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.connectorClassName">connectorClassName</a></code> | <code>string</code> | The connector class name for MARKETPLACE/CUSTOM connections. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.connectorType">connectorType</a></code> | <code>string</code> | The connector type for MARKETPLACE/CUSTOM connections. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.connectorUrl">connectorUrl</a></code> | <code>string</code> | The connector URL for MARKETPLACE/CUSTOM connections. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.database">database</a></code> | <code>string</code> | The database name or service name. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.host">host</a></code> | <code>string</code> | The hostname of the database server. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.jdbcConnectionUrl">jdbcConnectionUrl</a></code> | <code>string</code> | The JDBC connection URL. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.jdbcEnforceSsl">jdbcEnforceSsl</a></code> | <code>string</code> | Whether to enforce SSL for JDBC connections. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.jdbcEngine">jdbcEngine</a></code> | <code>string</code> | The JDBC database engine (e.g. oracle, mysql, postgresql, sqlserver). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.kafkaBootstrapServers">kafkaBootstrapServers</a></code> | <code>string</code> | Kafka bootstrap servers. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.kafkaSslEnabled">kafkaSslEnabled</a></code> | <code>string</code> | Whether SSL is enabled for Kafka. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.port">port</a></code> | <code>string</code> | The port number of the database server. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.roleArn">roleArn</a></code> | <code>string</code> | The IAM role ARN that Glue uses to access the secret. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.secretId">secretId</a></code> | <code>string</code> | The secret ID containing credentials. |

---

##### `connectionUrl`<sup>Optional</sup> <a name="connectionUrl" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.connectionUrl"></a>

```typescript
public readonly connectionUrl: string;
```

- *Type:* string
- *Default:* no connection URL

The connection URL for MONGODB or MARKETPLACE connections.

---

##### `connectorClassName`<sup>Optional</sup> <a name="connectorClassName" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.connectorClassName"></a>

```typescript
public readonly connectorClassName: string;
```

- *Type:* string
- *Default:* no connector class name

The connector class name for MARKETPLACE/CUSTOM connections.

---

##### `connectorType`<sup>Optional</sup> <a name="connectorType" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.connectorType"></a>

```typescript
public readonly connectorType: string;
```

- *Type:* string
- *Default:* no connector type

The connector type for MARKETPLACE/CUSTOM connections.

---

##### `connectorUrl`<sup>Optional</sup> <a name="connectorUrl" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.connectorUrl"></a>

```typescript
public readonly connectorUrl: string;
```

- *Type:* string
- *Default:* no connector URL

The connector URL for MARKETPLACE/CUSTOM connections.

---

##### `database`<sup>Optional</sup> <a name="database" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.database"></a>

```typescript
public readonly database: string;
```

- *Type:* string
- *Default:* no database

The database name or service name.

---

##### `host`<sup>Optional</sup> <a name="host" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.host"></a>

```typescript
public readonly host: string;
```

- *Type:* string
- *Default:* no host

The hostname of the database server.

---

##### `jdbcConnectionUrl`<sup>Optional</sup> <a name="jdbcConnectionUrl" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.jdbcConnectionUrl"></a>

```typescript
public readonly jdbcConnectionUrl: string;
```

- *Type:* string
- *Default:* no JDBC connection URL

The JDBC connection URL.

Use this as an alternative to host/port/database.

---

##### `jdbcEnforceSsl`<sup>Optional</sup> <a name="jdbcEnforceSsl" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.jdbcEnforceSsl"></a>

```typescript
public readonly jdbcEnforceSsl: string;
```

- *Type:* string
- *Default:* no SSL enforcement

Whether to enforce SSL for JDBC connections.

---

##### `jdbcEngine`<sup>Optional</sup> <a name="jdbcEngine" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.jdbcEngine"></a>

```typescript
public readonly jdbcEngine: string;
```

- *Type:* string
- *Default:* no JDBC engine

The JDBC database engine (e.g. oracle, mysql, postgresql, sqlserver).

---

##### `kafkaBootstrapServers`<sup>Optional</sup> <a name="kafkaBootstrapServers" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.kafkaBootstrapServers"></a>

```typescript
public readonly kafkaBootstrapServers: string;
```

- *Type:* string
- *Default:* no Kafka bootstrap servers

Kafka bootstrap servers.

---

##### `kafkaSslEnabled`<sup>Optional</sup> <a name="kafkaSslEnabled" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.kafkaSslEnabled"></a>

```typescript
public readonly kafkaSslEnabled: string;
```

- *Type:* string
- *Default:* no Kafka SSL

Whether SSL is enabled for Kafka.

---

##### `port`<sup>Optional</sup> <a name="port" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.port"></a>

```typescript
public readonly port: string;
```

- *Type:* string
- *Default:* no port

The port number of the database server.

---

##### `roleArn`<sup>Optional</sup> <a name="roleArn" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* string
- *Default:* no role ARN

The IAM role ARN that Glue uses to access the secret.

---

##### `secretId`<sup>Optional</sup> <a name="secretId" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties.property.secretId"></a>

```typescript
public readonly secretId: string;
```

- *Type:* string
- *Default:* no secret ID

The secret ID containing credentials.

Alternative to providing username/password directly.

---

### ConnectionProps <a name="ConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps"></a>

Properties for a Connection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.Initializer"></a>

```typescript
import { ConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const connectionProps: ConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.connectionType">connectionType</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType">ConnectionType</a></code> | The connection type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.domainId">domainId</a></code> | <code>string</code> | The SageMaker Unified Studio domain ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.environmentId">environmentId</a></code> | <code>string</code> | The environment ID where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.name">name</a></code> | <code>string</code> | Display name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.athenaProperties">athenaProperties</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties">AthenaProperties</a></code> | Connection properties specific to the Athena compute environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.authenticationConfiguration">authenticationConfiguration</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration">ConnectionAuthenticationConfiguration</a></code> | Authentication configuration. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.connectionProperties">connectionProperties</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties">ConnectionProperties</a></code> | Connection properties such as host, port, database, jdbcConnectionUrl. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.matchCriteria">matchCriteria</a></code> | <code>string</code> | A list of criteria that can be used in selecting this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.physicalConnectionRequirements">physicalConnectionRequirements</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements">PhysicalConnectionRequirements</a></code> | Physical connection requirements (VPC, subnet, security groups). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.projectId">projectId</a></code> | <code>string</code> | The project ID that owns this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.pythonProperties">pythonProperties</a></code> | <code>{[ key: string ]: string}</code> | Connection properties specific to the Python compute environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.sparkProperties">sparkProperties</a></code> | <code>{[ key: string ]: string}</code> | Connection properties specific to the Spark compute environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.validateCredentials">validateCredentials</a></code> | <code>boolean</code> | Whether to validate credentials on creation. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.validateForComputeEnvironments">validateForComputeEnvironments</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ComputeEnvironment">ComputeEnvironment</a>[]</code> | Compute environments to validate the connection for. |

---

##### `connectionType`<sup>Required</sup> <a name="connectionType" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.connectionType"></a>

```typescript
public readonly connectionType: ConnectionType;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType">ConnectionType</a>

The connection type.

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The SageMaker Unified Studio domain ID.

---

##### `environmentId`<sup>Required</sup> <a name="environmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.environmentId"></a>

```typescript
public readonly environmentId: string;
```

- *Type:* string

The environment ID where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the connection.

---

##### `athenaProperties`<sup>Optional</sup> <a name="athenaProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.athenaProperties"></a>

```typescript
public readonly athenaProperties: AthenaProperties;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaProperties">AthenaProperties</a>
- *Default:* no Athena properties

Connection properties specific to the Athena compute environment.

---

##### `authenticationConfiguration`<sup>Optional</sup> <a name="authenticationConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.authenticationConfiguration"></a>

```typescript
public readonly authenticationConfiguration: ConnectionAuthenticationConfiguration;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationConfiguration">ConnectionAuthenticationConfiguration</a>
- *Default:* no authentication configuration

Authentication configuration.

---

##### `connectionProperties`<sup>Optional</sup> <a name="connectionProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.connectionProperties"></a>

```typescript
public readonly connectionProperties: ConnectionProperties;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProperties">ConnectionProperties</a>
- *Default:* no connection properties

Connection properties such as host, port, database, jdbcConnectionUrl.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the connection.

---

##### `matchCriteria`<sup>Optional</sup> <a name="matchCriteria" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.matchCriteria"></a>

```typescript
public readonly matchCriteria: string;
```

- *Type:* string
- *Default:* no match criteria

A list of criteria that can be used in selecting this connection.

---

##### `physicalConnectionRequirements`<sup>Optional</sup> <a name="physicalConnectionRequirements" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.physicalConnectionRequirements"></a>

```typescript
public readonly physicalConnectionRequirements: PhysicalConnectionRequirements;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements">PhysicalConnectionRequirements</a>
- *Default:* no physical connection requirements

Physical connection requirements (VPC, subnet, security groups).

---

##### `projectId`<sup>Optional</sup> <a name="projectId" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.projectId"></a>

```typescript
public readonly projectId: string;
```

- *Type:* string
- *Default:* derived from the environment

The project ID that owns this connection.

---

##### `pythonProperties`<sup>Optional</sup> <a name="pythonProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.pythonProperties"></a>

```typescript
public readonly pythonProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no Python properties

Connection properties specific to the Python compute environment.

---

##### `sparkProperties`<sup>Optional</sup> <a name="sparkProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.sparkProperties"></a>

```typescript
public readonly sparkProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no Spark properties

Connection properties specific to the Spark compute environment.

---

##### `validateCredentials`<sup>Optional</sup> <a name="validateCredentials" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.validateCredentials"></a>

```typescript
public readonly validateCredentials: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to validate credentials on creation.

---

##### `validateForComputeEnvironments`<sup>Optional</sup> <a name="validateForComputeEnvironments" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.validateForComputeEnvironments"></a>

```typescript
public readonly validateForComputeEnvironments: ComputeEnvironment[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ComputeEnvironment">ComputeEnvironment</a>[]
- *Default:* no validation

Compute environments to validate the connection for.

---

### DataSourceProps <a name="DataSourceProps" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps"></a>

Properties for a DataSource construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.Initializer"></a>

```typescript
import { DataSourceProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const dataSourceProps: DataSourceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.connectionId">connectionId</a></code> | <code>string</code> | The connection ID for the data source connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.domainId">domainId</a></code> | <code>string</code> | The SageMaker Unified Studio domain ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.name">name</a></code> | <code>string</code> | Display name of the data source. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.projectId">projectId</a></code> | <code>string</code> | The project ID that owns this data source. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.enabled">enabled</a></code> | <code>boolean</code> | Whether the data source is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.glueConfiguration">glueConfiguration</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueDataSourceConfiguration">GlueDataSourceConfiguration</a></code> | The Glue data source configuration. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.publishOnImport">publishOnImport</a></code> | <code>boolean</code> | Whether to automatically publish imported assets. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.redshiftConfiguration">redshiftConfiguration</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration">RedshiftDataSourceConfiguration</a></code> | The Redshift data source configuration. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.schedule">schedule</a></code> | <code>string</code> | A cron expression for the data source run schedule. |

---

##### `connectionId`<sup>Required</sup> <a name="connectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.connectionId"></a>

```typescript
public readonly connectionId: string;
```

- *Type:* string

The connection ID for the data source connection.

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The SageMaker Unified Studio domain ID.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the data source.

---

##### `projectId`<sup>Required</sup> <a name="projectId" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.projectId"></a>

```typescript
public readonly projectId: string;
```

- *Type:* string

The project ID that owns this data source.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* true

Whether the data source is enabled.

---

##### `glueConfiguration`<sup>Optional</sup> <a name="glueConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.glueConfiguration"></a>

```typescript
public readonly glueConfiguration: GlueDataSourceConfiguration;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueDataSourceConfiguration">GlueDataSourceConfiguration</a>
- *Default:* no Glue configuration (must specify `redshiftConfiguration` instead)

The Glue data source configuration.

Mutually exclusive with `redshiftConfiguration`.

---

##### `publishOnImport`<sup>Optional</sup> <a name="publishOnImport" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.publishOnImport"></a>

```typescript
public readonly publishOnImport: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to automatically publish imported assets.

---

##### `redshiftConfiguration`<sup>Optional</sup> <a name="redshiftConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.redshiftConfiguration"></a>

```typescript
public readonly redshiftConfiguration: RedshiftDataSourceConfiguration;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration">RedshiftDataSourceConfiguration</a>
- *Default:* no Redshift configuration (must specify `glueConfiguration` instead)

The Redshift data source configuration.

Mutually exclusive with `glueConfiguration`.

---

##### `schedule`<sup>Optional</sup> <a name="schedule" id="@tonesingleton/cdk-sagemaker-unified-studio.DataSourceProps.property.schedule"></a>

```typescript
public readonly schedule: string;
```

- *Type:* string
- *Default:* no schedule (manual runs only)

A cron expression for the data source run schedule.

---

### DomainProps <a name="DomainProps" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps"></a>

Properties for the Domain construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.Initializer"></a>

```typescript
import { DomainProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const domainProps: DomainProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.name">name</a></code> | <code>string</code> | Display name of the domain. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.provisioningRoleArn">provisioningRoleArn</a></code> | <code>string</code> | ARN of the account-level provisioning role for blueprint configurations. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.subnetIds">subnetIds</a></code> | <code>string[]</code> | Private subnet IDs for the Tooling blueprint's SageMaker domain. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.vpcId">vpcId</a></code> | <code>string</code> | VPC ID for the Tooling blueprint's SageMaker domain. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.accessLogsBucketName">accessLogsBucketName</a></code> | <code>string</code> | Name for the access logs S3 bucket. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.additionalBlueprintIdentifiers">additionalBlueprintIdentifiers</a></code> | <code>string[]</code> | Additional blueprint identifiers to activate beyond Tooling (which is always included). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.assumeRoleArns">assumeRoleArns</a></code> | <code>string[]</code> | IAM role ARNs to grant permission to assume the domain execution role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.autoDeleteObjects">autoDeleteObjects</a></code> | <code>boolean</code> | Whether to automatically delete S3 objects when the stack is destroyed. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.dataLocationGrantPrincipals">dataLocationGrantPrincipals</a></code> | <code>string[]</code> | IAM principal ARNs to grant Lake Formation DATA_LOCATION_ACCESS on the projects bucket. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the domain's purpose. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.domainUnits">domainUnits</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig">DomainUnitConfig</a>[]</code> | Domain unit configurations. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.projectsBucketName">projectsBucketName</a></code> | <code>string</code> | Name for the projects S3 bucket. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for S3 buckets created by this construct. |

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the domain.

---

##### `provisioningRoleArn`<sup>Required</sup> <a name="provisioningRoleArn" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.provisioningRoleArn"></a>

```typescript
public readonly provisioningRoleArn: string;
```

- *Type:* string

ARN of the account-level provisioning role for blueprint configurations.

Typically obtained from `AccountRoles.provisioningRole.roleArn`.

---

##### `subnetIds`<sup>Required</sup> <a name="subnetIds" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.subnetIds"></a>

```typescript
public readonly subnetIds: string[];
```

- *Type:* string[]

Private subnet IDs for the Tooling blueprint's SageMaker domain.

---

##### `vpcId`<sup>Required</sup> <a name="vpcId" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.vpcId"></a>

```typescript
public readonly vpcId: string;
```

- *Type:* string

VPC ID for the Tooling blueprint's SageMaker domain.

---

##### `accessLogsBucketName`<sup>Optional</sup> <a name="accessLogsBucketName" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.accessLogsBucketName"></a>

```typescript
public readonly accessLogsBucketName: string;
```

- *Type:* string
- *Default:* `sagemaker-logs-{account}-{region}-{domainId}`

Name for the access logs S3 bucket.

---

##### `additionalBlueprintIdentifiers`<sup>Optional</sup> <a name="additionalBlueprintIdentifiers" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.additionalBlueprintIdentifiers"></a>

```typescript
public readonly additionalBlueprintIdentifiers: string[];
```

- *Type:* string[]
- *Default:* only Tooling

Additional blueprint identifiers to activate beyond Tooling (which is always included).

Use `ManagedBlueprintIdentifier` constants or custom strings.

---

##### `assumeRoleArns`<sup>Optional</sup> <a name="assumeRoleArns" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.assumeRoleArns"></a>

```typescript
public readonly assumeRoleArns: string[];
```

- *Type:* string[]
- *Default:* no additional roles

IAM role ARNs to grant permission to assume the domain execution role.

These are the roles your users federate into (e.g. SSO permission set roles).

---

##### `autoDeleteObjects`<sup>Optional</sup> <a name="autoDeleteObjects" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.autoDeleteObjects"></a>

```typescript
public readonly autoDeleteObjects: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to automatically delete S3 objects when the stack is destroyed.

Requires `removalPolicy` to be set to `RemovalPolicy.DESTROY`.

---

##### `dataLocationGrantPrincipals`<sup>Optional</sup> <a name="dataLocationGrantPrincipals" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.dataLocationGrantPrincipals"></a>

```typescript
public readonly dataLocationGrantPrincipals: string[];
```

- *Type:* string[]
- *Default:* no grants

IAM principal ARNs to grant Lake Formation DATA_LOCATION_ACCESS on the projects bucket.

The grant is performed by the manage access role (which
is a Lake Formation admin) via a custom resource Lambda.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the domain's purpose.

---

##### `domainUnits`<sup>Optional</sup> <a name="domainUnits" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.domainUnits"></a>

```typescript
public readonly domainUnits: DomainUnitConfig[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig">DomainUnitConfig</a>[]
- *Default:* no domain units

Domain unit configurations.

Automatically sorted topologically so
parents are always created before their children.

---

##### `projectsBucketName`<sup>Optional</sup> <a name="projectsBucketName" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.projectsBucketName"></a>

```typescript
public readonly projectsBucketName: string;
```

- *Type:* string
- *Default:* `amazon-sagemaker-{account}-{region}-{domainId}`

Name for the projects S3 bucket.

Must start with one of the allowed prefixes defined in `ALLOWED_BUCKET_PREFIXES`
(e.g. `amazon-sagemaker-`).

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* RemovalPolicy.RETAIN

Removal policy for S3 buckets created by this construct.

---

### DomainUnitConfig <a name="DomainUnitConfig" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig"></a>

Configuration for a domain unit within a SageMaker Unified Studio domain.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig.Initializer"></a>

```typescript
import { DomainUnitConfig } from '@tonesingleton/cdk-sagemaker-unified-studio'

const domainUnitConfig: DomainUnitConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig.property.name">name</a></code> | <code>string</code> | Display name of the domain unit. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig.property.description">description</a></code> | <code>string</code> | Description of the domain unit. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig.property.parentDomainUnitName">parentDomainUnitName</a></code> | <code>string</code> | Name of the parent domain unit (must match another unit's `name`). |

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the domain unit.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Description of the domain unit.

---

##### `parentDomainUnitName`<sup>Optional</sup> <a name="parentDomainUnitName" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig.property.parentDomainUnitName"></a>

```typescript
public readonly parentDomainUnitName: string;
```

- *Type:* string
- *Default:* root domain unit

Name of the parent domain unit (must match another unit's `name`).

---

### EnvironmentConfiguration <a name="EnvironmentConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration"></a>

An environment configuration within a project profile.

Defines which blueprint is provisioned, in which account and region,
and in what order when a project is created from this profile.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.Initializer"></a>

```typescript
import { EnvironmentConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const environmentConfiguration: EnvironmentConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.environmentBlueprintId">environmentBlueprintId</a></code> | <code>string</code> | The environment blueprint ID to provision. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.name">name</a></code> | <code>string</code> | Display name of the environment configuration. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.accountId">accountId</a></code> | <code>string</code> | AWS account ID where the environment is deployed. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.deploymentMode">deploymentMode</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DeploymentMode">DeploymentMode</a></code> | Deployment mode for the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.deploymentOrder">deploymentOrder</a></code> | <code>number</code> | Deployment order for this environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.description">description</a></code> | <code>string</code> | Human-readable description of the environment configuration. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.parameters">parameters</a></code> | <code>{[ key: string ]: string}</code> | Configuration parameters for the environment (key-value pairs). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.region">region</a></code> | <code>string</code> | AWS region where the environment is deployed. |

---

##### `environmentBlueprintId`<sup>Required</sup> <a name="environmentBlueprintId" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.environmentBlueprintId"></a>

```typescript
public readonly environmentBlueprintId: string;
```

- *Type:* string

The environment blueprint ID to provision.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the environment configuration.

---

##### `accountId`<sup>Optional</sup> <a name="accountId" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.accountId"></a>

```typescript
public readonly accountId: string;
```

- *Type:* string
- *Default:* Stack.of(this).account

AWS account ID where the environment is deployed.

---

##### `deploymentMode`<sup>Optional</sup> <a name="deploymentMode" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.deploymentMode"></a>

```typescript
public readonly deploymentMode: DeploymentMode;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DeploymentMode">DeploymentMode</a>
- *Default:* DeploymentMode.ON_DEMAND for non-Tooling blueprints, service default for Tooling

Deployment mode for the environment.

---

##### `deploymentOrder`<sup>Optional</sup> <a name="deploymentOrder" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.deploymentOrder"></a>

```typescript
public readonly deploymentOrder: number;
```

- *Type:* number
- *Default:* no explicit ordering

Deployment order for this environment.

Lower numbers deploy first.
Environments with the same order deploy in parallel.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the environment configuration.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no parameters

Configuration parameters for the environment (key-value pairs).

These are passed as parameter overrides to the blueprint.

---

##### `region`<sup>Optional</sup> <a name="region" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string
- *Default:* Stack.of(this).region

AWS region where the environment is deployed.

---

### EnvironmentParameter <a name="EnvironmentParameter" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameter"></a>

A user parameter for an environment.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameter.Initializer"></a>

```typescript
import { EnvironmentParameter } from '@tonesingleton/cdk-sagemaker-unified-studio'

const environmentParameter: EnvironmentParameter = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameter.property.name">name</a></code> | <code>string</code> | The parameter name. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameter.property.value">value</a></code> | <code>string</code> | The parameter value. |

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameter.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The parameter name.

---

##### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameter.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

The parameter value.

---

### EnvironmentParameterValue <a name="EnvironmentParameterValue" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue"></a>

A key-value parameter for an environment.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue.Initializer"></a>

```typescript
import { EnvironmentParameterValue } from '@tonesingleton/cdk-sagemaker-unified-studio'

const environmentParameterValue: EnvironmentParameterValue = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue.property.name">name</a></code> | <code>string</code> | The parameter name. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue.property.value">value</a></code> | <code>string</code> | The parameter value. |

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The parameter name.

---

##### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

The parameter value.

---

### EnvironmentProps <a name="EnvironmentProps" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps"></a>

Properties for an Environment construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.Initializer"></a>

```typescript
import { EnvironmentProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const environmentProps: EnvironmentProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.domainId">domainId</a></code> | <code>string</code> | The SageMaker Unified Studio domain ID this environment belongs to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.name">name</a></code> | <code>string</code> | Display name of the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.projectId">projectId</a></code> | <code>string</code> | The project ID this environment is associated with. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the environment's purpose. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.environmentBlueprintId">environmentBlueprintId</a></code> | <code>string</code> | The environment blueprint identifier to provision. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.environmentConfigurationId">environmentConfigurationId</a></code> | <code>string</code> | The environment configuration ID from the project profile. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.glossaryTerms">glossaryTerms</a></code> | <code>string[]</code> | Glossary terms to tag the environment with. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.userParameters">userParameters</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameter">EnvironmentParameter</a>[]</code> | User parameters for the environment (key-value pairs passed to the blueprint). |

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The SageMaker Unified Studio domain ID this environment belongs to.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the environment.

---

##### `projectId`<sup>Required</sup> <a name="projectId" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.projectId"></a>

```typescript
public readonly projectId: string;
```

- *Type:* string

The project ID this environment is associated with.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the environment's purpose.

---

##### `environmentBlueprintId`<sup>Optional</sup> <a name="environmentBlueprintId" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.environmentBlueprintId"></a>

```typescript
public readonly environmentBlueprintId: string;
```

- *Type:* string
- *Default:* no blueprint (basic environment)

The environment blueprint identifier to provision.

---

##### `environmentConfigurationId`<sup>Optional</sup> <a name="environmentConfigurationId" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.environmentConfigurationId"></a>

```typescript
public readonly environmentConfigurationId: string;
```

- *Type:* string
- *Default:* no configuration ID

The environment configuration ID from the project profile.

Use this to create environments matching a specific project profile configuration.

---

##### `glossaryTerms`<sup>Optional</sup> <a name="glossaryTerms" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.glossaryTerms"></a>

```typescript
public readonly glossaryTerms: string[];
```

- *Type:* string[]
- *Default:* no glossary terms

Glossary terms to tag the environment with.

Each term must match `^[a-zA-Z0-9_-]{1,36}$`.

---

##### `userParameters`<sup>Optional</sup> <a name="userParameters" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentProps.property.userParameters"></a>

```typescript
public readonly userParameters: EnvironmentParameter[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameter">EnvironmentParameter</a>[]
- *Default:* no user parameters

User parameters for the environment (key-value pairs passed to the blueprint).

---

### FilterExpression <a name="FilterExpression" id="@tonesingleton/cdk-sagemaker-unified-studio.FilterExpression"></a>

A filter expression for a data source.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.FilterExpression.Initializer"></a>

```typescript
import { FilterExpression } from '@tonesingleton/cdk-sagemaker-unified-studio'

const filterExpression: FilterExpression = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.FilterExpression.property.expression">expression</a></code> | <code>string</code> | The filter expression (e.g. '*' for all tables). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.FilterExpression.property.type">type</a></code> | <code>string</code> | The filter type (INCLUDE or EXCLUDE). |

---

##### `expression`<sup>Required</sup> <a name="expression" id="@tonesingleton/cdk-sagemaker-unified-studio.FilterExpression.property.expression"></a>

```typescript
public readonly expression: string;
```

- *Type:* string

The filter expression (e.g. '*' for all tables).

---

##### `type`<sup>Required</sup> <a name="type" id="@tonesingleton/cdk-sagemaker-unified-studio.FilterExpression.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

The filter type (INCLUDE or EXCLUDE).

---

### GitConnectionProps <a name="GitConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps"></a>

Properties for the GitConnection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps.Initializer"></a>

```typescript
import { GitConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const gitConnectionProps: GitConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps.property.name">name</a></code> | <code>string</code> | Display name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps.property.codeConnectionArn">codeConnectionArn</a></code> | <code>string</code> | ARN of an existing, already-authorized CodeConnection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps.property.hostArn">hostArn</a></code> | <code>string</code> | The ARN of the host for self-managed providers (e.g. GitHubEnterpriseServer, GitLabSelfManaged). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps.property.providerType">providerType</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType">GitProviderType</a></code> | The Git provider type. |

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the connection.

---

##### `codeConnectionArn`<sup>Optional</sup> <a name="codeConnectionArn" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps.property.codeConnectionArn"></a>

```typescript
public readonly codeConnectionArn: string;
```

- *Type:* string
- *Default:* a new CodeConnection is created (requires manual authorization after deployment)

ARN of an existing, already-authorized CodeConnection.

When provided, `providerType` and `hostArn` are ignored and no new
`AWS::CodeConnections::Connection` resource is created.

---

##### `hostArn`<sup>Optional</sup> <a name="hostArn" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps.property.hostArn"></a>

```typescript
public readonly hostArn: string;
```

- *Type:* string
- *Default:* not required for cloud-hosted providers

The ARN of the host for self-managed providers (e.g. GitHubEnterpriseServer, GitLabSelfManaged).

---

##### `providerType`<sup>Optional</sup> <a name="providerType" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnectionProps.property.providerType"></a>

```typescript
public readonly providerType: GitProviderType;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType">GitProviderType</a>
- *Default:* required when creating a new CodeConnection

The Git provider type.

Required when `codeConnectionArn` is not provided.

---

### GlueDataSourceConfiguration <a name="GlueDataSourceConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueDataSourceConfiguration"></a>

Glue data source configuration.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueDataSourceConfiguration.Initializer"></a>

```typescript
import { GlueDataSourceConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const glueDataSourceConfiguration: GlueDataSourceConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueDataSourceConfiguration.property.relationalFilterConfigurations">relationalFilterConfigurations</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration">RelationalFilterConfiguration</a>[]</code> | The relational filter configurations specifying which databases/tables to include. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueDataSourceConfiguration.property.autoImportDataQualityResult">autoImportDataQualityResult</a></code> | <code>boolean</code> | Whether to auto-import data quality results. |

---

##### `relationalFilterConfigurations`<sup>Required</sup> <a name="relationalFilterConfigurations" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueDataSourceConfiguration.property.relationalFilterConfigurations"></a>

```typescript
public readonly relationalFilterConfigurations: RelationalFilterConfiguration[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration">RelationalFilterConfiguration</a>[]

The relational filter configurations specifying which databases/tables to include.

---

##### `autoImportDataQualityResult`<sup>Optional</sup> <a name="autoImportDataQualityResult" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueDataSourceConfiguration.property.autoImportDataQualityResult"></a>

```typescript
public readonly autoImportDataQualityResult: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to auto-import data quality results.

---

### HostProps <a name="HostProps" id="@tonesingleton/cdk-sagemaker-unified-studio.HostProps"></a>

Properties for the Host construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.HostProps.Initializer"></a>

```typescript
import { HostProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const hostProps: HostProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.name">name</a></code> | <code>string</code> | Display name of the host. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.providerEndpoint">providerEndpoint</a></code> | <code>string</code> | The endpoint URL of the Git provider (e.g. `https://github.example.com`). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.providerType">providerType</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType">GitProviderType</a></code> | The Git provider type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Tags to apply to the host at creation time. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.vpcConfiguration">vpcConfiguration</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration">HostVpcConfiguration</a></code> | VPC configuration for the host. |

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the host.

---

##### `providerEndpoint`<sup>Required</sup> <a name="providerEndpoint" id="@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.providerEndpoint"></a>

```typescript
public readonly providerEndpoint: string;
```

- *Type:* string

The endpoint URL of the Git provider (e.g. `https://github.example.com`).

---

##### `providerType`<sup>Required</sup> <a name="providerType" id="@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.providerType"></a>

```typescript
public readonly providerType: GitProviderType;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType">GitProviderType</a>

The Git provider type.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no tags

Tags to apply to the host at creation time.

---

##### `vpcConfiguration`<sup>Optional</sup> <a name="vpcConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.HostProps.property.vpcConfiguration"></a>

```typescript
public readonly vpcConfiguration: HostVpcConfiguration;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration">HostVpcConfiguration</a>
- *Default:* no VPC configuration (public endpoint)

VPC configuration for the host.

Required when the Git provider is only reachable from within a VPC.

---

### HostVpcConfiguration <a name="HostVpcConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration"></a>

VPC configuration for a CodeConnections host.

Required when the Git provider endpoint is only reachable from within a VPC.

> [https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-host-vpc.html](https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-host-vpc.html)

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration.Initializer"></a>

```typescript
import { HostVpcConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const hostVpcConfiguration: HostVpcConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration.property.securityGroupIds">securityGroupIds</a></code> | <code>string[]</code> | The security group IDs to associate with the host. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration.property.subnetIds">subnetIds</a></code> | <code>string[]</code> | The subnet IDs to use for the host. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration.property.vpcId">vpcId</a></code> | <code>string</code> | The ID of the VPC. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration.property.tlsCertificate">tlsCertificate</a></code> | <code>string</code> | The PEM-encoded TLS certificate for the Git provider endpoint. |

---

##### `securityGroupIds`<sup>Required</sup> <a name="securityGroupIds" id="@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration.property.securityGroupIds"></a>

```typescript
public readonly securityGroupIds: string[];
```

- *Type:* string[]

The security group IDs to associate with the host.

---

##### `subnetIds`<sup>Required</sup> <a name="subnetIds" id="@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration.property.subnetIds"></a>

```typescript
public readonly subnetIds: string[];
```

- *Type:* string[]

The subnet IDs to use for the host.

---

##### `vpcId`<sup>Required</sup> <a name="vpcId" id="@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration.property.vpcId"></a>

```typescript
public readonly vpcId: string;
```

- *Type:* string

The ID of the VPC.

---

##### `tlsCertificate`<sup>Optional</sup> <a name="tlsCertificate" id="@tonesingleton/cdk-sagemaker-unified-studio.HostVpcConfiguration.property.tlsCertificate"></a>

```typescript
public readonly tlsCertificate: string;
```

- *Type:* string
- *Default:* no custom TLS certificate

The PEM-encoded TLS certificate for the Git provider endpoint.

---

### PhysicalConnectionRequirements <a name="PhysicalConnectionRequirements" id="@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements"></a>

Physical connection requirements for a connection.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements.Initializer"></a>

```typescript
import { PhysicalConnectionRequirements } from '@tonesingleton/cdk-sagemaker-unified-studio'

const physicalConnectionRequirements: PhysicalConnectionRequirements = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements.property.availabilityZone">availabilityZone</a></code> | <code>string</code> | The availability zone of the subnet. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements.property.securityGroupIdList">securityGroupIdList</a></code> | <code>string[]</code> | The security group IDs for the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements.property.subnetId">subnetId</a></code> | <code>string</code> | The subnet ID for the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements.property.subnetIdList">subnetIdList</a></code> | <code>string[]</code> | The subnet ID list for the connection. |

---

##### `availabilityZone`<sup>Optional</sup> <a name="availabilityZone" id="@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements.property.availabilityZone"></a>

```typescript
public readonly availabilityZone: string;
```

- *Type:* string
- *Default:* no availability zone

The availability zone of the subnet.

---

##### `securityGroupIdList`<sup>Optional</sup> <a name="securityGroupIdList" id="@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements.property.securityGroupIdList"></a>

```typescript
public readonly securityGroupIdList: string[];
```

- *Type:* string[]
- *Default:* no security groups

The security group IDs for the connection.

---

##### `subnetId`<sup>Optional</sup> <a name="subnetId" id="@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements.property.subnetId"></a>

```typescript
public readonly subnetId: string;
```

- *Type:* string
- *Default:* no subnet

The subnet ID for the connection.

---

##### `subnetIdList`<sup>Optional</sup> <a name="subnetIdList" id="@tonesingleton/cdk-sagemaker-unified-studio.PhysicalConnectionRequirements.property.subnetIdList"></a>

```typescript
public readonly subnetIdList: string[];
```

- *Type:* string[]
- *Default:* no subnet list

The subnet ID list for the connection.

Use this when multiple subnets are required.

---

### ProjectEnvironmentUserParameter <a name="ProjectEnvironmentUserParameter" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter"></a>

User parameters for a specific environment configuration within a project.

Specify `environmentConfigurationName` when creating a new project, or
`environmentId` when updating an existing project.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter.Initializer"></a>

```typescript
import { ProjectEnvironmentUserParameter } from '@tonesingleton/cdk-sagemaker-unified-studio'

const projectEnvironmentUserParameter: ProjectEnvironmentUserParameter = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter.property.environmentParameters">environmentParameters</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue">EnvironmentParameterValue</a>[]</code> | The parameters to pass to this environment configuration. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter.property.environmentConfigurationName">environmentConfigurationName</a></code> | <code>string</code> | The environment configuration name (as defined in the project profile). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter.property.environmentId">environmentId</a></code> | <code>string</code> | The environment ID. |

---

##### `environmentParameters`<sup>Required</sup> <a name="environmentParameters" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter.property.environmentParameters"></a>

```typescript
public readonly environmentParameters: EnvironmentParameterValue[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue">EnvironmentParameterValue</a>[]

The parameters to pass to this environment configuration.

---

##### `environmentConfigurationName`<sup>Optional</sup> <a name="environmentConfigurationName" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter.property.environmentConfigurationName"></a>

```typescript
public readonly environmentConfigurationName: string;
```

- *Type:* string
- *Default:* not set (use environmentId for updates)

The environment configuration name (as defined in the project profile).

Use this when creating a new project.

---

##### `environmentId`<sup>Optional</sup> <a name="environmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter.property.environmentId"></a>

```typescript
public readonly environmentId: string;
```

- *Type:* string
- *Default:* not set (use environmentConfigurationName for creates)

The environment ID.

Use this when updating an existing project.

---

### ProjectMember <a name="ProjectMember" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectMember"></a>

A member of a SageMaker Unified Studio project.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectMember.Initializer"></a>

```typescript
import { ProjectMember } from '@tonesingleton/cdk-sagemaker-unified-studio'

const projectMember: ProjectMember = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectMember.property.userIdentifier">userIdentifier</a></code> | <code>string</code> | The IAM role ARN or SageMaker Unified Studio user identifier for this member. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectMember.property.designation">designation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectMemberDesignation">ProjectMemberDesignation</a></code> | The member's designation within the project. |

---

##### `userIdentifier`<sup>Required</sup> <a name="userIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectMember.property.userIdentifier"></a>

```typescript
public readonly userIdentifier: string;
```

- *Type:* string

The IAM role ARN or SageMaker Unified Studio user identifier for this member.

---

##### `designation`<sup>Optional</sup> <a name="designation" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectMember.property.designation"></a>

```typescript
public readonly designation: ProjectMemberDesignation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectMemberDesignation">ProjectMemberDesignation</a>
- *Default:* ProjectMemberDesignation.PROJECT_CONTRIBUTOR

The member's designation within the project.

---

### ProjectProfileProps <a name="ProjectProfileProps" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps"></a>

Properties for a ProjectProfile construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.Initializer"></a>

```typescript
import { ProjectProfileProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const projectProfileProps: ProjectProfileProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.domainId">domainId</a></code> | <code>string</code> | The SageMaker Unified Studio domain ID this profile belongs to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.name">name</a></code> | <code>string</code> | Display name of the project profile. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the project profile. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.domainUnitId">domainUnitId</a></code> | <code>string</code> | The domain unit ID this profile is scoped to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.environmentConfigurations">environmentConfigurations</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration">EnvironmentConfiguration</a>[]</code> | Environment configurations that define which blueprints are provisioned when a project is created from this profile. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.status">status</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileStatus">ProjectProfileStatus</a></code> | Whether the project profile is enabled. |

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The SageMaker Unified Studio domain ID this profile belongs to.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the project profile.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the project profile.

---

##### `domainUnitId`<sup>Optional</sup> <a name="domainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.domainUnitId"></a>

```typescript
public readonly domainUnitId: string;
```

- *Type:* string
- *Default:* scoped to the root domain unit

The domain unit ID this profile is scoped to.

---

##### `environmentConfigurations`<sup>Optional</sup> <a name="environmentConfigurations" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.environmentConfigurations"></a>

```typescript
public readonly environmentConfigurations: EnvironmentConfiguration[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfiguration">EnvironmentConfiguration</a>[]
- *Default:* no environment configurations

Environment configurations that define which blueprints are provisioned when a project is created from this profile.

---

##### `status`<sup>Optional</sup> <a name="status" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileProps.property.status"></a>

```typescript
public readonly status: ProjectProfileStatus;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileStatus">ProjectProfileStatus</a>
- *Default:* ProjectProfileStatus.ENABLED

Whether the project profile is enabled.

---

### ProjectProps <a name="ProjectProps" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps"></a>

Properties for a Project construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.Initializer"></a>

```typescript
import { ProjectProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const projectProps: ProjectProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.domainId">domainId</a></code> | <code>string</code> | The SageMaker Unified Studio domain ID this project belongs to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.name">name</a></code> | <code>string</code> | Display name of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.projectProfileId">projectProfileId</a></code> | <code>string</code> | The project profile ID that defines the project's capabilities. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the project's purpose. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.domainUnitId">domainUnitId</a></code> | <code>string</code> | The domain unit ID to place this project in. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.isCustomExecutionRole">isCustomExecutionRole</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.members">members</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectMember">ProjectMember</a>[]</code> | Project members with their designations. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.userParameters">userParameters</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter">ProjectEnvironmentUserParameter</a>[]</code> | User parameters for environment configurations. |

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The SageMaker Unified Studio domain ID this project belongs to.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the project.

---

##### `projectProfileId`<sup>Required</sup> <a name="projectProfileId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.projectProfileId"></a>

```typescript
public readonly projectProfileId: string;
```

- *Type:* string

The project profile ID that defines the project's capabilities.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the project's purpose.

---

##### `domainUnitId`<sup>Optional</sup> <a name="domainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.domainUnitId"></a>

```typescript
public readonly domainUnitId: string;
```

- *Type:* string
- *Default:* root domain unit

The domain unit ID to place this project in.

---

##### `isCustomExecutionRole`<sup>Optional</sup> <a name="isCustomExecutionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.isCustomExecutionRole"></a>

```typescript
public readonly isCustomExecutionRole: boolean;
```

- *Type:* boolean

---

##### `members`<sup>Optional</sup> <a name="members" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.members"></a>

```typescript
public readonly members: ProjectMember[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectMember">ProjectMember</a>[]
- *Default:* no members

Project members with their designations.

---

##### `userParameters`<sup>Optional</sup> <a name="userParameters" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.userParameters"></a>

```typescript
public readonly userParameters: ProjectEnvironmentUserParameter[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectEnvironmentUserParameter">ProjectEnvironmentUserParameter</a>[]
- *Default:* no user parameters

User parameters for environment configurations.

Use this to customize
environments provisioned by the project profile (e.g. database names).

---

### RedshiftClusterStorage <a name="RedshiftClusterStorage" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftClusterStorage"></a>

Redshift cluster storage configuration.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftClusterStorage.Initializer"></a>

```typescript
import { RedshiftClusterStorage } from '@tonesingleton/cdk-sagemaker-unified-studio'

const redshiftClusterStorage: RedshiftClusterStorage = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftClusterStorage.property.clusterName">clusterName</a></code> | <code>string</code> | The name of the Redshift cluster. |

---

##### `clusterName`<sup>Required</sup> <a name="clusterName" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftClusterStorage.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* string

The name of the Redshift cluster.

---

### RedshiftCredentialConfiguration <a name="RedshiftCredentialConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentialConfiguration"></a>

Redshift credential configuration.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentialConfiguration.Initializer"></a>

```typescript
import { RedshiftCredentialConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const redshiftCredentialConfiguration: RedshiftCredentialConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentialConfiguration.property.secretManagerArn">secretManagerArn</a></code> | <code>string</code> | The ARN of the secret in Secrets Manager containing the Redshift credentials. |

---

##### `secretManagerArn`<sup>Required</sup> <a name="secretManagerArn" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentialConfiguration.property.secretManagerArn"></a>

```typescript
public readonly secretManagerArn: string;
```

- *Type:* string

The ARN of the secret in Secrets Manager containing the Redshift credentials.

---

### RedshiftDataSourceConfiguration <a name="RedshiftDataSourceConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration"></a>

Redshift data source configuration.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration.Initializer"></a>

```typescript
import { RedshiftDataSourceConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const redshiftDataSourceConfiguration: RedshiftDataSourceConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration.property.relationalFilterConfigurations">relationalFilterConfigurations</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration">RelationalFilterConfiguration</a>[]</code> | The relational filter configurations specifying which schemas/tables to include. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration.property.dataAccessRole">dataAccessRole</a></code> | <code>string</code> | The data access role ARN for the Redshift data source. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration.property.redshiftCredentialConfiguration">redshiftCredentialConfiguration</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentialConfiguration">RedshiftCredentialConfiguration</a></code> | The Redshift credential configuration. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration.property.redshiftStorage">redshiftStorage</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage">RedshiftStorage</a></code> | The Redshift storage configuration. |

---

##### `relationalFilterConfigurations`<sup>Required</sup> <a name="relationalFilterConfigurations" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration.property.relationalFilterConfigurations"></a>

```typescript
public readonly relationalFilterConfigurations: RelationalFilterConfiguration[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration">RelationalFilterConfiguration</a>[]

The relational filter configurations specifying which schemas/tables to include.

---

##### `dataAccessRole`<sup>Optional</sup> <a name="dataAccessRole" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration.property.dataAccessRole"></a>

```typescript
public readonly dataAccessRole: string;
```

- *Type:* string
- *Default:* no data access role

The data access role ARN for the Redshift data source.

---

##### `redshiftCredentialConfiguration`<sup>Optional</sup> <a name="redshiftCredentialConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration.property.redshiftCredentialConfiguration"></a>

```typescript
public readonly redshiftCredentialConfiguration: RedshiftCredentialConfiguration;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentialConfiguration">RedshiftCredentialConfiguration</a>
- *Default:* no credential configuration

The Redshift credential configuration.

---

##### `redshiftStorage`<sup>Optional</sup> <a name="redshiftStorage" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftDataSourceConfiguration.property.redshiftStorage"></a>

```typescript
public readonly redshiftStorage: RedshiftStorage;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage">RedshiftStorage</a>
- *Default:* no storage configuration

The Redshift storage configuration.

---

### RedshiftServerlessStorage <a name="RedshiftServerlessStorage" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftServerlessStorage"></a>

Redshift Serverless storage configuration.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftServerlessStorage.Initializer"></a>

```typescript
import { RedshiftServerlessStorage } from '@tonesingleton/cdk-sagemaker-unified-studio'

const redshiftServerlessStorage: RedshiftServerlessStorage = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftServerlessStorage.property.workgroupName">workgroupName</a></code> | <code>string</code> | The name of the Redshift Serverless workgroup. |

---

##### `workgroupName`<sup>Required</sup> <a name="workgroupName" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftServerlessStorage.property.workgroupName"></a>

```typescript
public readonly workgroupName: string;
```

- *Type:* string

The name of the Redshift Serverless workgroup.

---

### RedshiftStorage <a name="RedshiftStorage" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage"></a>

Redshift storage configuration (either cluster or serverless).

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage.Initializer"></a>

```typescript
import { RedshiftStorage } from '@tonesingleton/cdk-sagemaker-unified-studio'

const redshiftStorage: RedshiftStorage = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage.property.redshiftClusterSource">redshiftClusterSource</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftClusterStorage">RedshiftClusterStorage</a></code> | The Redshift cluster source. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage.property.redshiftServerlessSource">redshiftServerlessSource</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftServerlessStorage">RedshiftServerlessStorage</a></code> | The Redshift Serverless source. |

---

##### `redshiftClusterSource`<sup>Optional</sup> <a name="redshiftClusterSource" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage.property.redshiftClusterSource"></a>

```typescript
public readonly redshiftClusterSource: RedshiftClusterStorage;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftClusterStorage">RedshiftClusterStorage</a>
- *Default:* not a cluster source

The Redshift cluster source.

---

##### `redshiftServerlessSource`<sup>Optional</sup> <a name="redshiftServerlessSource" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage.property.redshiftServerlessSource"></a>

```typescript
public readonly redshiftServerlessSource: RedshiftServerlessStorage;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftServerlessStorage">RedshiftServerlessStorage</a>
- *Default:* not a serverless source

The Redshift Serverless source.

---

### RegionalParameter <a name="RegionalParameter" id="@tonesingleton/cdk-sagemaker-unified-studio.RegionalParameter"></a>

Per-region parameters for a blueprint configuration.

Used to pass region-specific settings (e.g. S3Location, VpcId, Subnets)
to the Tooling blueprint.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RegionalParameter.Initializer"></a>

```typescript
import { RegionalParameter } from '@tonesingleton/cdk-sagemaker-unified-studio'

const regionalParameter: RegionalParameter = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RegionalParameter.property.parameters">parameters</a></code> | <code>{[ key: string ]: string}</code> | Key-value pairs of parameters for this region. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RegionalParameter.property.region">region</a></code> | <code>string</code> | The AWS region this parameter set applies to. |

---

##### `parameters`<sup>Required</sup> <a name="parameters" id="@tonesingleton/cdk-sagemaker-unified-studio.RegionalParameter.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Key-value pairs of parameters for this region.

---

##### `region`<sup>Required</sup> <a name="region" id="@tonesingleton/cdk-sagemaker-unified-studio.RegionalParameter.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region this parameter set applies to.

---

### RelationalFilterConfiguration <a name="RelationalFilterConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration"></a>

A relational filter configuration for a data source.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration.Initializer"></a>

```typescript
import { RelationalFilterConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const relationalFilterConfiguration: RelationalFilterConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration.property.databaseName">databaseName</a></code> | <code>string</code> | The database name to include in the data source. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration.property.filterExpressions">filterExpressions</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.FilterExpression">FilterExpression</a>[]</code> | Filter expressions to include or exclude tables. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration.property.schemaName">schemaName</a></code> | <code>string</code> | The schema name to filter on (Redshift only). |

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The database name to include in the data source.

---

##### `filterExpressions`<sup>Optional</sup> <a name="filterExpressions" id="@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration.property.filterExpressions"></a>

```typescript
public readonly filterExpressions: FilterExpression[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.FilterExpression">FilterExpression</a>[]
- *Default:* include all tables

Filter expressions to include or exclude tables.

---

##### `schemaName`<sup>Optional</sup> <a name="schemaName" id="@tonesingleton/cdk-sagemaker-unified-studio.RelationalFilterConfiguration.property.schemaName"></a>

```typescript
public readonly schemaName: string;
```

- *Type:* string
- *Default:* no schema filter

The schema name to filter on (Redshift only).

---

### S3ConnectionProps <a name="S3ConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps"></a>

Properties for an S3Connection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.Initializer"></a>

```typescript
import { S3ConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const s3ConnectionProps: S3ConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.domainId">domainId</a></code> | <code>string</code> | The SageMaker Unified Studio domain ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.environmentId">environmentId</a></code> | <code>string</code> | The environment ID where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.name">name</a></code> | <code>string</code> | Display name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.s3Uri">s3Uri</a></code> | <code>string</code> | The S3 URI to connect to (e.g. `s3://bucket-name/prefix/`). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.projectId">projectId</a></code> | <code>string</code> | The project ID that owns this connection. |

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The SageMaker Unified Studio domain ID.

---

##### `environmentId`<sup>Required</sup> <a name="environmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.environmentId"></a>

```typescript
public readonly environmentId: string;
```

- *Type:* string

The environment ID where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the connection.

---

##### `s3Uri`<sup>Required</sup> <a name="s3Uri" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.s3Uri"></a>

```typescript
public readonly s3Uri: string;
```

- *Type:* string

The S3 URI to connect to (e.g. `s3://bucket-name/prefix/`).

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the connection.

---

##### `projectId`<sup>Optional</sup> <a name="projectId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.projectId"></a>

```typescript
public readonly projectId: string;
```

- *Type:* string
- *Default:* derived from the environment

The project ID that owns this connection.

---

## Classes <a name="Classes" id="Classes"></a>

### ManagedBlueprintIdentifier <a name="ManagedBlueprintIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier"></a>

Managed blueprint identifiers for AWS SageMaker Unified Studio.

Use these constants or pass any custom blueprint identifier as a plain string.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/supported-blueprints.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/supported-blueprints.html)


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.bedrockGenerativeAi">bedrockGenerativeAi</a></code> | Returns the blueprint identifiers for the Amazon Bedrock Generative AI group. |

---

##### `bedrockGenerativeAi` <a name="bedrockGenerativeAi" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.bedrockGenerativeAi"></a>

```typescript
import { ManagedBlueprintIdentifier } from '@tonesingleton/cdk-sagemaker-unified-studio'

ManagedBlueprintIdentifier.bedrockGenerativeAi()
```

Returns the blueprint identifiers for the Amazon Bedrock Generative AI group.

Includes: ChatAgent, Evaluation, Flow, Function, Guardrail, KnowledgeBase, Prompt.


#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_CHAT_AGENT">AMAZON_BEDROCK_CHAT_AGENT</a></code> | <code>string</code> | Creates an Amazon Bedrock Agent with an execution role and a consumption role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_EVALUATION">AMAZON_BEDROCK_EVALUATION</a></code> | <code>string</code> | Creates an IAM service role for an Amazon Bedrock evaluation job. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_FLOW">AMAZON_BEDROCK_FLOW</a></code> | <code>string</code> | Creates an Amazon Bedrock Prompt Flow with an execution role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_FUNCTION">AMAZON_BEDROCK_FUNCTION</a></code> | <code>string</code> | Creates an AWS Lambda function with an execution role and a Secrets Manager secret. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_GUARDRAIL">AMAZON_BEDROCK_GUARDRAIL</a></code> | <code>string</code> | Creates an Amazon Bedrock Guardrail with an execution role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_KNOWLEDGE_BASE">AMAZON_BEDROCK_KNOWLEDGE_BASE</a></code> | <code>string</code> | Creates an Amazon Bedrock Knowledge Base with an OpenSearch Serverless collection, execution role, Lambda functions, and a data source. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_PROMPT">AMAZON_BEDROCK_PROMPT</a></code> | <code>string</code> | Creates an Amazon Bedrock Prompt with a consumption role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.EMR_ON_EC2">EMR_ON_EC2</a></code> | <code>string</code> | Creates an Amazon EMR on EC2 cluster to run and scale Apache Spark, Hive, and other big data workloads. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.EMR_ON_EKS">EMR_ON_EKS</a></code> | <code>string</code> | Creates an Amazon EMR on EKS environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.EMR_SERVERLESS">EMR_SERVERLESS</a></code> | <code>string</code> | Creates an Amazon EMR Serverless application for Apache Spark batch jobs and interactive sessions. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.LAKEHOUSE_ADMIN">LAKEHOUSE_ADMIN</a></code> | <code>string</code> | Provisions a Lakehouse admin environment for managing Lake Formation permissions and data governance. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.LAKEHOUSE_CATALOG">LAKEHOUSE_CATALOG</a></code> | <code>string</code> | Provisions a new catalog in the Amazon SageMaker Lakehouse backed by Amazon Redshift Managed Storage. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.LAKEHOUSE_DATABASE">LAKEHOUSE_DATABASE</a></code> | <code>string</code> | Creates a data lake environment with an AWS Glue database for data management and an Amazon Athena workgroup for querying data. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.ML_EXPERIMENTS">ML_EXPERIMENTS</a></code> | <code>string</code> | Enables an MLflow tracking server for experimentation inside a project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.MLFLOW_APP">MLFLOW_APP</a></code> | <code>string</code> | MLflow App for Unified Studio. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.PARTNER_APPS">PARTNER_APPS</a></code> | <code>string</code> | Creates an IAM role and a Connection that enables access to Partner AI Apps for integrated third-party AI/ML solutions. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.QUICKSIGHT">QUICKSIGHT</a></code> | <code>string</code> | Enables visualization of data within a project using Amazon QuickSight. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.REDSHIFT_SERVERLESS">REDSHIFT_SERVERLESS</a></code> | <code>string</code> | Creates an Amazon Redshift Serverless environment to get insights from data without managing infrastructure. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.S3_BUCKET">S3_BUCKET</a></code> | <code>string</code> | Creates an S3 Bucket environment for data storage within a project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.S3_TABLE_CATALOG">S3_TABLE_CATALOG</a></code> | <code>string</code> | Creates an S3 Table Catalog environment for managing S3-backed table formats. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.TOOLING">TOOLING</a></code> | <code>string</code> | Creates project resources including IAM user roles, security groups, and Amazon SageMaker unified domains. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.TOOLING_LITE">TOOLING_LITE</a></code> | <code>string</code> | A lightweight version of the Tooling blueprint that provisions basic networking (Glue network connections, security groups) without the full SageMaker domain setup. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.WORKFLOWS">WORKFLOWS</a></code> | <code>string</code> | Creates an MWAA environment for Airflow-based workflows. |

---

##### `AMAZON_BEDROCK_CHAT_AGENT`<sup>Required</sup> <a name="AMAZON_BEDROCK_CHAT_AGENT" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_CHAT_AGENT"></a>

```typescript
public readonly AMAZON_BEDROCK_CHAT_AGENT: string;
```

- *Type:* string

Creates an Amazon Bedrock Agent with an execution role and a consumption role.

---

##### `AMAZON_BEDROCK_EVALUATION`<sup>Required</sup> <a name="AMAZON_BEDROCK_EVALUATION" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_EVALUATION"></a>

```typescript
public readonly AMAZON_BEDROCK_EVALUATION: string;
```

- *Type:* string

Creates an IAM service role for an Amazon Bedrock evaluation job.

---

##### `AMAZON_BEDROCK_FLOW`<sup>Required</sup> <a name="AMAZON_BEDROCK_FLOW" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_FLOW"></a>

```typescript
public readonly AMAZON_BEDROCK_FLOW: string;
```

- *Type:* string

Creates an Amazon Bedrock Prompt Flow with an execution role.

---

##### `AMAZON_BEDROCK_FUNCTION`<sup>Required</sup> <a name="AMAZON_BEDROCK_FUNCTION" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_FUNCTION"></a>

```typescript
public readonly AMAZON_BEDROCK_FUNCTION: string;
```

- *Type:* string

Creates an AWS Lambda function with an execution role and a Secrets Manager secret.

---

##### `AMAZON_BEDROCK_GUARDRAIL`<sup>Required</sup> <a name="AMAZON_BEDROCK_GUARDRAIL" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_GUARDRAIL"></a>

```typescript
public readonly AMAZON_BEDROCK_GUARDRAIL: string;
```

- *Type:* string

Creates an Amazon Bedrock Guardrail with an execution role.

---

##### `AMAZON_BEDROCK_KNOWLEDGE_BASE`<sup>Required</sup> <a name="AMAZON_BEDROCK_KNOWLEDGE_BASE" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_KNOWLEDGE_BASE"></a>

```typescript
public readonly AMAZON_BEDROCK_KNOWLEDGE_BASE: string;
```

- *Type:* string

Creates an Amazon Bedrock Knowledge Base with an OpenSearch Serverless collection, execution role, Lambda functions, and a data source.

---

##### `AMAZON_BEDROCK_PROMPT`<sup>Required</sup> <a name="AMAZON_BEDROCK_PROMPT" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.AMAZON_BEDROCK_PROMPT"></a>

```typescript
public readonly AMAZON_BEDROCK_PROMPT: string;
```

- *Type:* string

Creates an Amazon Bedrock Prompt with a consumption role.

---

##### `EMR_ON_EC2`<sup>Required</sup> <a name="EMR_ON_EC2" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.EMR_ON_EC2"></a>

```typescript
public readonly EMR_ON_EC2: string;
```

- *Type:* string

Creates an Amazon EMR on EC2 cluster to run and scale Apache Spark, Hive, and other big data workloads.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/enable-emr-on-ec2-blueprint.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/enable-emr-on-ec2-blueprint.html)

---

##### `EMR_ON_EKS`<sup>Required</sup> <a name="EMR_ON_EKS" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.EMR_ON_EKS"></a>

```typescript
public readonly EMR_ON_EKS: string;
```

- *Type:* string

Creates an Amazon EMR on EKS environment.

---

##### `EMR_SERVERLESS`<sup>Required</sup> <a name="EMR_SERVERLESS" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.EMR_SERVERLESS"></a>

```typescript
public readonly EMR_SERVERLESS: string;
```

- *Type:* string

Creates an Amazon EMR Serverless application for Apache Spark batch jobs and interactive sessions.

---

##### `LAKEHOUSE_ADMIN`<sup>Required</sup> <a name="LAKEHOUSE_ADMIN" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.LAKEHOUSE_ADMIN"></a>

```typescript
public readonly LAKEHOUSE_ADMIN: string;
```

- *Type:* string

Provisions a Lakehouse admin environment for managing Lake Formation permissions and data governance.

---

##### `LAKEHOUSE_CATALOG`<sup>Required</sup> <a name="LAKEHOUSE_CATALOG" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.LAKEHOUSE_CATALOG"></a>

```typescript
public readonly LAKEHOUSE_CATALOG: string;
```

- *Type:* string

Provisions a new catalog in the Amazon SageMaker Lakehouse backed by Amazon Redshift Managed Storage.

---

##### `LAKEHOUSE_DATABASE`<sup>Required</sup> <a name="LAKEHOUSE_DATABASE" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.LAKEHOUSE_DATABASE"></a>

```typescript
public readonly LAKEHOUSE_DATABASE: string;
```

- *Type:* string

Creates a data lake environment with an AWS Glue database for data management and an Amazon Athena workgroup for querying data.

Note: The UI displays this as "LakeHouseDatabase", but the API/CLI
identifier is `DataLake`.

---

##### `ML_EXPERIMENTS`<sup>Required</sup> <a name="ML_EXPERIMENTS" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.ML_EXPERIMENTS"></a>

```typescript
public readonly ML_EXPERIMENTS: string;
```

- *Type:* string

Enables an MLflow tracking server for experimentation inside a project.

---

##### `MLFLOW_APP`<sup>Required</sup> <a name="MLFLOW_APP" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.MLFLOW_APP"></a>

```typescript
public readonly MLFLOW_APP: string;
```

- *Type:* string

MLflow App for Unified Studio.

---

##### `PARTNER_APPS`<sup>Required</sup> <a name="PARTNER_APPS" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.PARTNER_APPS"></a>

```typescript
public readonly PARTNER_APPS: string;
```

- *Type:* string

Creates an IAM role and a Connection that enables access to Partner AI Apps for integrated third-party AI/ML solutions.

---

##### `QUICKSIGHT`<sup>Required</sup> <a name="QUICKSIGHT" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.QUICKSIGHT"></a>

```typescript
public readonly QUICKSIGHT: string;
```

- *Type:* string

Enables visualization of data within a project using Amazon QuickSight.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/quicksight-integration.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/quicksight-integration.html)

---

##### `REDSHIFT_SERVERLESS`<sup>Required</sup> <a name="REDSHIFT_SERVERLESS" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.REDSHIFT_SERVERLESS"></a>

```typescript
public readonly REDSHIFT_SERVERLESS: string;
```

- *Type:* string

Creates an Amazon Redshift Serverless environment to get insights from data without managing infrastructure.

---

##### `S3_BUCKET`<sup>Required</sup> <a name="S3_BUCKET" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.S3_BUCKET"></a>

```typescript
public readonly S3_BUCKET: string;
```

- *Type:* string

Creates an S3 Bucket environment for data storage within a project.

---

##### `S3_TABLE_CATALOG`<sup>Required</sup> <a name="S3_TABLE_CATALOG" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.S3_TABLE_CATALOG"></a>

```typescript
public readonly S3_TABLE_CATALOG: string;
```

- *Type:* string

Creates an S3 Table Catalog environment for managing S3-backed table formats.

---

##### `TOOLING`<sup>Required</sup> <a name="TOOLING" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.TOOLING"></a>

```typescript
public readonly TOOLING: string;
```

- *Type:* string

Creates project resources including IAM user roles, security groups, and Amazon SageMaker unified domains.

---

##### `TOOLING_LITE`<sup>Required</sup> <a name="TOOLING_LITE" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.TOOLING_LITE"></a>

```typescript
public readonly TOOLING_LITE: string;
```

- *Type:* string

A lightweight version of the Tooling blueprint that provisions basic networking (Glue network connections, security groups) without the full SageMaker domain setup.

---

##### `WORKFLOWS`<sup>Required</sup> <a name="WORKFLOWS" id="@tonesingleton/cdk-sagemaker-unified-studio.ManagedBlueprintIdentifier.property.WORKFLOWS"></a>

```typescript
public readonly WORKFLOWS: string;
```

- *Type:* string

Creates an MWAA environment for Airflow-based workflows.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IAccountRoles <a name="IAccountRoles" id="@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AccountRoles">AccountRoles</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles">IAccountRoles</a>

Exposed attributes of the AccountRoles construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.bedrockFmConsumptionRole">bedrockFmConsumptionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The Bedrock FM consumption role used for model invocation via inference profiles. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.bedrockModelManagementRole">bedrockModelManagementRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The Bedrock model management role used to create inference profiles. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.executionRole">executionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The execution role defines the AWS services and data that can be accessed through Amazon SageMaker Unified Studio projects. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.provisioningRole">provisioningRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The provisioning role used by SageMaker Unified Studio to deploy blueprint resources. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.queryExecutionRole">queryExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The query execution role used by Lake Formation and Glue for Athena queries. |

---

##### `bedrockFmConsumptionRole`<sup>Required</sup> <a name="bedrockFmConsumptionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.bedrockFmConsumptionRole"></a>

```typescript
public readonly bedrockFmConsumptionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The Bedrock FM consumption role used for model invocation via inference profiles.

---

##### `bedrockModelManagementRole`<sup>Required</sup> <a name="bedrockModelManagementRole" id="@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.bedrockModelManagementRole"></a>

```typescript
public readonly bedrockModelManagementRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The Bedrock model management role used to create inference profiles.

---

##### `executionRole`<sup>Required</sup> <a name="executionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.executionRole"></a>

```typescript
public readonly executionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The execution role defines the AWS services and data that can be accessed through Amazon SageMaker Unified Studio projects.

It determines which tools,
compute resources, data sources, and AI/ML assets project members can access.
Amazon SageMaker Unified Studio assumes this role to make service calls on
behalf of users within projects.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/setup-iam-based-domains.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/setup-iam-based-domains.html)

---

##### `provisioningRole`<sup>Required</sup> <a name="provisioningRole" id="@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.provisioningRole"></a>

```typescript
public readonly provisioningRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The provisioning role used by SageMaker Unified Studio to deploy blueprint resources.

---

##### `queryExecutionRole`<sup>Required</sup> <a name="queryExecutionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.IAccountRoles.property.queryExecutionRole"></a>

```typescript
public readonly queryExecutionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The query execution role used by Lake Formation and Glue for Athena queries.

---

### IConnection <a name="IConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.IConnection"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Connection">Connection</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IConnection">IConnection</a>

Exposed attributes of the Connection construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IConnection.property.connectionId">connectionId</a></code> | <code>string</code> | The connection ID. |

---

##### `connectionId`<sup>Required</sup> <a name="connectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.IConnection.property.connectionId"></a>

```typescript
public readonly connectionId: string;
```

- *Type:* string

The connection ID.

---

### IDataSource <a name="IDataSource" id="@tonesingleton/cdk-sagemaker-unified-studio.IDataSource"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataSource">DataSource</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDataSource">IDataSource</a>

Exposed attributes of the DataSource construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDataSource.property.dataSourceId">dataSourceId</a></code> | <code>string</code> | The data source ID. |

---

##### `dataSourceId`<sup>Required</sup> <a name="dataSourceId" id="@tonesingleton/cdk-sagemaker-unified-studio.IDataSource.property.dataSourceId"></a>

```typescript
public readonly dataSourceId: string;
```

- *Type:* string

The data source ID.

---

### IDomain <a name="IDomain" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain">IDomain</a>

Exposed attributes of the Domain construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.accessLogsBucket">accessLogsBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.blueprintPolicyGrants">blueprintPolicyGrants</a></code> | <code>aws-cdk-lib.aws_datazone.CfnPolicyGrant[]</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.blueprints">blueprints</a></code> | <code>{[ key: string ]: <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint">Blueprint</a>}</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.domainArn">domainArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.domainExecutionRole">domainExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.domainId">domainId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.domainUnits">domainUnits</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_datazone.CfnDomainUnit}</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.manageAccessRole">manageAccessRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.projectsBucket">projectsBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.rootDomainUnitId">rootDomainUnitId</a></code> | <code>string</code> | *No description.* |

---

##### `accessLogsBucket`<sup>Required</sup> <a name="accessLogsBucket" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.accessLogsBucket"></a>

```typescript
public readonly accessLogsBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

##### `blueprintPolicyGrants`<sup>Required</sup> <a name="blueprintPolicyGrants" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.blueprintPolicyGrants"></a>

```typescript
public readonly blueprintPolicyGrants: CfnPolicyGrant[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnPolicyGrant[]

---

##### `blueprints`<sup>Required</sup> <a name="blueprints" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.blueprints"></a>

```typescript
public readonly blueprints: {[ key: string ]: Blueprint};
```

- *Type:* {[ key: string ]: <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Blueprint">Blueprint</a>}

---

##### `domainArn`<sup>Required</sup> <a name="domainArn" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.domainArn"></a>

```typescript
public readonly domainArn: string;
```

- *Type:* string

---

##### `domainExecutionRole`<sup>Required</sup> <a name="domainExecutionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.domainExecutionRole"></a>

```typescript
public readonly domainExecutionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

---

##### `domainUnits`<sup>Required</sup> <a name="domainUnits" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.domainUnits"></a>

```typescript
public readonly domainUnits: {[ key: string ]: CfnDomainUnit};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_datazone.CfnDomainUnit}

---

##### `manageAccessRole`<sup>Required</sup> <a name="manageAccessRole" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.manageAccessRole"></a>

```typescript
public readonly manageAccessRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

---

##### `projectsBucket`<sup>Required</sup> <a name="projectsBucket" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.projectsBucket"></a>

```typescript
public readonly projectsBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

##### `rootDomainUnitId`<sup>Required</sup> <a name="rootDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.IDomain.property.rootDomainUnitId"></a>

```typescript
public readonly rootDomainUnitId: string;
```

- *Type:* string

---

### IEnvironment <a name="IEnvironment" id="@tonesingleton/cdk-sagemaker-unified-studio.IEnvironment"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment">Environment</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IEnvironment">IEnvironment</a>

Exposed attributes of the Environment construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IEnvironment.property.environmentId">environmentId</a></code> | <code>string</code> | The environment ID. |

---

##### `environmentId`<sup>Required</sup> <a name="environmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.IEnvironment.property.environmentId"></a>

```typescript
public readonly environmentId: string;
```

- *Type:* string

The environment ID.

---

### IGitConnection <a name="IGitConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.IGitConnection"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection">GitConnection</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IGitConnection">IGitConnection</a>

Exposed attributes of the GitConnection construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IGitConnection.property.codeConnectionArn">codeConnectionArn</a></code> | <code>string</code> | The ARN of the CodeConnections connection. |

---

##### `codeConnectionArn`<sup>Required</sup> <a name="codeConnectionArn" id="@tonesingleton/cdk-sagemaker-unified-studio.IGitConnection.property.codeConnectionArn"></a>

```typescript
public readonly codeConnectionArn: string;
```

- *Type:* string

The ARN of the CodeConnections connection.

---

### IHost <a name="IHost" id="@tonesingleton/cdk-sagemaker-unified-studio.IHost"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Host">Host</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IHost">IHost</a>

Exposed attributes of the Host construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IHost.property.hostArn">hostArn</a></code> | <code>string</code> | The ARN of the CodeConnections host. |

---

##### `hostArn`<sup>Required</sup> <a name="hostArn" id="@tonesingleton/cdk-sagemaker-unified-studio.IHost.property.hostArn"></a>

```typescript
public readonly hostArn: string;
```

- *Type:* string

The ARN of the CodeConnections host.

---

### IProject <a name="IProject" id="@tonesingleton/cdk-sagemaker-unified-studio.IProject"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project">Project</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject">IProject</a>

Exposed attributes of the Project construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.projectId">projectId</a></code> | <code>string</code> | The project ID. |

---

##### `projectId`<sup>Required</sup> <a name="projectId" id="@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.projectId"></a>

```typescript
public readonly projectId: string;
```

- *Type:* string

The project ID.

---

### IProjectProfile <a name="IProjectProfile" id="@tonesingleton/cdk-sagemaker-unified-studio.IProjectProfile"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile">ProjectProfile</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProjectProfile">IProjectProfile</a>

Exposed attributes of the ProjectProfile construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProjectProfile.property.projectProfileId">projectProfileId</a></code> | <code>string</code> | The project profile ID. |

---

##### `projectProfileId`<sup>Required</sup> <a name="projectProfileId" id="@tonesingleton/cdk-sagemaker-unified-studio.IProjectProfile.property.projectProfileId"></a>

```typescript
public readonly projectProfileId: string;
```

- *Type:* string

The project profile ID.

---

### IS3Connection <a name="IS3Connection" id="@tonesingleton/cdk-sagemaker-unified-studio.IS3Connection"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection">S3Connection</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IS3Connection">IS3Connection</a>

Exposed attributes of the S3Connection construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IS3Connection.property.connectionId">connectionId</a></code> | <code>string</code> | The connection ID. |

---

##### `connectionId`<sup>Required</sup> <a name="connectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.IS3Connection.property.connectionId"></a>

```typescript
public readonly connectionId: string;
```

- *Type:* string

The connection ID.

---

## Enums <a name="Enums" id="Enums"></a>

### ComputeEnvironment <a name="ComputeEnvironment" id="@tonesingleton/cdk-sagemaker-unified-studio.ComputeEnvironment"></a>

Compute environments to validate the connection against.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ComputeEnvironment.SPARK">SPARK</a></code> | Apache Spark (Glue Interactive Sessions). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ComputeEnvironment.ATHENA">ATHENA</a></code> | Amazon Athena. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ComputeEnvironment.PYTHON">PYTHON</a></code> | Python. |

---

##### `SPARK` <a name="SPARK" id="@tonesingleton/cdk-sagemaker-unified-studio.ComputeEnvironment.SPARK"></a>

Apache Spark (Glue Interactive Sessions).

---


##### `ATHENA` <a name="ATHENA" id="@tonesingleton/cdk-sagemaker-unified-studio.ComputeEnvironment.ATHENA"></a>

Amazon Athena.

---


##### `PYTHON` <a name="PYTHON" id="@tonesingleton/cdk-sagemaker-unified-studio.ComputeEnvironment.PYTHON"></a>

Python.

---


### ConnectionAuthenticationType <a name="ConnectionAuthenticationType" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationType"></a>

Authentication type for a connection.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationType.BASIC">BASIC</a></code> | Basic username/password authentication via Secrets Manager. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationType.OAUTH2">OAUTH2</a></code> | OAuth2 authentication. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationType.CUSTOM">CUSTOM</a></code> | Custom authentication. |

---

##### `BASIC` <a name="BASIC" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationType.BASIC"></a>

Basic username/password authentication via Secrets Manager.

---


##### `OAUTH2` <a name="OAUTH2" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationType.OAUTH2"></a>

OAuth2 authentication.

---


##### `CUSTOM` <a name="CUSTOM" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionAuthenticationType.CUSTOM"></a>

Custom authentication.

---


### ConnectionType <a name="ConnectionType" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType"></a>

The connection type.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.ORACLE">ORACLE</a></code> | Oracle database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.MYSQL">MYSQL</a></code> | MySQL database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.POSTGRESQL">POSTGRESQL</a></code> | PostgreSQL database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.SQLSERVER">SQLSERVER</a></code> | Microsoft SQL Server database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.REDSHIFT">REDSHIFT</a></code> | Amazon Redshift. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.JDBC">JDBC</a></code> | Generic JDBC connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.MONGODB">MONGODB</a></code> | MongoDB document database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.KAFKA">KAFKA</a></code> | Apache Kafka streaming platform. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.NETWORK">NETWORK</a></code> | Network connection within a VPC. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.MARKETPLACE">MARKETPLACE</a></code> | AWS Marketplace connector. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.CUSTOM">CUSTOM</a></code> | Custom connector. |

---

##### `ORACLE` <a name="ORACLE" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.ORACLE"></a>

Oracle database.

---


##### `MYSQL` <a name="MYSQL" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.MYSQL"></a>

MySQL database.

---


##### `POSTGRESQL` <a name="POSTGRESQL" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.POSTGRESQL"></a>

PostgreSQL database.

---


##### `SQLSERVER` <a name="SQLSERVER" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.SQLSERVER"></a>

Microsoft SQL Server database.

---


##### `REDSHIFT` <a name="REDSHIFT" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.REDSHIFT"></a>

Amazon Redshift.

---


##### `JDBC` <a name="JDBC" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.JDBC"></a>

Generic JDBC connection.

---


##### `MONGODB` <a name="MONGODB" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.MONGODB"></a>

MongoDB document database.

---


##### `KAFKA` <a name="KAFKA" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.KAFKA"></a>

Apache Kafka streaming platform.

---


##### `NETWORK` <a name="NETWORK" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.NETWORK"></a>

Network connection within a VPC.

---


##### `MARKETPLACE` <a name="MARKETPLACE" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.MARKETPLACE"></a>

AWS Marketplace connector.

---


##### `CUSTOM` <a name="CUSTOM" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionType.CUSTOM"></a>

Custom connector.

---


### DeploymentMode <a name="DeploymentMode" id="@tonesingleton/cdk-sagemaker-unified-studio.DeploymentMode"></a>

Deployment mode for an environment configuration.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DeploymentMode.ON_CREATE">ON_CREATE</a></code> | Environment is provisioned automatically when a project is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DeploymentMode.ON_DEMAND">ON_DEMAND</a></code> | Environment must be provisioned manually after project creation. |

---

##### `ON_CREATE` <a name="ON_CREATE" id="@tonesingleton/cdk-sagemaker-unified-studio.DeploymentMode.ON_CREATE"></a>

Environment is provisioned automatically when a project is created.

---


##### `ON_DEMAND` <a name="ON_DEMAND" id="@tonesingleton/cdk-sagemaker-unified-studio.DeploymentMode.ON_DEMAND"></a>

Environment must be provisioned manually after project creation.

---


### GitProviderType <a name="GitProviderType" id="@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType"></a>

Supported Git provider types for CodeConnections.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/git-connections.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/git-connections.html)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.GITHUB">GITHUB</a></code> | GitHub cloud-hosted. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.GITHUB_ENTERPRISE_SERVER">GITHUB_ENTERPRISE_SERVER</a></code> | GitHub Enterprise Server (self-managed). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.GITLAB">GITLAB</a></code> | GitLab cloud-hosted. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.GITLAB_SELF_MANAGED">GITLAB_SELF_MANAGED</a></code> | GitLab self-managed. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.BITBUCKET">BITBUCKET</a></code> | Bitbucket cloud-hosted. |

---

##### `GITHUB` <a name="GITHUB" id="@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.GITHUB"></a>

GitHub cloud-hosted.

---


##### `GITHUB_ENTERPRISE_SERVER` <a name="GITHUB_ENTERPRISE_SERVER" id="@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.GITHUB_ENTERPRISE_SERVER"></a>

GitHub Enterprise Server (self-managed).

---


##### `GITLAB` <a name="GITLAB" id="@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.GITLAB"></a>

GitLab cloud-hosted.

---


##### `GITLAB_SELF_MANAGED` <a name="GITLAB_SELF_MANAGED" id="@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.GITLAB_SELF_MANAGED"></a>

GitLab self-managed.

---


##### `BITBUCKET` <a name="BITBUCKET" id="@tonesingleton/cdk-sagemaker-unified-studio.GitProviderType.BITBUCKET"></a>

Bitbucket cloud-hosted.

---


### ProjectMemberDesignation <a name="ProjectMemberDesignation" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectMemberDesignation"></a>

Designations for a project member.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectMemberDesignation.PROJECT_OWNER">PROJECT_OWNER</a></code> | Full owner access to the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectMemberDesignation.PROJECT_CONTRIBUTOR">PROJECT_CONTRIBUTOR</a></code> | Contributor access to the project. |

---

##### `PROJECT_OWNER` <a name="PROJECT_OWNER" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectMemberDesignation.PROJECT_OWNER"></a>

Full owner access to the project.

---


##### `PROJECT_CONTRIBUTOR` <a name="PROJECT_CONTRIBUTOR" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectMemberDesignation.PROJECT_CONTRIBUTOR"></a>

Contributor access to the project.

---


### ProjectProfileStatus <a name="ProjectProfileStatus" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileStatus"></a>

Status of a project profile.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileStatus.ENABLED">ENABLED</a></code> | The project profile is active and can be used to create projects. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileStatus.DISABLED">DISABLED</a></code> | The project profile is disabled and cannot be used. |

---

##### `ENABLED` <a name="ENABLED" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileStatus.ENABLED"></a>

The project profile is active and can be used to create projects.

---


##### `DISABLED` <a name="DISABLED" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileStatus.DISABLED"></a>

The project profile is disabled and cannot be used.

---

