import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { DataExportConfiguration } from './data-export-configuration.construct';
import { SseAlgorithm } from './data-export-configuration.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'us-east-1' } });
}

const validProps = {
  domainIdentifier: 'dzd-abc123',
  executionRoleArn: 'arn:aws:iam::123456789012:role/DomainExecutionRole',
};

describe('DataExportConfiguration', () => {
  test('creates a custom resource for the export configuration', () => {
    const stack = createStack();
    new DataExportConfiguration(stack, 'Config', validProps);
    Template.fromStack(stack).resourceCountIs('Custom::AWS', 1);
  });

  test('enables export by default', () => {
    const stack = createStack();
    new DataExportConfiguration(stack, 'Config', validProps);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"enableExport":true'),
    });
  });

  test('creates with enableExport set to false', () => {
    const stack = createStack();
    new DataExportConfiguration(stack, 'Config', { ...validProps, enableExport: false });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"enableExport":false'),
    });
  });

  test('creates with AES256 encryption configuration', () => {
    const stack = createStack();
    new DataExportConfiguration(stack, 'Config', {
      ...validProps,
      encryptionConfiguration: { sseAlgorithm: SseAlgorithm.AES256 },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('AES256'),
    });
  });

  test('creates with KMS encryption configuration', () => {
    const stack = createStack();
    new DataExportConfiguration(stack, 'Config', {
      ...validProps,
      encryptionConfiguration: {
        sseAlgorithm: SseAlgorithm.AWS_KMS,
        kmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/my-key',
      },
    });
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('aws:kms'),
    });
  });

  test('creates an onUpdate handler', () => {
    const stack = createStack();
    new DataExportConfiguration(stack, 'Config', validProps);
    const resources = Template.fromStack(stack).findResources('Custom::AWS');
    expect(Object.values(resources)[0].Properties.Update).toBeDefined();
  });

  test('uses domainIdentifier as physical resource ID', () => {
    const stack = createStack();
    new DataExportConfiguration(stack, 'Config', validProps);
    Template.fromStack(stack).hasResourceProperties('Custom::AWS', {
      Create: Match.stringLikeRegexp('"physicalResourceId":\\{"id":"dzd-abc123"\\}'),
    });
  });

  describe('validation', () => {
    test('throws on invalid domainIdentifier', () => {
      const stack = createStack();
      expect(() => new DataExportConfiguration(stack, 'C', { ...validProps, domainIdentifier: 'bad' })).toThrow(
        /domainIdentifier/,
      );
    });
  });

  describe('without executionRoleArn', () => {
    const propsWithoutRole = { domainIdentifier: 'dzd-abc123' };

    test('grants datazone permissions directly instead of sts:AssumeRole', () => {
      const stack = createStack();
      new DataExportConfiguration(stack, 'Config', propsWithoutRole);
      Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: ['datazone:PutDataExportConfiguration', 'datazone:DeleteDataExportConfiguration'],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      });
    });

    test('does not pass assumedRoleArn to the custom resource', () => {
      const stack = createStack();
      new DataExportConfiguration(stack, 'Config', propsWithoutRole);
      const resources = Template.fromStack(stack).findResources('Custom::AWS');
      expect(JSON.stringify(Object.values(resources)[0].Properties.Create)).not.toContain('assumedRoleArn');
    });
  });
});
