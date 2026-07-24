import { CustomResource, Duration, Token, aws_iam as iam, aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { GlossaryAttributes, GlossaryProps, IGlossary } from './glossary.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const PROJECT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_DESCRIPTION_LENGTH = 4096;

/**
 * NOTE: DataZone membership-gated API calls cannot use AwsCustomResource because it uses a
 * stack-wide singleton Lambda whose role and policy are shared across all instances — whichever
 * is synthesized first wins. Raw `lambda.Function` with `role=executionRole` is the only correct
 * pattern. See data-source.construct.ts for a detailed explanation.
 */
const GLOSSARY_HANDLER = [
  'import boto3, json, urllib.request',
  'def handler(event, context):',
  '  try:',
  '    p = event["ResourceProperties"]',
  '    dz = boto3.client("datazone")',
  '    t = event["RequestType"]',
  '    if t == "Delete":',
  '      dz.delete_glossary(domainIdentifier=p["DomainId"], identifier=event["PhysicalResourceId"])',
  '      send(event, context, "SUCCESS", {})',
  '      return',
  '    params = {"domainIdentifier": p["DomainId"], "owningProjectIdentifier": p["ProjectId"], "name": p["Name"]}',
  '    if p.get("Description"): params["description"] = p["Description"]',
  '    if p.get("Status"): params["status"] = p["Status"]',
  '    if t == "Update": params["identifier"] = event["PhysicalResourceId"]',
  '    action = dz.update_glossary if t == "Update" else dz.create_glossary',
  '    resp = action(**params)',
  '    send(event, context, "SUCCESS", {"id": resp["id"]}, physical_id=resp["id"])',
  '  except Exception as e:',
  '    send(event, context, "FAILED", {}, str(e))',
  'def send(event, context, status, data, reason="", physical_id=None):',
  '  body = json.dumps({"Status": status, "Reason": reason, "PhysicalResourceId": physical_id or event.get("PhysicalResourceId", context.log_stream_name), "StackId": event["StackId"], "RequestId": event["RequestId"], "LogicalResourceId": event["LogicalResourceId"], "Data": data}).encode()',
  '  req = urllib.request.Request(event["ResponseURL"], data=body, method="PUT")',
  '  urllib.request.urlopen(req)',
].join('\n');

/**
 * A DataZone business glossary for catalog standardization.
 *
 * There is no CloudFormation resource type for DataZone glossaries, so this
 * construct uses a raw Lambda-backed custom resource to call the DataZone API directly
 * (CreateGlossary / UpdateGlossary / DeleteGlossary).
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/create-maintain-business-glossary.html
 */
export class Glossary extends Construct implements IGlossary {
  /**
   * Import an existing glossary from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: GlossaryAttributes): IGlossary {
    class ImportedGlossary extends Construct implements IGlossary {
      public readonly glossaryId = attrs.glossaryId;
    }
    return new ImportedGlossary(scope, id);
  }

  /** The glossary ID assigned by DataZone. */
  public readonly glossaryId: string;

  constructor(scope: Construct, id: string, props: GlossaryProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`Glossary name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(`Glossary domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`);
    }

    if (!Token.isUnresolved(props.owningProjectIdentifier) && !PROJECT_ID_PATTERN.test(props.owningProjectIdentifier)) {
      throw new Error(
        `Glossary owningProjectIdentifier '${props.owningProjectIdentifier}' must match pattern ${PROJECT_ID_PATTERN}.`,
      );
    }

    if (props.description && props.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `Glossary description must be at most ${MAX_DESCRIPTION_LENGTH} characters, got ${props.description.length}.`,
      );
    }

    const executionRole = iam.Role.fromRoleArn(this, 'ExecutionRole', props.executionRoleArn);
    const fn = new lambda.Function(this, 'Fn', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'index.handler',
      role: executionRole,
      timeout: Duration.seconds(30),
      code: lambda.Code.fromInline(GLOSSARY_HANDLER),
    });
    const resource = new CustomResource(this, 'Resource', {
      serviceToken: fn.functionArn,
      properties: {
        DomainId: props.domainIdentifier,
        ProjectId: props.owningProjectIdentifier,
        Name: props.name,
        Description: props.description,
        Status: props.status,
      },
    });

    this.glossaryId = resource.getAttString('id');
  }
}
