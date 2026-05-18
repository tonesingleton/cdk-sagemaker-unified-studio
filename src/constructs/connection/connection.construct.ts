import { aws_datazone as datazone } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { AthenaProperties, ConnectionProperties, ConnectionProps, IConnection } from './connection.interface';

/**
 * In Amazon SageMaker Unified Studio, a connection enables you to connect your
 * resources (domains, projects, and environments) to external resources and services.
 */
export class Connection extends Construct implements IConnection {
  /** The connection ID. */
  public readonly connectionId: string;

  constructor(scope: Construct, id: string, props: ConnectionProps) {
    super(scope, id);

    const connection = new datazone.CfnConnection(this, 'Resource', {
      domainIdentifier: props.domainId,
      environmentIdentifier: props.environmentId,
      projectIdentifier: props.projectId,
      name: props.name,
      description: props.description,
      props: {
        glueProperties: {
          glueConnectionInput: {
            connectionType: props.connectionType,
            connectionProperties: this.renderConnectionProperties(props.connectionProperties),
            physicalConnectionRequirements: props.physicalConnectionRequirements,
            authenticationConfiguration: props.authenticationConfiguration
              ? {
                  authenticationType: props.authenticationConfiguration.authenticationType,
                  secretArn: props.authenticationConfiguration.secretArn,
                  kmsKeyArn: props.authenticationConfiguration.kmsKeyArn,
                  customAuthenticationCredentials: props.authenticationConfiguration.customAuthenticationCredentials,
                }
              : undefined,
            validateCredentials: props.validateCredentials ?? false,
            validateForComputeEnvironments: props.validateForComputeEnvironments,
            athenaProperties: this.renderAthenaProperties(props.athenaProperties),
            sparkProperties: props.sparkProperties,
            pythonProperties: props.pythonProperties,
            matchCriteria: props.matchCriteria,
          },
        },
      },
    });

    this.connectionId = connection.attrConnectionId;
  }

  private renderConnectionProperties(props?: ConnectionProperties): Record<string, string> | undefined {
    if (!props) return undefined;
    const result: Record<string, string> = {};
    if (props.host) result.HOST = props.host;
    if (props.port) result.PORT = props.port;
    if (props.database) result.DATABASE = props.database;
    if (props.jdbcConnectionUrl) result.JDBC_CONNECTION_URL = props.jdbcConnectionUrl;
    if (props.jdbcEngine) result.JDBC_ENGINE = props.jdbcEngine;
    if (props.jdbcEnforceSsl) result.JDBC_ENFORCE_SSL = props.jdbcEnforceSsl;
    if (props.secretId) result.SECRET_ID = props.secretId;
    if (props.connectorUrl) result.CONNECTOR_URL = props.connectorUrl;
    if (props.connectorClassName) result.CONNECTOR_CLASS_NAME = props.connectorClassName;
    if (props.connectorType) result.CONNECTOR_TYPE = props.connectorType;
    if (props.connectionUrl) result.CONNECTION_URL = props.connectionUrl;
    if (props.kafkaBootstrapServers) result.KAFKA_BOOTSTRAP_SERVERS = props.kafkaBootstrapServers;
    if (props.kafkaSslEnabled) result.KAFKA_SSL_ENABLED = props.kafkaSslEnabled;
    return Object.keys(result).length > 0 ? result : undefined;
  }

  private renderAthenaProperties(props?: AthenaProperties): Record<string, string> | undefined {
    if (!props) return undefined;
    const result: Record<string, string> = {
      spill_bucket: props.spillBucket,
      spill_prefix: props.spillPrefix,
    };
    if (props.instanceType) result.instance_type = props.instanceType;
    return result;
  }
}
