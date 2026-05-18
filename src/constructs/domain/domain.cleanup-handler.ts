/**
 * Inline Lambda handler source for the Lake Formation cleanup custom resource.
 *
 * Stored as a constant to keep the Domain construct readable while ensuring
 * the code is bundled with the jsii package.
 */
// eslint-disable-next-line
export const CLEANUP_HANDLER_CODE = `
const { LakeFormationClient, GetDataLakeSettingsCommand, PutDataLakeSettingsCommand, GrantPermissionsCommand, RevokePermissionsCommand } = require("@aws-sdk/client-lakeformation");
const { DataZoneClient, ListProjectsCommand, ListEnvironmentsCommand } = require("@aws-sdk/client-datazone");
const { GlueClient, DeleteDatabaseCommand } = require("@aws-sdk/client-glue");
const response = require("cfn-response");

exports.handler = async (event, context) => {
  try {
    const lf = new LakeFormationClient();
    const principals = event.ResourceProperties.DataLocationGrantPrincipals || [];
    const bucketArn = event.ResourceProperties.BucketArn;

    if (event.RequestType === "Create" || event.RequestType === "Update") {
      for (const principal of principals) {
        try {
          await lf.send(new GrantPermissionsCommand({
            Principal: { DataLakePrincipalIdentifier: principal },
            Resource: { DataLocation: { ResourceArn: bucketArn } },
            Permissions: ["DATA_LOCATION_ACCESS"],
          }));
        } catch (e) {
          if (e.name !== "AlreadyExistsException") console.error("Grant failed:", e);
        }
      }
    }

    if (event.RequestType === "Delete") {
      const roleArns = new Set(event.ResourceProperties.RoleArns);
      const domainId = event.ResourceProperties.DomainId;

      for (const principal of principals) {
        try {
          await lf.send(new RevokePermissionsCommand({
            Principal: { DataLakePrincipalIdentifier: principal },
            Resource: { DataLocation: { ResourceArn: bucketArn } },
            Permissions: ["DATA_LOCATION_ACCESS"],
          }));
        } catch (e) { console.error("Revoke failed:", e); }
      }

      const { DataLakeSettings } = await lf.send(new GetDataLakeSettingsCommand({}));
      const filter = (list) => (list || []).filter(
        (a) => !roleArns.has(a.DataLakePrincipalIdentifier)
      );
      DataLakeSettings.DataLakeAdmins = filter(DataLakeSettings.DataLakeAdmins);
      DataLakeSettings.ReadOnlyAdmins = filter(DataLakeSettings.ReadOnlyAdmins);
      await lf.send(new PutDataLakeSettingsCommand({ DataLakeSettings }));

      if (domainId) {
        const dz = new DataZoneClient();
        const glue = new GlueClient();
        const { items: projects } = await dz.send(new ListProjectsCommand({ domainIdentifier: domainId }));
        for (const project of projects || []) {
          const { items: envs } = await dz.send(new ListEnvironmentsCommand({
            domainIdentifier: domainId, projectIdentifier: project.id,
          }));
          for (const env of envs || []) {
            try {
              await glue.send(new DeleteDatabaseCommand({ Name: "glue_db_" + env.id }));
            } catch (e) { if (e.name !== "EntityNotFoundException") console.error(e); }
          }
        }
      }
    }
    await response.send(event, context, response.SUCCESS, {});
  } catch (e) {
    console.error(e);
    await response.send(event, context, response.SUCCESS, {});
  }
};
`;
