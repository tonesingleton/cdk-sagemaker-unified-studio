import {
  GetDataLakeSettingsCommand,
  GrantPermissionsCommand,
  LakeFormationClient,
  PutDataLakeSettingsCommand,
  RevokePermissionsCommand,
} from '@aws-sdk/client-lakeformation';
import { DataZoneClient, ListEnvironmentsCommand, ListProjectsCommand } from '@aws-sdk/client-datazone';
import { DeleteDatabaseCommand, GlueClient } from '@aws-sdk/client-glue';
import type { CdkCustomResourceEvent, CdkCustomResourceResponse, Context } from 'aws-lambda';

const lf = new LakeFormationClient({});

const grantDataLocationAccess = async (principals: ReadonlyArray<string>, bucketArn: string): Promise<void> => {
  for (const principal of principals) {
    try {
      await lf.send(
        new GrantPermissionsCommand({
          Principal: { DataLakePrincipalIdentifier: principal },
          Resource: { DataLocation: { ResourceArn: bucketArn } },
          Permissions: ['DATA_LOCATION_ACCESS'],
        }),
      );
    } catch (e: unknown) {
      if ((e as { name?: string }).name !== 'AlreadyExistsException') {
        console.error('Grant failed:', e);
      }
    }
  }
};

const revokeDataLocationAccess = async (principals: ReadonlyArray<string>, bucketArn: string): Promise<void> => {
  for (const principal of principals) {
    try {
      await lf.send(
        new RevokePermissionsCommand({
          Principal: { DataLakePrincipalIdentifier: principal },
          Resource: { DataLocation: { ResourceArn: bucketArn } },
          Permissions: ['DATA_LOCATION_ACCESS'],
        }),
      );
    } catch (e: unknown) {
      console.error('Revoke failed:', e);
    }
  }
};

const removeAdminRoles = async (roleArns: Set<string>): Promise<void> => {
  const { DataLakeSettings } = await lf.send(new GetDataLakeSettingsCommand({}));
  if (!DataLakeSettings) return;
  const filter = (list: Array<{ DataLakePrincipalIdentifier?: string }> | undefined) =>
    (list ?? []).filter((a) => !roleArns.has(a.DataLakePrincipalIdentifier ?? ''));
  DataLakeSettings.DataLakeAdmins = filter(DataLakeSettings.DataLakeAdmins);
  DataLakeSettings.ReadOnlyAdmins = filter(DataLakeSettings.ReadOnlyAdmins);
  await lf.send(new PutDataLakeSettingsCommand({ DataLakeSettings }));
};

const cleanupGlueDatabases = async (domainId: string): Promise<void> => {
  const dz = new DataZoneClient({});
  const glue = new GlueClient({});

  let projectsNextToken: string | undefined;
  do {
    const projectsPage = await dz.send(
      new ListProjectsCommand({ domainIdentifier: domainId, nextToken: projectsNextToken }),
    );
    for (const project of projectsPage.items ?? []) {
      let envsNextToken: string | undefined;
      do {
        const envsPage = await dz.send(
          new ListEnvironmentsCommand({
            domainIdentifier: domainId,
            projectIdentifier: project.id,
            nextToken: envsNextToken,
          }),
        );
        for (const env of envsPage.items ?? []) {
          try {
            await glue.send(new DeleteDatabaseCommand({ Name: `glue_db_${env.id}` }));
          } catch (e: unknown) {
            if ((e as { name?: string }).name !== 'EntityNotFoundException') {
              console.error('Failed to delete Glue database:', env.id, e);
            }
          }
        }
        envsNextToken = envsPage.nextToken;
      } while (envsNextToken);
    }
    projectsNextToken = projectsPage.nextToken;
  } while (projectsNextToken);
};

export const handler = async (event: CdkCustomResourceEvent, context: Context): Promise<CdkCustomResourceResponse> => {
  const principals: ReadonlyArray<string> = event.ResourceProperties.DataLocationGrantPrincipals ?? [];
  const bucketArn: string = event.ResourceProperties.BucketArn;

  if (event.RequestType === 'Create' || event.RequestType === 'Update') {
    await grantDataLocationAccess(principals, bucketArn);
  }

  if (event.RequestType === 'Delete') {
    const roleArns = new Set<string>(event.ResourceProperties.RoleArns ?? []);
    const domainId: string = event.ResourceProperties.DomainId;

    await revokeDataLocationAccess(principals, bucketArn);
    await removeAdminRoles(roleArns);

    if (domainId) {
      await cleanupGlueDatabases(domainId);
    }
  }

  return { PhysicalResourceId: context.logStreamName };
};
