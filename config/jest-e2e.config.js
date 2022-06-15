const { config } = require('dotenv');
const { resolve } = require('path');

module.exports = {
  testEnvironment: 'node',
  roots: ['../__tests__/'],
  testMatch: ["**/__tests__/**/*e2e.test.js"],
  testTimeout: 60000 * 2, // 2 minutes timeout
}

// Load environment variables generated by serverless-export-env plugin
config({
  path: resolve(__dirname, '../.env'),
  bail: 1,
  testEnvironment: 'node'
})