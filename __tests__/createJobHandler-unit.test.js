jest.mock("aws-sdk", () => {
  return {
    config: {
      update() {
        return {};
      },
    },
    DynamoDB: jest.fn(() => {
      return {
        putItem: jest.fn().mockImplementation(() => ({ promise: jest.fn().mockReturnValue(Promise.resolve(true)) })),
      };
    }),
    S3: jest.fn(() => {
      return {
        upload: jest.fn().mockImplementation(() => ({ promise: jest.fn().mockReturnValue(Promise.resolve(true)) })),
      };
    }),
  };
});

const handler = require('../handlers/createJobHandler');

describe('createJobHandler', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('createJob', async () => {
    const response = await handler.createJob({
      body: JSON.stringify({ jobId: 'test-job-id' }),
    });

    let body = JSON.parse(response.body);

    expect(body.status).toBe('success');
    expect(body.jobId).toBe('test-job-id');
  });
});