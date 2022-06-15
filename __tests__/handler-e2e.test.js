const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;

describe('API test', () => {
  beforeEach(() => {
  });

  test('test upload CSV API', async () => {
    const apiUrl = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com/uploadCsv`

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