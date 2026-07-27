import {
  GetDataLakeSettingsCommand,
  LakeFormationClient,
  PutDataLakeSettingsCommand,
} from '@aws-sdk/client-lakeformation';
import type { CdkCustomResourceEvent, CdkCustomResourceResponse, Context } from 'aws-lambda';

const lf = new LakeFormationClient({});

export const handler = async (event: CdkCustomResourceEvent, context: Context): Promise<CdkCustomResourceResponse> => {
  const arn: string = event.ResourceProperties.RoleArn;
  const { DataLakeSettings } = await lf.send(new GetDataLakeSettingsCommand({}));

  if (!DataLakeSettings) {
    return { PhysicalResourceId: context.logStreamName };
  }

  if (event.RequestType === 'Delete') {
    DataLakeSettings.DataLakeAdmins = (DataLakeSettings.DataLakeAdmins ?? []).filter(
      (a) => a.DataLakePrincipalIdentifier !== arn,
    );
  } else {
    const admins = DataLakeSettings.DataLakeAdmins ?? [];
    if (!admins.some((a) => a.DataLakePrincipalIdentifier === arn)) {
      admins.push({ DataLakePrincipalIdentifier: arn });
      DataLakeSettings.DataLakeAdmins = admins;
    }
  }

  await lf.send(new PutDataLakeSettingsCommand({ DataLakeSettings }));
  return { PhysicalResourceId: context.logStreamName };
};
