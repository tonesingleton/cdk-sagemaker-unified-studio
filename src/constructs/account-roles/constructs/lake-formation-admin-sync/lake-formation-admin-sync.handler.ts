/**
 * Inline Lambda handler source for the Lake Formation admin sync custom resource.
 */
// eslint-disable-next-line
export const LF_ADMIN_HANDLER_CODE = `
const { LakeFormationClient, GetDataLakeSettingsCommand, PutDataLakeSettingsCommand } = require("@aws-sdk/client-lakeformation");
const response = require("cfn-response");
exports.handler = async (event, context) => {
  try {
    const lf = new LakeFormationClient();
    const arn = event.ResourceProperties.RoleArn;
    const { DataLakeSettings } = await lf.send(new GetDataLakeSettingsCommand({}));
    if (event.RequestType === "Delete") {
      DataLakeSettings.DataLakeAdmins = (DataLakeSettings.DataLakeAdmins || []).filter(a => a.DataLakePrincipalIdentifier !== arn);
      await lf.send(new PutDataLakeSettingsCommand({ DataLakeSettings }));
    } else {
      const admins = DataLakeSettings.DataLakeAdmins || [];
      if (!admins.some(a => a.DataLakePrincipalIdentifier === arn)) {
        admins.push({ DataLakePrincipalIdentifier: arn });
        DataLakeSettings.DataLakeAdmins = admins;
        await lf.send(new PutDataLakeSettingsCommand({ DataLakeSettings }));
      }
    }
    await response.send(event, context, response.SUCCESS, {});
  } catch (e) {
    console.error(e);
    await response.send(event, context, response.FAILED, { Error: e.message });
  }
};
`;
