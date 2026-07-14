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


### AthenaConnection <a name="AthenaConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection"></a>

A SageMaker Unified Studio Athena connection that provides access to an Amazon Athena workgroup.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.Initializer"></a>

```typescript
import { AthenaConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new AthenaConnection(scope: Construct, id: string, props: AthenaConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps">AthenaConnectionProps</a></code> | Connection props. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the connection.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps">AthenaConnectionProps</a>

Connection props.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addDeletionOverride">addDeletionOverride</a></code> | Syntactic sugar for `addOverride(path, undefined)`. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addDependency">addDependency</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addDependsOn">addDependsOn</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addMetadata">addMetadata</a></code> | Add a value to the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addOverride">addOverride</a></code> | Adds an override to the synthesized CloudFormation resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addPropertyDeletionOverride">addPropertyDeletionOverride</a></code> | Adds an override that deletes the value of a property from the resource definition. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addPropertyOverride">addPropertyOverride</a></code> | Adds an override to a resource property. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.applyCrossStackReferenceStrength">applyCrossStackReferenceStrength</a></code> | Sets the cross-stack reference strength for this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.applyRemovalPolicy">applyRemovalPolicy</a></code> | Sets the deletion policy of the resource based on the removal policy specified. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.cfnPropertyName">cfnPropertyName</a></code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.getAtt">getAtt</a></code> | Returns a token for an runtime attribute of this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.getMetadata">getMetadata</a></code> | Retrieve a value value from the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.obtainDependencies">obtainDependencies</a></code> | Retrieves an array of resources this resource depends on. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.obtainResourceDependencies">obtainResourceDependencies</a></code> | Get a shallow copy of dependencies between this resource and other resources in the same stack. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.removeDependency">removeDependency</a></code> | Indicates that this resource no longer depends on another resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.replaceDependency">replaceDependency</a></code> | Replaces one dependency with another. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.inspect">inspect</a></code> | Examines the CloudFormation resource and discloses attributes. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `addDeletionOverride` <a name="addDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addDeletionOverride"></a>

```typescript
public addDeletionOverride(path: string): void
```

Syntactic sugar for `addOverride(path, undefined)`.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addDeletionOverride.parameter.path"></a>

- *Type:* string

The path of the value to delete.

---

##### `addDependency` <a name="addDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addDependency"></a>

```typescript
public addDependency(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

This can be used for resources across stacks (or nested stack) boundaries
and the dependency will automatically be transferred to the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### ~~`addDependsOn`~~ <a name="addDependsOn" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addDependsOn"></a>

```typescript
public addDependsOn(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addDependsOn.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `addMetadata` <a name="addMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Add a value to the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addOverride` <a name="addOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

Adds an override to the synthesized CloudFormation resource.

To add a
property override, either use `addPropertyOverride` or prefix `path` with
"Properties." (i.e. `Properties.TopicName`).

If the override is nested, separate each nested level using a dot (.) in the path parameter.
If there is an array as part of the nesting, specify the index in the path.

To include a literal `.` in the property name, prefix with a `\`. In most
programming languages you will need to write this as `"\\."` because the
`\` itself will need to be escaped.

For example,
```typescript
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.0.Projection.NonKeyAttributes', ['myattribute']);
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.1.ProjectionType', 'INCLUDE');
```
would add the overrides
```json
"Properties": {
  "GlobalSecondaryIndexes": [
    {
      "Projection": {
        "NonKeyAttributes": [ "myattribute" ]
        ...
      }
      ...
    },
    {
      "ProjectionType": "INCLUDE"
      ...
    },
  ]
  ...
}
```

The `value` argument to `addOverride` will not be processed or translated
in any way. Pass raw JSON values in here with the correct capitalization
for CloudFormation. If you pass CDK classes or structs, they will be
rendered with lowercased key names, and CloudFormation will reject the
template.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addOverride.parameter.path"></a>

- *Type:* string

The path of the property, you can use dot notation to override values in complex types.

Any intermediate keys
will be created as needed.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addOverride.parameter.value"></a>

- *Type:* any

The value.

Could be primitive or complex.

---

##### `addPropertyDeletionOverride` <a name="addPropertyDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addPropertyDeletionOverride"></a>

```typescript
public addPropertyDeletionOverride(propertyPath: string): void
```

Adds an override that deletes the value of a property from the resource definition.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addPropertyDeletionOverride.parameter.propertyPath"></a>

- *Type:* string

The path to the property.

---

##### `addPropertyOverride` <a name="addPropertyOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addPropertyOverride"></a>

```typescript
public addPropertyOverride(propertyPath: string, value: any): void
```

Adds an override to a resource property.

Syntactic sugar for `addOverride("Properties.<...>", value)`.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addPropertyOverride.parameter.propertyPath"></a>

- *Type:* string

The path of the property.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.addPropertyOverride.parameter.value"></a>

- *Type:* any

The value.

---

##### `applyCrossStackReferenceStrength` <a name="applyCrossStackReferenceStrength" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.applyCrossStackReferenceStrength"></a>

```typescript
public applyCrossStackReferenceStrength(strength: ReferenceStrength): void
```

Sets the cross-stack reference strength for this resource.

When set, any cross-stack reference to this resource will use the specified
strength instead of the global default from the consuming stack's context.

###### `strength`<sup>Required</sup> <a name="strength" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.applyCrossStackReferenceStrength.parameter.strength"></a>

- *Type:* aws-cdk-lib.ReferenceStrength

The reference strength to use for this resource.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy?: RemovalPolicy, options?: RemovalPolicyOptions): void
```

Sets the deletion policy of the resource based on the removal policy specified.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`). In some
cases, a snapshot can be taken of the resource prior to deletion
(`RemovalPolicy.SNAPSHOT`). A list of resources that support this policy
can be found in the following link:

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options)

###### `policy`<sup>Optional</sup> <a name="policy" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

###### `options`<sup>Optional</sup> <a name="options" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.applyRemovalPolicy.parameter.options"></a>

- *Type:* aws-cdk-lib.RemovalPolicyOptions

---

##### `cfnPropertyName` <a name="cfnPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.cfnPropertyName"></a>

```typescript
public cfnPropertyName(cdkPropertyName: string): string
```

###### `cdkPropertyName`<sup>Required</sup> <a name="cdkPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.cfnPropertyName.parameter.cdkPropertyName"></a>

- *Type:* string

---

##### `getAtt` <a name="getAtt" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.getAtt"></a>

```typescript
public getAtt(attributeName: string, typeHint?: ResolutionTypeHint): Reference
```

Returns a token for an runtime attribute of this resource.

Ideally, use generated attribute accessors (e.g. `resource.arn`), but this can be used for future compatibility
in case there is no generated attribute.

###### `attributeName`<sup>Required</sup> <a name="attributeName" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.getAtt.parameter.attributeName"></a>

- *Type:* string

The name of the attribute.

---

###### `typeHint`<sup>Optional</sup> <a name="typeHint" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.getAtt.parameter.typeHint"></a>

- *Type:* aws-cdk-lib.ResolutionTypeHint

---

##### `getMetadata` <a name="getMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.getMetadata"></a>

```typescript
public getMetadata(key: string): any
```

Retrieve a value value from the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.getMetadata.parameter.key"></a>

- *Type:* string

---

##### `obtainDependencies` <a name="obtainDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.obtainDependencies"></a>

```typescript
public obtainDependencies(): (CfnResource | Stack)[]
```

Retrieves an array of resources this resource depends on.

This assembles dependencies on resources across stacks (including nested stacks)
automatically.

##### `obtainResourceDependencies` <a name="obtainResourceDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.obtainResourceDependencies"></a>

```typescript
public obtainResourceDependencies(): CfnResource[]
```

Get a shallow copy of dependencies between this resource and other resources in the same stack.

##### `removeDependency` <a name="removeDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.removeDependency"></a>

```typescript
public removeDependency(target: CfnResource): void
```

Indicates that this resource no longer depends on another resource.

This can be used for resources across stacks (including nested stacks)
and the dependency will automatically be removed from the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.removeDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `replaceDependency` <a name="replaceDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.replaceDependency"></a>

```typescript
public replaceDependency(target: CfnResource, newTarget: CfnResource): void
```

Replaces one dependency with another.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.replaceDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

The dependency to replace.

---

###### `newTarget`<sup>Required</sup> <a name="newTarget" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.replaceDependency.parameter.newTarget"></a>

- *Type:* aws-cdk-lib.CfnResource

The new dependency to add.

---

##### `inspect` <a name="inspect" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.inspect"></a>

```typescript
public inspect(inspector: TreeInspector): void
```

Examines the CloudFormation resource and discloses attributes.

###### `inspector`<sup>Required</sup> <a name="inspector" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.inspect.parameter.inspector"></a>

- *Type:* aws-cdk-lib.TreeInspector

tree inspector to collect and process attributes.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isCfnElement">isCfnElement</a></code> | Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isCfnResource">isCfnResource</a></code> | Check whether the given object is a CfnResource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isCfnConnection">isCfnConnection</a></code> | Checks whether the given object is a CfnConnection. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isConstruct"></a>

```typescript
import { AthenaConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

AthenaConnection.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isCfnElement` <a name="isCfnElement" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isCfnElement"></a>

```typescript
import { AthenaConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

AthenaConnection.isCfnElement(x: any)
```

Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template).

Uses duck-typing instead of `instanceof` to allow stack elements from different
versions of this library to be included in the same stack.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isCfnElement.parameter.x"></a>

- *Type:* any

---

##### `isCfnResource` <a name="isCfnResource" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isCfnResource"></a>

```typescript
import { AthenaConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

AthenaConnection.isCfnResource(x: any)
```

Check whether the given object is a CfnResource.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isCfnResource.parameter.x"></a>

- *Type:* any

---

##### `isCfnConnection` <a name="isCfnConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isCfnConnection"></a>

```typescript
import { AthenaConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

AthenaConnection.isCfnConnection(x: any)
```

Checks whether the given object is a CfnConnection.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.isCfnConnection.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.creationStack">creationStack</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.logicalId">logicalId</a></code> | <code>string</code> | The logical ID for this CloudFormation stack element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this element is defined. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.ref">ref</a></code> | <code>string</code> | Return a string that will be resolved to a CloudFormation `{ Ref }` for this element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.cfnOptions">cfnOptions</a></code> | <code>aws-cdk-lib.ICfnResourceOptions</code> | Options for this resource, such as condition, update policy etc. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.cfnResourceType">cfnResourceType</a></code> | <code>string</code> | AWS resource type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.env">env</a></code> | <code>aws-cdk-lib.interfaces.ResourceEnvironment</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrConnectionId">attrConnectionId</a></code> | <code>string</code> | The ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrDomainId">attrDomainId</a></code> | <code>string</code> | The domain ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrDomainUnitId">attrDomainUnitId</a></code> | <code>string</code> | The domain unit ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrEnvironmentId">attrEnvironmentId</a></code> | <code>string</code> | The ID of the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrEnvironmentUserRole">attrEnvironmentUserRole</a></code> | <code>string</code> | The environment user role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrProjectId">attrProjectId</a></code> | <code>string</code> | The ID of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrType">attrType</a></code> | <code>string</code> | The type of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.connectionRef">connectionRef</a></code> | <code>aws-cdk-lib.interfaces.aws_datazone.ConnectionReference</code> | A reference to a Connection resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.awsLocation">awsLocation</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty</code> | The location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.configurations">configurations</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Specifies whether the trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The identifier of the project in which the connection should be created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.props">props</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty</code> | Connection props. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.scope">scope</a></code> | <code>string</code> | The scope of the connection. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `creationStack`<sup>Required</sup> <a name="creationStack" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.creationStack"></a>

```typescript
public readonly creationStack: string[];
```

- *Type:* string[]

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

The logical ID for this CloudFormation stack element.

The logical ID of the element
is calculated from the path of the resource node in the construct tree.

To override this value, use `overrideLogicalId(newLogicalId)`.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this element is defined.

CfnElements must be defined within a stack scope (directly or indirectly).

---

##### `ref`<sup>Required</sup> <a name="ref" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Return a string that will be resolved to a CloudFormation `{ Ref }` for this element.

If, by any chance, the intrinsic reference of a resource is not a string, you could
coerce it to an IResolvable through `Lazy.any({ produce: resource.ref })`.

---

##### `cfnOptions`<sup>Required</sup> <a name="cfnOptions" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.cfnOptions"></a>

```typescript
public readonly cfnOptions: ICfnResourceOptions;
```

- *Type:* aws-cdk-lib.ICfnResourceOptions

Options for this resource, such as condition, update policy etc.

---

##### `cfnResourceType`<sup>Required</sup> <a name="cfnResourceType" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.cfnResourceType"></a>

```typescript
public readonly cfnResourceType: string;
```

- *Type:* string

AWS resource type.

---

##### `env`<sup>Required</sup> <a name="env" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.interfaces.ResourceEnvironment

---

##### `attrConnectionId`<sup>Required</sup> <a name="attrConnectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrConnectionId"></a>

```typescript
public readonly attrConnectionId: string;
```

- *Type:* string

The ID of the connection.

---

##### `attrDomainId`<sup>Required</sup> <a name="attrDomainId" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrDomainId"></a>

```typescript
public readonly attrDomainId: string;
```

- *Type:* string

The domain ID of the connection.

---

##### `attrDomainUnitId`<sup>Required</sup> <a name="attrDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrDomainUnitId"></a>

```typescript
public readonly attrDomainUnitId: string;
```

- *Type:* string

The domain unit ID of the connection.

---

##### `attrEnvironmentId`<sup>Required</sup> <a name="attrEnvironmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrEnvironmentId"></a>

```typescript
public readonly attrEnvironmentId: string;
```

- *Type:* string

The ID of the environment.

---

##### `attrEnvironmentUserRole`<sup>Required</sup> <a name="attrEnvironmentUserRole" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrEnvironmentUserRole"></a>

```typescript
public readonly attrEnvironmentUserRole: string;
```

- *Type:* string

The environment user role.

---

##### `attrProjectId`<sup>Required</sup> <a name="attrProjectId" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrProjectId"></a>

```typescript
public readonly attrProjectId: string;
```

- *Type:* string

The ID of the project.

---

##### `attrType`<sup>Required</sup> <a name="attrType" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.attrType"></a>

```typescript
public readonly attrType: string;
```

- *Type:* string

The type of the connection.

---

##### `connectionRef`<sup>Required</sup> <a name="connectionRef" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.connectionRef"></a>

```typescript
public readonly connectionRef: ConnectionReference;
```

- *Type:* aws-cdk-lib.interfaces.aws_datazone.ConnectionReference

A reference to a Connection resource.

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.awsLocation"></a>

```typescript
public readonly awsLocation: IResolvable | AwsLocationProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty

The location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.configurations"></a>

```typescript
public readonly configurations: IResolvable | (IResolvable | ConnectionConfigurationProperty)[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]

The configurations of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

Specifies whether the trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string

The identifier of the project in which the connection should be created.

---

##### `props`<sup>Optional</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.props"></a>

```typescript
public readonly props: IResolvable | ConnectionPropertiesInputProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty

Connection props.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.scope"></a>

```typescript
public readonly scope: string;
```

- *Type:* string

The scope of the connection.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.CFN_RESOURCE_TYPE_NAME">CFN_RESOURCE_TYPE_NAME</a></code> | <code>string</code> | The CloudFormation resource type name for this resource class. |

---

##### `CFN_RESOURCE_TYPE_NAME`<sup>Required</sup> <a name="CFN_RESOURCE_TYPE_NAME" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnection.property.CFN_RESOURCE_TYPE_NAME"></a>

```typescript
public readonly CFN_RESOURCE_TYPE_NAME: string;
```

- *Type:* string

The CloudFormation resource type name for this resource class.

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


### DataCatalogTable <a name="DataCatalogTable" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDataCatalogTable">IDataCatalogTable</a>

A Glue Data Catalog table with configurable schema, format, and governance mode.

> [https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-tables.html](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-tables.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.Initializer"></a>

```typescript
import { DataCatalogTable } from '@tonesingleton/cdk-sagemaker-unified-studio'

new DataCatalogTable(scope: Construct, id: string, props: DataCatalogTableProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps">DataCatalogTableProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps">DataCatalogTableProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.addDqdlRuleset">addDqdlRuleset</a></code> | Attaches a DQDL ruleset to this table. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `addDqdlRuleset` <a name="addDqdlRuleset" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.addDqdlRuleset"></a>

```typescript
public addDqdlRuleset(id: string, name: string, ruleset: string, description?: string, tags?: {[ key: string ]: string}): DqdlRuleset
```

Attaches a DQDL ruleset to this table.

###### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.addDqdlRuleset.parameter.id"></a>

- *Type:* string

Construct ID for the ruleset.

---

###### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.addDqdlRuleset.parameter.name"></a>

- *Type:* string

Unique name for the ruleset.

---

###### `ruleset`<sup>Required</sup> <a name="ruleset" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.addDqdlRuleset.parameter.ruleset"></a>

- *Type:* string

The DQDL rules string (e.g. 'Rules = [ Completeness "col" = 1.0 ]').

---

###### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.addDqdlRuleset.parameter.description"></a>

- *Type:* string

Optional description.

---

###### `tags`<sup>Optional</sup> <a name="tags" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.addDqdlRuleset.parameter.tags"></a>

- *Type:* {[ key: string ]: string}

Optional tags to apply to the ruleset.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.isConstruct"></a>

```typescript
import { DataCatalogTable } from '@tonesingleton/cdk-sagemaker-unified-studio'

DataCatalogTable.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.property.databaseName">databaseName</a></code> | <code>string</code> | The database name the table belongs to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.property.tableName">tableName</a></code> | <code>string</code> | The table name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The database name the table belongs to.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

The table name.

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

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain">IDomain</a>

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain.fromAttributes">fromAttributes</a></code> | Import an existing domain from its attributes. |
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

##### `fromAttributes` <a name="fromAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.fromAttributes"></a>

```typescript
import { Domain } from '@tonesingleton/cdk-sagemaker-unified-studio'

Domain.fromAttributes(scope: Construct, id: string, attrs: DomainAttributes)
```

Import an existing domain from its attributes.

This method returns a read-only `IDomain`-compatible object for cross-stack
references. The imported domain does not expose domain units, blueprints,
policy grants, or S3 buckets — only the identifiers and roles.

###### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.fromAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.fromAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@tonesingleton/cdk-sagemaker-unified-studio.Domain.fromAttributes.parameter.attrs"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes">DomainAttributes</a>

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

### DqdlRuleset <a name="DqdlRuleset" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset"></a>

A Glue Data Quality ruleset using DQDL (Data Quality Definition Language).

> [https://docs.aws.amazon.com/glue/latest/dg/dqdl.html](https://docs.aws.amazon.com/glue/latest/dg/dqdl.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.Initializer"></a>

```typescript
import { DqdlRuleset } from '@tonesingleton/cdk-sagemaker-unified-studio'

new DqdlRuleset(scope: Construct, id: string, props: DqdlRulesetProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps">DqdlRulesetProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps">DqdlRulesetProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.isConstruct"></a>

```typescript
import { DqdlRuleset } from '@tonesingleton/cdk-sagemaker-unified-studio'

DqdlRuleset.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRuleset.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Environment.fromAttributes">fromAttributes</a></code> | Import an existing environment from its attributes. |

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

##### `fromAttributes` <a name="fromAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.fromAttributes"></a>

```typescript
import { Environment } from '@tonesingleton/cdk-sagemaker-unified-studio'

Environment.fromAttributes(scope: Construct, id: string, attrs: EnvironmentAttributes)
```

Import an existing environment from its attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.fromAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.fromAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@tonesingleton/cdk-sagemaker-unified-studio.Environment.fromAttributes.parameter.attrs"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentAttributes">EnvironmentAttributes</a>

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.property.connectionStatus">connectionStatus</a></code> | <code>string</code> | The status of the CodeConnections connection (e.g. PENDING, AVAILABLE). |

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

##### `connectionStatus`<sup>Optional</sup> <a name="connectionStatus" id="@tonesingleton/cdk-sagemaker-unified-studio.GitConnection.property.connectionStatus"></a>

```typescript
public readonly connectionStatus: string;
```

- *Type:* string

The status of the CodeConnections connection (e.g. PENDING, AVAILABLE).

---


### GlueConnection <a name="GlueConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection"></a>

A SageMaker Unified Studio Glue connection that provides connectivity to external data sources via AWS Glue.

Supports connection types such as Oracle, Snowflake, PostgreSQL, MySQL, and more.
The connection name must be lowercase.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.Initializer"></a>

```typescript
import { GlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new GlueConnection(scope: Construct, id: string, props: GlueConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps">GlueConnectionProps</a></code> | Connection props. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the connection.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps">GlueConnectionProps</a>

Connection props.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addDeletionOverride">addDeletionOverride</a></code> | Syntactic sugar for `addOverride(path, undefined)`. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addDependency">addDependency</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addDependsOn">addDependsOn</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addMetadata">addMetadata</a></code> | Add a value to the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addOverride">addOverride</a></code> | Adds an override to the synthesized CloudFormation resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addPropertyDeletionOverride">addPropertyDeletionOverride</a></code> | Adds an override that deletes the value of a property from the resource definition. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addPropertyOverride">addPropertyOverride</a></code> | Adds an override to a resource property. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.applyCrossStackReferenceStrength">applyCrossStackReferenceStrength</a></code> | Sets the cross-stack reference strength for this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.applyRemovalPolicy">applyRemovalPolicy</a></code> | Sets the deletion policy of the resource based on the removal policy specified. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.cfnPropertyName">cfnPropertyName</a></code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.getAtt">getAtt</a></code> | Returns a token for an runtime attribute of this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.getMetadata">getMetadata</a></code> | Retrieve a value value from the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.obtainDependencies">obtainDependencies</a></code> | Retrieves an array of resources this resource depends on. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.obtainResourceDependencies">obtainResourceDependencies</a></code> | Get a shallow copy of dependencies between this resource and other resources in the same stack. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.removeDependency">removeDependency</a></code> | Indicates that this resource no longer depends on another resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.replaceDependency">replaceDependency</a></code> | Replaces one dependency with another. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.inspect">inspect</a></code> | Examines the CloudFormation resource and discloses attributes. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `addDeletionOverride` <a name="addDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addDeletionOverride"></a>

```typescript
public addDeletionOverride(path: string): void
```

Syntactic sugar for `addOverride(path, undefined)`.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addDeletionOverride.parameter.path"></a>

- *Type:* string

The path of the value to delete.

---

##### `addDependency` <a name="addDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addDependency"></a>

```typescript
public addDependency(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

This can be used for resources across stacks (or nested stack) boundaries
and the dependency will automatically be transferred to the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### ~~`addDependsOn`~~ <a name="addDependsOn" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addDependsOn"></a>

```typescript
public addDependsOn(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addDependsOn.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `addMetadata` <a name="addMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Add a value to the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addOverride` <a name="addOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

Adds an override to the synthesized CloudFormation resource.

To add a
property override, either use `addPropertyOverride` or prefix `path` with
"Properties." (i.e. `Properties.TopicName`).

If the override is nested, separate each nested level using a dot (.) in the path parameter.
If there is an array as part of the nesting, specify the index in the path.

To include a literal `.` in the property name, prefix with a `\`. In most
programming languages you will need to write this as `"\\."` because the
`\` itself will need to be escaped.

For example,
```typescript
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.0.Projection.NonKeyAttributes', ['myattribute']);
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.1.ProjectionType', 'INCLUDE');
```
would add the overrides
```json
"Properties": {
  "GlobalSecondaryIndexes": [
    {
      "Projection": {
        "NonKeyAttributes": [ "myattribute" ]
        ...
      }
      ...
    },
    {
      "ProjectionType": "INCLUDE"
      ...
    },
  ]
  ...
}
```

The `value` argument to `addOverride` will not be processed or translated
in any way. Pass raw JSON values in here with the correct capitalization
for CloudFormation. If you pass CDK classes or structs, they will be
rendered with lowercased key names, and CloudFormation will reject the
template.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addOverride.parameter.path"></a>

- *Type:* string

The path of the property, you can use dot notation to override values in complex types.

Any intermediate keys
will be created as needed.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addOverride.parameter.value"></a>

- *Type:* any

The value.

Could be primitive or complex.

---

##### `addPropertyDeletionOverride` <a name="addPropertyDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addPropertyDeletionOverride"></a>

```typescript
public addPropertyDeletionOverride(propertyPath: string): void
```

Adds an override that deletes the value of a property from the resource definition.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addPropertyDeletionOverride.parameter.propertyPath"></a>

- *Type:* string

The path to the property.

---

##### `addPropertyOverride` <a name="addPropertyOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addPropertyOverride"></a>

```typescript
public addPropertyOverride(propertyPath: string, value: any): void
```

Adds an override to a resource property.

Syntactic sugar for `addOverride("Properties.<...>", value)`.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addPropertyOverride.parameter.propertyPath"></a>

- *Type:* string

The path of the property.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.addPropertyOverride.parameter.value"></a>

- *Type:* any

The value.

---

##### `applyCrossStackReferenceStrength` <a name="applyCrossStackReferenceStrength" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.applyCrossStackReferenceStrength"></a>

```typescript
public applyCrossStackReferenceStrength(strength: ReferenceStrength): void
```

Sets the cross-stack reference strength for this resource.

When set, any cross-stack reference to this resource will use the specified
strength instead of the global default from the consuming stack's context.

###### `strength`<sup>Required</sup> <a name="strength" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.applyCrossStackReferenceStrength.parameter.strength"></a>

- *Type:* aws-cdk-lib.ReferenceStrength

The reference strength to use for this resource.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy?: RemovalPolicy, options?: RemovalPolicyOptions): void
```

Sets the deletion policy of the resource based on the removal policy specified.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`). In some
cases, a snapshot can be taken of the resource prior to deletion
(`RemovalPolicy.SNAPSHOT`). A list of resources that support this policy
can be found in the following link:

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options)

###### `policy`<sup>Optional</sup> <a name="policy" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

###### `options`<sup>Optional</sup> <a name="options" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.applyRemovalPolicy.parameter.options"></a>

- *Type:* aws-cdk-lib.RemovalPolicyOptions

---

##### `cfnPropertyName` <a name="cfnPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.cfnPropertyName"></a>

```typescript
public cfnPropertyName(cdkPropertyName: string): string
```

###### `cdkPropertyName`<sup>Required</sup> <a name="cdkPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.cfnPropertyName.parameter.cdkPropertyName"></a>

- *Type:* string

---

##### `getAtt` <a name="getAtt" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.getAtt"></a>

```typescript
public getAtt(attributeName: string, typeHint?: ResolutionTypeHint): Reference
```

Returns a token for an runtime attribute of this resource.

Ideally, use generated attribute accessors (e.g. `resource.arn`), but this can be used for future compatibility
in case there is no generated attribute.

###### `attributeName`<sup>Required</sup> <a name="attributeName" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.getAtt.parameter.attributeName"></a>

- *Type:* string

The name of the attribute.

---

###### `typeHint`<sup>Optional</sup> <a name="typeHint" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.getAtt.parameter.typeHint"></a>

- *Type:* aws-cdk-lib.ResolutionTypeHint

---

##### `getMetadata` <a name="getMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.getMetadata"></a>

```typescript
public getMetadata(key: string): any
```

Retrieve a value value from the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.getMetadata.parameter.key"></a>

- *Type:* string

---

##### `obtainDependencies` <a name="obtainDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.obtainDependencies"></a>

```typescript
public obtainDependencies(): (CfnResource | Stack)[]
```

Retrieves an array of resources this resource depends on.

This assembles dependencies on resources across stacks (including nested stacks)
automatically.

##### `obtainResourceDependencies` <a name="obtainResourceDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.obtainResourceDependencies"></a>

```typescript
public obtainResourceDependencies(): CfnResource[]
```

Get a shallow copy of dependencies between this resource and other resources in the same stack.

##### `removeDependency` <a name="removeDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.removeDependency"></a>

```typescript
public removeDependency(target: CfnResource): void
```

Indicates that this resource no longer depends on another resource.

This can be used for resources across stacks (including nested stacks)
and the dependency will automatically be removed from the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.removeDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `replaceDependency` <a name="replaceDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.replaceDependency"></a>

```typescript
public replaceDependency(target: CfnResource, newTarget: CfnResource): void
```

Replaces one dependency with another.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.replaceDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

The dependency to replace.

---

###### `newTarget`<sup>Required</sup> <a name="newTarget" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.replaceDependency.parameter.newTarget"></a>

- *Type:* aws-cdk-lib.CfnResource

The new dependency to add.

---

##### `inspect` <a name="inspect" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.inspect"></a>

```typescript
public inspect(inspector: TreeInspector): void
```

Examines the CloudFormation resource and discloses attributes.

###### `inspector`<sup>Required</sup> <a name="inspector" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.inspect.parameter.inspector"></a>

- *Type:* aws-cdk-lib.TreeInspector

tree inspector to collect and process attributes.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isCfnElement">isCfnElement</a></code> | Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isCfnResource">isCfnResource</a></code> | Check whether the given object is a CfnResource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isCfnConnection">isCfnConnection</a></code> | Checks whether the given object is a CfnConnection. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isConstruct"></a>

```typescript
import { GlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

GlueConnection.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isCfnElement` <a name="isCfnElement" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isCfnElement"></a>

```typescript
import { GlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

GlueConnection.isCfnElement(x: any)
```

Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template).

Uses duck-typing instead of `instanceof` to allow stack elements from different
versions of this library to be included in the same stack.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isCfnElement.parameter.x"></a>

- *Type:* any

---

##### `isCfnResource` <a name="isCfnResource" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isCfnResource"></a>

```typescript
import { GlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

GlueConnection.isCfnResource(x: any)
```

Check whether the given object is a CfnResource.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isCfnResource.parameter.x"></a>

- *Type:* any

---

##### `isCfnConnection` <a name="isCfnConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isCfnConnection"></a>

```typescript
import { GlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

GlueConnection.isCfnConnection(x: any)
```

Checks whether the given object is a CfnConnection.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.isCfnConnection.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.creationStack">creationStack</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.logicalId">logicalId</a></code> | <code>string</code> | The logical ID for this CloudFormation stack element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this element is defined. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.ref">ref</a></code> | <code>string</code> | Return a string that will be resolved to a CloudFormation `{ Ref }` for this element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.cfnOptions">cfnOptions</a></code> | <code>aws-cdk-lib.ICfnResourceOptions</code> | Options for this resource, such as condition, update policy etc. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.cfnResourceType">cfnResourceType</a></code> | <code>string</code> | AWS resource type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.env">env</a></code> | <code>aws-cdk-lib.interfaces.ResourceEnvironment</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrConnectionId">attrConnectionId</a></code> | <code>string</code> | The ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrDomainId">attrDomainId</a></code> | <code>string</code> | The domain ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrDomainUnitId">attrDomainUnitId</a></code> | <code>string</code> | The domain unit ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrEnvironmentId">attrEnvironmentId</a></code> | <code>string</code> | The ID of the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrEnvironmentUserRole">attrEnvironmentUserRole</a></code> | <code>string</code> | The environment user role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrProjectId">attrProjectId</a></code> | <code>string</code> | The ID of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrType">attrType</a></code> | <code>string</code> | The type of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.connectionRef">connectionRef</a></code> | <code>aws-cdk-lib.interfaces.aws_datazone.ConnectionReference</code> | A reference to a Connection resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.awsLocation">awsLocation</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty</code> | The location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.configurations">configurations</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Specifies whether the trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The identifier of the project in which the connection should be created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.props">props</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty</code> | Connection props. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.scope">scope</a></code> | <code>string</code> | The scope of the connection. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `creationStack`<sup>Required</sup> <a name="creationStack" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.creationStack"></a>

```typescript
public readonly creationStack: string[];
```

- *Type:* string[]

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

The logical ID for this CloudFormation stack element.

The logical ID of the element
is calculated from the path of the resource node in the construct tree.

To override this value, use `overrideLogicalId(newLogicalId)`.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this element is defined.

CfnElements must be defined within a stack scope (directly or indirectly).

---

##### `ref`<sup>Required</sup> <a name="ref" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Return a string that will be resolved to a CloudFormation `{ Ref }` for this element.

If, by any chance, the intrinsic reference of a resource is not a string, you could
coerce it to an IResolvable through `Lazy.any({ produce: resource.ref })`.

---

##### `cfnOptions`<sup>Required</sup> <a name="cfnOptions" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.cfnOptions"></a>

```typescript
public readonly cfnOptions: ICfnResourceOptions;
```

- *Type:* aws-cdk-lib.ICfnResourceOptions

Options for this resource, such as condition, update policy etc.

---

##### `cfnResourceType`<sup>Required</sup> <a name="cfnResourceType" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.cfnResourceType"></a>

```typescript
public readonly cfnResourceType: string;
```

- *Type:* string

AWS resource type.

---

##### `env`<sup>Required</sup> <a name="env" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.interfaces.ResourceEnvironment

---

##### `attrConnectionId`<sup>Required</sup> <a name="attrConnectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrConnectionId"></a>

```typescript
public readonly attrConnectionId: string;
```

- *Type:* string

The ID of the connection.

---

##### `attrDomainId`<sup>Required</sup> <a name="attrDomainId" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrDomainId"></a>

```typescript
public readonly attrDomainId: string;
```

- *Type:* string

The domain ID of the connection.

---

##### `attrDomainUnitId`<sup>Required</sup> <a name="attrDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrDomainUnitId"></a>

```typescript
public readonly attrDomainUnitId: string;
```

- *Type:* string

The domain unit ID of the connection.

---

##### `attrEnvironmentId`<sup>Required</sup> <a name="attrEnvironmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrEnvironmentId"></a>

```typescript
public readonly attrEnvironmentId: string;
```

- *Type:* string

The ID of the environment.

---

##### `attrEnvironmentUserRole`<sup>Required</sup> <a name="attrEnvironmentUserRole" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrEnvironmentUserRole"></a>

```typescript
public readonly attrEnvironmentUserRole: string;
```

- *Type:* string

The environment user role.

---

##### `attrProjectId`<sup>Required</sup> <a name="attrProjectId" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrProjectId"></a>

```typescript
public readonly attrProjectId: string;
```

- *Type:* string

The ID of the project.

---

##### `attrType`<sup>Required</sup> <a name="attrType" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.attrType"></a>

```typescript
public readonly attrType: string;
```

- *Type:* string

The type of the connection.

---

##### `connectionRef`<sup>Required</sup> <a name="connectionRef" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.connectionRef"></a>

```typescript
public readonly connectionRef: ConnectionReference;
```

- *Type:* aws-cdk-lib.interfaces.aws_datazone.ConnectionReference

A reference to a Connection resource.

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.awsLocation"></a>

```typescript
public readonly awsLocation: IResolvable | AwsLocationProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty

The location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.configurations"></a>

```typescript
public readonly configurations: IResolvable | (IResolvable | ConnectionConfigurationProperty)[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]

The configurations of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

Specifies whether the trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string

The identifier of the project in which the connection should be created.

---

##### `props`<sup>Optional</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.props"></a>

```typescript
public readonly props: IResolvable | ConnectionPropertiesInputProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty

Connection props.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.scope"></a>

```typescript
public readonly scope: string;
```

- *Type:* string

The scope of the connection.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.CFN_RESOURCE_TYPE_NAME">CFN_RESOURCE_TYPE_NAME</a></code> | <code>string</code> | The CloudFormation resource type name for this resource class. |

---

##### `CFN_RESOURCE_TYPE_NAME`<sup>Required</sup> <a name="CFN_RESOURCE_TYPE_NAME" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnection.property.CFN_RESOURCE_TYPE_NAME"></a>

```typescript
public readonly CFN_RESOURCE_TYPE_NAME: string;
```

- *Type:* string

The CloudFormation resource type name for this resource class.

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


### HyperPodConnection <a name="HyperPodConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection"></a>

A SageMaker Unified Studio HyperPod connection that provides access to a SageMaker HyperPod cluster.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.Initializer"></a>

```typescript
import { HyperPodConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new HyperPodConnection(scope: Construct, id: string, props: HyperPodConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps">HyperPodConnectionProps</a></code> | Connection props. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the connection.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps">HyperPodConnectionProps</a>

Connection props.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addDeletionOverride">addDeletionOverride</a></code> | Syntactic sugar for `addOverride(path, undefined)`. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addDependency">addDependency</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addDependsOn">addDependsOn</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addMetadata">addMetadata</a></code> | Add a value to the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addOverride">addOverride</a></code> | Adds an override to the synthesized CloudFormation resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addPropertyDeletionOverride">addPropertyDeletionOverride</a></code> | Adds an override that deletes the value of a property from the resource definition. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addPropertyOverride">addPropertyOverride</a></code> | Adds an override to a resource property. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.applyCrossStackReferenceStrength">applyCrossStackReferenceStrength</a></code> | Sets the cross-stack reference strength for this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.applyRemovalPolicy">applyRemovalPolicy</a></code> | Sets the deletion policy of the resource based on the removal policy specified. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.cfnPropertyName">cfnPropertyName</a></code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.getAtt">getAtt</a></code> | Returns a token for an runtime attribute of this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.getMetadata">getMetadata</a></code> | Retrieve a value value from the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.obtainDependencies">obtainDependencies</a></code> | Retrieves an array of resources this resource depends on. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.obtainResourceDependencies">obtainResourceDependencies</a></code> | Get a shallow copy of dependencies between this resource and other resources in the same stack. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.removeDependency">removeDependency</a></code> | Indicates that this resource no longer depends on another resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.replaceDependency">replaceDependency</a></code> | Replaces one dependency with another. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.inspect">inspect</a></code> | Examines the CloudFormation resource and discloses attributes. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `addDeletionOverride` <a name="addDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addDeletionOverride"></a>

```typescript
public addDeletionOverride(path: string): void
```

Syntactic sugar for `addOverride(path, undefined)`.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addDeletionOverride.parameter.path"></a>

- *Type:* string

The path of the value to delete.

---

##### `addDependency` <a name="addDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addDependency"></a>

```typescript
public addDependency(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

This can be used for resources across stacks (or nested stack) boundaries
and the dependency will automatically be transferred to the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### ~~`addDependsOn`~~ <a name="addDependsOn" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addDependsOn"></a>

```typescript
public addDependsOn(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addDependsOn.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `addMetadata` <a name="addMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Add a value to the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addOverride` <a name="addOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

Adds an override to the synthesized CloudFormation resource.

To add a
property override, either use `addPropertyOverride` or prefix `path` with
"Properties." (i.e. `Properties.TopicName`).

If the override is nested, separate each nested level using a dot (.) in the path parameter.
If there is an array as part of the nesting, specify the index in the path.

To include a literal `.` in the property name, prefix with a `\`. In most
programming languages you will need to write this as `"\\."` because the
`\` itself will need to be escaped.

For example,
```typescript
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.0.Projection.NonKeyAttributes', ['myattribute']);
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.1.ProjectionType', 'INCLUDE');
```
would add the overrides
```json
"Properties": {
  "GlobalSecondaryIndexes": [
    {
      "Projection": {
        "NonKeyAttributes": [ "myattribute" ]
        ...
      }
      ...
    },
    {
      "ProjectionType": "INCLUDE"
      ...
    },
  ]
  ...
}
```

The `value` argument to `addOverride` will not be processed or translated
in any way. Pass raw JSON values in here with the correct capitalization
for CloudFormation. If you pass CDK classes or structs, they will be
rendered with lowercased key names, and CloudFormation will reject the
template.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addOverride.parameter.path"></a>

- *Type:* string

The path of the property, you can use dot notation to override values in complex types.

Any intermediate keys
will be created as needed.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addOverride.parameter.value"></a>

- *Type:* any

The value.

Could be primitive or complex.

---

##### `addPropertyDeletionOverride` <a name="addPropertyDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addPropertyDeletionOverride"></a>

```typescript
public addPropertyDeletionOverride(propertyPath: string): void
```

Adds an override that deletes the value of a property from the resource definition.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addPropertyDeletionOverride.parameter.propertyPath"></a>

- *Type:* string

The path to the property.

---

##### `addPropertyOverride` <a name="addPropertyOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addPropertyOverride"></a>

```typescript
public addPropertyOverride(propertyPath: string, value: any): void
```

Adds an override to a resource property.

Syntactic sugar for `addOverride("Properties.<...>", value)`.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addPropertyOverride.parameter.propertyPath"></a>

- *Type:* string

The path of the property.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.addPropertyOverride.parameter.value"></a>

- *Type:* any

The value.

---

##### `applyCrossStackReferenceStrength` <a name="applyCrossStackReferenceStrength" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.applyCrossStackReferenceStrength"></a>

```typescript
public applyCrossStackReferenceStrength(strength: ReferenceStrength): void
```

Sets the cross-stack reference strength for this resource.

When set, any cross-stack reference to this resource will use the specified
strength instead of the global default from the consuming stack's context.

###### `strength`<sup>Required</sup> <a name="strength" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.applyCrossStackReferenceStrength.parameter.strength"></a>

- *Type:* aws-cdk-lib.ReferenceStrength

The reference strength to use for this resource.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy?: RemovalPolicy, options?: RemovalPolicyOptions): void
```

Sets the deletion policy of the resource based on the removal policy specified.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`). In some
cases, a snapshot can be taken of the resource prior to deletion
(`RemovalPolicy.SNAPSHOT`). A list of resources that support this policy
can be found in the following link:

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options)

###### `policy`<sup>Optional</sup> <a name="policy" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

###### `options`<sup>Optional</sup> <a name="options" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.applyRemovalPolicy.parameter.options"></a>

- *Type:* aws-cdk-lib.RemovalPolicyOptions

---

##### `cfnPropertyName` <a name="cfnPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.cfnPropertyName"></a>

```typescript
public cfnPropertyName(cdkPropertyName: string): string
```

###### `cdkPropertyName`<sup>Required</sup> <a name="cdkPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.cfnPropertyName.parameter.cdkPropertyName"></a>

- *Type:* string

---

##### `getAtt` <a name="getAtt" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.getAtt"></a>

```typescript
public getAtt(attributeName: string, typeHint?: ResolutionTypeHint): Reference
```

Returns a token for an runtime attribute of this resource.

Ideally, use generated attribute accessors (e.g. `resource.arn`), but this can be used for future compatibility
in case there is no generated attribute.

###### `attributeName`<sup>Required</sup> <a name="attributeName" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.getAtt.parameter.attributeName"></a>

- *Type:* string

The name of the attribute.

---

###### `typeHint`<sup>Optional</sup> <a name="typeHint" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.getAtt.parameter.typeHint"></a>

- *Type:* aws-cdk-lib.ResolutionTypeHint

---

##### `getMetadata` <a name="getMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.getMetadata"></a>

```typescript
public getMetadata(key: string): any
```

Retrieve a value value from the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.getMetadata.parameter.key"></a>

- *Type:* string

---

##### `obtainDependencies` <a name="obtainDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.obtainDependencies"></a>

```typescript
public obtainDependencies(): (CfnResource | Stack)[]
```

Retrieves an array of resources this resource depends on.

This assembles dependencies on resources across stacks (including nested stacks)
automatically.

##### `obtainResourceDependencies` <a name="obtainResourceDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.obtainResourceDependencies"></a>

```typescript
public obtainResourceDependencies(): CfnResource[]
```

Get a shallow copy of dependencies between this resource and other resources in the same stack.

##### `removeDependency` <a name="removeDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.removeDependency"></a>

```typescript
public removeDependency(target: CfnResource): void
```

Indicates that this resource no longer depends on another resource.

This can be used for resources across stacks (including nested stacks)
and the dependency will automatically be removed from the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.removeDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `replaceDependency` <a name="replaceDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.replaceDependency"></a>

```typescript
public replaceDependency(target: CfnResource, newTarget: CfnResource): void
```

Replaces one dependency with another.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.replaceDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

The dependency to replace.

---

###### `newTarget`<sup>Required</sup> <a name="newTarget" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.replaceDependency.parameter.newTarget"></a>

- *Type:* aws-cdk-lib.CfnResource

The new dependency to add.

---

##### `inspect` <a name="inspect" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.inspect"></a>

```typescript
public inspect(inspector: TreeInspector): void
```

Examines the CloudFormation resource and discloses attributes.

###### `inspector`<sup>Required</sup> <a name="inspector" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.inspect.parameter.inspector"></a>

- *Type:* aws-cdk-lib.TreeInspector

tree inspector to collect and process attributes.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isCfnElement">isCfnElement</a></code> | Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isCfnResource">isCfnResource</a></code> | Check whether the given object is a CfnResource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isCfnConnection">isCfnConnection</a></code> | Checks whether the given object is a CfnConnection. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isConstruct"></a>

```typescript
import { HyperPodConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

HyperPodConnection.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isCfnElement` <a name="isCfnElement" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isCfnElement"></a>

```typescript
import { HyperPodConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

HyperPodConnection.isCfnElement(x: any)
```

Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template).

Uses duck-typing instead of `instanceof` to allow stack elements from different
versions of this library to be included in the same stack.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isCfnElement.parameter.x"></a>

- *Type:* any

---

##### `isCfnResource` <a name="isCfnResource" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isCfnResource"></a>

```typescript
import { HyperPodConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

HyperPodConnection.isCfnResource(x: any)
```

Check whether the given object is a CfnResource.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isCfnResource.parameter.x"></a>

- *Type:* any

---

##### `isCfnConnection` <a name="isCfnConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isCfnConnection"></a>

```typescript
import { HyperPodConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

HyperPodConnection.isCfnConnection(x: any)
```

Checks whether the given object is a CfnConnection.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.isCfnConnection.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.creationStack">creationStack</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.logicalId">logicalId</a></code> | <code>string</code> | The logical ID for this CloudFormation stack element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this element is defined. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.ref">ref</a></code> | <code>string</code> | Return a string that will be resolved to a CloudFormation `{ Ref }` for this element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.cfnOptions">cfnOptions</a></code> | <code>aws-cdk-lib.ICfnResourceOptions</code> | Options for this resource, such as condition, update policy etc. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.cfnResourceType">cfnResourceType</a></code> | <code>string</code> | AWS resource type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.env">env</a></code> | <code>aws-cdk-lib.interfaces.ResourceEnvironment</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrConnectionId">attrConnectionId</a></code> | <code>string</code> | The ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrDomainId">attrDomainId</a></code> | <code>string</code> | The domain ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrDomainUnitId">attrDomainUnitId</a></code> | <code>string</code> | The domain unit ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrEnvironmentId">attrEnvironmentId</a></code> | <code>string</code> | The ID of the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrEnvironmentUserRole">attrEnvironmentUserRole</a></code> | <code>string</code> | The environment user role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrProjectId">attrProjectId</a></code> | <code>string</code> | The ID of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrType">attrType</a></code> | <code>string</code> | The type of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.connectionRef">connectionRef</a></code> | <code>aws-cdk-lib.interfaces.aws_datazone.ConnectionReference</code> | A reference to a Connection resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.awsLocation">awsLocation</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty</code> | The location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.configurations">configurations</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Specifies whether the trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The identifier of the project in which the connection should be created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.props">props</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty</code> | Connection props. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.scope">scope</a></code> | <code>string</code> | The scope of the connection. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `creationStack`<sup>Required</sup> <a name="creationStack" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.creationStack"></a>

```typescript
public readonly creationStack: string[];
```

- *Type:* string[]

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

The logical ID for this CloudFormation stack element.

The logical ID of the element
is calculated from the path of the resource node in the construct tree.

To override this value, use `overrideLogicalId(newLogicalId)`.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this element is defined.

CfnElements must be defined within a stack scope (directly or indirectly).

---

##### `ref`<sup>Required</sup> <a name="ref" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Return a string that will be resolved to a CloudFormation `{ Ref }` for this element.

If, by any chance, the intrinsic reference of a resource is not a string, you could
coerce it to an IResolvable through `Lazy.any({ produce: resource.ref })`.

---

##### `cfnOptions`<sup>Required</sup> <a name="cfnOptions" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.cfnOptions"></a>

```typescript
public readonly cfnOptions: ICfnResourceOptions;
```

- *Type:* aws-cdk-lib.ICfnResourceOptions

Options for this resource, such as condition, update policy etc.

---

##### `cfnResourceType`<sup>Required</sup> <a name="cfnResourceType" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.cfnResourceType"></a>

```typescript
public readonly cfnResourceType: string;
```

- *Type:* string

AWS resource type.

---

##### `env`<sup>Required</sup> <a name="env" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.interfaces.ResourceEnvironment

---

##### `attrConnectionId`<sup>Required</sup> <a name="attrConnectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrConnectionId"></a>

```typescript
public readonly attrConnectionId: string;
```

- *Type:* string

The ID of the connection.

---

##### `attrDomainId`<sup>Required</sup> <a name="attrDomainId" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrDomainId"></a>

```typescript
public readonly attrDomainId: string;
```

- *Type:* string

The domain ID of the connection.

---

##### `attrDomainUnitId`<sup>Required</sup> <a name="attrDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrDomainUnitId"></a>

```typescript
public readonly attrDomainUnitId: string;
```

- *Type:* string

The domain unit ID of the connection.

---

##### `attrEnvironmentId`<sup>Required</sup> <a name="attrEnvironmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrEnvironmentId"></a>

```typescript
public readonly attrEnvironmentId: string;
```

- *Type:* string

The ID of the environment.

---

##### `attrEnvironmentUserRole`<sup>Required</sup> <a name="attrEnvironmentUserRole" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrEnvironmentUserRole"></a>

```typescript
public readonly attrEnvironmentUserRole: string;
```

- *Type:* string

The environment user role.

---

##### `attrProjectId`<sup>Required</sup> <a name="attrProjectId" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrProjectId"></a>

```typescript
public readonly attrProjectId: string;
```

- *Type:* string

The ID of the project.

---

##### `attrType`<sup>Required</sup> <a name="attrType" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.attrType"></a>

```typescript
public readonly attrType: string;
```

- *Type:* string

The type of the connection.

---

##### `connectionRef`<sup>Required</sup> <a name="connectionRef" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.connectionRef"></a>

```typescript
public readonly connectionRef: ConnectionReference;
```

- *Type:* aws-cdk-lib.interfaces.aws_datazone.ConnectionReference

A reference to a Connection resource.

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.awsLocation"></a>

```typescript
public readonly awsLocation: IResolvable | AwsLocationProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty

The location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.configurations"></a>

```typescript
public readonly configurations: IResolvable | (IResolvable | ConnectionConfigurationProperty)[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]

The configurations of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

Specifies whether the trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string

The identifier of the project in which the connection should be created.

---

##### `props`<sup>Optional</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.props"></a>

```typescript
public readonly props: IResolvable | ConnectionPropertiesInputProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty

Connection props.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.scope"></a>

```typescript
public readonly scope: string;
```

- *Type:* string

The scope of the connection.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.CFN_RESOURCE_TYPE_NAME">CFN_RESOURCE_TYPE_NAME</a></code> | <code>string</code> | The CloudFormation resource type name for this resource class. |

---

##### `CFN_RESOURCE_TYPE_NAME`<sup>Required</sup> <a name="CFN_RESOURCE_TYPE_NAME" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnection.property.CFN_RESOURCE_TYPE_NAME"></a>

```typescript
public readonly CFN_RESOURCE_TYPE_NAME: string;
```

- *Type:* string

The CloudFormation resource type name for this resource class.

---

### IamConnection <a name="IamConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection"></a>

A SageMaker Unified Studio IAM connection that provides cross-account access via an IAM role.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/compute-prerequisite-redshift.html#compute-prerequisite-redshift-other-account](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/compute-prerequisite-redshift.html#compute-prerequisite-redshift-other-account)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.Initializer"></a>

```typescript
import { IamConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new IamConnection(scope: Construct, id: string, props: IamConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps">IamConnectionProps</a></code> | Connection props. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the connection.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps">IamConnectionProps</a>

Connection props.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addDeletionOverride">addDeletionOverride</a></code> | Syntactic sugar for `addOverride(path, undefined)`. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addDependency">addDependency</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addDependsOn">addDependsOn</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addMetadata">addMetadata</a></code> | Add a value to the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addOverride">addOverride</a></code> | Adds an override to the synthesized CloudFormation resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addPropertyDeletionOverride">addPropertyDeletionOverride</a></code> | Adds an override that deletes the value of a property from the resource definition. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addPropertyOverride">addPropertyOverride</a></code> | Adds an override to a resource property. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.applyCrossStackReferenceStrength">applyCrossStackReferenceStrength</a></code> | Sets the cross-stack reference strength for this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.applyRemovalPolicy">applyRemovalPolicy</a></code> | Sets the deletion policy of the resource based on the removal policy specified. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.cfnPropertyName">cfnPropertyName</a></code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.getAtt">getAtt</a></code> | Returns a token for an runtime attribute of this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.getMetadata">getMetadata</a></code> | Retrieve a value value from the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.obtainDependencies">obtainDependencies</a></code> | Retrieves an array of resources this resource depends on. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.obtainResourceDependencies">obtainResourceDependencies</a></code> | Get a shallow copy of dependencies between this resource and other resources in the same stack. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.removeDependency">removeDependency</a></code> | Indicates that this resource no longer depends on another resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.replaceDependency">replaceDependency</a></code> | Replaces one dependency with another. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.inspect">inspect</a></code> | Examines the CloudFormation resource and discloses attributes. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `addDeletionOverride` <a name="addDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addDeletionOverride"></a>

```typescript
public addDeletionOverride(path: string): void
```

Syntactic sugar for `addOverride(path, undefined)`.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addDeletionOverride.parameter.path"></a>

- *Type:* string

The path of the value to delete.

---

##### `addDependency` <a name="addDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addDependency"></a>

```typescript
public addDependency(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

This can be used for resources across stacks (or nested stack) boundaries
and the dependency will automatically be transferred to the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### ~~`addDependsOn`~~ <a name="addDependsOn" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addDependsOn"></a>

```typescript
public addDependsOn(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addDependsOn.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `addMetadata` <a name="addMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Add a value to the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addOverride` <a name="addOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

Adds an override to the synthesized CloudFormation resource.

To add a
property override, either use `addPropertyOverride` or prefix `path` with
"Properties." (i.e. `Properties.TopicName`).

If the override is nested, separate each nested level using a dot (.) in the path parameter.
If there is an array as part of the nesting, specify the index in the path.

To include a literal `.` in the property name, prefix with a `\`. In most
programming languages you will need to write this as `"\\."` because the
`\` itself will need to be escaped.

For example,
```typescript
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.0.Projection.NonKeyAttributes', ['myattribute']);
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.1.ProjectionType', 'INCLUDE');
```
would add the overrides
```json
"Properties": {
  "GlobalSecondaryIndexes": [
    {
      "Projection": {
        "NonKeyAttributes": [ "myattribute" ]
        ...
      }
      ...
    },
    {
      "ProjectionType": "INCLUDE"
      ...
    },
  ]
  ...
}
```

The `value` argument to `addOverride` will not be processed or translated
in any way. Pass raw JSON values in here with the correct capitalization
for CloudFormation. If you pass CDK classes or structs, they will be
rendered with lowercased key names, and CloudFormation will reject the
template.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addOverride.parameter.path"></a>

- *Type:* string

The path of the property, you can use dot notation to override values in complex types.

Any intermediate keys
will be created as needed.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addOverride.parameter.value"></a>

- *Type:* any

The value.

Could be primitive or complex.

---

##### `addPropertyDeletionOverride` <a name="addPropertyDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addPropertyDeletionOverride"></a>

```typescript
public addPropertyDeletionOverride(propertyPath: string): void
```

Adds an override that deletes the value of a property from the resource definition.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addPropertyDeletionOverride.parameter.propertyPath"></a>

- *Type:* string

The path to the property.

---

##### `addPropertyOverride` <a name="addPropertyOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addPropertyOverride"></a>

```typescript
public addPropertyOverride(propertyPath: string, value: any): void
```

Adds an override to a resource property.

Syntactic sugar for `addOverride("Properties.<...>", value)`.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addPropertyOverride.parameter.propertyPath"></a>

- *Type:* string

The path of the property.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.addPropertyOverride.parameter.value"></a>

- *Type:* any

The value.

---

##### `applyCrossStackReferenceStrength` <a name="applyCrossStackReferenceStrength" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.applyCrossStackReferenceStrength"></a>

```typescript
public applyCrossStackReferenceStrength(strength: ReferenceStrength): void
```

Sets the cross-stack reference strength for this resource.

When set, any cross-stack reference to this resource will use the specified
strength instead of the global default from the consuming stack's context.

###### `strength`<sup>Required</sup> <a name="strength" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.applyCrossStackReferenceStrength.parameter.strength"></a>

- *Type:* aws-cdk-lib.ReferenceStrength

The reference strength to use for this resource.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy?: RemovalPolicy, options?: RemovalPolicyOptions): void
```

Sets the deletion policy of the resource based on the removal policy specified.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`). In some
cases, a snapshot can be taken of the resource prior to deletion
(`RemovalPolicy.SNAPSHOT`). A list of resources that support this policy
can be found in the following link:

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options)

###### `policy`<sup>Optional</sup> <a name="policy" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

###### `options`<sup>Optional</sup> <a name="options" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.applyRemovalPolicy.parameter.options"></a>

- *Type:* aws-cdk-lib.RemovalPolicyOptions

---

##### `cfnPropertyName` <a name="cfnPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.cfnPropertyName"></a>

```typescript
public cfnPropertyName(cdkPropertyName: string): string
```

###### `cdkPropertyName`<sup>Required</sup> <a name="cdkPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.cfnPropertyName.parameter.cdkPropertyName"></a>

- *Type:* string

---

##### `getAtt` <a name="getAtt" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.getAtt"></a>

```typescript
public getAtt(attributeName: string, typeHint?: ResolutionTypeHint): Reference
```

Returns a token for an runtime attribute of this resource.

Ideally, use generated attribute accessors (e.g. `resource.arn`), but this can be used for future compatibility
in case there is no generated attribute.

###### `attributeName`<sup>Required</sup> <a name="attributeName" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.getAtt.parameter.attributeName"></a>

- *Type:* string

The name of the attribute.

---

###### `typeHint`<sup>Optional</sup> <a name="typeHint" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.getAtt.parameter.typeHint"></a>

- *Type:* aws-cdk-lib.ResolutionTypeHint

---

##### `getMetadata` <a name="getMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.getMetadata"></a>

```typescript
public getMetadata(key: string): any
```

Retrieve a value value from the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.getMetadata.parameter.key"></a>

- *Type:* string

---

##### `obtainDependencies` <a name="obtainDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.obtainDependencies"></a>

```typescript
public obtainDependencies(): (CfnResource | Stack)[]
```

Retrieves an array of resources this resource depends on.

This assembles dependencies on resources across stacks (including nested stacks)
automatically.

##### `obtainResourceDependencies` <a name="obtainResourceDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.obtainResourceDependencies"></a>

```typescript
public obtainResourceDependencies(): CfnResource[]
```

Get a shallow copy of dependencies between this resource and other resources in the same stack.

##### `removeDependency` <a name="removeDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.removeDependency"></a>

```typescript
public removeDependency(target: CfnResource): void
```

Indicates that this resource no longer depends on another resource.

This can be used for resources across stacks (including nested stacks)
and the dependency will automatically be removed from the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.removeDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `replaceDependency` <a name="replaceDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.replaceDependency"></a>

```typescript
public replaceDependency(target: CfnResource, newTarget: CfnResource): void
```

Replaces one dependency with another.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.replaceDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

The dependency to replace.

---

###### `newTarget`<sup>Required</sup> <a name="newTarget" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.replaceDependency.parameter.newTarget"></a>

- *Type:* aws-cdk-lib.CfnResource

The new dependency to add.

---

##### `inspect` <a name="inspect" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.inspect"></a>

```typescript
public inspect(inspector: TreeInspector): void
```

Examines the CloudFormation resource and discloses attributes.

###### `inspector`<sup>Required</sup> <a name="inspector" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.inspect.parameter.inspector"></a>

- *Type:* aws-cdk-lib.TreeInspector

tree inspector to collect and process attributes.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isCfnElement">isCfnElement</a></code> | Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isCfnResource">isCfnResource</a></code> | Check whether the given object is a CfnResource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isCfnConnection">isCfnConnection</a></code> | Checks whether the given object is a CfnConnection. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isConstruct"></a>

```typescript
import { IamConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

IamConnection.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isCfnElement` <a name="isCfnElement" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isCfnElement"></a>

```typescript
import { IamConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

IamConnection.isCfnElement(x: any)
```

Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template).

Uses duck-typing instead of `instanceof` to allow stack elements from different
versions of this library to be included in the same stack.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isCfnElement.parameter.x"></a>

- *Type:* any

---

##### `isCfnResource` <a name="isCfnResource" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isCfnResource"></a>

```typescript
import { IamConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

IamConnection.isCfnResource(x: any)
```

Check whether the given object is a CfnResource.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isCfnResource.parameter.x"></a>

- *Type:* any

---

##### `isCfnConnection` <a name="isCfnConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isCfnConnection"></a>

```typescript
import { IamConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

IamConnection.isCfnConnection(x: any)
```

Checks whether the given object is a CfnConnection.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.isCfnConnection.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.creationStack">creationStack</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.logicalId">logicalId</a></code> | <code>string</code> | The logical ID for this CloudFormation stack element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this element is defined. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.ref">ref</a></code> | <code>string</code> | Return a string that will be resolved to a CloudFormation `{ Ref }` for this element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.cfnOptions">cfnOptions</a></code> | <code>aws-cdk-lib.ICfnResourceOptions</code> | Options for this resource, such as condition, update policy etc. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.cfnResourceType">cfnResourceType</a></code> | <code>string</code> | AWS resource type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.env">env</a></code> | <code>aws-cdk-lib.interfaces.ResourceEnvironment</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrConnectionId">attrConnectionId</a></code> | <code>string</code> | The ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrDomainId">attrDomainId</a></code> | <code>string</code> | The domain ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrDomainUnitId">attrDomainUnitId</a></code> | <code>string</code> | The domain unit ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrEnvironmentId">attrEnvironmentId</a></code> | <code>string</code> | The ID of the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrEnvironmentUserRole">attrEnvironmentUserRole</a></code> | <code>string</code> | The environment user role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrProjectId">attrProjectId</a></code> | <code>string</code> | The ID of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrType">attrType</a></code> | <code>string</code> | The type of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.connectionRef">connectionRef</a></code> | <code>aws-cdk-lib.interfaces.aws_datazone.ConnectionReference</code> | A reference to a Connection resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.awsLocation">awsLocation</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty</code> | The location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.configurations">configurations</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Specifies whether the trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The identifier of the project in which the connection should be created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.props">props</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty</code> | Connection props. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.scope">scope</a></code> | <code>string</code> | The scope of the connection. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `creationStack`<sup>Required</sup> <a name="creationStack" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.creationStack"></a>

```typescript
public readonly creationStack: string[];
```

- *Type:* string[]

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

The logical ID for this CloudFormation stack element.

The logical ID of the element
is calculated from the path of the resource node in the construct tree.

To override this value, use `overrideLogicalId(newLogicalId)`.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this element is defined.

CfnElements must be defined within a stack scope (directly or indirectly).

---

##### `ref`<sup>Required</sup> <a name="ref" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Return a string that will be resolved to a CloudFormation `{ Ref }` for this element.

If, by any chance, the intrinsic reference of a resource is not a string, you could
coerce it to an IResolvable through `Lazy.any({ produce: resource.ref })`.

---

##### `cfnOptions`<sup>Required</sup> <a name="cfnOptions" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.cfnOptions"></a>

```typescript
public readonly cfnOptions: ICfnResourceOptions;
```

- *Type:* aws-cdk-lib.ICfnResourceOptions

Options for this resource, such as condition, update policy etc.

---

##### `cfnResourceType`<sup>Required</sup> <a name="cfnResourceType" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.cfnResourceType"></a>

```typescript
public readonly cfnResourceType: string;
```

- *Type:* string

AWS resource type.

---

##### `env`<sup>Required</sup> <a name="env" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.interfaces.ResourceEnvironment

---

##### `attrConnectionId`<sup>Required</sup> <a name="attrConnectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrConnectionId"></a>

```typescript
public readonly attrConnectionId: string;
```

- *Type:* string

The ID of the connection.

---

##### `attrDomainId`<sup>Required</sup> <a name="attrDomainId" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrDomainId"></a>

```typescript
public readonly attrDomainId: string;
```

- *Type:* string

The domain ID of the connection.

---

##### `attrDomainUnitId`<sup>Required</sup> <a name="attrDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrDomainUnitId"></a>

```typescript
public readonly attrDomainUnitId: string;
```

- *Type:* string

The domain unit ID of the connection.

---

##### `attrEnvironmentId`<sup>Required</sup> <a name="attrEnvironmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrEnvironmentId"></a>

```typescript
public readonly attrEnvironmentId: string;
```

- *Type:* string

The ID of the environment.

---

##### `attrEnvironmentUserRole`<sup>Required</sup> <a name="attrEnvironmentUserRole" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrEnvironmentUserRole"></a>

```typescript
public readonly attrEnvironmentUserRole: string;
```

- *Type:* string

The environment user role.

---

##### `attrProjectId`<sup>Required</sup> <a name="attrProjectId" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrProjectId"></a>

```typescript
public readonly attrProjectId: string;
```

- *Type:* string

The ID of the project.

---

##### `attrType`<sup>Required</sup> <a name="attrType" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.attrType"></a>

```typescript
public readonly attrType: string;
```

- *Type:* string

The type of the connection.

---

##### `connectionRef`<sup>Required</sup> <a name="connectionRef" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.connectionRef"></a>

```typescript
public readonly connectionRef: ConnectionReference;
```

- *Type:* aws-cdk-lib.interfaces.aws_datazone.ConnectionReference

A reference to a Connection resource.

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.awsLocation"></a>

```typescript
public readonly awsLocation: IResolvable | AwsLocationProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty

The location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.configurations"></a>

```typescript
public readonly configurations: IResolvable | (IResolvable | ConnectionConfigurationProperty)[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]

The configurations of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

Specifies whether the trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string

The identifier of the project in which the connection should be created.

---

##### `props`<sup>Optional</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.props"></a>

```typescript
public readonly props: IResolvable | ConnectionPropertiesInputProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty

Connection props.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.scope"></a>

```typescript
public readonly scope: string;
```

- *Type:* string

The scope of the connection.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.CFN_RESOURCE_TYPE_NAME">CFN_RESOURCE_TYPE_NAME</a></code> | <code>string</code> | The CloudFormation resource type name for this resource class. |

---

##### `CFN_RESOURCE_TYPE_NAME`<sup>Required</sup> <a name="CFN_RESOURCE_TYPE_NAME" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnection.property.CFN_RESOURCE_TYPE_NAME"></a>

```typescript
public readonly CFN_RESOURCE_TYPE_NAME: string;
```

- *Type:* string

The CloudFormation resource type name for this resource class.

---

### Project <a name="Project" id="@tonesingleton/cdk-sagemaker-unified-studio.Project"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject">IProject</a>

A SageMaker Unified Studio project within a domain.

Projects enable a group of users to collaborate on various business use cases that involve publishing,
discovering, subscribing to, and consuming data in the Amazon SageMaker Unified Studio catalog.
Project members consume assets from the Amazon SageMaker Unified Studio catalog and produce new assets
using one or more analytical workflows.

The construct always ensures a project execution role exists — either provided via `projectExecutionRole`
or auto-created with the necessary trust policy for SageMaker Unified Studio services.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/projects.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/projects.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer"></a>

```typescript
import { Project } from '@tonesingleton/cdk-sagemaker-unified-studio'

new Project(scope: Construct, id: string, props: ProjectProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.id">id</a></code> | <code>string</code> | The identifier of a project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps">ProjectProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.Initializer.parameter.id"></a>

- *Type:* string

The identifier of a project.

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.fromAttributes">fromAttributes</a></code> | Import an existing project from its attributes. |

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

##### `fromAttributes` <a name="fromAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.fromAttributes"></a>

```typescript
import { Project } from '@tonesingleton/cdk-sagemaker-unified-studio'

Project.fromAttributes(scope: Construct, id: string, attrs: ProjectAttributes)
```

Import an existing project from its attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.fromAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.fromAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.fromAttributes.parameter.attrs"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectAttributes">ProjectAttributes</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.createdAt">createdAt</a></code> | <code>string</code> | The timestamp of when the project was created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.createdBy">createdBy</a></code> | <code>string</code> | The Amazon DataZone user who created the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.domainId">domainId</a></code> | <code>string</code> | The identifier of the domain where the project exists. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.id">id</a></code> | <code>string</code> | The identifier of a project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.lastUpdatedAt">lastUpdatedAt</a></code> | <code>string</code> | The timestamp of when the project was last updated. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.projectExecutionRole">projectExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The project execution role (provided or auto-created). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Project.property.projectStatus">projectStatus</a></code> | <code>string</code> | The status of the project. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `createdAt`<sup>Required</sup> <a name="createdAt" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.createdAt"></a>

```typescript
public readonly createdAt: string;
```

- *Type:* string

The timestamp of when the project was created.

---

##### `createdBy`<sup>Required</sup> <a name="createdBy" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.createdBy"></a>

```typescript
public readonly createdBy: string;
```

- *Type:* string

The Amazon DataZone user who created the project.

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The identifier of the domain where the project exists.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

The identifier of a project.

---

##### `lastUpdatedAt`<sup>Required</sup> <a name="lastUpdatedAt" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.lastUpdatedAt"></a>

```typescript
public readonly lastUpdatedAt: string;
```

- *Type:* string

The timestamp of when the project was last updated.

---

##### `projectExecutionRole`<sup>Required</sup> <a name="projectExecutionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.projectExecutionRole"></a>

```typescript
public readonly projectExecutionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The project execution role (provided or auto-created).

---

##### `projectStatus`<sup>Required</sup> <a name="projectStatus" id="@tonesingleton/cdk-sagemaker-unified-studio.Project.property.projectStatus"></a>

```typescript
public readonly projectStatus: string;
```

- *Type:* string

The status of the project.

---


### ProjectDatabase <a name="ProjectDatabase" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProjectDatabase">IProjectDatabase</a>

Creates a Glue database and grants Lake Formation permissions to the project execution role.

This construct replicates what SageMaker Unified Studio does when a user creates
a database via the UI: it creates the Glue database and grants the project execution
role full Lake Formation permissions on it.

Uses CfnPrincipalPermissions (the recommended API) instead of the deprecated
CfnPermissions for proper table wildcard permission propagation.

> [https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-databases.html](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-databases.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.Initializer"></a>

```typescript
import { ProjectDatabase } from '@tonesingleton/cdk-sagemaker-unified-studio'

new ProjectDatabase(scope: Construct, id: string, props: ProjectDatabaseProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps">ProjectDatabaseProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps">ProjectDatabaseProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.isConstruct"></a>

```typescript
import { ProjectDatabase } from '@tonesingleton/cdk-sagemaker-unified-studio'

ProjectDatabase.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.property.databaseName">databaseName</a></code> | <code>string</code> | The name of the Glue database. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The name of the Glue database.

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.fromAttributes">fromAttributes</a></code> | Import an existing project profile from its attributes. |

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

##### `fromAttributes` <a name="fromAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.fromAttributes"></a>

```typescript
import { ProjectProfile } from '@tonesingleton/cdk-sagemaker-unified-studio'

ProjectProfile.fromAttributes(scope: Construct, id: string, attrs: ProjectProfileAttributes)
```

Import an existing project profile from its attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.fromAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.fromAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfile.fromAttributes.parameter.attrs"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileAttributes">ProjectProfileAttributes</a>

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


### RedshiftConnection <a name="RedshiftConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection"></a>

A SageMaker Unified Studio Redshift connection that provides access to an Amazon Redshift cluster.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.Initializer"></a>

```typescript
import { RedshiftConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new RedshiftConnection(scope: Construct, id: string, props: RedshiftConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps">RedshiftConnectionProps</a></code> | Connection props. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the connection.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps">RedshiftConnectionProps</a>

Connection props.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addDeletionOverride">addDeletionOverride</a></code> | Syntactic sugar for `addOverride(path, undefined)`. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addDependency">addDependency</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addDependsOn">addDependsOn</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addMetadata">addMetadata</a></code> | Add a value to the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addOverride">addOverride</a></code> | Adds an override to the synthesized CloudFormation resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addPropertyDeletionOverride">addPropertyDeletionOverride</a></code> | Adds an override that deletes the value of a property from the resource definition. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addPropertyOverride">addPropertyOverride</a></code> | Adds an override to a resource property. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.applyCrossStackReferenceStrength">applyCrossStackReferenceStrength</a></code> | Sets the cross-stack reference strength for this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.applyRemovalPolicy">applyRemovalPolicy</a></code> | Sets the deletion policy of the resource based on the removal policy specified. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.cfnPropertyName">cfnPropertyName</a></code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.getAtt">getAtt</a></code> | Returns a token for an runtime attribute of this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.getMetadata">getMetadata</a></code> | Retrieve a value value from the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.obtainDependencies">obtainDependencies</a></code> | Retrieves an array of resources this resource depends on. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.obtainResourceDependencies">obtainResourceDependencies</a></code> | Get a shallow copy of dependencies between this resource and other resources in the same stack. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.removeDependency">removeDependency</a></code> | Indicates that this resource no longer depends on another resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.replaceDependency">replaceDependency</a></code> | Replaces one dependency with another. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.inspect">inspect</a></code> | Examines the CloudFormation resource and discloses attributes. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `addDeletionOverride` <a name="addDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addDeletionOverride"></a>

```typescript
public addDeletionOverride(path: string): void
```

Syntactic sugar for `addOverride(path, undefined)`.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addDeletionOverride.parameter.path"></a>

- *Type:* string

The path of the value to delete.

---

##### `addDependency` <a name="addDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addDependency"></a>

```typescript
public addDependency(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

This can be used for resources across stacks (or nested stack) boundaries
and the dependency will automatically be transferred to the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### ~~`addDependsOn`~~ <a name="addDependsOn" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addDependsOn"></a>

```typescript
public addDependsOn(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addDependsOn.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `addMetadata` <a name="addMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Add a value to the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addOverride` <a name="addOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

Adds an override to the synthesized CloudFormation resource.

To add a
property override, either use `addPropertyOverride` or prefix `path` with
"Properties." (i.e. `Properties.TopicName`).

If the override is nested, separate each nested level using a dot (.) in the path parameter.
If there is an array as part of the nesting, specify the index in the path.

To include a literal `.` in the property name, prefix with a `\`. In most
programming languages you will need to write this as `"\\."` because the
`\` itself will need to be escaped.

For example,
```typescript
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.0.Projection.NonKeyAttributes', ['myattribute']);
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.1.ProjectionType', 'INCLUDE');
```
would add the overrides
```json
"Properties": {
  "GlobalSecondaryIndexes": [
    {
      "Projection": {
        "NonKeyAttributes": [ "myattribute" ]
        ...
      }
      ...
    },
    {
      "ProjectionType": "INCLUDE"
      ...
    },
  ]
  ...
}
```

The `value` argument to `addOverride` will not be processed or translated
in any way. Pass raw JSON values in here with the correct capitalization
for CloudFormation. If you pass CDK classes or structs, they will be
rendered with lowercased key names, and CloudFormation will reject the
template.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addOverride.parameter.path"></a>

- *Type:* string

The path of the property, you can use dot notation to override values in complex types.

Any intermediate keys
will be created as needed.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addOverride.parameter.value"></a>

- *Type:* any

The value.

Could be primitive or complex.

---

##### `addPropertyDeletionOverride` <a name="addPropertyDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addPropertyDeletionOverride"></a>

```typescript
public addPropertyDeletionOverride(propertyPath: string): void
```

Adds an override that deletes the value of a property from the resource definition.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addPropertyDeletionOverride.parameter.propertyPath"></a>

- *Type:* string

The path to the property.

---

##### `addPropertyOverride` <a name="addPropertyOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addPropertyOverride"></a>

```typescript
public addPropertyOverride(propertyPath: string, value: any): void
```

Adds an override to a resource property.

Syntactic sugar for `addOverride("Properties.<...>", value)`.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addPropertyOverride.parameter.propertyPath"></a>

- *Type:* string

The path of the property.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.addPropertyOverride.parameter.value"></a>

- *Type:* any

The value.

---

##### `applyCrossStackReferenceStrength` <a name="applyCrossStackReferenceStrength" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.applyCrossStackReferenceStrength"></a>

```typescript
public applyCrossStackReferenceStrength(strength: ReferenceStrength): void
```

Sets the cross-stack reference strength for this resource.

When set, any cross-stack reference to this resource will use the specified
strength instead of the global default from the consuming stack's context.

###### `strength`<sup>Required</sup> <a name="strength" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.applyCrossStackReferenceStrength.parameter.strength"></a>

- *Type:* aws-cdk-lib.ReferenceStrength

The reference strength to use for this resource.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy?: RemovalPolicy, options?: RemovalPolicyOptions): void
```

Sets the deletion policy of the resource based on the removal policy specified.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`). In some
cases, a snapshot can be taken of the resource prior to deletion
(`RemovalPolicy.SNAPSHOT`). A list of resources that support this policy
can be found in the following link:

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options)

###### `policy`<sup>Optional</sup> <a name="policy" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

###### `options`<sup>Optional</sup> <a name="options" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.applyRemovalPolicy.parameter.options"></a>

- *Type:* aws-cdk-lib.RemovalPolicyOptions

---

##### `cfnPropertyName` <a name="cfnPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.cfnPropertyName"></a>

```typescript
public cfnPropertyName(cdkPropertyName: string): string
```

###### `cdkPropertyName`<sup>Required</sup> <a name="cdkPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.cfnPropertyName.parameter.cdkPropertyName"></a>

- *Type:* string

---

##### `getAtt` <a name="getAtt" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.getAtt"></a>

```typescript
public getAtt(attributeName: string, typeHint?: ResolutionTypeHint): Reference
```

Returns a token for an runtime attribute of this resource.

Ideally, use generated attribute accessors (e.g. `resource.arn`), but this can be used for future compatibility
in case there is no generated attribute.

###### `attributeName`<sup>Required</sup> <a name="attributeName" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.getAtt.parameter.attributeName"></a>

- *Type:* string

The name of the attribute.

---

###### `typeHint`<sup>Optional</sup> <a name="typeHint" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.getAtt.parameter.typeHint"></a>

- *Type:* aws-cdk-lib.ResolutionTypeHint

---

##### `getMetadata` <a name="getMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.getMetadata"></a>

```typescript
public getMetadata(key: string): any
```

Retrieve a value value from the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.getMetadata.parameter.key"></a>

- *Type:* string

---

##### `obtainDependencies` <a name="obtainDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.obtainDependencies"></a>

```typescript
public obtainDependencies(): (CfnResource | Stack)[]
```

Retrieves an array of resources this resource depends on.

This assembles dependencies on resources across stacks (including nested stacks)
automatically.

##### `obtainResourceDependencies` <a name="obtainResourceDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.obtainResourceDependencies"></a>

```typescript
public obtainResourceDependencies(): CfnResource[]
```

Get a shallow copy of dependencies between this resource and other resources in the same stack.

##### `removeDependency` <a name="removeDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.removeDependency"></a>

```typescript
public removeDependency(target: CfnResource): void
```

Indicates that this resource no longer depends on another resource.

This can be used for resources across stacks (including nested stacks)
and the dependency will automatically be removed from the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.removeDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `replaceDependency` <a name="replaceDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.replaceDependency"></a>

```typescript
public replaceDependency(target: CfnResource, newTarget: CfnResource): void
```

Replaces one dependency with another.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.replaceDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

The dependency to replace.

---

###### `newTarget`<sup>Required</sup> <a name="newTarget" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.replaceDependency.parameter.newTarget"></a>

- *Type:* aws-cdk-lib.CfnResource

The new dependency to add.

---

##### `inspect` <a name="inspect" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.inspect"></a>

```typescript
public inspect(inspector: TreeInspector): void
```

Examines the CloudFormation resource and discloses attributes.

###### `inspector`<sup>Required</sup> <a name="inspector" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.inspect.parameter.inspector"></a>

- *Type:* aws-cdk-lib.TreeInspector

tree inspector to collect and process attributes.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isCfnElement">isCfnElement</a></code> | Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isCfnResource">isCfnResource</a></code> | Check whether the given object is a CfnResource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isCfnConnection">isCfnConnection</a></code> | Checks whether the given object is a CfnConnection. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isConstruct"></a>

```typescript
import { RedshiftConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

RedshiftConnection.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isCfnElement` <a name="isCfnElement" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isCfnElement"></a>

```typescript
import { RedshiftConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

RedshiftConnection.isCfnElement(x: any)
```

Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template).

Uses duck-typing instead of `instanceof` to allow stack elements from different
versions of this library to be included in the same stack.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isCfnElement.parameter.x"></a>

- *Type:* any

---

##### `isCfnResource` <a name="isCfnResource" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isCfnResource"></a>

```typescript
import { RedshiftConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

RedshiftConnection.isCfnResource(x: any)
```

Check whether the given object is a CfnResource.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isCfnResource.parameter.x"></a>

- *Type:* any

---

##### `isCfnConnection` <a name="isCfnConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isCfnConnection"></a>

```typescript
import { RedshiftConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

RedshiftConnection.isCfnConnection(x: any)
```

Checks whether the given object is a CfnConnection.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.isCfnConnection.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.creationStack">creationStack</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.logicalId">logicalId</a></code> | <code>string</code> | The logical ID for this CloudFormation stack element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this element is defined. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.ref">ref</a></code> | <code>string</code> | Return a string that will be resolved to a CloudFormation `{ Ref }` for this element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.cfnOptions">cfnOptions</a></code> | <code>aws-cdk-lib.ICfnResourceOptions</code> | Options for this resource, such as condition, update policy etc. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.cfnResourceType">cfnResourceType</a></code> | <code>string</code> | AWS resource type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.env">env</a></code> | <code>aws-cdk-lib.interfaces.ResourceEnvironment</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrConnectionId">attrConnectionId</a></code> | <code>string</code> | The ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrDomainId">attrDomainId</a></code> | <code>string</code> | The domain ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrDomainUnitId">attrDomainUnitId</a></code> | <code>string</code> | The domain unit ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrEnvironmentId">attrEnvironmentId</a></code> | <code>string</code> | The ID of the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrEnvironmentUserRole">attrEnvironmentUserRole</a></code> | <code>string</code> | The environment user role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrProjectId">attrProjectId</a></code> | <code>string</code> | The ID of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrType">attrType</a></code> | <code>string</code> | The type of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.connectionRef">connectionRef</a></code> | <code>aws-cdk-lib.interfaces.aws_datazone.ConnectionReference</code> | A reference to a Connection resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.awsLocation">awsLocation</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty</code> | The location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.configurations">configurations</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Specifies whether the trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The identifier of the project in which the connection should be created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.props">props</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty</code> | Connection props. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.scope">scope</a></code> | <code>string</code> | The scope of the connection. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `creationStack`<sup>Required</sup> <a name="creationStack" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.creationStack"></a>

```typescript
public readonly creationStack: string[];
```

- *Type:* string[]

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

The logical ID for this CloudFormation stack element.

The logical ID of the element
is calculated from the path of the resource node in the construct tree.

To override this value, use `overrideLogicalId(newLogicalId)`.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this element is defined.

CfnElements must be defined within a stack scope (directly or indirectly).

---

##### `ref`<sup>Required</sup> <a name="ref" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Return a string that will be resolved to a CloudFormation `{ Ref }` for this element.

If, by any chance, the intrinsic reference of a resource is not a string, you could
coerce it to an IResolvable through `Lazy.any({ produce: resource.ref })`.

---

##### `cfnOptions`<sup>Required</sup> <a name="cfnOptions" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.cfnOptions"></a>

```typescript
public readonly cfnOptions: ICfnResourceOptions;
```

- *Type:* aws-cdk-lib.ICfnResourceOptions

Options for this resource, such as condition, update policy etc.

---

##### `cfnResourceType`<sup>Required</sup> <a name="cfnResourceType" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.cfnResourceType"></a>

```typescript
public readonly cfnResourceType: string;
```

- *Type:* string

AWS resource type.

---

##### `env`<sup>Required</sup> <a name="env" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.interfaces.ResourceEnvironment

---

##### `attrConnectionId`<sup>Required</sup> <a name="attrConnectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrConnectionId"></a>

```typescript
public readonly attrConnectionId: string;
```

- *Type:* string

The ID of the connection.

---

##### `attrDomainId`<sup>Required</sup> <a name="attrDomainId" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrDomainId"></a>

```typescript
public readonly attrDomainId: string;
```

- *Type:* string

The domain ID of the connection.

---

##### `attrDomainUnitId`<sup>Required</sup> <a name="attrDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrDomainUnitId"></a>

```typescript
public readonly attrDomainUnitId: string;
```

- *Type:* string

The domain unit ID of the connection.

---

##### `attrEnvironmentId`<sup>Required</sup> <a name="attrEnvironmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrEnvironmentId"></a>

```typescript
public readonly attrEnvironmentId: string;
```

- *Type:* string

The ID of the environment.

---

##### `attrEnvironmentUserRole`<sup>Required</sup> <a name="attrEnvironmentUserRole" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrEnvironmentUserRole"></a>

```typescript
public readonly attrEnvironmentUserRole: string;
```

- *Type:* string

The environment user role.

---

##### `attrProjectId`<sup>Required</sup> <a name="attrProjectId" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrProjectId"></a>

```typescript
public readonly attrProjectId: string;
```

- *Type:* string

The ID of the project.

---

##### `attrType`<sup>Required</sup> <a name="attrType" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.attrType"></a>

```typescript
public readonly attrType: string;
```

- *Type:* string

The type of the connection.

---

##### `connectionRef`<sup>Required</sup> <a name="connectionRef" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.connectionRef"></a>

```typescript
public readonly connectionRef: ConnectionReference;
```

- *Type:* aws-cdk-lib.interfaces.aws_datazone.ConnectionReference

A reference to a Connection resource.

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.awsLocation"></a>

```typescript
public readonly awsLocation: IResolvable | AwsLocationProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty

The location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.configurations"></a>

```typescript
public readonly configurations: IResolvable | (IResolvable | ConnectionConfigurationProperty)[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]

The configurations of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

Specifies whether the trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string

The identifier of the project in which the connection should be created.

---

##### `props`<sup>Optional</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.props"></a>

```typescript
public readonly props: IResolvable | ConnectionPropertiesInputProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty

Connection props.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.scope"></a>

```typescript
public readonly scope: string;
```

- *Type:* string

The scope of the connection.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.CFN_RESOURCE_TYPE_NAME">CFN_RESOURCE_TYPE_NAME</a></code> | <code>string</code> | The CloudFormation resource type name for this resource class. |

---

##### `CFN_RESOURCE_TYPE_NAME`<sup>Required</sup> <a name="CFN_RESOURCE_TYPE_NAME" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnection.property.CFN_RESOURCE_TYPE_NAME"></a>

```typescript
public readonly CFN_RESOURCE_TYPE_NAME: string;
```

- *Type:* string

The CloudFormation resource type name for this resource class.

---

### S3Connection <a name="S3Connection" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection"></a>

A SageMaker Unified Studio S3 connection that provides access to data stored in Amazon S3 from within a project.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/connecting-amazon-s3.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/connecting-amazon-s3.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer"></a>

```typescript
import { S3Connection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new S3Connection(scope: Construct, id: string, props: S3ConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps">S3ConnectionProps</a></code> | Connection props. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the connection.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps">S3ConnectionProps</a>

Connection props.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addDeletionOverride">addDeletionOverride</a></code> | Syntactic sugar for `addOverride(path, undefined)`. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addDependency">addDependency</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addDependsOn">addDependsOn</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addMetadata">addMetadata</a></code> | Add a value to the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addOverride">addOverride</a></code> | Adds an override to the synthesized CloudFormation resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addPropertyDeletionOverride">addPropertyDeletionOverride</a></code> | Adds an override that deletes the value of a property from the resource definition. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addPropertyOverride">addPropertyOverride</a></code> | Adds an override to a resource property. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.applyCrossStackReferenceStrength">applyCrossStackReferenceStrength</a></code> | Sets the cross-stack reference strength for this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.applyRemovalPolicy">applyRemovalPolicy</a></code> | Sets the deletion policy of the resource based on the removal policy specified. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.cfnPropertyName">cfnPropertyName</a></code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.getAtt">getAtt</a></code> | Returns a token for an runtime attribute of this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.getMetadata">getMetadata</a></code> | Retrieve a value value from the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.obtainDependencies">obtainDependencies</a></code> | Retrieves an array of resources this resource depends on. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.obtainResourceDependencies">obtainResourceDependencies</a></code> | Get a shallow copy of dependencies between this resource and other resources in the same stack. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.removeDependency">removeDependency</a></code> | Indicates that this resource no longer depends on another resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.replaceDependency">replaceDependency</a></code> | Replaces one dependency with another. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.inspect">inspect</a></code> | Examines the CloudFormation resource and discloses attributes. |

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

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `addDeletionOverride` <a name="addDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addDeletionOverride"></a>

```typescript
public addDeletionOverride(path: string): void
```

Syntactic sugar for `addOverride(path, undefined)`.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addDeletionOverride.parameter.path"></a>

- *Type:* string

The path of the value to delete.

---

##### `addDependency` <a name="addDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addDependency"></a>

```typescript
public addDependency(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

This can be used for resources across stacks (or nested stack) boundaries
and the dependency will automatically be transferred to the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### ~~`addDependsOn`~~ <a name="addDependsOn" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addDependsOn"></a>

```typescript
public addDependsOn(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addDependsOn.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `addMetadata` <a name="addMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Add a value to the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addOverride` <a name="addOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

Adds an override to the synthesized CloudFormation resource.

To add a
property override, either use `addPropertyOverride` or prefix `path` with
"Properties." (i.e. `Properties.TopicName`).

If the override is nested, separate each nested level using a dot (.) in the path parameter.
If there is an array as part of the nesting, specify the index in the path.

To include a literal `.` in the property name, prefix with a `\`. In most
programming languages you will need to write this as `"\\."` because the
`\` itself will need to be escaped.

For example,
```typescript
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.0.Projection.NonKeyAttributes', ['myattribute']);
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.1.ProjectionType', 'INCLUDE');
```
would add the overrides
```json
"Properties": {
  "GlobalSecondaryIndexes": [
    {
      "Projection": {
        "NonKeyAttributes": [ "myattribute" ]
        ...
      }
      ...
    },
    {
      "ProjectionType": "INCLUDE"
      ...
    },
  ]
  ...
}
```

The `value` argument to `addOverride` will not be processed or translated
in any way. Pass raw JSON values in here with the correct capitalization
for CloudFormation. If you pass CDK classes or structs, they will be
rendered with lowercased key names, and CloudFormation will reject the
template.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addOverride.parameter.path"></a>

- *Type:* string

The path of the property, you can use dot notation to override values in complex types.

Any intermediate keys
will be created as needed.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addOverride.parameter.value"></a>

- *Type:* any

The value.

Could be primitive or complex.

---

##### `addPropertyDeletionOverride` <a name="addPropertyDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addPropertyDeletionOverride"></a>

```typescript
public addPropertyDeletionOverride(propertyPath: string): void
```

Adds an override that deletes the value of a property from the resource definition.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addPropertyDeletionOverride.parameter.propertyPath"></a>

- *Type:* string

The path to the property.

---

##### `addPropertyOverride` <a name="addPropertyOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addPropertyOverride"></a>

```typescript
public addPropertyOverride(propertyPath: string, value: any): void
```

Adds an override to a resource property.

Syntactic sugar for `addOverride("Properties.<...>", value)`.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addPropertyOverride.parameter.propertyPath"></a>

- *Type:* string

The path of the property.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.addPropertyOverride.parameter.value"></a>

- *Type:* any

The value.

---

##### `applyCrossStackReferenceStrength` <a name="applyCrossStackReferenceStrength" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.applyCrossStackReferenceStrength"></a>

```typescript
public applyCrossStackReferenceStrength(strength: ReferenceStrength): void
```

Sets the cross-stack reference strength for this resource.

When set, any cross-stack reference to this resource will use the specified
strength instead of the global default from the consuming stack's context.

###### `strength`<sup>Required</sup> <a name="strength" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.applyCrossStackReferenceStrength.parameter.strength"></a>

- *Type:* aws-cdk-lib.ReferenceStrength

The reference strength to use for this resource.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy?: RemovalPolicy, options?: RemovalPolicyOptions): void
```

Sets the deletion policy of the resource based on the removal policy specified.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`). In some
cases, a snapshot can be taken of the resource prior to deletion
(`RemovalPolicy.SNAPSHOT`). A list of resources that support this policy
can be found in the following link:

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options)

###### `policy`<sup>Optional</sup> <a name="policy" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

###### `options`<sup>Optional</sup> <a name="options" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.applyRemovalPolicy.parameter.options"></a>

- *Type:* aws-cdk-lib.RemovalPolicyOptions

---

##### `cfnPropertyName` <a name="cfnPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.cfnPropertyName"></a>

```typescript
public cfnPropertyName(cdkPropertyName: string): string
```

###### `cdkPropertyName`<sup>Required</sup> <a name="cdkPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.cfnPropertyName.parameter.cdkPropertyName"></a>

- *Type:* string

---

##### `getAtt` <a name="getAtt" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.getAtt"></a>

```typescript
public getAtt(attributeName: string, typeHint?: ResolutionTypeHint): Reference
```

Returns a token for an runtime attribute of this resource.

Ideally, use generated attribute accessors (e.g. `resource.arn`), but this can be used for future compatibility
in case there is no generated attribute.

###### `attributeName`<sup>Required</sup> <a name="attributeName" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.getAtt.parameter.attributeName"></a>

- *Type:* string

The name of the attribute.

---

###### `typeHint`<sup>Optional</sup> <a name="typeHint" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.getAtt.parameter.typeHint"></a>

- *Type:* aws-cdk-lib.ResolutionTypeHint

---

##### `getMetadata` <a name="getMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.getMetadata"></a>

```typescript
public getMetadata(key: string): any
```

Retrieve a value value from the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.getMetadata.parameter.key"></a>

- *Type:* string

---

##### `obtainDependencies` <a name="obtainDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.obtainDependencies"></a>

```typescript
public obtainDependencies(): (CfnResource | Stack)[]
```

Retrieves an array of resources this resource depends on.

This assembles dependencies on resources across stacks (including nested stacks)
automatically.

##### `obtainResourceDependencies` <a name="obtainResourceDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.obtainResourceDependencies"></a>

```typescript
public obtainResourceDependencies(): CfnResource[]
```

Get a shallow copy of dependencies between this resource and other resources in the same stack.

##### `removeDependency` <a name="removeDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.removeDependency"></a>

```typescript
public removeDependency(target: CfnResource): void
```

Indicates that this resource no longer depends on another resource.

This can be used for resources across stacks (including nested stacks)
and the dependency will automatically be removed from the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.removeDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `replaceDependency` <a name="replaceDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.replaceDependency"></a>

```typescript
public replaceDependency(target: CfnResource, newTarget: CfnResource): void
```

Replaces one dependency with another.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.replaceDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

The dependency to replace.

---

###### `newTarget`<sup>Required</sup> <a name="newTarget" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.replaceDependency.parameter.newTarget"></a>

- *Type:* aws-cdk-lib.CfnResource

The new dependency to add.

---

##### `inspect` <a name="inspect" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.inspect"></a>

```typescript
public inspect(inspector: TreeInspector): void
```

Examines the CloudFormation resource and discloses attributes.

###### `inspector`<sup>Required</sup> <a name="inspector" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.inspect.parameter.inspector"></a>

- *Type:* aws-cdk-lib.TreeInspector

tree inspector to collect and process attributes.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isCfnElement">isCfnElement</a></code> | Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isCfnResource">isCfnResource</a></code> | Check whether the given object is a CfnResource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isCfnConnection">isCfnConnection</a></code> | Checks whether the given object is a CfnConnection. |

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

##### `isCfnElement` <a name="isCfnElement" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isCfnElement"></a>

```typescript
import { S3Connection } from '@tonesingleton/cdk-sagemaker-unified-studio'

S3Connection.isCfnElement(x: any)
```

Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template).

Uses duck-typing instead of `instanceof` to allow stack elements from different
versions of this library to be included in the same stack.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isCfnElement.parameter.x"></a>

- *Type:* any

---

##### `isCfnResource` <a name="isCfnResource" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isCfnResource"></a>

```typescript
import { S3Connection } from '@tonesingleton/cdk-sagemaker-unified-studio'

S3Connection.isCfnResource(x: any)
```

Check whether the given object is a CfnResource.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isCfnResource.parameter.x"></a>

- *Type:* any

---

##### `isCfnConnection` <a name="isCfnConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isCfnConnection"></a>

```typescript
import { S3Connection } from '@tonesingleton/cdk-sagemaker-unified-studio'

S3Connection.isCfnConnection(x: any)
```

Checks whether the given object is a CfnConnection.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.isCfnConnection.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.creationStack">creationStack</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.logicalId">logicalId</a></code> | <code>string</code> | The logical ID for this CloudFormation stack element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this element is defined. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.ref">ref</a></code> | <code>string</code> | Return a string that will be resolved to a CloudFormation `{ Ref }` for this element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.cfnOptions">cfnOptions</a></code> | <code>aws-cdk-lib.ICfnResourceOptions</code> | Options for this resource, such as condition, update policy etc. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.cfnResourceType">cfnResourceType</a></code> | <code>string</code> | AWS resource type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.env">env</a></code> | <code>aws-cdk-lib.interfaces.ResourceEnvironment</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrConnectionId">attrConnectionId</a></code> | <code>string</code> | The ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrDomainId">attrDomainId</a></code> | <code>string</code> | The domain ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrDomainUnitId">attrDomainUnitId</a></code> | <code>string</code> | The domain unit ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrEnvironmentId">attrEnvironmentId</a></code> | <code>string</code> | The ID of the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrEnvironmentUserRole">attrEnvironmentUserRole</a></code> | <code>string</code> | The environment user role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrProjectId">attrProjectId</a></code> | <code>string</code> | The ID of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrType">attrType</a></code> | <code>string</code> | The type of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.connectionRef">connectionRef</a></code> | <code>aws-cdk-lib.interfaces.aws_datazone.ConnectionReference</code> | A reference to a Connection resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.awsLocation">awsLocation</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty</code> | The location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.configurations">configurations</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Specifies whether the trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The identifier of the project in which the connection should be created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.props">props</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty</code> | Connection props. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.scope">scope</a></code> | <code>string</code> | The scope of the connection. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `creationStack`<sup>Required</sup> <a name="creationStack" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.creationStack"></a>

```typescript
public readonly creationStack: string[];
```

- *Type:* string[]

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

The logical ID for this CloudFormation stack element.

The logical ID of the element
is calculated from the path of the resource node in the construct tree.

To override this value, use `overrideLogicalId(newLogicalId)`.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this element is defined.

CfnElements must be defined within a stack scope (directly or indirectly).

---

##### `ref`<sup>Required</sup> <a name="ref" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Return a string that will be resolved to a CloudFormation `{ Ref }` for this element.

If, by any chance, the intrinsic reference of a resource is not a string, you could
coerce it to an IResolvable through `Lazy.any({ produce: resource.ref })`.

---

##### `cfnOptions`<sup>Required</sup> <a name="cfnOptions" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.cfnOptions"></a>

```typescript
public readonly cfnOptions: ICfnResourceOptions;
```

- *Type:* aws-cdk-lib.ICfnResourceOptions

Options for this resource, such as condition, update policy etc.

---

##### `cfnResourceType`<sup>Required</sup> <a name="cfnResourceType" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.cfnResourceType"></a>

```typescript
public readonly cfnResourceType: string;
```

- *Type:* string

AWS resource type.

---

##### `env`<sup>Required</sup> <a name="env" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.interfaces.ResourceEnvironment

---

##### `attrConnectionId`<sup>Required</sup> <a name="attrConnectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrConnectionId"></a>

```typescript
public readonly attrConnectionId: string;
```

- *Type:* string

The ID of the connection.

---

##### `attrDomainId`<sup>Required</sup> <a name="attrDomainId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrDomainId"></a>

```typescript
public readonly attrDomainId: string;
```

- *Type:* string

The domain ID of the connection.

---

##### `attrDomainUnitId`<sup>Required</sup> <a name="attrDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrDomainUnitId"></a>

```typescript
public readonly attrDomainUnitId: string;
```

- *Type:* string

The domain unit ID of the connection.

---

##### `attrEnvironmentId`<sup>Required</sup> <a name="attrEnvironmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrEnvironmentId"></a>

```typescript
public readonly attrEnvironmentId: string;
```

- *Type:* string

The ID of the environment.

---

##### `attrEnvironmentUserRole`<sup>Required</sup> <a name="attrEnvironmentUserRole" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrEnvironmentUserRole"></a>

```typescript
public readonly attrEnvironmentUserRole: string;
```

- *Type:* string

The environment user role.

---

##### `attrProjectId`<sup>Required</sup> <a name="attrProjectId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrProjectId"></a>

```typescript
public readonly attrProjectId: string;
```

- *Type:* string

The ID of the project.

---

##### `attrType`<sup>Required</sup> <a name="attrType" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.attrType"></a>

```typescript
public readonly attrType: string;
```

- *Type:* string

The type of the connection.

---

##### `connectionRef`<sup>Required</sup> <a name="connectionRef" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.connectionRef"></a>

```typescript
public readonly connectionRef: ConnectionReference;
```

- *Type:* aws-cdk-lib.interfaces.aws_datazone.ConnectionReference

A reference to a Connection resource.

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.awsLocation"></a>

```typescript
public readonly awsLocation: IResolvable | AwsLocationProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty

The location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.configurations"></a>

```typescript
public readonly configurations: IResolvable | (IResolvable | ConnectionConfigurationProperty)[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]

The configurations of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

Specifies whether the trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string

The identifier of the project in which the connection should be created.

---

##### `props`<sup>Optional</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.props"></a>

```typescript
public readonly props: IResolvable | ConnectionPropertiesInputProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty

Connection props.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.scope"></a>

```typescript
public readonly scope: string;
```

- *Type:* string

The scope of the connection.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.CFN_RESOURCE_TYPE_NAME">CFN_RESOURCE_TYPE_NAME</a></code> | <code>string</code> | The CloudFormation resource type name for this resource class. |

---

##### `CFN_RESOURCE_TYPE_NAME`<sup>Required</sup> <a name="CFN_RESOURCE_TYPE_NAME" id="@tonesingleton/cdk-sagemaker-unified-studio.S3Connection.property.CFN_RESOURCE_TYPE_NAME"></a>

```typescript
public readonly CFN_RESOURCE_TYPE_NAME: string;
```

- *Type:* string

The CloudFormation resource type name for this resource class.

---

### SparkEmrConnection <a name="SparkEmrConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection"></a>

A SageMaker Unified Studio Spark EMR connection that provides access to an EMR Serverless application or EMR cluster.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.Initializer"></a>

```typescript
import { SparkEmrConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new SparkEmrConnection(scope: Construct, id: string, props: SparkEmrConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps">SparkEmrConnectionProps</a></code> | Connection props. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the connection.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps">SparkEmrConnectionProps</a>

Connection props.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addDeletionOverride">addDeletionOverride</a></code> | Syntactic sugar for `addOverride(path, undefined)`. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addDependency">addDependency</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addDependsOn">addDependsOn</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addMetadata">addMetadata</a></code> | Add a value to the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addOverride">addOverride</a></code> | Adds an override to the synthesized CloudFormation resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addPropertyDeletionOverride">addPropertyDeletionOverride</a></code> | Adds an override that deletes the value of a property from the resource definition. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addPropertyOverride">addPropertyOverride</a></code> | Adds an override to a resource property. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.applyCrossStackReferenceStrength">applyCrossStackReferenceStrength</a></code> | Sets the cross-stack reference strength for this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.applyRemovalPolicy">applyRemovalPolicy</a></code> | Sets the deletion policy of the resource based on the removal policy specified. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.cfnPropertyName">cfnPropertyName</a></code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.getAtt">getAtt</a></code> | Returns a token for an runtime attribute of this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.getMetadata">getMetadata</a></code> | Retrieve a value value from the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.obtainDependencies">obtainDependencies</a></code> | Retrieves an array of resources this resource depends on. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.obtainResourceDependencies">obtainResourceDependencies</a></code> | Get a shallow copy of dependencies between this resource and other resources in the same stack. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.removeDependency">removeDependency</a></code> | Indicates that this resource no longer depends on another resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.replaceDependency">replaceDependency</a></code> | Replaces one dependency with another. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.inspect">inspect</a></code> | Examines the CloudFormation resource and discloses attributes. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `addDeletionOverride` <a name="addDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addDeletionOverride"></a>

```typescript
public addDeletionOverride(path: string): void
```

Syntactic sugar for `addOverride(path, undefined)`.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addDeletionOverride.parameter.path"></a>

- *Type:* string

The path of the value to delete.

---

##### `addDependency` <a name="addDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addDependency"></a>

```typescript
public addDependency(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

This can be used for resources across stacks (or nested stack) boundaries
and the dependency will automatically be transferred to the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### ~~`addDependsOn`~~ <a name="addDependsOn" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addDependsOn"></a>

```typescript
public addDependsOn(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addDependsOn.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `addMetadata` <a name="addMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Add a value to the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addOverride` <a name="addOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

Adds an override to the synthesized CloudFormation resource.

To add a
property override, either use `addPropertyOverride` or prefix `path` with
"Properties." (i.e. `Properties.TopicName`).

If the override is nested, separate each nested level using a dot (.) in the path parameter.
If there is an array as part of the nesting, specify the index in the path.

To include a literal `.` in the property name, prefix with a `\`. In most
programming languages you will need to write this as `"\\."` because the
`\` itself will need to be escaped.

For example,
```typescript
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.0.Projection.NonKeyAttributes', ['myattribute']);
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.1.ProjectionType', 'INCLUDE');
```
would add the overrides
```json
"Properties": {
  "GlobalSecondaryIndexes": [
    {
      "Projection": {
        "NonKeyAttributes": [ "myattribute" ]
        ...
      }
      ...
    },
    {
      "ProjectionType": "INCLUDE"
      ...
    },
  ]
  ...
}
```

The `value` argument to `addOverride` will not be processed or translated
in any way. Pass raw JSON values in here with the correct capitalization
for CloudFormation. If you pass CDK classes or structs, they will be
rendered with lowercased key names, and CloudFormation will reject the
template.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addOverride.parameter.path"></a>

- *Type:* string

The path of the property, you can use dot notation to override values in complex types.

Any intermediate keys
will be created as needed.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addOverride.parameter.value"></a>

- *Type:* any

The value.

Could be primitive or complex.

---

##### `addPropertyDeletionOverride` <a name="addPropertyDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addPropertyDeletionOverride"></a>

```typescript
public addPropertyDeletionOverride(propertyPath: string): void
```

Adds an override that deletes the value of a property from the resource definition.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addPropertyDeletionOverride.parameter.propertyPath"></a>

- *Type:* string

The path to the property.

---

##### `addPropertyOverride` <a name="addPropertyOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addPropertyOverride"></a>

```typescript
public addPropertyOverride(propertyPath: string, value: any): void
```

Adds an override to a resource property.

Syntactic sugar for `addOverride("Properties.<...>", value)`.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addPropertyOverride.parameter.propertyPath"></a>

- *Type:* string

The path of the property.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.addPropertyOverride.parameter.value"></a>

- *Type:* any

The value.

---

##### `applyCrossStackReferenceStrength` <a name="applyCrossStackReferenceStrength" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.applyCrossStackReferenceStrength"></a>

```typescript
public applyCrossStackReferenceStrength(strength: ReferenceStrength): void
```

Sets the cross-stack reference strength for this resource.

When set, any cross-stack reference to this resource will use the specified
strength instead of the global default from the consuming stack's context.

###### `strength`<sup>Required</sup> <a name="strength" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.applyCrossStackReferenceStrength.parameter.strength"></a>

- *Type:* aws-cdk-lib.ReferenceStrength

The reference strength to use for this resource.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy?: RemovalPolicy, options?: RemovalPolicyOptions): void
```

Sets the deletion policy of the resource based on the removal policy specified.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`). In some
cases, a snapshot can be taken of the resource prior to deletion
(`RemovalPolicy.SNAPSHOT`). A list of resources that support this policy
can be found in the following link:

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options)

###### `policy`<sup>Optional</sup> <a name="policy" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

###### `options`<sup>Optional</sup> <a name="options" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.applyRemovalPolicy.parameter.options"></a>

- *Type:* aws-cdk-lib.RemovalPolicyOptions

---

##### `cfnPropertyName` <a name="cfnPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.cfnPropertyName"></a>

```typescript
public cfnPropertyName(cdkPropertyName: string): string
```

###### `cdkPropertyName`<sup>Required</sup> <a name="cdkPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.cfnPropertyName.parameter.cdkPropertyName"></a>

- *Type:* string

---

##### `getAtt` <a name="getAtt" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.getAtt"></a>

```typescript
public getAtt(attributeName: string, typeHint?: ResolutionTypeHint): Reference
```

Returns a token for an runtime attribute of this resource.

Ideally, use generated attribute accessors (e.g. `resource.arn`), but this can be used for future compatibility
in case there is no generated attribute.

###### `attributeName`<sup>Required</sup> <a name="attributeName" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.getAtt.parameter.attributeName"></a>

- *Type:* string

The name of the attribute.

---

###### `typeHint`<sup>Optional</sup> <a name="typeHint" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.getAtt.parameter.typeHint"></a>

- *Type:* aws-cdk-lib.ResolutionTypeHint

---

##### `getMetadata` <a name="getMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.getMetadata"></a>

```typescript
public getMetadata(key: string): any
```

Retrieve a value value from the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.getMetadata.parameter.key"></a>

- *Type:* string

---

##### `obtainDependencies` <a name="obtainDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.obtainDependencies"></a>

```typescript
public obtainDependencies(): (CfnResource | Stack)[]
```

Retrieves an array of resources this resource depends on.

This assembles dependencies on resources across stacks (including nested stacks)
automatically.

##### `obtainResourceDependencies` <a name="obtainResourceDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.obtainResourceDependencies"></a>

```typescript
public obtainResourceDependencies(): CfnResource[]
```

Get a shallow copy of dependencies between this resource and other resources in the same stack.

##### `removeDependency` <a name="removeDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.removeDependency"></a>

```typescript
public removeDependency(target: CfnResource): void
```

Indicates that this resource no longer depends on another resource.

This can be used for resources across stacks (including nested stacks)
and the dependency will automatically be removed from the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.removeDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `replaceDependency` <a name="replaceDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.replaceDependency"></a>

```typescript
public replaceDependency(target: CfnResource, newTarget: CfnResource): void
```

Replaces one dependency with another.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.replaceDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

The dependency to replace.

---

###### `newTarget`<sup>Required</sup> <a name="newTarget" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.replaceDependency.parameter.newTarget"></a>

- *Type:* aws-cdk-lib.CfnResource

The new dependency to add.

---

##### `inspect` <a name="inspect" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.inspect"></a>

```typescript
public inspect(inspector: TreeInspector): void
```

Examines the CloudFormation resource and discloses attributes.

###### `inspector`<sup>Required</sup> <a name="inspector" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.inspect.parameter.inspector"></a>

- *Type:* aws-cdk-lib.TreeInspector

tree inspector to collect and process attributes.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isCfnElement">isCfnElement</a></code> | Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isCfnResource">isCfnResource</a></code> | Check whether the given object is a CfnResource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isCfnConnection">isCfnConnection</a></code> | Checks whether the given object is a CfnConnection. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isConstruct"></a>

```typescript
import { SparkEmrConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

SparkEmrConnection.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isCfnElement` <a name="isCfnElement" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isCfnElement"></a>

```typescript
import { SparkEmrConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

SparkEmrConnection.isCfnElement(x: any)
```

Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template).

Uses duck-typing instead of `instanceof` to allow stack elements from different
versions of this library to be included in the same stack.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isCfnElement.parameter.x"></a>

- *Type:* any

---

##### `isCfnResource` <a name="isCfnResource" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isCfnResource"></a>

```typescript
import { SparkEmrConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

SparkEmrConnection.isCfnResource(x: any)
```

Check whether the given object is a CfnResource.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isCfnResource.parameter.x"></a>

- *Type:* any

---

##### `isCfnConnection` <a name="isCfnConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isCfnConnection"></a>

```typescript
import { SparkEmrConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

SparkEmrConnection.isCfnConnection(x: any)
```

Checks whether the given object is a CfnConnection.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.isCfnConnection.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.creationStack">creationStack</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.logicalId">logicalId</a></code> | <code>string</code> | The logical ID for this CloudFormation stack element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this element is defined. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.ref">ref</a></code> | <code>string</code> | Return a string that will be resolved to a CloudFormation `{ Ref }` for this element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.cfnOptions">cfnOptions</a></code> | <code>aws-cdk-lib.ICfnResourceOptions</code> | Options for this resource, such as condition, update policy etc. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.cfnResourceType">cfnResourceType</a></code> | <code>string</code> | AWS resource type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.env">env</a></code> | <code>aws-cdk-lib.interfaces.ResourceEnvironment</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrConnectionId">attrConnectionId</a></code> | <code>string</code> | The ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrDomainId">attrDomainId</a></code> | <code>string</code> | The domain ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrDomainUnitId">attrDomainUnitId</a></code> | <code>string</code> | The domain unit ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrEnvironmentId">attrEnvironmentId</a></code> | <code>string</code> | The ID of the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrEnvironmentUserRole">attrEnvironmentUserRole</a></code> | <code>string</code> | The environment user role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrProjectId">attrProjectId</a></code> | <code>string</code> | The ID of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrType">attrType</a></code> | <code>string</code> | The type of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.connectionRef">connectionRef</a></code> | <code>aws-cdk-lib.interfaces.aws_datazone.ConnectionReference</code> | A reference to a Connection resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.awsLocation">awsLocation</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty</code> | The location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.configurations">configurations</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Specifies whether the trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The identifier of the project in which the connection should be created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.props">props</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty</code> | Connection props. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.scope">scope</a></code> | <code>string</code> | The scope of the connection. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `creationStack`<sup>Required</sup> <a name="creationStack" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.creationStack"></a>

```typescript
public readonly creationStack: string[];
```

- *Type:* string[]

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

The logical ID for this CloudFormation stack element.

The logical ID of the element
is calculated from the path of the resource node in the construct tree.

To override this value, use `overrideLogicalId(newLogicalId)`.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this element is defined.

CfnElements must be defined within a stack scope (directly or indirectly).

---

##### `ref`<sup>Required</sup> <a name="ref" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Return a string that will be resolved to a CloudFormation `{ Ref }` for this element.

If, by any chance, the intrinsic reference of a resource is not a string, you could
coerce it to an IResolvable through `Lazy.any({ produce: resource.ref })`.

---

##### `cfnOptions`<sup>Required</sup> <a name="cfnOptions" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.cfnOptions"></a>

```typescript
public readonly cfnOptions: ICfnResourceOptions;
```

- *Type:* aws-cdk-lib.ICfnResourceOptions

Options for this resource, such as condition, update policy etc.

---

##### `cfnResourceType`<sup>Required</sup> <a name="cfnResourceType" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.cfnResourceType"></a>

```typescript
public readonly cfnResourceType: string;
```

- *Type:* string

AWS resource type.

---

##### `env`<sup>Required</sup> <a name="env" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.interfaces.ResourceEnvironment

---

##### `attrConnectionId`<sup>Required</sup> <a name="attrConnectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrConnectionId"></a>

```typescript
public readonly attrConnectionId: string;
```

- *Type:* string

The ID of the connection.

---

##### `attrDomainId`<sup>Required</sup> <a name="attrDomainId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrDomainId"></a>

```typescript
public readonly attrDomainId: string;
```

- *Type:* string

The domain ID of the connection.

---

##### `attrDomainUnitId`<sup>Required</sup> <a name="attrDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrDomainUnitId"></a>

```typescript
public readonly attrDomainUnitId: string;
```

- *Type:* string

The domain unit ID of the connection.

---

##### `attrEnvironmentId`<sup>Required</sup> <a name="attrEnvironmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrEnvironmentId"></a>

```typescript
public readonly attrEnvironmentId: string;
```

- *Type:* string

The ID of the environment.

---

##### `attrEnvironmentUserRole`<sup>Required</sup> <a name="attrEnvironmentUserRole" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrEnvironmentUserRole"></a>

```typescript
public readonly attrEnvironmentUserRole: string;
```

- *Type:* string

The environment user role.

---

##### `attrProjectId`<sup>Required</sup> <a name="attrProjectId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrProjectId"></a>

```typescript
public readonly attrProjectId: string;
```

- *Type:* string

The ID of the project.

---

##### `attrType`<sup>Required</sup> <a name="attrType" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.attrType"></a>

```typescript
public readonly attrType: string;
```

- *Type:* string

The type of the connection.

---

##### `connectionRef`<sup>Required</sup> <a name="connectionRef" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.connectionRef"></a>

```typescript
public readonly connectionRef: ConnectionReference;
```

- *Type:* aws-cdk-lib.interfaces.aws_datazone.ConnectionReference

A reference to a Connection resource.

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.awsLocation"></a>

```typescript
public readonly awsLocation: IResolvable | AwsLocationProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty

The location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.configurations"></a>

```typescript
public readonly configurations: IResolvable | (IResolvable | ConnectionConfigurationProperty)[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]

The configurations of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

Specifies whether the trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string

The identifier of the project in which the connection should be created.

---

##### `props`<sup>Optional</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.props"></a>

```typescript
public readonly props: IResolvable | ConnectionPropertiesInputProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty

Connection props.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.scope"></a>

```typescript
public readonly scope: string;
```

- *Type:* string

The scope of the connection.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.CFN_RESOURCE_TYPE_NAME">CFN_RESOURCE_TYPE_NAME</a></code> | <code>string</code> | The CloudFormation resource type name for this resource class. |

---

##### `CFN_RESOURCE_TYPE_NAME`<sup>Required</sup> <a name="CFN_RESOURCE_TYPE_NAME" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnection.property.CFN_RESOURCE_TYPE_NAME"></a>

```typescript
public readonly CFN_RESOURCE_TYPE_NAME: string;
```

- *Type:* string

The CloudFormation resource type name for this resource class.

---

### SparkGlueConnection <a name="SparkGlueConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection"></a>

A SageMaker Unified Studio Spark Glue connection that configures Glue Interactive Sessions for Spark compute.

> [https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-connections-iam-based-domains.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.Initializer"></a>

```typescript
import { SparkGlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

new SparkGlueConnection(scope: Construct, id: string, props: SparkGlueConnectionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps">SparkGlueConnectionProps</a></code> | Connection props. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope of the connection.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps">SparkGlueConnectionProps</a>

Connection props.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addDeletionOverride">addDeletionOverride</a></code> | Syntactic sugar for `addOverride(path, undefined)`. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addDependency">addDependency</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addDependsOn">addDependsOn</a></code> | Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addMetadata">addMetadata</a></code> | Add a value to the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addOverride">addOverride</a></code> | Adds an override to the synthesized CloudFormation resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addPropertyDeletionOverride">addPropertyDeletionOverride</a></code> | Adds an override that deletes the value of a property from the resource definition. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addPropertyOverride">addPropertyOverride</a></code> | Adds an override to a resource property. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.applyCrossStackReferenceStrength">applyCrossStackReferenceStrength</a></code> | Sets the cross-stack reference strength for this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.applyRemovalPolicy">applyRemovalPolicy</a></code> | Sets the deletion policy of the resource based on the removal policy specified. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.cfnPropertyName">cfnPropertyName</a></code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.getAtt">getAtt</a></code> | Returns a token for an runtime attribute of this resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.getMetadata">getMetadata</a></code> | Retrieve a value value from the CloudFormation Resource Metadata. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.obtainDependencies">obtainDependencies</a></code> | Retrieves an array of resources this resource depends on. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.obtainResourceDependencies">obtainResourceDependencies</a></code> | Get a shallow copy of dependencies between this resource and other resources in the same stack. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.removeDependency">removeDependency</a></code> | Indicates that this resource no longer depends on another resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.replaceDependency">replaceDependency</a></code> | Replaces one dependency with another. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.inspect">inspect</a></code> | Examines the CloudFormation resource and discloses attributes. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `addDeletionOverride` <a name="addDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addDeletionOverride"></a>

```typescript
public addDeletionOverride(path: string): void
```

Syntactic sugar for `addOverride(path, undefined)`.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addDeletionOverride.parameter.path"></a>

- *Type:* string

The path of the value to delete.

---

##### `addDependency` <a name="addDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addDependency"></a>

```typescript
public addDependency(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

This can be used for resources across stacks (or nested stack) boundaries
and the dependency will automatically be transferred to the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### ~~`addDependsOn`~~ <a name="addDependsOn" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addDependsOn"></a>

```typescript
public addDependsOn(target: CfnResource): void
```

Indicates that this resource depends on another resource and cannot be provisioned unless the other resource has been successfully provisioned.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addDependsOn.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `addMetadata` <a name="addMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Add a value to the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addOverride` <a name="addOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

Adds an override to the synthesized CloudFormation resource.

To add a
property override, either use `addPropertyOverride` or prefix `path` with
"Properties." (i.e. `Properties.TopicName`).

If the override is nested, separate each nested level using a dot (.) in the path parameter.
If there is an array as part of the nesting, specify the index in the path.

To include a literal `.` in the property name, prefix with a `\`. In most
programming languages you will need to write this as `"\\."` because the
`\` itself will need to be escaped.

For example,
```typescript
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.0.Projection.NonKeyAttributes', ['myattribute']);
cfnResource.addOverride('Properties.GlobalSecondaryIndexes.1.ProjectionType', 'INCLUDE');
```
would add the overrides
```json
"Properties": {
  "GlobalSecondaryIndexes": [
    {
      "Projection": {
        "NonKeyAttributes": [ "myattribute" ]
        ...
      }
      ...
    },
    {
      "ProjectionType": "INCLUDE"
      ...
    },
  ]
  ...
}
```

The `value` argument to `addOverride` will not be processed or translated
in any way. Pass raw JSON values in here with the correct capitalization
for CloudFormation. If you pass CDK classes or structs, they will be
rendered with lowercased key names, and CloudFormation will reject the
template.

###### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addOverride.parameter.path"></a>

- *Type:* string

The path of the property, you can use dot notation to override values in complex types.

Any intermediate keys
will be created as needed.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addOverride.parameter.value"></a>

- *Type:* any

The value.

Could be primitive or complex.

---

##### `addPropertyDeletionOverride` <a name="addPropertyDeletionOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addPropertyDeletionOverride"></a>

```typescript
public addPropertyDeletionOverride(propertyPath: string): void
```

Adds an override that deletes the value of a property from the resource definition.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addPropertyDeletionOverride.parameter.propertyPath"></a>

- *Type:* string

The path to the property.

---

##### `addPropertyOverride` <a name="addPropertyOverride" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addPropertyOverride"></a>

```typescript
public addPropertyOverride(propertyPath: string, value: any): void
```

Adds an override to a resource property.

Syntactic sugar for `addOverride("Properties.<...>", value)`.

###### `propertyPath`<sup>Required</sup> <a name="propertyPath" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addPropertyOverride.parameter.propertyPath"></a>

- *Type:* string

The path of the property.

---

###### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.addPropertyOverride.parameter.value"></a>

- *Type:* any

The value.

---

##### `applyCrossStackReferenceStrength` <a name="applyCrossStackReferenceStrength" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.applyCrossStackReferenceStrength"></a>

```typescript
public applyCrossStackReferenceStrength(strength: ReferenceStrength): void
```

Sets the cross-stack reference strength for this resource.

When set, any cross-stack reference to this resource will use the specified
strength instead of the global default from the consuming stack's context.

###### `strength`<sup>Required</sup> <a name="strength" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.applyCrossStackReferenceStrength.parameter.strength"></a>

- *Type:* aws-cdk-lib.ReferenceStrength

The reference strength to use for this resource.

---

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy?: RemovalPolicy, options?: RemovalPolicyOptions): void
```

Sets the deletion policy of the resource based on the removal policy specified.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`). In some
cases, a snapshot can be taken of the resource prior to deletion
(`RemovalPolicy.SNAPSHOT`). A list of resources that support this policy
can be found in the following link:

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html#aws-attribute-deletionpolicy-options)

###### `policy`<sup>Optional</sup> <a name="policy" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

###### `options`<sup>Optional</sup> <a name="options" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.applyRemovalPolicy.parameter.options"></a>

- *Type:* aws-cdk-lib.RemovalPolicyOptions

---

##### `cfnPropertyName` <a name="cfnPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.cfnPropertyName"></a>

```typescript
public cfnPropertyName(cdkPropertyName: string): string
```

###### `cdkPropertyName`<sup>Required</sup> <a name="cdkPropertyName" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.cfnPropertyName.parameter.cdkPropertyName"></a>

- *Type:* string

---

##### `getAtt` <a name="getAtt" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.getAtt"></a>

```typescript
public getAtt(attributeName: string, typeHint?: ResolutionTypeHint): Reference
```

Returns a token for an runtime attribute of this resource.

Ideally, use generated attribute accessors (e.g. `resource.arn`), but this can be used for future compatibility
in case there is no generated attribute.

###### `attributeName`<sup>Required</sup> <a name="attributeName" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.getAtt.parameter.attributeName"></a>

- *Type:* string

The name of the attribute.

---

###### `typeHint`<sup>Optional</sup> <a name="typeHint" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.getAtt.parameter.typeHint"></a>

- *Type:* aws-cdk-lib.ResolutionTypeHint

---

##### `getMetadata` <a name="getMetadata" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.getMetadata"></a>

```typescript
public getMetadata(key: string): any
```

Retrieve a value value from the CloudFormation Resource Metadata.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html

Note that this is a different set of metadata from CDK node metadata; this
metadata ends up in the stack template under the resource, whereas CDK
node metadata ends up in the Cloud Assembly.)

###### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.getMetadata.parameter.key"></a>

- *Type:* string

---

##### `obtainDependencies` <a name="obtainDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.obtainDependencies"></a>

```typescript
public obtainDependencies(): (CfnResource | Stack)[]
```

Retrieves an array of resources this resource depends on.

This assembles dependencies on resources across stacks (including nested stacks)
automatically.

##### `obtainResourceDependencies` <a name="obtainResourceDependencies" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.obtainResourceDependencies"></a>

```typescript
public obtainResourceDependencies(): CfnResource[]
```

Get a shallow copy of dependencies between this resource and other resources in the same stack.

##### `removeDependency` <a name="removeDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.removeDependency"></a>

```typescript
public removeDependency(target: CfnResource): void
```

Indicates that this resource no longer depends on another resource.

This can be used for resources across stacks (including nested stacks)
and the dependency will automatically be removed from the relevant scope.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.removeDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

---

##### `replaceDependency` <a name="replaceDependency" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.replaceDependency"></a>

```typescript
public replaceDependency(target: CfnResource, newTarget: CfnResource): void
```

Replaces one dependency with another.

###### `target`<sup>Required</sup> <a name="target" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.replaceDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.CfnResource

The dependency to replace.

---

###### `newTarget`<sup>Required</sup> <a name="newTarget" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.replaceDependency.parameter.newTarget"></a>

- *Type:* aws-cdk-lib.CfnResource

The new dependency to add.

---

##### `inspect` <a name="inspect" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.inspect"></a>

```typescript
public inspect(inspector: TreeInspector): void
```

Examines the CloudFormation resource and discloses attributes.

###### `inspector`<sup>Required</sup> <a name="inspector" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.inspect.parameter.inspector"></a>

- *Type:* aws-cdk-lib.TreeInspector

tree inspector to collect and process attributes.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isCfnElement">isCfnElement</a></code> | Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isCfnResource">isCfnResource</a></code> | Check whether the given object is a CfnResource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isCfnConnection">isCfnConnection</a></code> | Checks whether the given object is a CfnConnection. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isConstruct"></a>

```typescript
import { SparkGlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

SparkGlueConnection.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isCfnElement` <a name="isCfnElement" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isCfnElement"></a>

```typescript
import { SparkGlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

SparkGlueConnection.isCfnElement(x: any)
```

Returns `true` if a construct is a stack element (i.e. part of the synthesized cloudformation template).

Uses duck-typing instead of `instanceof` to allow stack elements from different
versions of this library to be included in the same stack.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isCfnElement.parameter.x"></a>

- *Type:* any

---

##### `isCfnResource` <a name="isCfnResource" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isCfnResource"></a>

```typescript
import { SparkGlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

SparkGlueConnection.isCfnResource(x: any)
```

Check whether the given object is a CfnResource.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isCfnResource.parameter.x"></a>

- *Type:* any

---

##### `isCfnConnection` <a name="isCfnConnection" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isCfnConnection"></a>

```typescript
import { SparkGlueConnection } from '@tonesingleton/cdk-sagemaker-unified-studio'

SparkGlueConnection.isCfnConnection(x: any)
```

Checks whether the given object is a CfnConnection.

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.isCfnConnection.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.creationStack">creationStack</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.logicalId">logicalId</a></code> | <code>string</code> | The logical ID for this CloudFormation stack element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this element is defined. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.ref">ref</a></code> | <code>string</code> | Return a string that will be resolved to a CloudFormation `{ Ref }` for this element. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.cfnOptions">cfnOptions</a></code> | <code>aws-cdk-lib.ICfnResourceOptions</code> | Options for this resource, such as condition, update policy etc. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.cfnResourceType">cfnResourceType</a></code> | <code>string</code> | AWS resource type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.env">env</a></code> | <code>aws-cdk-lib.interfaces.ResourceEnvironment</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrConnectionId">attrConnectionId</a></code> | <code>string</code> | The ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrDomainId">attrDomainId</a></code> | <code>string</code> | The domain ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrDomainUnitId">attrDomainUnitId</a></code> | <code>string</code> | The domain unit ID of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrEnvironmentId">attrEnvironmentId</a></code> | <code>string</code> | The ID of the environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrEnvironmentUserRole">attrEnvironmentUserRole</a></code> | <code>string</code> | The environment user role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrProjectId">attrProjectId</a></code> | <code>string</code> | The ID of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrType">attrType</a></code> | <code>string</code> | The type of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.connectionRef">connectionRef</a></code> | <code>aws-cdk-lib.interfaces.aws_datazone.ConnectionReference</code> | A reference to a Connection resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.awsLocation">awsLocation</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty</code> | The location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.configurations">configurations</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean \| aws-cdk-lib.IResolvable</code> | Specifies whether the trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The identifier of the project in which the connection should be created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.props">props</a></code> | <code>aws-cdk-lib.IResolvable \| aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty</code> | Connection props. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.scope">scope</a></code> | <code>string</code> | The scope of the connection. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `creationStack`<sup>Required</sup> <a name="creationStack" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.creationStack"></a>

```typescript
public readonly creationStack: string[];
```

- *Type:* string[]

---

##### `logicalId`<sup>Required</sup> <a name="logicalId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.logicalId"></a>

```typescript
public readonly logicalId: string;
```

- *Type:* string

The logical ID for this CloudFormation stack element.

The logical ID of the element
is calculated from the path of the resource node in the construct tree.

To override this value, use `overrideLogicalId(newLogicalId)`.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this element is defined.

CfnElements must be defined within a stack scope (directly or indirectly).

---

##### `ref`<sup>Required</sup> <a name="ref" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

Return a string that will be resolved to a CloudFormation `{ Ref }` for this element.

If, by any chance, the intrinsic reference of a resource is not a string, you could
coerce it to an IResolvable through `Lazy.any({ produce: resource.ref })`.

---

##### `cfnOptions`<sup>Required</sup> <a name="cfnOptions" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.cfnOptions"></a>

```typescript
public readonly cfnOptions: ICfnResourceOptions;
```

- *Type:* aws-cdk-lib.ICfnResourceOptions

Options for this resource, such as condition, update policy etc.

---

##### `cfnResourceType`<sup>Required</sup> <a name="cfnResourceType" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.cfnResourceType"></a>

```typescript
public readonly cfnResourceType: string;
```

- *Type:* string

AWS resource type.

---

##### `env`<sup>Required</sup> <a name="env" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.interfaces.ResourceEnvironment

---

##### `attrConnectionId`<sup>Required</sup> <a name="attrConnectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrConnectionId"></a>

```typescript
public readonly attrConnectionId: string;
```

- *Type:* string

The ID of the connection.

---

##### `attrDomainId`<sup>Required</sup> <a name="attrDomainId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrDomainId"></a>

```typescript
public readonly attrDomainId: string;
```

- *Type:* string

The domain ID of the connection.

---

##### `attrDomainUnitId`<sup>Required</sup> <a name="attrDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrDomainUnitId"></a>

```typescript
public readonly attrDomainUnitId: string;
```

- *Type:* string

The domain unit ID of the connection.

---

##### `attrEnvironmentId`<sup>Required</sup> <a name="attrEnvironmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrEnvironmentId"></a>

```typescript
public readonly attrEnvironmentId: string;
```

- *Type:* string

The ID of the environment.

---

##### `attrEnvironmentUserRole`<sup>Required</sup> <a name="attrEnvironmentUserRole" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrEnvironmentUserRole"></a>

```typescript
public readonly attrEnvironmentUserRole: string;
```

- *Type:* string

The environment user role.

---

##### `attrProjectId`<sup>Required</sup> <a name="attrProjectId" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrProjectId"></a>

```typescript
public readonly attrProjectId: string;
```

- *Type:* string

The ID of the project.

---

##### `attrType`<sup>Required</sup> <a name="attrType" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.attrType"></a>

```typescript
public readonly attrType: string;
```

- *Type:* string

The type of the connection.

---

##### `connectionRef`<sup>Required</sup> <a name="connectionRef" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.connectionRef"></a>

```typescript
public readonly connectionRef: ConnectionReference;
```

- *Type:* aws-cdk-lib.interfaces.aws_datazone.ConnectionReference

A reference to a Connection resource.

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.awsLocation"></a>

```typescript
public readonly awsLocation: IResolvable | AwsLocationProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.AwsLocationProperty

The location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.configurations"></a>

```typescript
public readonly configurations: IResolvable | (IResolvable | ConnectionConfigurationProperty)[];
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]

The configurations of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean | IResolvable;
```

- *Type:* boolean | aws-cdk-lib.IResolvable

Specifies whether the trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string

The identifier of the project in which the connection should be created.

---

##### `props`<sup>Optional</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.props"></a>

```typescript
public readonly props: IResolvable | ConnectionPropertiesInputProperty;
```

- *Type:* aws-cdk-lib.IResolvable | aws-cdk-lib.aws_datazone.CfnConnection.ConnectionPropertiesInputProperty

Connection props.

---

##### `scope`<sup>Optional</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.scope"></a>

```typescript
public readonly scope: string;
```

- *Type:* string

The scope of the connection.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.CFN_RESOURCE_TYPE_NAME">CFN_RESOURCE_TYPE_NAME</a></code> | <code>string</code> | The CloudFormation resource type name for this resource class. |

---

##### `CFN_RESOURCE_TYPE_NAME`<sup>Required</sup> <a name="CFN_RESOURCE_TYPE_NAME" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnection.property.CFN_RESOURCE_TYPE_NAME"></a>

```typescript
public readonly CFN_RESOURCE_TYPE_NAME: string;
```

- *Type:* string

The CloudFormation resource type name for this resource class.

---

### Workflow <a name="Workflow" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow"></a>

- *Implements:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IWorkflow">IWorkflow</a>

An MWAA Serverless Workflow for orchestrating tasks in SageMaker Unified Studio.

Creates an `AWS::MWAAServerless::Workflow` resource backed by a local YAML
definition file. The file is deployed to S3 with a content-hash in the object
key so that any edit triggers a CloudFormation update and a fresh MWAA snapshot.

> [https://docs.aws.amazon.com/mwaa/latest/mwaa-serverless-userguide/workflows.html](https://docs.aws.amazon.com/mwaa/latest/mwaa-serverless-userguide/workflows.html)

#### Initializers <a name="Initializers" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.Initializer"></a>

```typescript
import { Workflow } from '@tonesingleton/cdk-sagemaker-unified-studio'

new Workflow(scope: Construct, id: string, props: WorkflowProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.Initializer.parameter.props">props</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps">WorkflowProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.Initializer.parameter.props"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps">WorkflowProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.fromAttributes">fromAttributes</a></code> | Import an existing workflow from its attributes. |

---

##### `isConstruct` <a name="isConstruct" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.isConstruct"></a>

```typescript
import { Workflow } from '@tonesingleton/cdk-sagemaker-unified-studio'

Workflow.isConstruct(x: any)
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

###### `x`<sup>Required</sup> <a name="x" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `fromAttributes` <a name="fromAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.fromAttributes"></a>

```typescript
import { Workflow } from '@tonesingleton/cdk-sagemaker-unified-studio'

Workflow.fromAttributes(scope: Construct, id: string, attrs: WorkflowAttributes)
```

Import an existing workflow from its attributes.

###### `scope`<sup>Required</sup> <a name="scope" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.fromAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.fromAttributes.parameter.id"></a>

- *Type:* string

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.fromAttributes.parameter.attrs"></a>

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowAttributes">WorkflowAttributes</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.property.workflowArn">workflowArn</a></code> | <code>string</code> | The workflow ARN. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow.property.workflowName">workflowName</a></code> | <code>string</code> | The workflow name. |

---

##### `node`<sup>Required</sup> <a name="node" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `workflowArn`<sup>Required</sup> <a name="workflowArn" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.property.workflowArn"></a>

```typescript
public readonly workflowArn: string;
```

- *Type:* string

The workflow ARN.

---

##### `workflowName`<sup>Required</sup> <a name="workflowName" id="@tonesingleton/cdk-sagemaker-unified-studio.Workflow.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string

The workflow name.

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

### AthenaConnectionProps <a name="AthenaConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps"></a>

Properties for an AthenaConnection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.Initializer"></a>

```typescript
import { AthenaConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const athenaConnectionProps: AthenaConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.awsLocation">awsLocation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a></code> | The AWS location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.configurations">configurations</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.connectionScope">connectionScope</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a></code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean</code> | Whether trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The ID of the project that owns this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.workgroupName">workgroupName</a></code> | <code>string</code> | The Athena workgroup name. |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.awsLocation"></a>

```typescript
public readonly awsLocation: AwsLocation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a>
- *Default:* no AWS location

The AWS location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.configurations"></a>

```typescript
public readonly configurations: ConnectionConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]
- *Default:* no configurations

The configurations of the connection.

---

##### `connectionScope`<sup>Optional</sup> <a name="connectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.connectionScope"></a>

```typescript
public readonly connectionScope: ConnectionScope;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a>
- *Default:* no scope

The scope of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean;
```

- *Type:* boolean
- *Default:* no trusted identity propagation

Whether trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string
- *Default:* no environment

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string
- *Default:* derived from the environment

The ID of the project that owns this connection.

---

##### `workgroupName`<sup>Required</sup> <a name="workgroupName" id="@tonesingleton/cdk-sagemaker-unified-studio.AthenaConnectionProps.property.workgroupName"></a>

```typescript
public readonly workgroupName: string;
```

- *Type:* string

The Athena workgroup name.

---

### AwsLocation <a name="AwsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation"></a>

The AWS location where a connection is created.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation.Initializer"></a>

```typescript
import { AwsLocation } from '@tonesingleton/cdk-sagemaker-unified-studio'

const awsLocation: AwsLocation = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation.property.accessRole">accessRole</a></code> | <code>string</code> | The IAM role ARN used as the access role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation.property.awsAccountId">awsAccountId</a></code> | <code>string</code> | The AWS account ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation.property.awsRegion">awsRegion</a></code> | <code>string</code> | The AWS region. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation.property.iamConnectionId">iamConnectionId</a></code> | <code>string</code> | The IAM connection ID. |

---

##### `accessRole`<sup>Optional</sup> <a name="accessRole" id="@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation.property.accessRole"></a>

```typescript
public readonly accessRole: string;
```

- *Type:* string
- *Default:* no access role

The IAM role ARN used as the access role.

---

##### `awsAccountId`<sup>Optional</sup> <a name="awsAccountId" id="@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation.property.awsAccountId"></a>

```typescript
public readonly awsAccountId: string;
```

- *Type:* string
- *Default:* current account

The AWS account ID.

---

##### `awsRegion`<sup>Optional</sup> <a name="awsRegion" id="@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation.property.awsRegion"></a>

```typescript
public readonly awsRegion: string;
```

- *Type:* string
- *Default:* current region

The AWS region.

---

##### `iamConnectionId`<sup>Optional</sup> <a name="iamConnectionId" id="@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation.property.iamConnectionId"></a>

```typescript
public readonly iamConnectionId: string;
```

- *Type:* string
- *Default:* no IAM connection

The IAM connection ID.

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

### Column <a name="Column" id="@tonesingleton/cdk-sagemaker-unified-studio.Column"></a>

A column definition for a data catalog table.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.Column.Initializer"></a>

```typescript
import { Column } from '@tonesingleton/cdk-sagemaker-unified-studio'

const column: Column = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Column.property.name">name</a></code> | <code>string</code> | The column name. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Column.property.type">type</a></code> | <code>string</code> | The Glue data type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Column.property.comment">comment</a></code> | <code>string</code> | Human-readable description of the column. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Column.property.parameters">parameters</a></code> | <code>{[ key: string ]: string}</code> | Key-value pairs defining properties associated with the column. |

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.Column.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The column name.

---

##### `type`<sup>Required</sup> <a name="type" id="@tonesingleton/cdk-sagemaker-unified-studio.Column.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

The Glue data type.

Use `ColumnType` enum for primitive types, or a string for complex types
(e.g. `"array<string>"`, `"map<string,int>"`, `"struct<name:string,age:int>"`,
`"decimal(10,2)"`, `"char(5)"`, `"varchar(255)"`).

---

##### `comment`<sup>Optional</sup> <a name="comment" id="@tonesingleton/cdk-sagemaker-unified-studio.Column.property.comment"></a>

```typescript
public readonly comment: string;
```

- *Type:* string
- *Default:* no comment

Human-readable description of the column.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="@tonesingleton/cdk-sagemaker-unified-studio.Column.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no parameters

Key-value pairs defining properties associated with the column.

---

### ConnectionProps <a name="ConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps"></a>

Common properties shared by all connection constructs.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.Initializer"></a>

```typescript
import { ConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const connectionProps: ConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.awsLocation">awsLocation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a></code> | The AWS location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.configurations">configurations</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.connectionScope">connectionScope</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a></code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean</code> | Whether trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The ID of the project that owns this connection. |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.awsLocation"></a>

```typescript
public readonly awsLocation: AwsLocation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a>
- *Default:* no AWS location

The AWS location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.configurations"></a>

```typescript
public readonly configurations: ConnectionConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]
- *Default:* no configurations

The configurations of the connection.

---

##### `connectionScope`<sup>Optional</sup> <a name="connectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.connectionScope"></a>

```typescript
public readonly connectionScope: ConnectionScope;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a>
- *Default:* no scope

The scope of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean;
```

- *Type:* boolean
- *Default:* no trusted identity propagation

Whether trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string
- *Default:* no environment

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionProps.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string
- *Default:* derived from the environment

The ID of the project that owns this connection.

---

### DataCatalogTableProps <a name="DataCatalogTableProps" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps"></a>

Properties for a DataCatalogTable construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.Initializer"></a>

```typescript
import { DataCatalogTableProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const dataCatalogTableProps: DataCatalogTableProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.columns">columns</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Column">Column</a>[]</code> | The columns of the table (excluding partition keys). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.databaseName">databaseName</a></code> | <code>string</code> | The Glue database name to create this table in. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.location">location</a></code> | <code>string</code> | The S3 location of the table data. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.projectId">projectId</a></code> | <code>string</code> | The SageMaker Unified Studio project ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.tableName">tableName</a></code> | <code>string</code> | The table name. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.dataFormat">dataFormat</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataFormat">DataFormat</a></code> | The data format of the table. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the table. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.parameters">parameters</a></code> | <code>{[ key: string ]: string}</code> | Additional table parameters. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.partitionKeys">partitionKeys</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Column">Column</a>[]</code> | Partition keys for Hive-style partitioning. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.tableType">tableType</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.TableType">TableType</a></code> | The table type. |

---

##### `columns`<sup>Required</sup> <a name="columns" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.columns"></a>

```typescript
public readonly columns: Column[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Column">Column</a>[]

The columns of the table (excluding partition keys).

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The Glue database name to create this table in.

---

##### `location`<sup>Required</sup> <a name="location" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.location"></a>

```typescript
public readonly location: string;
```

- *Type:* string

The S3 location of the table data.

---

##### `projectId`<sup>Required</sup> <a name="projectId" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.projectId"></a>

```typescript
public readonly projectId: string;
```

- *Type:* string

The SageMaker Unified Studio project ID.

The `AmazonDataZoneProject` tag is automatically applied
to any DQDL ruleset created via `addDqdlRuleset()`.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

The table name.

---

##### `dataFormat`<sup>Optional</sup> <a name="dataFormat" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.dataFormat"></a>

```typescript
public readonly dataFormat: DataFormat;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataFormat">DataFormat</a>
- *Default:* DataFormat.PARQUET

The data format of the table.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the table.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no additional parameters

Additional table parameters.

---

##### `partitionKeys`<sup>Optional</sup> <a name="partitionKeys" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.partitionKeys"></a>

```typescript
public readonly partitionKeys: Column[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Column">Column</a>[]
- *Default:* no partitions

Partition keys for Hive-style partitioning.

---

##### `tableType`<sup>Optional</sup> <a name="tableType" id="@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTableProps.property.tableType"></a>

```typescript
public readonly tableType: TableType;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.TableType">TableType</a>
- *Default:* TableType.EXTERNAL

The table type.

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

### DomainAttributes <a name="DomainAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes"></a>

Attributes required to import an existing Domain.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.Initializer"></a>

```typescript
import { DomainAttributes } from '@tonesingleton/cdk-sagemaker-unified-studio'

const domainAttributes: DomainAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.domainArn">domainArn</a></code> | <code>string</code> | The domain ARN. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.domainId">domainId</a></code> | <code>string</code> | The domain ID (e.g. `dzd-abc123`). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.rootDomainUnitId">rootDomainUnitId</a></code> | <code>string</code> | The root domain unit ID. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.domainExecutionRoleArn">domainExecutionRoleArn</a></code> | <code>string</code> | The ARN of the domain execution role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.manageAccessRoleArn">manageAccessRoleArn</a></code> | <code>string</code> | The ARN of the manage access role. |

---

##### `domainArn`<sup>Required</sup> <a name="domainArn" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.domainArn"></a>

```typescript
public readonly domainArn: string;
```

- *Type:* string

The domain ARN.

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The domain ID (e.g. `dzd-abc123`).

---

##### `rootDomainUnitId`<sup>Required</sup> <a name="rootDomainUnitId" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.rootDomainUnitId"></a>

```typescript
public readonly rootDomainUnitId: string;
```

- *Type:* string

The root domain unit ID.

---

##### `domainExecutionRoleArn`<sup>Optional</sup> <a name="domainExecutionRoleArn" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.domainExecutionRoleArn"></a>

```typescript
public readonly domainExecutionRoleArn: string;
```

- *Type:* string
- *Default:* no execution role imported

The ARN of the domain execution role.

---

##### `manageAccessRoleArn`<sup>Optional</sup> <a name="manageAccessRoleArn" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainAttributes.property.manageAccessRoleArn"></a>

```typescript
public readonly manageAccessRoleArn: string;
```

- *Type:* string
- *Default:* no manage access role imported

The ARN of the manage access role.

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC for the Tooling blueprint's SageMaker domain. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.accessLogsBucketName">accessLogsBucketName</a></code> | <code>string</code> | Name for the access logs S3 bucket. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.additionalBlueprintIdentifiers">additionalBlueprintIdentifiers</a></code> | <code>string[]</code> | Additional blueprint identifiers to activate beyond Tooling (which is always included). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.assumeRoleArns">assumeRoleArns</a></code> | <code>string[]</code> | IAM role ARNs to grant permission to assume the domain execution role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.autoDeleteObjects">autoDeleteObjects</a></code> | <code>boolean</code> | Whether to automatically delete S3 objects when the stack is destroyed. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.dataLocationGrantPrincipals">dataLocationGrantPrincipals</a></code> | <code>string[]</code> | IAM principal ARNs to grant Lake Formation DATA_LOCATION_ACCESS on the projects bucket. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the domain's purpose. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.domainUnits">domainUnits</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainUnitConfig">DomainUnitConfig</a>[]</code> | Domain unit configurations. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.projectsBucketName">projectsBucketName</a></code> | <code>string</code> | Name for the projects S3 bucket. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for S3 buckets created by this construct. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Subnet selection for the Tooling blueprint. |

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

##### `vpc`<sup>Required</sup> <a name="vpc" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC for the Tooling blueprint's SageMaker domain.

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

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="@tonesingleton/cdk-sagemaker-unified-studio.DomainProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* SubnetType.PRIVATE_WITH_EGRESS

Subnet selection for the Tooling blueprint.

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

### DqdlRulesetProps <a name="DqdlRulesetProps" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps"></a>

Properties for a DqdlRuleset construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.Initializer"></a>

```typescript
import { DqdlRulesetProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const dqdlRulesetProps: DqdlRulesetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.databaseName">databaseName</a></code> | <code>string</code> | The target database name. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.name">name</a></code> | <code>string</code> | The ruleset name. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.ruleset">ruleset</a></code> | <code>string</code> | The DQDL ruleset string (e.g. 'Rules = [ Completeness "col" = 1.0 ]'). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.tableName">tableName</a></code> | <code>string</code> | The target table name. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the ruleset. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Tags to apply to the ruleset. |

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The target database name.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The ruleset name.

Must be unique within the account/region.

---

##### `ruleset`<sup>Required</sup> <a name="ruleset" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.ruleset"></a>

```typescript
public readonly ruleset: string;
```

- *Type:* string

The DQDL ruleset string (e.g. 'Rules = [ Completeness "col" = 1.0 ]').

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

The target table name.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the ruleset.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@tonesingleton/cdk-sagemaker-unified-studio.DqdlRulesetProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no tags

Tags to apply to the ruleset.

---

### EnvironmentAttributes <a name="EnvironmentAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentAttributes"></a>

Attributes required to import an existing Environment.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentAttributes.Initializer"></a>

```typescript
import { EnvironmentAttributes } from '@tonesingleton/cdk-sagemaker-unified-studio'

const environmentAttributes: EnvironmentAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentAttributes.property.environmentId">environmentId</a></code> | <code>string</code> | The environment ID. |

---

##### `environmentId`<sup>Required</sup> <a name="environmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentAttributes.property.environmentId"></a>

```typescript
public readonly environmentId: string;
```

- *Type:* string

The environment ID.

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

### EnvironmentConfigurationUserParameter <a name="EnvironmentConfigurationUserParameter" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter"></a>

User parameters for a specific environment configuration within a project.

Specify `environmentConfigurationName` when creating a new project, or
`environmentId` when updating an existing project.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter.Initializer"></a>

```typescript
import { EnvironmentConfigurationUserParameter } from '@tonesingleton/cdk-sagemaker-unified-studio'

const environmentConfigurationUserParameter: EnvironmentConfigurationUserParameter = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter.property.environmentParameters">environmentParameters</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue">EnvironmentParameterValue</a>[]</code> | The parameters to pass to this environment configuration. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter.property.environmentConfigurationName">environmentConfigurationName</a></code> | <code>string</code> | The environment configuration name (as defined in the project profile). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter.property.environmentId">environmentId</a></code> | <code>string</code> | The environment ID. |

---

##### `environmentParameters`<sup>Required</sup> <a name="environmentParameters" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter.property.environmentParameters"></a>

```typescript
public readonly environmentParameters: EnvironmentParameterValue[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentParameterValue">EnvironmentParameterValue</a>[]

The parameters to pass to this environment configuration.

---

##### `environmentConfigurationName`<sup>Optional</sup> <a name="environmentConfigurationName" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter.property.environmentConfigurationName"></a>

```typescript
public readonly environmentConfigurationName: string;
```

- *Type:* string
- *Default:* not set (use environmentId for updates)

The environment configuration name (as defined in the project profile).

Use this when creating a new project.

---

##### `environmentId`<sup>Optional</sup> <a name="environmentId" id="@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter.property.environmentId"></a>

```typescript
public readonly environmentId: string;
```

- *Type:* string
- *Default:* not set (use environmentConfigurationName for creates)

The environment ID.

Use this when updating an existing project.

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

### GlueAuthenticationConfiguration <a name="GlueAuthenticationConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration"></a>

Authentication configuration for a Glue connection.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.Initializer"></a>

```typescript
import { GlueAuthenticationConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const glueAuthenticationConfiguration: GlueAuthenticationConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.authenticationType">authenticationType</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationType">GlueAuthenticationType</a></code> | The authentication type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.basicAuthenticationCredentials">basicAuthenticationCredentials</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.BasicAuthenticationCredentialsProperty</code> | Basic authentication credentials (username and password). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.customAuthenticationCredentials">customAuthenticationCredentials</a></code> | <code>{[ key: string ]: string}</code> | Custom authentication credentials as key-value pairs. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.kmsKeyArn">kmsKeyArn</a></code> | <code>string</code> | The ARN of the KMS key used to encrypt the secret. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.oAuth2Properties">oAuth2Properties</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.OAuth2PropertiesProperty</code> | OAuth2 properties for the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.secretArn">secretArn</a></code> | <code>string</code> | The ARN of the Secrets Manager secret containing credentials. |

---

##### `authenticationType`<sup>Required</sup> <a name="authenticationType" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.authenticationType"></a>

```typescript
public readonly authenticationType: GlueAuthenticationType;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationType">GlueAuthenticationType</a>

The authentication type.

---

##### `basicAuthenticationCredentials`<sup>Optional</sup> <a name="basicAuthenticationCredentials" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.basicAuthenticationCredentials"></a>

```typescript
public readonly basicAuthenticationCredentials: BasicAuthenticationCredentialsProperty;
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.BasicAuthenticationCredentialsProperty
- *Default:* no basic credentials

Basic authentication credentials (username and password).

---

##### `customAuthenticationCredentials`<sup>Optional</sup> <a name="customAuthenticationCredentials" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.customAuthenticationCredentials"></a>

```typescript
public readonly customAuthenticationCredentials: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no custom credentials

Custom authentication credentials as key-value pairs.

---

##### `kmsKeyArn`<sup>Optional</sup> <a name="kmsKeyArn" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.kmsKeyArn"></a>

```typescript
public readonly kmsKeyArn: string;
```

- *Type:* string
- *Default:* no KMS key

The ARN of the KMS key used to encrypt the secret.

---

##### `oAuth2Properties`<sup>Optional</sup> <a name="oAuth2Properties" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.oAuth2Properties"></a>

```typescript
public readonly oAuth2Properties: OAuth2PropertiesProperty;
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.OAuth2PropertiesProperty
- *Default:* no OAuth2 properties

OAuth2 properties for the connection.

---

##### `secretArn`<sup>Optional</sup> <a name="secretArn" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string
- *Default:* no secret

The ARN of the Secrets Manager secret containing credentials.

---

### GlueConnectionProps <a name="GlueConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps"></a>

Properties for a GlueConnection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.Initializer"></a>

```typescript
import { GlueConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const glueConnectionProps: GlueConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.awsLocation">awsLocation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a></code> | The AWS location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.configurations">configurations</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.connectionScope">connectionScope</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a></code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean</code> | Whether trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The ID of the project that owns this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.connectionType">connectionType</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType">GlueConnectionType</a></code> | The Glue connection type. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.athenaProperties">athenaProperties</a></code> | <code>{[ key: string ]: string}</code> | Athena-specific properties (e.g. spill_bucket, spill_prefix). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.authenticationConfiguration">authenticationConfiguration</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration">GlueAuthenticationConfiguration</a></code> | Authentication configuration. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.connectionProperties">connectionProperties</a></code> | <code>{[ key: string ]: string}</code> | Connection properties such as HOST, PORT, DATABASE, SECRET_ID, ROLE_ARN. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.matchCriteria">matchCriteria</a></code> | <code>string</code> | Match criteria for selecting this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.physicalConnectionRequirements">physicalConnectionRequirements</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements">GluePhysicalConnectionRequirements</a></code> | Physical connection requirements (VPC, subnet, security groups). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.pythonProperties">pythonProperties</a></code> | <code>{[ key: string ]: string}</code> | Python-specific properties. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.sparkProperties">sparkProperties</a></code> | <code>{[ key: string ]: string}</code> | Spark-specific properties. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.validateCredentials">validateCredentials</a></code> | <code>boolean</code> | Whether to validate credentials on creation. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.validateForComputeEnvironments">validateForComputeEnvironments</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueComputeEnvironment">GlueComputeEnvironment</a>[]</code> | Compute environments to validate the connection for. |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.awsLocation"></a>

```typescript
public readonly awsLocation: AwsLocation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a>
- *Default:* no AWS location

The AWS location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.configurations"></a>

```typescript
public readonly configurations: ConnectionConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]
- *Default:* no configurations

The configurations of the connection.

---

##### `connectionScope`<sup>Optional</sup> <a name="connectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.connectionScope"></a>

```typescript
public readonly connectionScope: ConnectionScope;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a>
- *Default:* no scope

The scope of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean;
```

- *Type:* boolean
- *Default:* no trusted identity propagation

Whether trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string
- *Default:* no environment

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string
- *Default:* derived from the environment

The ID of the project that owns this connection.

---

##### `connectionType`<sup>Required</sup> <a name="connectionType" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.connectionType"></a>

```typescript
public readonly connectionType: GlueConnectionType;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType">GlueConnectionType</a>

The Glue connection type.

---

##### `athenaProperties`<sup>Optional</sup> <a name="athenaProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.athenaProperties"></a>

```typescript
public readonly athenaProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no Athena properties

Athena-specific properties (e.g. spill_bucket, spill_prefix).

---

##### `authenticationConfiguration`<sup>Optional</sup> <a name="authenticationConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.authenticationConfiguration"></a>

```typescript
public readonly authenticationConfiguration: GlueAuthenticationConfiguration;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationConfiguration">GlueAuthenticationConfiguration</a>
- *Default:* no authentication

Authentication configuration.

---

##### `connectionProperties`<sup>Optional</sup> <a name="connectionProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.connectionProperties"></a>

```typescript
public readonly connectionProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no connection properties

Connection properties such as HOST, PORT, DATABASE, SECRET_ID, ROLE_ARN.

---

##### `matchCriteria`<sup>Optional</sup> <a name="matchCriteria" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.matchCriteria"></a>

```typescript
public readonly matchCriteria: string;
```

- *Type:* string
- *Default:* no match criteria

Match criteria for selecting this connection.

---

##### `physicalConnectionRequirements`<sup>Optional</sup> <a name="physicalConnectionRequirements" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.physicalConnectionRequirements"></a>

```typescript
public readonly physicalConnectionRequirements: GluePhysicalConnectionRequirements;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements">GluePhysicalConnectionRequirements</a>
- *Default:* no physical connection requirements

Physical connection requirements (VPC, subnet, security groups).

---

##### `pythonProperties`<sup>Optional</sup> <a name="pythonProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.pythonProperties"></a>

```typescript
public readonly pythonProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no Python properties

Python-specific properties.

---

##### `sparkProperties`<sup>Optional</sup> <a name="sparkProperties" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.sparkProperties"></a>

```typescript
public readonly sparkProperties: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no Spark properties

Spark-specific properties.

---

##### `validateCredentials`<sup>Optional</sup> <a name="validateCredentials" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.validateCredentials"></a>

```typescript
public readonly validateCredentials: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to validate credentials on creation.

---

##### `validateForComputeEnvironments`<sup>Optional</sup> <a name="validateForComputeEnvironments" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionProps.property.validateForComputeEnvironments"></a>

```typescript
public readonly validateForComputeEnvironments: GlueComputeEnvironment[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueComputeEnvironment">GlueComputeEnvironment</a>[]
- *Default:* all compute environments (SPARK, ATHENA, PYTHON)

Compute environments to validate the connection for.

Must contain at least one value when provided.

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

### GluePhysicalConnectionRequirements <a name="GluePhysicalConnectionRequirements" id="@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements"></a>

Physical connection requirements for a Glue connection.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements.Initializer"></a>

```typescript
import { GluePhysicalConnectionRequirements } from '@tonesingleton/cdk-sagemaker-unified-studio'

const gluePhysicalConnectionRequirements: GluePhysicalConnectionRequirements = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements.property.availabilityZone">availabilityZone</a></code> | <code>string</code> | The availability zone of the subnet. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements.property.securityGroupIdList">securityGroupIdList</a></code> | <code>string[]</code> | The security group IDs for the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements.property.subnetId">subnetId</a></code> | <code>string</code> | The subnet ID for the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements.property.subnetIdList">subnetIdList</a></code> | <code>string[]</code> | The subnet ID list for the connection. |

---

##### `availabilityZone`<sup>Optional</sup> <a name="availabilityZone" id="@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements.property.availabilityZone"></a>

```typescript
public readonly availabilityZone: string;
```

- *Type:* string
- *Default:* no availability zone

The availability zone of the subnet.

---

##### `securityGroupIdList`<sup>Optional</sup> <a name="securityGroupIdList" id="@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements.property.securityGroupIdList"></a>

```typescript
public readonly securityGroupIdList: string[];
```

- *Type:* string[]
- *Default:* no security groups

The security group IDs for the connection.

---

##### `subnetId`<sup>Optional</sup> <a name="subnetId" id="@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements.property.subnetId"></a>

```typescript
public readonly subnetId: string;
```

- *Type:* string
- *Default:* no subnet

The subnet ID for the connection.

---

##### `subnetIdList`<sup>Optional</sup> <a name="subnetIdList" id="@tonesingleton/cdk-sagemaker-unified-studio.GluePhysicalConnectionRequirements.property.subnetIdList"></a>

```typescript
public readonly subnetIdList: string[];
```

- *Type:* string[]
- *Default:* no subnet list

The subnet ID list for the connection.

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

### HyperPodConnectionProps <a name="HyperPodConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps"></a>

Properties for a HyperPodConnection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.Initializer"></a>

```typescript
import { HyperPodConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const hyperPodConnectionProps: HyperPodConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.awsLocation">awsLocation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a></code> | The AWS location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.configurations">configurations</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.connectionScope">connectionScope</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a></code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean</code> | Whether trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The ID of the project that owns this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.clusterName">clusterName</a></code> | <code>string</code> | The HyperPod cluster name. |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.awsLocation"></a>

```typescript
public readonly awsLocation: AwsLocation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a>
- *Default:* no AWS location

The AWS location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.configurations"></a>

```typescript
public readonly configurations: ConnectionConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]
- *Default:* no configurations

The configurations of the connection.

---

##### `connectionScope`<sup>Optional</sup> <a name="connectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.connectionScope"></a>

```typescript
public readonly connectionScope: ConnectionScope;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a>
- *Default:* no scope

The scope of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean;
```

- *Type:* boolean
- *Default:* no trusted identity propagation

Whether trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string
- *Default:* no environment

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string
- *Default:* derived from the environment

The ID of the project that owns this connection.

---

##### `clusterName`<sup>Required</sup> <a name="clusterName" id="@tonesingleton/cdk-sagemaker-unified-studio.HyperPodConnectionProps.property.clusterName"></a>

```typescript
public readonly clusterName: string;
```

- *Type:* string

The HyperPod cluster name.

---

### IamConnectionProps <a name="IamConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps"></a>

Properties for an IamConnection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.Initializer"></a>

```typescript
import { IamConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const iamConnectionProps: IamConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.awsLocation">awsLocation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a></code> | The AWS location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.configurations">configurations</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.connectionScope">connectionScope</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a></code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean</code> | Whether trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The ID of the project that owns this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.glueLineageSyncEnabled">glueLineageSyncEnabled</a></code> | <code>boolean</code> | Whether Glue lineage sync is enabled for this connection. |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.awsLocation"></a>

```typescript
public readonly awsLocation: AwsLocation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a>
- *Default:* no AWS location

The AWS location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.configurations"></a>

```typescript
public readonly configurations: ConnectionConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]
- *Default:* no configurations

The configurations of the connection.

---

##### `connectionScope`<sup>Optional</sup> <a name="connectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.connectionScope"></a>

```typescript
public readonly connectionScope: ConnectionScope;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a>
- *Default:* no scope

The scope of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean;
```

- *Type:* boolean
- *Default:* no trusted identity propagation

Whether trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string
- *Default:* no environment

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string
- *Default:* derived from the environment

The ID of the project that owns this connection.

---

##### `glueLineageSyncEnabled`<sup>Optional</sup> <a name="glueLineageSyncEnabled" id="@tonesingleton/cdk-sagemaker-unified-studio.IamConnectionProps.property.glueLineageSyncEnabled"></a>

```typescript
public readonly glueLineageSyncEnabled: boolean;
```

- *Type:* boolean
- *Default:* false

Whether Glue lineage sync is enabled for this connection.

---

### Member <a name="Member" id="@tonesingleton/cdk-sagemaker-unified-studio.Member"></a>

A member of a project (either a user or a group).

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.Member.Initializer"></a>

```typescript
import { Member } from '@tonesingleton/cdk-sagemaker-unified-studio'

const member: Member = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Member.property.groupIdentifier">groupIdentifier</a></code> | <code>string</code> | The group identifier. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Member.property.userIdentifier">userIdentifier</a></code> | <code>string</code> | The user identifier (IAM role ARN or SSO user ID). |

---

##### `groupIdentifier`<sup>Optional</sup> <a name="groupIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.Member.property.groupIdentifier"></a>

```typescript
public readonly groupIdentifier: string;
```

- *Type:* string
- *Default:* not a group member

The group identifier.

---

##### `userIdentifier`<sup>Optional</sup> <a name="userIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.Member.property.userIdentifier"></a>

```typescript
public readonly userIdentifier: string;
```

- *Type:* string
- *Default:* not a user member

The user identifier (IAM role ARN or SSO user ID).

---

### MembershipAssignment <a name="MembershipAssignment" id="@tonesingleton/cdk-sagemaker-unified-studio.MembershipAssignment"></a>

A membership assignment for a project.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.MembershipAssignment.Initializer"></a>

```typescript
import { MembershipAssignment } from '@tonesingleton/cdk-sagemaker-unified-studio'

const membershipAssignment: MembershipAssignment = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.MembershipAssignment.property.designation">designation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Designation">Designation</a></code> | The member's designation within the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.MembershipAssignment.property.member">member</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Member">Member</a></code> | The member identifier. |

---

##### `designation`<sup>Required</sup> <a name="designation" id="@tonesingleton/cdk-sagemaker-unified-studio.MembershipAssignment.property.designation"></a>

```typescript
public readonly designation: Designation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Designation">Designation</a>

The member's designation within the project.

---

##### `member`<sup>Required</sup> <a name="member" id="@tonesingleton/cdk-sagemaker-unified-studio.MembershipAssignment.property.member"></a>

```typescript
public readonly member: Member;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Member">Member</a>

The member identifier.

---

### ProjectAttributes <a name="ProjectAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectAttributes"></a>

Attributes required to import an existing Project.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectAttributes.Initializer"></a>

```typescript
import { ProjectAttributes } from '@tonesingleton/cdk-sagemaker-unified-studio'

const projectAttributes: ProjectAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectAttributes.property.domainId">domainId</a></code> | <code>string</code> | The domain ID the project belongs to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectAttributes.property.projectId">projectId</a></code> | <code>string</code> | The project ID (e.g. `dzp-abc123`). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectAttributes.property.projectExecutionRoleArn">projectExecutionRoleArn</a></code> | <code>string</code> | The ARN of the project execution role. |

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectAttributes.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The domain ID the project belongs to.

---

##### `projectId`<sup>Required</sup> <a name="projectId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectAttributes.property.projectId"></a>

```typescript
public readonly projectId: string;
```

- *Type:* string

The project ID (e.g. `dzp-abc123`).

---

##### `projectExecutionRoleArn`<sup>Optional</sup> <a name="projectExecutionRoleArn" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectAttributes.property.projectExecutionRoleArn"></a>

```typescript
public readonly projectExecutionRoleArn: string;
```

- *Type:* string
- *Default:* no execution role imported

The ARN of the project execution role.

---

### ProjectDatabaseProps <a name="ProjectDatabaseProps" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps"></a>

Properties for a ProjectDatabase construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps.Initializer"></a>

```typescript
import { ProjectDatabaseProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const projectDatabaseProps: ProjectDatabaseProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps.property.databaseName">databaseName</a></code> | <code>string</code> | The name of the Glue database to create. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps.property.projectExecutionRoleArn">projectExecutionRoleArn</a></code> | <code>string</code> | The ARN of the project execution role that will be granted Lake Formation permissions on the database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps.property.locationUri">locationUri</a></code> | <code>string</code> | The S3 location URI for the database. |

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The name of the Glue database to create.

---

##### `projectExecutionRoleArn`<sup>Required</sup> <a name="projectExecutionRoleArn" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps.property.projectExecutionRoleArn"></a>

```typescript
public readonly projectExecutionRoleArn: string;
```

- *Type:* string

The ARN of the project execution role that will be granted Lake Formation permissions on the database.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Human-readable description of the database.

---

##### `locationUri`<sup>Optional</sup> <a name="locationUri" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabaseProps.property.locationUri"></a>

```typescript
public readonly locationUri: string;
```

- *Type:* string
- *Default:* no location (tables define their own locations)

The S3 location URI for the database.

---

### ProjectProfileAttributes <a name="ProjectProfileAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileAttributes"></a>

Attributes required to import an existing ProjectProfile.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileAttributes.Initializer"></a>

```typescript
import { ProjectProfileAttributes } from '@tonesingleton/cdk-sagemaker-unified-studio'

const projectProfileAttributes: ProjectProfileAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileAttributes.property.projectProfileId">projectProfileId</a></code> | <code>string</code> | The project profile ID. |

---

##### `projectProfileId`<sup>Required</sup> <a name="projectProfileId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProfileAttributes.property.projectProfileId"></a>

```typescript
public readonly projectProfileId: string;
```

- *Type:* string

The project profile ID.

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The SageMaker Unified Studio domain ID this project belongs to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.name">name</a></code> | <code>string</code> | Display name of the project (1–64 characters, `[\w -]+`). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.description">description</a></code> | <code>string</code> | Human-readable description of the project's purpose. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.domainUnitId">domainUnitId</a></code> | <code>string</code> | The domain unit ID to place this project in. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.glossaryTerms">glossaryTerms</a></code> | <code>string[]</code> | Glossary terms that can be used in this project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.membershipAssignments">membershipAssignments</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.MembershipAssignment">MembershipAssignment</a>[]</code> | Membership assignments for the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.projectCategory">projectCategory</a></code> | <code>string</code> | The category of the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.projectExecutionRole">projectExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | An existing IAM role to use as the project execution role. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.projectProfileId">projectProfileId</a></code> | <code>string</code> | The project profile ID that defines the project's capabilities. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.resourceTags">resourceTags</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ResourceTag">ResourceTag</a>[]</code> | Resource tags for the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.userParameters">userParameters</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter">EnvironmentConfigurationUserParameter</a>[]</code> | User parameters for environment configurations. |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The SageMaker Unified Studio domain ID this project belongs to.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Display name of the project (1–64 characters, `[\w -]+`).

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

##### `glossaryTerms`<sup>Optional</sup> <a name="glossaryTerms" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.glossaryTerms"></a>

```typescript
public readonly glossaryTerms: string[];
```

- *Type:* string[]
- *Default:* no glossary terms

Glossary terms that can be used in this project.

---

##### `membershipAssignments`<sup>Optional</sup> <a name="membershipAssignments" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.membershipAssignments"></a>

```typescript
public readonly membershipAssignments: MembershipAssignment[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.MembershipAssignment">MembershipAssignment</a>[]
- *Default:* no membership assignments

Membership assignments for the project.

---

##### `projectCategory`<sup>Optional</sup> <a name="projectCategory" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.projectCategory"></a>

```typescript
public readonly projectCategory: string;
```

- *Type:* string
- *Default:* no category

The category of the project.

---

##### `projectExecutionRole`<sup>Optional</sup> <a name="projectExecutionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.projectExecutionRole"></a>

```typescript
public readonly projectExecutionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* a new execution role is created automatically

An existing IAM role to use as the project execution role.

---

##### `projectProfileId`<sup>Optional</sup> <a name="projectProfileId" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.projectProfileId"></a>

```typescript
public readonly projectProfileId: string;
```

- *Type:* string
- *Default:* no project profile

The project profile ID that defines the project's capabilities.

---

##### `resourceTags`<sup>Optional</sup> <a name="resourceTags" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.resourceTags"></a>

```typescript
public readonly resourceTags: ResourceTag[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ResourceTag">ResourceTag</a>[]
- *Default:* no resource tags

Resource tags for the project.

---

##### `userParameters`<sup>Optional</sup> <a name="userParameters" id="@tonesingleton/cdk-sagemaker-unified-studio.ProjectProps.property.userParameters"></a>

```typescript
public readonly userParameters: EnvironmentConfigurationUserParameter[];
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.EnvironmentConfigurationUserParameter">EnvironmentConfigurationUserParameter</a>[]
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

### RedshiftConnectionProps <a name="RedshiftConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps"></a>

Properties for a RedshiftConnection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.Initializer"></a>

```typescript
import { RedshiftConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const redshiftConnectionProps: RedshiftConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.awsLocation">awsLocation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a></code> | The AWS location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.configurations">configurations</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.connectionScope">connectionScope</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a></code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean</code> | Whether trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The ID of the project that owns this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.credentials">credentials</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentials">RedshiftCredentials</a></code> | The credentials for the Redshift database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.databaseName">databaseName</a></code> | <code>string</code> | The Redshift database name. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.host">host</a></code> | <code>string</code> | The hostname of the Redshift cluster or serverless endpoint. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.storage">storage</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage">RedshiftStorage</a></code> | The storage configuration (cluster or serverless). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.port">port</a></code> | <code>number</code> | The port of the Redshift cluster. |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.awsLocation"></a>

```typescript
public readonly awsLocation: AwsLocation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a>
- *Default:* no AWS location

The AWS location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.configurations"></a>

```typescript
public readonly configurations: ConnectionConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]
- *Default:* no configurations

The configurations of the connection.

---

##### `connectionScope`<sup>Optional</sup> <a name="connectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.connectionScope"></a>

```typescript
public readonly connectionScope: ConnectionScope;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a>
- *Default:* no scope

The scope of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean;
```

- *Type:* boolean
- *Default:* no trusted identity propagation

Whether trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string
- *Default:* no environment

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string
- *Default:* derived from the environment

The ID of the project that owns this connection.

---

##### `credentials`<sup>Required</sup> <a name="credentials" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.credentials"></a>

```typescript
public readonly credentials: RedshiftCredentials;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentials">RedshiftCredentials</a>

The credentials for the Redshift database.

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The Redshift database name.

---

##### `host`<sup>Required</sup> <a name="host" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.host"></a>

```typescript
public readonly host: string;
```

- *Type:* string

The hostname of the Redshift cluster or serverless endpoint.

---

##### `storage`<sup>Required</sup> <a name="storage" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.storage"></a>

```typescript
public readonly storage: RedshiftStorage;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftStorage">RedshiftStorage</a>

The storage configuration (cluster or serverless).

---

##### `port`<sup>Optional</sup> <a name="port" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftConnectionProps.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number
- *Default:* 5439

The port of the Redshift cluster.

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

### RedshiftCredentials <a name="RedshiftCredentials" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentials"></a>

Redshift credentials configuration.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentials.Initializer"></a>

```typescript
import { RedshiftCredentials } from '@tonesingleton/cdk-sagemaker-unified-studio'

const redshiftCredentials: RedshiftCredentials = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentials.property.secretArn">secretArn</a></code> | <code>string</code> | The ARN of the Secrets Manager secret containing credentials. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentials.property.usernamePassword">usernamePassword</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftUsernamePassword">RedshiftUsernamePassword</a></code> | Username and password credentials. |

---

##### `secretArn`<sup>Optional</sup> <a name="secretArn" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentials.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string
- *Default:* no secret

The ARN of the Secrets Manager secret containing credentials.

---

##### `usernamePassword`<sup>Optional</sup> <a name="usernamePassword" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftCredentials.property.usernamePassword"></a>

```typescript
public readonly usernamePassword: RedshiftUsernamePassword;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftUsernamePassword">RedshiftUsernamePassword</a>
- *Default:* no username/password

Username and password credentials.

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

### RedshiftUsernamePassword <a name="RedshiftUsernamePassword" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftUsernamePassword"></a>

Redshift username and password credentials.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftUsernamePassword.Initializer"></a>

```typescript
import { RedshiftUsernamePassword } from '@tonesingleton/cdk-sagemaker-unified-studio'

const redshiftUsernamePassword: RedshiftUsernamePassword = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftUsernamePassword.property.password">password</a></code> | <code>string</code> | The password for the Redshift database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.RedshiftUsernamePassword.property.username">username</a></code> | <code>string</code> | The username for the Redshift database. |

---

##### `password`<sup>Required</sup> <a name="password" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftUsernamePassword.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

The password for the Redshift database.

---

##### `username`<sup>Required</sup> <a name="username" id="@tonesingleton/cdk-sagemaker-unified-studio.RedshiftUsernamePassword.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

The username for the Redshift database.

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

### ResourceTag <a name="ResourceTag" id="@tonesingleton/cdk-sagemaker-unified-studio.ResourceTag"></a>

A resource tag for a project.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.ResourceTag.Initializer"></a>

```typescript
import { ResourceTag } from '@tonesingleton/cdk-sagemaker-unified-studio'

const resourceTag: ResourceTag = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ResourceTag.property.key">key</a></code> | <code>string</code> | The tag key. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ResourceTag.property.value">value</a></code> | <code>string</code> | The tag value. |

---

##### `key`<sup>Required</sup> <a name="key" id="@tonesingleton/cdk-sagemaker-unified-studio.ResourceTag.property.key"></a>

```typescript
public readonly key: string;
```

- *Type:* string

The tag key.

---

##### `value`<sup>Required</sup> <a name="value" id="@tonesingleton/cdk-sagemaker-unified-studio.ResourceTag.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

The tag value.

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.awsLocation">awsLocation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a></code> | The AWS location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.configurations">configurations</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.connectionScope">connectionScope</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a></code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean</code> | Whether trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The ID of the project that owns this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.s3Uri">s3Uri</a></code> | <code>string</code> | The S3 URI to connect to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.registerS3AccessGrantLocation">registerS3AccessGrantLocation</a></code> | <code>boolean</code> | Whether to register the S3 Access Grant location. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.s3AccessGrantLocationId">s3AccessGrantLocationId</a></code> | <code>string</code> | The S3 Access Grant location ID. |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.awsLocation"></a>

```typescript
public readonly awsLocation: AwsLocation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a>
- *Default:* no AWS location

The AWS location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.configurations"></a>

```typescript
public readonly configurations: ConnectionConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]
- *Default:* no configurations

The configurations of the connection.

---

##### `connectionScope`<sup>Optional</sup> <a name="connectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.connectionScope"></a>

```typescript
public readonly connectionScope: ConnectionScope;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a>
- *Default:* no scope

The scope of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean;
```

- *Type:* boolean
- *Default:* no trusted identity propagation

Whether trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string
- *Default:* no environment

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string
- *Default:* derived from the environment

The ID of the project that owns this connection.

---

##### `s3Uri`<sup>Required</sup> <a name="s3Uri" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.s3Uri"></a>

```typescript
public readonly s3Uri: string;
```

- *Type:* string

The S3 URI to connect to.

---

##### `registerS3AccessGrantLocation`<sup>Optional</sup> <a name="registerS3AccessGrantLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.registerS3AccessGrantLocation"></a>

```typescript
public readonly registerS3AccessGrantLocation: boolean;
```

- *Type:* boolean
- *Default:* no registration

Whether to register the S3 Access Grant location.

---

##### `s3AccessGrantLocationId`<sup>Optional</sup> <a name="s3AccessGrantLocationId" id="@tonesingleton/cdk-sagemaker-unified-studio.S3ConnectionProps.property.s3AccessGrantLocationId"></a>

```typescript
public readonly s3AccessGrantLocationId: string;
```

- *Type:* string
- *Default:* no access grant location

The S3 Access Grant location ID.

---

### SparkEmrConnectionProps <a name="SparkEmrConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps"></a>

Properties for a SparkEmrConnection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.Initializer"></a>

```typescript
import { SparkEmrConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const sparkEmrConnectionProps: SparkEmrConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.awsLocation">awsLocation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a></code> | The AWS location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.configurations">configurations</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.connectionScope">connectionScope</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a></code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean</code> | Whether trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The ID of the project that owns this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.computeArn">computeArn</a></code> | <code>string</code> | The ARN of the EMR Serverless application or EMR cluster. |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.awsLocation"></a>

```typescript
public readonly awsLocation: AwsLocation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a>
- *Default:* no AWS location

The AWS location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.configurations"></a>

```typescript
public readonly configurations: ConnectionConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]
- *Default:* no configurations

The configurations of the connection.

---

##### `connectionScope`<sup>Optional</sup> <a name="connectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.connectionScope"></a>

```typescript
public readonly connectionScope: ConnectionScope;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a>
- *Default:* no scope

The scope of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean;
```

- *Type:* boolean
- *Default:* no trusted identity propagation

Whether trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string
- *Default:* no environment

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string
- *Default:* derived from the environment

The ID of the project that owns this connection.

---

##### `computeArn`<sup>Required</sup> <a name="computeArn" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkEmrConnectionProps.property.computeArn"></a>

```typescript
public readonly computeArn: string;
```

- *Type:* string

The ARN of the EMR Serverless application or EMR cluster.

---

### SparkGlueConnectionProps <a name="SparkGlueConnectionProps" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps"></a>

Properties for a SparkGlueConnection construct.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.Initializer"></a>

```typescript
import { SparkGlueConnectionProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const sparkGlueConnectionProps: SparkGlueConnectionProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.domainIdentifier">domainIdentifier</a></code> | <code>string</code> | The ID of the domain where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.name">name</a></code> | <code>string</code> | The name of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.awsLocation">awsLocation</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a></code> | The AWS location where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.configurations">configurations</a></code> | <code>aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]</code> | The configurations of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.connectionScope">connectionScope</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a></code> | The scope of the connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.description">description</a></code> | <code>string</code> | Connection description. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.enableTrustedIdentityPropagation">enableTrustedIdentityPropagation</a></code> | <code>boolean</code> | Whether trusted identity propagation is enabled. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.environmentIdentifier">environmentIdentifier</a></code> | <code>string</code> | The ID of the environment where the connection is created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.projectIdentifier">projectIdentifier</a></code> | <code>string</code> | The ID of the project that owns this connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.glueVersion">glueVersion</a></code> | <code>string</code> | The Glue version (e.g. '4.0'). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.idleTimeout">idleTimeout</a></code> | <code>number</code> | The idle timeout in minutes before the session is terminated. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.numberOfWorkers">numberOfWorkers</a></code> | <code>number</code> | The number of workers allocated to the Glue session. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.workerType">workerType</a></code> | <code>string</code> | The Glue worker type (e.g. 'G.1X', 'G.2X'). |

---

##### `domainIdentifier`<sup>Required</sup> <a name="domainIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.domainIdentifier"></a>

```typescript
public readonly domainIdentifier: string;
```

- *Type:* string

The ID of the domain where the connection is created.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the connection.

---

##### `awsLocation`<sup>Optional</sup> <a name="awsLocation" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.awsLocation"></a>

```typescript
public readonly awsLocation: AwsLocation;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.AwsLocation">AwsLocation</a>
- *Default:* no AWS location

The AWS location where the connection is created.

---

##### `configurations`<sup>Optional</sup> <a name="configurations" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.configurations"></a>

```typescript
public readonly configurations: ConnectionConfigurationProperty[];
```

- *Type:* aws-cdk-lib.aws_datazone.CfnConnection.ConnectionConfigurationProperty[]
- *Default:* no configurations

The configurations of the connection.

---

##### `connectionScope`<sup>Optional</sup> <a name="connectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.connectionScope"></a>

```typescript
public readonly connectionScope: ConnectionScope;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope">ConnectionScope</a>
- *Default:* no scope

The scope of the connection.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Connection description.

---

##### `enableTrustedIdentityPropagation`<sup>Optional</sup> <a name="enableTrustedIdentityPropagation" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.enableTrustedIdentityPropagation"></a>

```typescript
public readonly enableTrustedIdentityPropagation: boolean;
```

- *Type:* boolean
- *Default:* no trusted identity propagation

Whether trusted identity propagation is enabled.

---

##### `environmentIdentifier`<sup>Optional</sup> <a name="environmentIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.environmentIdentifier"></a>

```typescript
public readonly environmentIdentifier: string;
```

- *Type:* string
- *Default:* no environment

The ID of the environment where the connection is created.

---

##### `projectIdentifier`<sup>Optional</sup> <a name="projectIdentifier" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.projectIdentifier"></a>

```typescript
public readonly projectIdentifier: string;
```

- *Type:* string
- *Default:* derived from the environment

The ID of the project that owns this connection.

---

##### `glueVersion`<sup>Optional</sup> <a name="glueVersion" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.glueVersion"></a>

```typescript
public readonly glueVersion: string;
```

- *Type:* string
- *Default:* '4.0'

The Glue version (e.g. '4.0').

---

##### `idleTimeout`<sup>Optional</sup> <a name="idleTimeout" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.idleTimeout"></a>

```typescript
public readonly idleTimeout: number;
```

- *Type:* number
- *Default:* 60

The idle timeout in minutes before the session is terminated.

---

##### `numberOfWorkers`<sup>Optional</sup> <a name="numberOfWorkers" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.numberOfWorkers"></a>

```typescript
public readonly numberOfWorkers: number;
```

- *Type:* number
- *Default:* 10

The number of workers allocated to the Glue session.

---

##### `workerType`<sup>Optional</sup> <a name="workerType" id="@tonesingleton/cdk-sagemaker-unified-studio.SparkGlueConnectionProps.property.workerType"></a>

```typescript
public readonly workerType: string;
```

- *Type:* string
- *Default:* 'G.1X'

The Glue worker type (e.g. 'G.1X', 'G.2X').

---

### WorkflowAttributes <a name="WorkflowAttributes" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowAttributes"></a>

Attributes required to import an existing Workflow.

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowAttributes.Initializer"></a>

```typescript
import { WorkflowAttributes } from '@tonesingleton/cdk-sagemaker-unified-studio'

const workflowAttributes: WorkflowAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowAttributes.property.workflowArn">workflowArn</a></code> | <code>string</code> | The workflow ARN. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowAttributes.property.workflowName">workflowName</a></code> | <code>string</code> | The workflow name. |

---

##### `workflowArn`<sup>Required</sup> <a name="workflowArn" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowAttributes.property.workflowArn"></a>

```typescript
public readonly workflowArn: string;
```

- *Type:* string

The workflow ARN.

---

##### `workflowName`<sup>Required</sup> <a name="workflowName" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowAttributes.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string

The workflow name.

---

### WorkflowDefinitionFile <a name="WorkflowDefinitionFile" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile"></a>

Local workflow definition file configuration.

The construct deploys the file to S3 with a content-hash in the object key
so that CloudFormation detects changes and triggers a workflow update
(MWAA Serverless snapshots the definition on create/update).

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile.Initializer"></a>

```typescript
import { WorkflowDefinitionFile } from '@tonesingleton/cdk-sagemaker-unified-studio'

const workflowDefinitionFile: WorkflowDefinitionFile = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The S3 bucket to deploy the definition to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile.property.path">path</a></code> | <code>string</code> | Absolute path to the local YAML workflow definition file. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile.property.keyPrefix">keyPrefix</a></code> | <code>string</code> | S3 key prefix for the deployed definition. |

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

The S3 bucket to deploy the definition to.

---

##### `path`<sup>Required</sup> <a name="path" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Absolute path to the local YAML workflow definition file.

---

##### `keyPrefix`<sup>Optional</sup> <a name="keyPrefix" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile.property.keyPrefix"></a>

```typescript
public readonly keyPrefix: string;
```

- *Type:* string
- *Default:* 'workflows'

S3 key prefix for the deployed definition.

---

### WorkflowEncryptionConfiguration <a name="WorkflowEncryptionConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowEncryptionConfiguration"></a>

Encryption configuration for workflow data at rest and in transit.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-mwaaserverless-workflow-encryptionconfiguration.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-mwaaserverless-workflow-encryptionconfiguration.html)

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowEncryptionConfiguration.Initializer"></a>

```typescript
import { WorkflowEncryptionConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const workflowEncryptionConfiguration: WorkflowEncryptionConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowEncryptionConfiguration.property.type">type</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EncryptionType">EncryptionType</a></code> | The type of encryption to use. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowEncryptionConfiguration.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The KMS key to use for encryption. |

---

##### `type`<sup>Required</sup> <a name="type" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowEncryptionConfiguration.property.type"></a>

```typescript
public readonly type: EncryptionType;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.EncryptionType">EncryptionType</a>

The type of encryption to use.

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowEncryptionConfiguration.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* AWS managed key

The KMS key to use for encryption.

Required when type is CUSTOMER_MANAGED_KEY.

---

### WorkflowLoggingConfiguration <a name="WorkflowLoggingConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowLoggingConfiguration"></a>

Logging configuration for workflow execution.

Amazon MWAA Serverless automatically exports worker logs and task-level
information to the specified log group using remote logging.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-mwaaserverless-workflow-loggingconfiguration.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-mwaaserverless-workflow-loggingconfiguration.html)

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowLoggingConfiguration.Initializer"></a>

```typescript
import { WorkflowLoggingConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const workflowLoggingConfiguration: WorkflowLoggingConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowLoggingConfiguration.property.logGroupName">logGroupName</a></code> | <code>string</code> | The name of the CloudWatch log group where workflow execution logs are stored. |

---

##### `logGroupName`<sup>Required</sup> <a name="logGroupName" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowLoggingConfiguration.property.logGroupName"></a>

```typescript
public readonly logGroupName: string;
```

- *Type:* string

The name of the CloudWatch log group where workflow execution logs are stored.

---

### WorkflowNetworkConfiguration <a name="WorkflowNetworkConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowNetworkConfiguration"></a>

Network configuration for workflow execution.

When specified, MWAA Serverless deploys ECS worker tasks in your VPC for
secure connectivity to VPC-only resources (e.g. RDS, private endpoints).
If not specified, tasks run in the service's default worker VPC with
network isolation from other customers.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-mwaaserverless-workflow-networkconfiguration.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-mwaaserverless-workflow-networkconfiguration.html)

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowNetworkConfiguration.Initializer"></a>

```typescript
import { WorkflowNetworkConfiguration } from '@tonesingleton/cdk-sagemaker-unified-studio'

const workflowNetworkConfiguration: WorkflowNetworkConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowNetworkConfiguration.property.securityGroupIds">securityGroupIds</a></code> | <code>string[]</code> | VPC security group IDs for the workflow execution environment. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowNetworkConfiguration.property.subnetIds">subnetIds</a></code> | <code>string[]</code> | VPC subnet IDs where the workflow execution environment is deployed. |

---

##### `securityGroupIds`<sup>Optional</sup> <a name="securityGroupIds" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowNetworkConfiguration.property.securityGroupIds"></a>

```typescript
public readonly securityGroupIds: string[];
```

- *Type:* string[]
- *Default:* service default

VPC security group IDs for the workflow execution environment.

---

##### `subnetIds`<sup>Optional</sup> <a name="subnetIds" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowNetworkConfiguration.property.subnetIds"></a>

```typescript
public readonly subnetIds: string[];
```

- *Type:* string[]
- *Default:* service default

VPC subnet IDs where the workflow execution environment is deployed.

---

### WorkflowProps <a name="WorkflowProps" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps"></a>

Properties for a Workflow construct.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-mwaaserverless-workflow.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-mwaaserverless-workflow.html)

#### Initializer <a name="Initializer" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.Initializer"></a>

```typescript
import { WorkflowProps } from '@tonesingleton/cdk-sagemaker-unified-studio'

const workflowProps: WorkflowProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.definitionFile">definitionFile</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile">WorkflowDefinitionFile</a></code> | The local YAML workflow definition file. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.name">name</a></code> | <code>string</code> | The name of the workflow. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role that MWAA Serverless assumes when executing the workflow. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.description">description</a></code> | <code>string</code> | Description of the workflow (1–1024 characters). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.encryptionConfiguration">encryptionConfiguration</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowEncryptionConfiguration">WorkflowEncryptionConfiguration</a></code> | Encryption configuration for workflow data. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.loggingConfiguration">loggingConfiguration</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowLoggingConfiguration">WorkflowLoggingConfiguration</a></code> | Logging configuration for workflow execution. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.networkConfiguration">networkConfiguration</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowNetworkConfiguration">WorkflowNetworkConfiguration</a></code> | Network configuration for VPC access during execution. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | Tags to apply to the workflow resource. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.triggerMode">triggerMode</a></code> | <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.TriggerMode">TriggerMode</a></code> | The trigger mode for the workflow. |

---

##### `definitionFile`<sup>Required</sup> <a name="definitionFile" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.definitionFile"></a>

```typescript
public readonly definitionFile: WorkflowDefinitionFile;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowDefinitionFile">WorkflowDefinitionFile</a>

The local YAML workflow definition file.

The construct deploys this file to S3 and appends a content hash to the
object key so that any edit triggers a CloudFormation update.

---

##### `name`<sup>Required</sup> <a name="name" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the workflow.

Must match `^[a-zA-Z0-9]+[a-zA-Z0-9.\-_]*$` and be between 1–255 characters.
Changing this value requires replacement.

---

##### `role`<sup>Required</sup> <a name="role" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The IAM role that MWAA Serverless assumes when executing the workflow.

Must have permissions to access the AWS services and resources that
your workflow tasks interact with.

---

##### `description`<sup>Optional</sup> <a name="description" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

Description of the workflow (1–1024 characters).

---

##### `encryptionConfiguration`<sup>Optional</sup> <a name="encryptionConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.encryptionConfiguration"></a>

```typescript
public readonly encryptionConfiguration: WorkflowEncryptionConfiguration;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowEncryptionConfiguration">WorkflowEncryptionConfiguration</a>
- *Default:* AWS managed encryption

Encryption configuration for workflow data.

Changing this value requires replacement.

---

##### `loggingConfiguration`<sup>Optional</sup> <a name="loggingConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.loggingConfiguration"></a>

```typescript
public readonly loggingConfiguration: WorkflowLoggingConfiguration;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowLoggingConfiguration">WorkflowLoggingConfiguration</a>
- *Default:* no logging

Logging configuration for workflow execution.

---

##### `networkConfiguration`<sup>Optional</sup> <a name="networkConfiguration" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.networkConfiguration"></a>

```typescript
public readonly networkConfiguration: WorkflowNetworkConfiguration;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.WorkflowNetworkConfiguration">WorkflowNetworkConfiguration</a>
- *Default:* runs in the service's default worker VPC

Network configuration for VPC access during execution.

When specified, ECS worker tasks are deployed in your VPC for secure
connectivity to VPC-only resources (e.g. RDS, private endpoints).

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no tags

Tags to apply to the workflow resource.

---

##### `triggerMode`<sup>Optional</sup> <a name="triggerMode" id="@tonesingleton/cdk-sagemaker-unified-studio.WorkflowProps.property.triggerMode"></a>

```typescript
public readonly triggerMode: TriggerMode;
```

- *Type:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.TriggerMode">TriggerMode</a>
- *Default:* TriggerMode.MANUAL_ONLY

The trigger mode for the workflow.

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

### IDataCatalogTable <a name="IDataCatalogTable" id="@tonesingleton/cdk-sagemaker-unified-studio.IDataCatalogTable"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataCatalogTable">DataCatalogTable</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDataCatalogTable">IDataCatalogTable</a>

Exposed attributes of the DataCatalogTable construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDataCatalogTable.property.databaseName">databaseName</a></code> | <code>string</code> | The database name the table belongs to. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDataCatalogTable.property.tableName">tableName</a></code> | <code>string</code> | The table name. |

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="@tonesingleton/cdk-sagemaker-unified-studio.IDataCatalogTable.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The database name the table belongs to.

---

##### `tableName`<sup>Required</sup> <a name="tableName" id="@tonesingleton/cdk-sagemaker-unified-studio.IDataCatalogTable.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

The table name.

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

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Domain">Domain</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IDomain">IDomain</a>

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IGitConnection.property.connectionStatus">connectionStatus</a></code> | <code>string</code> | The status of the CodeConnections connection. |

---

##### `codeConnectionArn`<sup>Required</sup> <a name="codeConnectionArn" id="@tonesingleton/cdk-sagemaker-unified-studio.IGitConnection.property.codeConnectionArn"></a>

```typescript
public readonly codeConnectionArn: string;
```

- *Type:* string

The ARN of the CodeConnections connection.

---

##### `connectionStatus`<sup>Optional</sup> <a name="connectionStatus" id="@tonesingleton/cdk-sagemaker-unified-studio.IGitConnection.property.connectionStatus"></a>

```typescript
public readonly connectionStatus: string;
```

- *Type:* string

The status of the CodeConnections connection.

New connections are created in `PENDING` status and must be authorized
in the AWS Console before they can be used.

Only available when a new connection is created (not when using an existing ARN).

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
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.createdAt">createdAt</a></code> | <code>string</code> | The timestamp of when the project was created. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.createdBy">createdBy</a></code> | <code>string</code> | The Amazon DataZone user who created the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.domainId">domainId</a></code> | <code>string</code> | The identifier of the domain where the project exists. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.id">id</a></code> | <code>string</code> | The identifier of a project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.lastUpdatedAt">lastUpdatedAt</a></code> | <code>string</code> | The timestamp of when the project was last updated. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.projectExecutionRole">projectExecutionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The project execution role (provided or auto-created). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.projectStatus">projectStatus</a></code> | <code>string</code> | The status of the project. |

---

##### `createdAt`<sup>Required</sup> <a name="createdAt" id="@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.createdAt"></a>

```typescript
public readonly createdAt: string;
```

- *Type:* string

The timestamp of when the project was created.

---

##### `createdBy`<sup>Required</sup> <a name="createdBy" id="@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.createdBy"></a>

```typescript
public readonly createdBy: string;
```

- *Type:* string

The Amazon DataZone user who created the project.

---

##### `domainId`<sup>Required</sup> <a name="domainId" id="@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.domainId"></a>

```typescript
public readonly domainId: string;
```

- *Type:* string

The identifier of the domain where the project exists.

---

##### `id`<sup>Required</sup> <a name="id" id="@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

The identifier of a project.

---

##### `lastUpdatedAt`<sup>Required</sup> <a name="lastUpdatedAt" id="@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.lastUpdatedAt"></a>

```typescript
public readonly lastUpdatedAt: string;
```

- *Type:* string

The timestamp of when the project was last updated.

---

##### `projectExecutionRole`<sup>Required</sup> <a name="projectExecutionRole" id="@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.projectExecutionRole"></a>

```typescript
public readonly projectExecutionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The project execution role (provided or auto-created).

---

##### `projectStatus`<sup>Required</sup> <a name="projectStatus" id="@tonesingleton/cdk-sagemaker-unified-studio.IProject.property.projectStatus"></a>

```typescript
public readonly projectStatus: string;
```

- *Type:* string

The status of the project.

---

### IProjectDatabase <a name="IProjectDatabase" id="@tonesingleton/cdk-sagemaker-unified-studio.IProjectDatabase"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.ProjectDatabase">ProjectDatabase</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProjectDatabase">IProjectDatabase</a>

Exposed attributes of the ProjectDatabase construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IProjectDatabase.property.databaseName">databaseName</a></code> | <code>string</code> | The name of the Glue database. |

---

##### `databaseName`<sup>Required</sup> <a name="databaseName" id="@tonesingleton/cdk-sagemaker-unified-studio.IProjectDatabase.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

The name of the Glue database.

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

### IWorkflow <a name="IWorkflow" id="@tonesingleton/cdk-sagemaker-unified-studio.IWorkflow"></a>

- *Implemented By:* <a href="#@tonesingleton/cdk-sagemaker-unified-studio.Workflow">Workflow</a>, <a href="#@tonesingleton/cdk-sagemaker-unified-studio.IWorkflow">IWorkflow</a>

Exposed attributes of the Workflow construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IWorkflow.property.workflowArn">workflowArn</a></code> | <code>string</code> | The workflow ARN. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.IWorkflow.property.workflowName">workflowName</a></code> | <code>string</code> | The workflow name. |

---

##### `workflowArn`<sup>Required</sup> <a name="workflowArn" id="@tonesingleton/cdk-sagemaker-unified-studio.IWorkflow.property.workflowArn"></a>

```typescript
public readonly workflowArn: string;
```

- *Type:* string

The workflow ARN.

---

##### `workflowName`<sup>Required</sup> <a name="workflowName" id="@tonesingleton/cdk-sagemaker-unified-studio.IWorkflow.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string

The workflow name.

---

## Enums <a name="Enums" id="Enums"></a>

### ColumnType <a name="ColumnType" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType"></a>

Primitive data types supported by Glue Data Catalog.

For complex types (array, map, struct), use the static helper methods.

> [https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-tables.html](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-catalog-tables.html)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.STRING">STRING</a></code> | UTF-8 string. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.TINYINT">TINYINT</a></code> | 8-bit signed integer. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.SMALLINT">SMALLINT</a></code> | 16-bit signed integer. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.INT">INT</a></code> | 32-bit signed integer. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.BIGINT">BIGINT</a></code> | 64-bit signed integer. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.FLOAT">FLOAT</a></code> | Single-precision 32-bit floating point. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.DOUBLE">DOUBLE</a></code> | Double-precision 64-bit floating point. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.DECIMAL">DECIMAL</a></code> | Arbitrary-precision decimal. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.BOOLEAN">BOOLEAN</a></code> | Boolean (true/false). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.BINARY">BINARY</a></code> | Binary data. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.DATE">DATE</a></code> | Date without time (YYYY-MM-DD). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.TIMESTAMP">TIMESTAMP</a></code> | Timestamp with nanosecond precision. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.CHAR">CHAR</a></code> | Character string with fixed length. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.VARCHAR">VARCHAR</a></code> | Character string with maximum length. |

---

##### `STRING` <a name="STRING" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.STRING"></a>

UTF-8 string.

---


##### `TINYINT` <a name="TINYINT" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.TINYINT"></a>

8-bit signed integer.

---


##### `SMALLINT` <a name="SMALLINT" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.SMALLINT"></a>

16-bit signed integer.

---


##### `INT` <a name="INT" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.INT"></a>

32-bit signed integer.

---


##### `BIGINT` <a name="BIGINT" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.BIGINT"></a>

64-bit signed integer.

---


##### `FLOAT` <a name="FLOAT" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.FLOAT"></a>

Single-precision 32-bit floating point.

---


##### `DOUBLE` <a name="DOUBLE" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.DOUBLE"></a>

Double-precision 64-bit floating point.

---


##### `DECIMAL` <a name="DECIMAL" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.DECIMAL"></a>

Arbitrary-precision decimal.

---


##### `BOOLEAN` <a name="BOOLEAN" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.BOOLEAN"></a>

Boolean (true/false).

---


##### `BINARY` <a name="BINARY" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.BINARY"></a>

Binary data.

---


##### `DATE` <a name="DATE" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.DATE"></a>

Date without time (YYYY-MM-DD).

---


##### `TIMESTAMP` <a name="TIMESTAMP" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.TIMESTAMP"></a>

Timestamp with nanosecond precision.

---


##### `CHAR` <a name="CHAR" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.CHAR"></a>

Character string with fixed length.

---


##### `VARCHAR` <a name="VARCHAR" id="@tonesingleton/cdk-sagemaker-unified-studio.ColumnType.VARCHAR"></a>

Character string with maximum length.

---


### ConnectionScope <a name="ConnectionScope" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope"></a>

The scope of a connection.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope.DOMAIN">DOMAIN</a></code> | Domain-level connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope.PROJECT">PROJECT</a></code> | Project-level connection. |

---

##### `DOMAIN` <a name="DOMAIN" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope.DOMAIN"></a>

Domain-level connection.

---


##### `PROJECT` <a name="PROJECT" id="@tonesingleton/cdk-sagemaker-unified-studio.ConnectionScope.PROJECT"></a>

Project-level connection.

---


### DataFormat <a name="DataFormat" id="@tonesingleton/cdk-sagemaker-unified-studio.DataFormat"></a>

Supported data formats for a data catalog table.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataFormat.PARQUET">PARQUET</a></code> | Apache Parquet columnar format. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataFormat.ORC">ORC</a></code> | ORC columnar format. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataFormat.JSON">JSON</a></code> | JSON format. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.DataFormat.CSV">CSV</a></code> | CSV format. |

---

##### `PARQUET` <a name="PARQUET" id="@tonesingleton/cdk-sagemaker-unified-studio.DataFormat.PARQUET"></a>

Apache Parquet columnar format.

---


##### `ORC` <a name="ORC" id="@tonesingleton/cdk-sagemaker-unified-studio.DataFormat.ORC"></a>

ORC columnar format.

---


##### `JSON` <a name="JSON" id="@tonesingleton/cdk-sagemaker-unified-studio.DataFormat.JSON"></a>

JSON format.

---


##### `CSV` <a name="CSV" id="@tonesingleton/cdk-sagemaker-unified-studio.DataFormat.CSV"></a>

CSV format.

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


### Designation <a name="Designation" id="@tonesingleton/cdk-sagemaker-unified-studio.Designation"></a>

Designations for a project member.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Designation.PROJECT_OWNER">PROJECT_OWNER</a></code> | Full owner access to the project. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.Designation.PROJECT_CONTRIBUTOR">PROJECT_CONTRIBUTOR</a></code> | Contributor access to the project. |

---

##### `PROJECT_OWNER` <a name="PROJECT_OWNER" id="@tonesingleton/cdk-sagemaker-unified-studio.Designation.PROJECT_OWNER"></a>

Full owner access to the project.

---


##### `PROJECT_CONTRIBUTOR` <a name="PROJECT_CONTRIBUTOR" id="@tonesingleton/cdk-sagemaker-unified-studio.Designation.PROJECT_CONTRIBUTOR"></a>

Contributor access to the project.

---


### EncryptionType <a name="EncryptionType" id="@tonesingleton/cdk-sagemaker-unified-studio.EncryptionType"></a>

Encryption type for workflow data.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EncryptionType.AWS_MANAGED_KEY">AWS_MANAGED_KEY</a></code> | AWS manages the encryption key. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.EncryptionType.CUSTOMER_MANAGED_KEY">CUSTOMER_MANAGED_KEY</a></code> | You provide a KMS key. |

---

##### `AWS_MANAGED_KEY` <a name="AWS_MANAGED_KEY" id="@tonesingleton/cdk-sagemaker-unified-studio.EncryptionType.AWS_MANAGED_KEY"></a>

AWS manages the encryption key.

---


##### `CUSTOMER_MANAGED_KEY` <a name="CUSTOMER_MANAGED_KEY" id="@tonesingleton/cdk-sagemaker-unified-studio.EncryptionType.CUSTOMER_MANAGED_KEY"></a>

You provide a KMS key.

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


### GlueAuthenticationType <a name="GlueAuthenticationType" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationType"></a>

The authentication type for a Glue connection.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationType.BASIC">BASIC</a></code> | Basic username/password authentication. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationType.OAUTH2">OAUTH2</a></code> | OAuth2 authentication. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationType.CUSTOM">CUSTOM</a></code> | Custom authentication. |

---

##### `BASIC` <a name="BASIC" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationType.BASIC"></a>

Basic username/password authentication.

---


##### `OAUTH2` <a name="OAUTH2" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationType.OAUTH2"></a>

OAuth2 authentication.

---


##### `CUSTOM` <a name="CUSTOM" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueAuthenticationType.CUSTOM"></a>

Custom authentication.

---


### GlueComputeEnvironment <a name="GlueComputeEnvironment" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueComputeEnvironment"></a>

Compute environments to validate the Glue connection against.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueComputeEnvironment.SPARK">SPARK</a></code> | Apache Spark (Glue Interactive Sessions). |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueComputeEnvironment.ATHENA">ATHENA</a></code> | Amazon Athena. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueComputeEnvironment.PYTHON">PYTHON</a></code> | Python. |

---

##### `SPARK` <a name="SPARK" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueComputeEnvironment.SPARK"></a>

Apache Spark (Glue Interactive Sessions).

---


##### `ATHENA` <a name="ATHENA" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueComputeEnvironment.ATHENA"></a>

Amazon Athena.

---


##### `PYTHON` <a name="PYTHON" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueComputeEnvironment.PYTHON"></a>

Python.

---


### GlueConnectionType <a name="GlueConnectionType" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType"></a>

The Glue connection type.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.ORACLE">ORACLE</a></code> | Oracle database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.MYSQL">MYSQL</a></code> | MySQL database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.POSTGRESQL">POSTGRESQL</a></code> | PostgreSQL database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.SQLSERVER">SQLSERVER</a></code> | Microsoft SQL Server database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.REDSHIFT">REDSHIFT</a></code> | Amazon Redshift. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.SNOWFLAKE">SNOWFLAKE</a></code> | Snowflake. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.JDBC">JDBC</a></code> | Generic JDBC connection. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.MONGODB">MONGODB</a></code> | MongoDB document database. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.KAFKA">KAFKA</a></code> | Apache Kafka streaming platform. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.NETWORK">NETWORK</a></code> | Network connection within a VPC. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.MARKETPLACE">MARKETPLACE</a></code> | AWS Marketplace connector. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.CUSTOM">CUSTOM</a></code> | Custom connector. |

---

##### `ORACLE` <a name="ORACLE" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.ORACLE"></a>

Oracle database.

---


##### `MYSQL` <a name="MYSQL" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.MYSQL"></a>

MySQL database.

---


##### `POSTGRESQL` <a name="POSTGRESQL" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.POSTGRESQL"></a>

PostgreSQL database.

---


##### `SQLSERVER` <a name="SQLSERVER" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.SQLSERVER"></a>

Microsoft SQL Server database.

---


##### `REDSHIFT` <a name="REDSHIFT" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.REDSHIFT"></a>

Amazon Redshift.

---


##### `SNOWFLAKE` <a name="SNOWFLAKE" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.SNOWFLAKE"></a>

Snowflake.

---


##### `JDBC` <a name="JDBC" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.JDBC"></a>

Generic JDBC connection.

---


##### `MONGODB` <a name="MONGODB" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.MONGODB"></a>

MongoDB document database.

---


##### `KAFKA` <a name="KAFKA" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.KAFKA"></a>

Apache Kafka streaming platform.

---


##### `NETWORK` <a name="NETWORK" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.NETWORK"></a>

Network connection within a VPC.

---


##### `MARKETPLACE` <a name="MARKETPLACE" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.MARKETPLACE"></a>

AWS Marketplace connector.

---


##### `CUSTOM` <a name="CUSTOM" id="@tonesingleton/cdk-sagemaker-unified-studio.GlueConnectionType.CUSTOM"></a>

Custom connector.

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


### TableType <a name="TableType" id="@tonesingleton/cdk-sagemaker-unified-studio.TableType"></a>

Whether the table is governed by Lake Formation or is an external table.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.TableType.EXTERNAL">EXTERNAL</a></code> | External table — data managed outside Lake Formation governance. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.TableType.GOVERNED">GOVERNED</a></code> | Governed table — data managed with Lake Formation transactions. |

---

##### `EXTERNAL` <a name="EXTERNAL" id="@tonesingleton/cdk-sagemaker-unified-studio.TableType.EXTERNAL"></a>

External table — data managed outside Lake Formation governance.

---


##### `GOVERNED` <a name="GOVERNED" id="@tonesingleton/cdk-sagemaker-unified-studio.TableType.GOVERNED"></a>

Governed table — data managed with Lake Formation transactions.

---


### TriggerMode <a name="TriggerMode" id="@tonesingleton/cdk-sagemaker-unified-studio.TriggerMode"></a>

Trigger mode for the workflow execution.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.TriggerMode.SCHEDULED">SCHEDULED</a></code> | Workflow runs on the defined schedule. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.TriggerMode.MANUAL_ONLY">MANUAL_ONLY</a></code> | Workflow can only be run on-demand. |
| <code><a href="#@tonesingleton/cdk-sagemaker-unified-studio.TriggerMode.DISABLED">DISABLED</a></code> | Workflow cannot be run on schedule or on-demand. |

---

##### `SCHEDULED` <a name="SCHEDULED" id="@tonesingleton/cdk-sagemaker-unified-studio.TriggerMode.SCHEDULED"></a>

Workflow runs on the defined schedule.

---


##### `MANUAL_ONLY` <a name="MANUAL_ONLY" id="@tonesingleton/cdk-sagemaker-unified-studio.TriggerMode.MANUAL_ONLY"></a>

Workflow can only be run on-demand.

---


##### `DISABLED` <a name="DISABLED" id="@tonesingleton/cdk-sagemaker-unified-studio.TriggerMode.DISABLED"></a>

Workflow cannot be run on schedule or on-demand.

---

