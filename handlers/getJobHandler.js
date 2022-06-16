"use strict"

const AWS = require('aws-sdk');
const { getItem } = require('../services/ddbService');
AWS.config.update({ region: 'us-west-2' });

module.exports.getJob = async (event) => {
  try {
    const jobId = event.pathParameters['jobId']
    const job = await getItem(jobId);

    const objectKey = job['Item']['reportFileName']['S']

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          "jobId": jobId,
          "objectKey": objectKey
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