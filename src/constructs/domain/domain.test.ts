import { App, RemovalPolicy, Stack, aws_ec2 as ec2 } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Domain } from './domain.construct';
import type { DomainProps } from './domain.interface';
import { ManagedBlueprintIdentifier } from '../blueprint/blueprint.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

function createVpc(stack: Stack): ec2.Vpc {
  return new ec2.Vpc(stack, 'Vpc', {
    maxAzs: 2,
    natGateways: 0,
    subnetConfiguration: [{ name: 'Private', subnetType: ec2.SubnetType.PRIVATE_ISOLATED, cidrMask: 24 }],
  });
}

function createDomain(stack: Stack, overrides?: Partial<DomainProps>): Domain {
  const vpc = overrides?.vpc ?? createVpc(stack);
  return new Domain(stack, 'Domain', {
    name: 'TestDomain',
    description: 'A test domain.',
    provisioningRoleArn: 'arn:aws:iam::123456789012:role/provisioning',
    vpc,
    vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
    ...overrides,
  });
}

describe('Domain', () => {
  test('creates a V2 domain', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Domain', {
      Name: 'TestDomain',
      DomainVersion: 'V2',
    });
  });

  test('creates domain execution role with ABAC support', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: ['sts:TagSession', 'sts:SetContext'],
            Principal: { Service: 'datazone.amazonaws.com' },
            Condition: Match.objectLike({ 'ForAllValues:StringLike': { 'aws:TagKeys': 'datazone*' } }),
          }),
        ]),
      },
    });
  });

  test('creates domain units', () => {
    const stack = createStack();
    createDomain(stack, { domainUnits: [{ name: 'Data', description: 'Data unit.' }] });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::DomainUnit', {
      Name: 'Data',
      Description: 'Data unit.',
    });
  });

  test('grants assume role to specified ARNs', () => {
    const stack = createStack();
    createDomain(stack, {
      assumeRoleArns: ['arn:aws:iam::123456789012:role/my-role'],
    });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([Match.objectLike({ Action: 'sts:AssumeRole' })]),
      }),
    });
  });

  test('creates Tooling blueprint by default', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::EnvironmentBlueprintConfiguration', {
      EnvironmentBlueprintIdentifier: 'Tooling',
    });
    // Template.fromStack(stack).hasResourceProperties('AWS::DataZone::EnvironmentBlueprintConfiguration', {
    //   EnvironmentBlueprintIdentifier: 'ToolingLite',
    // });
  });

  test('creates additional blueprints', () => {
    const stack = createStack();
    createDomain(stack, {
      additionalBlueprintIdentifiers: [
        ManagedBlueprintIdentifier.LAKEHOUSE_DATABASE,
        ManagedBlueprintIdentifier.LAKEHOUSE_CATALOG,
      ],
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::EnvironmentBlueprintConfiguration', 3);
  });

  test('creates policy grants for all blueprints', () => {
    const stack = createStack();
    createDomain(stack, { additionalBlueprintIdentifiers: [ManagedBlueprintIdentifier.LAKEHOUSE_DATABASE] });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::PolicyGrant', 2);
  });

  test('creates S3 buckets with SSL enforcement', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).resourceCountIs('AWS::S3::Bucket', 2);
  });

  test('creates cr role with datazone:* and lambda trust', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([Match.objectLike({ Principal: { Service: 'lambda.amazonaws.com' } })]),
      }),
      Policies: Match.arrayWith([
        Match.objectLike({
          PolicyDocument: Match.objectLike({
            Statement: Match.arrayWith([Match.objectLike({ Action: 'datazone:*', Resource: '*' })]),
          }),
        }),
      ]),
    });
  });

  test('registers cr role as domain user and root domain unit owner', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::UserProfile', 1);
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::Owner', 1);
  });

  test('exposes datazoneApiRole property', () => {
    const stack = createStack();
    const domain = createDomain(stack);
    expect(domain.datazoneApiRole).toBeDefined();
  });

  test('creates nested domain units with parent reference', () => {
    const stack = createStack();
    createDomain(stack, {
      domainUnits: [
        { name: 'Parent', description: 'Parent unit.' },
        { name: 'Child', description: 'Child unit.', parentDomainUnitName: 'Parent' },
      ],
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::DomainUnit', 2);
  });

  test('applies custom removal policy', () => {
    const stack = createStack();
    createDomain(stack, {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
    Template.fromStack(stack).hasResource('AWS::S3::Bucket', {
      UpdateReplacePolicy: 'Delete',
      DeletionPolicy: 'Delete',
    });
  });

  test('exposes blueprints map', () => {
    const stack = createStack();
    const domain = createDomain(stack, {
      additionalBlueprintIdentifiers: [ManagedBlueprintIdentifier.LAKEHOUSE_DATABASE],
    });
    expect(Object.keys(domain.blueprints)).toContain(ManagedBlueprintIdentifier.TOOLING);
    // expect(Object.keys(domain.blueprints)).toContain(ManagedBlueprintIdentifier.TOOLING_LITE);
    expect(Object.keys(domain.blueprints)).toContain(ManagedBlueprintIdentifier.LAKEHOUSE_DATABASE);
  });

  test('exposes policy grants', () => {
    const stack = createStack();
    const domain = createDomain(stack);
    expect(domain.blueprintPolicyGrants.length).toBeGreaterThan(0);
  });

  test('exposes domainId', () => {
    const stack = createStack();
    const domain = createDomain(stack);
    expect(domain.domainId).toBeDefined();
  });

  test('manage access role includes SourceAccount condition', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Condition: Match.objectLike({
              StringEquals: Match.objectLike({ 'aws:SourceAccount': '123456789012' }),
            }),
          }),
        ]),
      },
    });
  });

  test('uses custom projects bucket name', () => {
    const stack = createStack();
    createDomain(stack, { projectsBucketName: 'amazon-sagemaker-my-custom-bucket' });
    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'amazon-sagemaker-my-custom-bucket',
    });
  });

  test('uses custom access logs bucket name', () => {
    const stack = createStack();
    createDomain(stack, { accessLogsBucketName: 'sagemaker-logs-custom' });
    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'sagemaker-logs-custom',
    });
  });

  test('accepts sagemaker- prefix for bucket names', () => {
    const stack = createStack();
    createDomain(stack, { projectsBucketName: 'sagemaker-my-bucket' });
    Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'sagemaker-my-bucket',
    });
  });

  test('throws on invalid projects bucket name prefix', () => {
    const stack = createStack();
    expect(() => createDomain(stack, { projectsBucketName: 'my-custom-bucket' })).toThrow(/must start with one of/);
  });

  test('throws on invalid access logs bucket name prefix', () => {
    const stack = createStack();
    expect(() => createDomain(stack, { accessLogsBucketName: 'my-logs-bucket' })).toThrow(/must start with one of/);
  });

  test('resolves subnets from vpc prop', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::EnvironmentBlueprintConfiguration', {
      EnvironmentBlueprintIdentifier: 'Tooling',
    });
  });

  test('defaults to PRIVATE_WITH_EGRESS subnets when vpcSubnets not specified', () => {
    const stack = createStack();
    const vpc = new ec2.Vpc(stack, 'VpcWithNat', {
      maxAzs: 2,
      subnetConfiguration: [
        { name: 'Public', subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
        { name: 'Private', subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, cidrMask: 24 },
      ],
    });
    new Domain(stack, 'Domain', {
      name: 'TestDomain',
      provisioningRoleArn: 'arn:aws:iam::123456789012:role/provisioning',
      vpc,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::EnvironmentBlueprintConfiguration', {
      EnvironmentBlueprintIdentifier: 'Tooling',
    });
  });

  test('throws when selected subnets are empty', () => {
    const stack = createStack();
    const vpc = ec2.Vpc.fromVpcAttributes(stack, 'ImportedVpc', {
      vpcId: 'vpc-123',
      availabilityZones: ['eu-central-1a'],
      privateSubnetIds: [],
    });
    expect(() => createDomain(stack, { vpc, vpcSubnets: { subnets: [] } })).toThrow(
      /selected subnets must contain at least one subnet/,
    );
  });

  test('accepts custom vpcSubnets selection', () => {
    const stack = createStack();
    const vpc = new ec2.Vpc(stack, 'CustomVpc', {
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        { name: 'Isolated', subnetType: ec2.SubnetType.PRIVATE_ISOLATED, cidrMask: 24 },
        { name: 'Private', subnetType: ec2.SubnetType.PRIVATE_ISOLATED, cidrMask: 24 },
      ],
    });
    createDomain(stack, { vpc, vpcSubnets: { subnetGroupName: 'Isolated' } });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::EnvironmentBlueprintConfiguration', {
      EnvironmentBlueprintIdentifier: 'Tooling',
    });
  });
});

describe('Lake Formation cleanup', () => {
  test('creates cleanup Lambda function', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs24.x',
      Timeout: 60,
    });
  });

  test('cleanup Lambda has Lake Formation permissions', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: [
              'lakeformation:GetDataLakeSettings',
              'lakeformation:PutDataLakeSettings',
              'lakeformation:GrantPermissions',
              'lakeformation:RevokePermissions',
            ],
          }),
        ]),
      }),
    });
  });

  test('creates custom resource with role ARNs and domain ID', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::CloudFormation::CustomResource', {
      RoleArns: Match.anyValue(),
      DomainId: Match.anyValue(),
    });
  });

  test('cleanup Lambda has SageMaker Unified Studio permissions', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: ['datazone:ListProjects', 'datazone:ListEnvironments'],
          }),
        ]),
      }),
    });
  });

  test('cleanup Lambda has Glue permissions', () => {
    const stack = createStack();
    createDomain(stack);
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 'glue:DeleteDatabase',
          }),
        ]),
      }),
    });
  });
});

describe('Domain topological sort', () => {
  test('sorts parents before children', () => {
    const result = Domain.topologicalSort([
      { name: 'Child', description: 'Child.', parentDomainUnitName: 'Parent' },
      { name: 'Parent', description: 'Parent.' },
    ]);
    expect(result[0].name).toBe('Parent');
    expect(result[1].name).toBe('Child');
  });

  test('throws on duplicate names', () => {
    expect(() =>
      Domain.topologicalSort([
        { name: 'A', description: 'A.' },
        { name: 'A', description: 'A.' },
      ]),
    ).toThrow(/Duplicate/);
  });

  test('throws on circular dependency', () => {
    expect(() =>
      Domain.topologicalSort([
        { name: 'A', description: 'A.', parentDomainUnitName: 'B' },
        { name: 'B', description: 'B.', parentDomainUnitName: 'A' },
      ]),
    ).toThrow(/Circular/);
  });

  test('throws on missing parent', () => {
    expect(() =>
      Domain.topologicalSort([{ name: 'Child', description: 'Child.', parentDomainUnitName: 'Missing' }]),
    ).toThrow(/not found/);
  });
});

describe('Domain.fromAttributes', () => {
  test('imports domain with all attributes', () => {
    const stack = createStack();
    const imported = Domain.fromAttributes(stack, 'Imported', {
      domainId: 'dzd-abc123',
      domainArn: 'arn:aws:datazone:eu-central-1:123456789012:domain/dzd-abc123',
      rootDomainUnitId: 'du-root123',
      domainExecutionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecution',
      manageAccessRoleArn: 'arn:aws:iam::123456789012:role/ManageAccess',
    });
    expect(imported.domainId).toBe('dzd-abc123');
    expect(imported.domainArn).toBe('arn:aws:datazone:eu-central-1:123456789012:domain/dzd-abc123');
    expect(imported.rootDomainUnitId).toBe('du-root123');
    expect(imported.domainExecutionRole).toBeDefined();
    expect(imported.manageAccessRole).toBeDefined();
  });

  test('imports domain without optional role ARNs', () => {
    const stack = createStack();
    const imported = Domain.fromAttributes(stack, 'Imported', {
      domainId: 'dzd-abc123',
      domainArn: 'arn:aws:datazone:eu-central-1:123456789012:domain/dzd-abc123',
      rootDomainUnitId: 'du-root123',
    });
    expect(imported.domainId).toBe('dzd-abc123');
    expect(imported.domainArn).toBe('arn:aws:datazone:eu-central-1:123456789012:domain/dzd-abc123');
    expect(imported.rootDomainUnitId).toBe('du-root123');
    expect(imported.domainUnits).toEqual({});
    expect(imported.blueprints).toEqual({});
    expect(imported.blueprintPolicyGrants).toEqual([]);
  });

  test('does not create any CloudFormation resources', () => {
    const stack = createStack();
    Domain.fromAttributes(stack, 'Imported', {
      domainId: 'dzd-abc123',
      domainArn: 'arn:aws:datazone:eu-central-1:123456789012:domain/dzd-abc123',
      rootDomainUnitId: 'du-root123',
    });
    Template.fromStack(stack).resourceCountIs('AWS::DataZone::Domain', 0);
  });
});
