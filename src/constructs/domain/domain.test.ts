import { App, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { Domain } from './domain.construct';
import type { DomainProps } from './domain.interface';
import { ManagedBlueprintIdentifier } from '../blueprint/blueprint.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

function createDomain(stack: Stack, overrides?: Partial<DomainProps>): Domain {
  return new Domain(stack, 'Domain', {
    name: 'TestDomain',
    description: 'A test domain.',
    provisioningRoleArn: 'arn:aws:iam::123456789012:role/provisioning',
    vpcId: 'vpc-01234567890abcdef',
    subnetIds: ['subnet-01234567890abcdef'],
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
