const { uploadFile, head } = require('../s3helper');
const { putItemInDDB, getItem } = require('../ddbHelper');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;

describe('uploadFile test', () => {
  beforeEach(() => {
  });

  test('test uploadFile', async () => {
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