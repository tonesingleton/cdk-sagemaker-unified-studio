import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MwaaConnection } from './mwaa-connection.construct';
import { ConnectionScope } from '../connection.interface';

function createStack(): Stack {
  return new Stack(new App(), 'TestStack', { env: { account: '123456789012', region: 'eu-central-1' } });
}

const validProps = {
  name: 'mwaa-prod',
  domainIdentifier: 'dzd_abc123',
  environmentIdentifier: 'env-123',
  projectIdentifier: 'proj-456',
  mwaaEnvironmentName: 'airflow-production',
};

describe('MwaaConnection', () => {
  test('creates an MWAA connection with the environment name', () => {
    const stack = createStack();
    new MwaaConnection(stack, 'Mwaa', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Name: 'mwaa-prod',
      DomainIdentifier: 'dzd_abc123',
      EnvironmentIdentifier: 'env-123',
      Props: {
        WorkflowsMwaaProperties: {
          MwaaEnvironmentName: 'airflow-production',
        },
      },
    });
  });

  test('passes through description and connectionScope', () => {
    const stack = createStack();
    new MwaaConnection(stack, 'Mwaa', {
      ...validProps,
      description: 'Production Airflow environment',
      connectionScope: ConnectionScope.PROJECT,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      Description: 'Production Airflow environment',
      Scope: 'PROJECT',
    });
  });

  test('passes through projectIdentifier', () => {
    const stack = createStack();
    new MwaaConnection(stack, 'Mwaa', validProps);
    Template.fromStack(stack).hasResourceProperties('AWS::DataZone::Connection', {
      ProjectIdentifier: 'proj-456',
    });
  });

  describe('validation', () => {
    test('throws when mwaaEnvironmentName is empty', () => {
      const stack = createStack();
      expect(() => new MwaaConnection(stack, 'Mwaa', { ...validProps, mwaaEnvironmentName: '' })).toThrow(
        /mwaaEnvironmentName must not be empty/,
      );
    });
  });
});
