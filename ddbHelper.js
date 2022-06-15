const AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({region: process.env.region});

const TABLE_NAME = process.env.TABLE_NAME

module.exports.putItemInDDB = async (jobId, objectKey) => {
    // Read content from the file
    var params = {
        TableName: TABLE_NAME,
        Item: {
            'jobId': { S: jobId },
            'reportFileName': { S: objectKey }
        }
    };

    // Call DynamoDB to add the item to the table
    await ddb.putItem(params).promise();
};

module.exports.getItem = async (jobId) => {
    // Read content from the file
    var params = {
        TableName: TABLE_NAME,
        Key: {
            'jobId': { S: jobId }
        }
    };

    // Call DynamoDB to add the item to the table
    return await ddb.getItem(params).promise();
};