const { uploadFile, head } = require('../services/s3Service');
const { putItemInDDB, getItem } = require('../services/ddbService');
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

describe('uploadFile test', () => {
  beforeEach(() => {
  });

  test('test uploadFile', async () => {
    const filename = uuidv4() + '.csv';
    const filePath = `/tmp/${filename}`;
    fs.openSync(filePath, 'w')
    await uploadFile(filePath, filename);

    const resp = await head(filename)
    expect(resp.ContentType).toBe('application/octet-stream')
  });
});

describe('dynamodb test', () => {
  beforeEach(() => {
  });

  test('test dynamo DB put item', async () => {
    const jobId = uuidv4();
    const filename = jobId + '.csv';
    await putItemInDDB(jobId, filename)
    const item = await getItem(jobId);
    expect(item['Item']['jobId']['S']).toBe(jobId);
    expect(item['Item']['reportFileName']['S']).toBe(filename);
  });
});