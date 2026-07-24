import { CustomResource, Duration, Token, aws_iam as iam, aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { GlossaryTermAttributes, GlossaryTermProps, IGlossaryTerm } from './glossary-term.interface';

const DOMAIN_ID_PATTERN = /^dzd[-_][a-zA-Z0-9_-]{1,36}$/;
const MAX_NAME_LENGTH = 256;
const MAX_SHORT_DESC_LENGTH = 1024;
const MAX_LONG_DESC_LENGTH = 4096;

/**
 * NOTE: DataZone membership-gated API calls cannot use AwsCustomResource because it uses a
 * stack-wide singleton Lambda whose role and policy are shared across all instances — whichever
 * is synthesized first wins. Raw `lambda.Function` with `role=executionRole` is the only correct
 * pattern. See data-source.construct.ts for a detailed explanation.
 */
const GLOSSARY_TERM_HANDLER = [
  'import boto3, json, urllib.request',
  'def handler(event, context):',
  '  try:',
  '    p = event["ResourceProperties"]',
  '    dz = boto3.client("datazone")',
  '    t = event["RequestType"]',
  '    if t == "Delete":',
  '      dz.delete_glossary_term(domainIdentifier=p["DomainId"], identifier=event["PhysicalResourceId"])',
  '      send(event, context, "SUCCESS", {})',
  '      return',
  '    params = {"domainIdentifier": p["DomainId"], "glossaryIdentifier": p["GlossaryId"], "name": p["Name"]}',
  '    if p.get("ShortDescription"): params["shortDescription"] = p["ShortDescription"]',
  '    if p.get("LongDescription"): params["longDescription"] = p["LongDescription"]',
  '    if p.get("Status"): params["status"] = p["Status"]',
  '    if p.get("TermRelations"): params["termRelations"] = json.loads(p["TermRelations"])',
  '    if t == "Update": params["identifier"] = event["PhysicalResourceId"]',
  '    action = dz.update_glossary_term if t == "Update" else dz.create_glossary_term',
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
 * A DataZone glossary term within a business glossary.
 *
 * There is no CloudFormation resource type for DataZone glossary terms, so this
 * construct uses a raw Lambda-backed custom resource to call the DataZone API directly
 * (CreateGlossaryTerm / UpdateGlossaryTerm / DeleteGlossaryTerm).
 *
 * @see https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/create-maintain-business-glossary.html
 */
export class GlossaryTerm extends Construct implements IGlossaryTerm {
  /**
   * Import an existing glossary term from its attributes.
   */
  public static fromAttributes(scope: Construct, id: string, attrs: GlossaryTermAttributes): IGlossaryTerm {
    class ImportedGlossaryTerm extends Construct implements IGlossaryTerm {
      public readonly glossaryTermId = attrs.glossaryTermId;
    }
    return new ImportedGlossaryTerm(scope, id);
  }

  /** The glossary term ID assigned by DataZone. */
  public readonly glossaryTermId: string;

  constructor(scope: Construct, id: string, props: GlossaryTermProps) {
    super(scope, id);

    if (!props.name || props.name.length > MAX_NAME_LENGTH) {
      throw new Error(`GlossaryTerm name must be 1–${MAX_NAME_LENGTH} characters.`);
    }

    if (!Token.isUnresolved(props.domainIdentifier) && !DOMAIN_ID_PATTERN.test(props.domainIdentifier)) {
      throw new Error(
        `GlossaryTerm domainIdentifier '${props.domainIdentifier}' must match pattern ${DOMAIN_ID_PATTERN}.`,
      );
    }

    if (!props.glossaryIdentifier) {
      throw new Error('GlossaryTerm glossaryIdentifier must not be empty.');
    }

    if (props.shortDescription && props.shortDescription.length > MAX_SHORT_DESC_LENGTH) {
      throw new Error(
        `GlossaryTerm shortDescription must be at most ${MAX_SHORT_DESC_LENGTH} characters, got ${props.shortDescription.length}.`,
      );
    }

    if (props.longDescription && props.longDescription.length > MAX_LONG_DESC_LENGTH) {
      throw new Error(
        `GlossaryTerm longDescription must be at most ${MAX_LONG_DESC_LENGTH} characters, got ${props.longDescription.length}.`,
      );
    }

    const termRelations = props.termRelations?.length
      ? JSON.stringify({
          isA: props.termRelations.filter((r) => r.classifier === 'isA').map((r) => r.termId),
          hasA: props.termRelations.filter((r) => r.classifier === 'hasA').map((r) => r.termId),
        })
      : undefined;

    const executionRole = iam.Role.fromRoleArn(this, 'ExecutionRole', props.executionRoleArn);
    const fn = new lambda.Function(this, 'Fn', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'index.handler',
      role: executionRole,
      timeout: Duration.seconds(30),
      code: lambda.Code.fromInline(GLOSSARY_TERM_HANDLER),
    });
    const resource = new CustomResource(this, 'Resource', {
      serviceToken: fn.functionArn,
      properties: {
        DomainId: props.domainIdentifier,
        GlossaryId: props.glossaryIdentifier,
        Name: props.name,
        ShortDescription: props.shortDescription,
        LongDescription: props.longDescription,
        Status: props.status,
        TermRelations: termRelations,
      },
    });

    this.glossaryTermId = resource.getAttString('id');
  }
}
