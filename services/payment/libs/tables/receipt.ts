import { Table } from 'dynamodb-toolbox';
import { getEnvVariable } from '@slsdemo/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { GSI1, GSI1_PK, GSI1_SK, PARTITION_KEY } from 'resources/dynamodb';

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // if not false explicitly, we set it to true.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  // NOTE: this is required to be true in order to use the bigint data type.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Instantiate a DocumentClient
const DocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({}),
  translateConfig,
);

// Instantiate a table
export const ReceiptTable = new Table({
  // Specify table name (used by DynamoDB)
  name: getEnvVariable('RECEIPT_TABLE_NAME'),
  // Define partition and sort keys
  partitionKey: PARTITION_KEY,
  indexes: {
    [GSI1]: { partitionKey: GSI1_PK, sortKey: GSI1_SK },
  },
  // Add the DocumentClient
  DocumentClient,
});
