import type { ListEnvironmentsCommandOutput, ListProjectsCommandOutput } from '@aws-sdk/client-datazone';
import type { DeleteDatabaseCommandOutput } from '@aws-sdk/client-glue';
import type {
  GetDataLakeSettingsCommandOutput,
  GrantPermissionsCommandOutput,
  PutDataLakeSettingsCommandOutput,
  RevokePermissionsCommandOutput,
} from '@aws-sdk/client-lakeformation';
import type { CdkCustomResourceEvent, Context } from 'aws-lambda';

const mockLfSend = jest.fn();
const mockDzSend = jest.fn();
const mockGlueSend = jest.fn();

jest.mock('@aws-sdk/client-lakeformation', () => ({
  LakeFormationClient: jest.fn(() => ({ send: mockLfSend })),
  GetDataLakeSettingsCommand: jest.fn(),
  PutDataLakeSettingsCommand: jest.fn(),
  GrantPermissionsCommand: jest.fn(),
  RevokePermissionsCommand: jest.fn(),
}));

jest.mock('@aws-sdk/client-datazone', () => ({
  DataZoneClient: jest.fn(() => ({ send: mockDzSend })),
  ListProjectsCommand: jest.fn(),
  ListEnvironmentsCommand: jest.fn(),
}));

jest.mock('@aws-sdk/client-glue', () => ({
  GlueClient: jest.fn(() => ({ send: mockGlueSend })),
  DeleteDatabaseCommand: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { handler } = require('../../assets/lake-formation-cleanup/index');

const makeEvent = (requestType: string, overrides: Record<string, unknown> = {}): CdkCustomResourceEvent =>
  ({
    RequestType: requestType,
    ResponseURL: 'https://cloudformation.example.com/response',
    StackId: 'stack-id',
    RequestId: 'req-id',
    LogicalResourceId: 'logical-id',
    ResourceType: 'Custom::LakeFormationCleanup',
    ResourceProperties: {
      ServiceToken: 'token',
      BucketArn: 'arn:aws:s3:::my-bucket',
      DataLocationGrantPrincipals: ['arn:aws:iam::123456789012:role/Role1'],
      RoleArns: ['arn:aws:iam::123456789012:role/AdminRole'],
      DomainId: 'dzd-abc123',
      ...overrides,
    },
  }) as unknown as CdkCustomResourceEvent;

const makeContext = (): Context => ({ logStreamName: 'log-stream' }) as unknown as Context;

const dataLakeSettings = {
  DataLakeAdmins: [{ DataLakePrincipalIdentifier: 'arn:aws:iam::123456789012:role/AdminRole' }],
  ReadOnlyAdmins: [],
};

beforeEach(() => {
  jest.clearAllMocks();
  mockLfSend.mockResolvedValue({ DataLakeSettings: { ...dataLakeSettings } } as GetDataLakeSettingsCommandOutput);
  mockDzSend
    .mockResolvedValueOnce({ items: [{ id: 'proj-1' }], nextToken: undefined } as ListProjectsCommandOutput)
    .mockResolvedValueOnce({ items: [{ id: 'env-1' }], nextToken: undefined } as ListEnvironmentsCommandOutput);
  mockGlueSend.mockResolvedValue({} as DeleteDatabaseCommandOutput);
});

describe('lake-formation-cleanup handler', () => {
  test('Create: grants data location access and returns PhysicalResourceId', async () => {
    mockLfSend.mockResolvedValue({} as GrantPermissionsCommandOutput);
    const result = await handler(makeEvent('Create'), makeContext());
    expect(result).toEqual({ PhysicalResourceId: 'log-stream' });
    expect(mockLfSend).toHaveBeenCalledTimes(1);
  });

  test('Update: grants data location access', async () => {
    mockLfSend.mockResolvedValue({} as GrantPermissionsCommandOutput);
    const result = await handler(makeEvent('Update'), makeContext());
    expect(result).toEqual({ PhysicalResourceId: 'log-stream' });
  });

  test('Delete: revokes access, removes admin roles, deletes Glue databases', async () => {
    mockLfSend
      .mockResolvedValueOnce({} as RevokePermissionsCommandOutput)
      .mockResolvedValueOnce({ DataLakeSettings: { ...dataLakeSettings } } as GetDataLakeSettingsCommandOutput)
      .mockResolvedValueOnce({} as PutDataLakeSettingsCommandOutput);

    const result = await handler(makeEvent('Delete'), makeContext());

    expect(result).toEqual({ PhysicalResourceId: 'log-stream' });
    expect(mockLfSend).toHaveBeenCalledTimes(3);
    expect(mockGlueSend).toHaveBeenCalledTimes(1);
  });

  test('Delete: skips Glue cleanup when DomainId is absent', async () => {
    mockLfSend
      .mockResolvedValueOnce({} as RevokePermissionsCommandOutput)
      .mockResolvedValueOnce({ DataLakeSettings: { ...dataLakeSettings } } as GetDataLakeSettingsCommandOutput)
      .mockResolvedValueOnce({} as PutDataLakeSettingsCommandOutput);

    await handler(makeEvent('Delete', { DomainId: '' }), makeContext());

    expect(mockGlueSend).not.toHaveBeenCalled();
  });

  test('Delete: paginates projects and environments', async () => {
    mockDzSend.mockReset();
    mockLfSend
      .mockResolvedValueOnce({} as RevokePermissionsCommandOutput)
      .mockResolvedValueOnce({ DataLakeSettings: { ...dataLakeSettings } } as GetDataLakeSettingsCommandOutput)
      .mockResolvedValueOnce({} as PutDataLakeSettingsCommandOutput);

    mockDzSend
      .mockResolvedValueOnce({ items: [{ id: 'proj-1' }], nextToken: 'tok1' } as ListProjectsCommandOutput)
      .mockResolvedValueOnce({ items: [{ id: 'env-1' }], nextToken: 'tok2' } as ListEnvironmentsCommandOutput)
      .mockResolvedValueOnce({ items: [{ id: 'env-2' }], nextToken: undefined } as ListEnvironmentsCommandOutput)
      .mockResolvedValueOnce({ items: [{ id: 'proj-2' }], nextToken: undefined } as ListProjectsCommandOutput)
      .mockResolvedValueOnce({ items: [], nextToken: undefined } as ListEnvironmentsCommandOutput);

    await handler(makeEvent('Delete'), makeContext());

    expect(mockGlueSend).toHaveBeenCalledTimes(2);
  });

  test('Delete: ignores EntityNotFoundException when deleting Glue database', async () => {
    mockLfSend
      .mockResolvedValueOnce({} as RevokePermissionsCommandOutput)
      .mockResolvedValueOnce({ DataLakeSettings: { ...dataLakeSettings } } as GetDataLakeSettingsCommandOutput)
      .mockResolvedValueOnce({} as PutDataLakeSettingsCommandOutput);
    mockGlueSend.mockRejectedValue({ name: 'EntityNotFoundException' });

    await expect(handler(makeEvent('Delete'), makeContext())).resolves.toEqual({ PhysicalResourceId: 'log-stream' });
  });

  test('Delete: removeAdminRoles is no-op when DataLakeSettings is undefined', async () => {
    mockLfSend
      .mockResolvedValueOnce({} as RevokePermissionsCommandOutput)
      .mockResolvedValueOnce({ DataLakeSettings: undefined } as GetDataLakeSettingsCommandOutput);

    await handler(makeEvent('Delete'), makeContext());

    expect(mockLfSend).toHaveBeenCalledTimes(2);
  });

  test('Create: ignores AlreadyExistsException on grant', async () => {
    mockLfSend.mockRejectedValue({ name: 'AlreadyExistsException' });
    await expect(handler(makeEvent('Create'), makeContext())).resolves.toEqual({ PhysicalResourceId: 'log-stream' });
  });

  test('throws on unhandled error so Provider framework can send FAILED', async () => {
    mockLfSend.mockRejectedValue(new Error('boom'));
    await expect(handler(makeEvent('Delete'), makeContext())).rejects.toThrow('boom');
  });
});
