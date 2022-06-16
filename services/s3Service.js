const AWS = require('aws-sdk');
const s3 = new AWS.S3();
var fs = require('fs');

const BUCKET_NAME = process.env.BUCKET_NAME

module.exports.uploadFile = async (fileName, objectKey) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: objectKey,
        Body: fileContent
    };

    // Uploading files to the bucket
    await s3.upload(params).promise()
    return objectKey;
};

module.exports.head = async (objectKey) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: objectKey
    }

    const resp = await s3.headObject(params).promise()
    return resp;
};
