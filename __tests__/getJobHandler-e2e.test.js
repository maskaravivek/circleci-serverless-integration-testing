const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;

describe('GET Job API test', () => {
  beforeEach(() => {
  });

  test('test get job API', async () => {
    const baseApiUrl = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com/job`

    const jobId = uuidv4();
    const resp = await axios.post(baseApiUrl, {
      jobId: jobId
    });

    expect(resp.status).toBe(200)
    expect(resp.data.status).toBe('success')
    expect(resp.data.jobId).toBe(jobId)
    expect(resp.data.objectKey).toBeDefined()

    const getApiUrl = `${baseApiUrl}/${jobId}`

    const getResp = await axios.get(getApiUrl)
    
    expect(getResp.status).toBe(200)
    expect(getResp.data.jobId).toBe(jobId)
    expect(getResp.data.objectKey).toBe(resp.data.objectKey)
  });
});