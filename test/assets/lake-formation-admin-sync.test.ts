import type { GetDataLakeSettingsCommandOutput } from '@aws-sdk/client-lakeformation';
import type { CdkCustomResourceEvent, Context } from 'aws-lambda';

const mockLfSend = jest.fn();

jest.mock('@aws-sdk/client-lakeformation', () => ({
  LakeFormationClient: jest.fn(() => ({ send: mockLfSend })),
  GetDataLakeSettingsCommand: jest.fn(),
  PutDataLakeSettingsCommand: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { handler } = require('../../assets/lake-formation-admin-sync/index');

const makeEvent = (requestType: string, roleArn = 'arn:aws:iam::123456789012:role/AdminRole'): CdkCustomResourceEvent =>
  ({
    RequestType: requestType,
    ResponseURL: 'https://cloudformation.example.com/response',
    StackId: 'stack-id',
    RequestId: 'req-id',
    LogicalResourceId: 'logical-id',
    ResourceType: 'Custom::LakeFormationAdminSync',
    ResourceProperties: { ServiceToken: 'token', RoleArn: roleArn },
  }) as unknown as CdkCustomResourceEvent;

const makeContext = (): Context => ({ logStreamName: 'log-stream' }) as unknown as Context;

beforeEach(() => jest.clearAllMocks());

describe('lake-formation-admin-sync handler', () => {
  test('Create: adds role to DataLakeAdmins and returns PhysicalResourceId', async () => {
    mockLfSend
      .mockResolvedValueOnce({ DataLakeSettings: { DataLakeAdmins: [] } } as GetDataLakeSettingsCommandOutput)
      .mockResolvedValueOnce({});

    const result = await handler(makeEvent('Create'), makeContext());

    expect(result).toEqual({ PhysicalResourceId: 'log-stream' });
    expect(mockLfSend).toHaveBeenCalledTimes(2);
  });

  test('Create: does not duplicate role already in DataLakeAdmins', async () => {
    const arn = 'arn:aws:iam::123456789012:role/AdminRole';
    mockLfSend
      .mockResolvedValueOnce({
        DataLakeSettings: { DataLakeAdmins: [{ DataLakePrincipalIdentifier: arn }] },
      } as GetDataLakeSettingsCommandOutput)
      .mockResolvedValueOnce({});

    await handler(makeEvent('Create', arn), makeContext());

    expect(mockLfSend).toHaveBeenCalledTimes(2);
  });

  test('Update: adds role to DataLakeAdmins', async () => {
    mockLfSend
      .mockResolvedValueOnce({ DataLakeSettings: { DataLakeAdmins: [] } } as GetDataLakeSettingsCommandOutput)
      .mockResolvedValueOnce({});

    await handler(makeEvent('Update'), makeContext());

    expect(mockLfSend).toHaveBeenCalledTimes(2);
  });

  test('Delete: removes role from DataLakeAdmins', async () => {
    const arn = 'arn:aws:iam::123456789012:role/AdminRole';
    mockLfSend
      .mockResolvedValueOnce({
        DataLakeSettings: { DataLakeAdmins: [{ DataLakePrincipalIdentifier: arn }] },
      } as GetDataLakeSettingsCommandOutput)
      .mockResolvedValueOnce({});

    const result = await handler(makeEvent('Delete', arn), makeContext());

    expect(result).toEqual({ PhysicalResourceId: 'log-stream' });
    expect(mockLfSend).toHaveBeenCalledTimes(2);
  });

  test('returns SUCCESS early when DataLakeSettings is undefined', async () => {
    mockLfSend.mockResolvedValueOnce({ DataLakeSettings: undefined } as GetDataLakeSettingsCommandOutput);

    const result = await handler(makeEvent('Create'), makeContext());

    expect(result).toEqual({ PhysicalResourceId: 'log-stream' });
    expect(mockLfSend).toHaveBeenCalledTimes(1);
  });

  test('throws on unhandled error so Provider framework can send FAILED', async () => {
    mockLfSend.mockRejectedValue(new Error('boom'));
    await expect(handler(makeEvent('Create'), makeContext())).rejects.toThrow('boom');
  });
});
