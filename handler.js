"use strict"

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
var fs = require('fs');
const { stringify } = require('csv-stringify/sync');
const { uploadFile } = require('./s3helper');
const { putItemInDDB } = require('./ddbHelper');
AWS.config.update({ region: 'us-west-2' });

module.exports.uploadCsvToS3Handler = async (event) => {
  try {
    const uploadedObjectKey = await generateDataAndUploadToS3()
    const jobId = JSON.parse(event.body)['jobId']
    await putItemInDDB(jobId, uploadedObjectKey)
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          "status": "success",
          "jobId": jobId,
          "objectKey": uploadedObjectKey
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log('error', error)
    throw Error(`Error in backend`)
  }
};

const generateDataAndUploadToS3 = async () => {
  var filePath = '/tmp/test_user_data.csv'
  const objectKey = `${uuidv4()}.csv`;
  await writeCsvToFileAndUpload(filePath, objectKey)
  return objectKey
}

async function writeCsvToFileAndUpload(filePath, objectKey) {
  var data = getCsvData();
  var output = stringify(data);

  fs.writeFileSync(filePath, output);
  uploadFile(filePath, objectKey);
}

function getCsvData() {
  return [
    ['1', '2', '3', '4'],
    ['a', 'b', 'c', 'd']
  ];
}