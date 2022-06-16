const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;

describe('Create job API test', () => {
  beforeEach(() => {
  });

  test('test create job API', async () => {
    const apiUrl = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com/job`

    const jobId = uuidv4();
    const resp = await axios.post(apiUrl, {
      jobId: jobId
    })
    expect(resp.status).toBe(200)
    expect(resp.data.status).toBe('success')
    expect(resp.data.jobId).toBe(jobId)
    expect(resp.data.objectKey).toBeDefined()
  });
});