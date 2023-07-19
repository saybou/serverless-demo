import { Table } from 'dynamodb-toolbox';
import { getEnvVariable } from '../helpers';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import {
  GSI1,
  GSI1_PK,
  GSI1_SK,
  PARTITION_KEY,
} from '../../resources/dynamodb';

const DocumentClient = new DynamoDB.DocumentClient({
  // Specify your client options as usual
  convertEmptyValues: false,
});

// Instantiate a table
export const TodosTable = new Table({
  // Specify table name (used by DynamoDB)
  name: getEnvVariable('TODOS_TABLE_NAME'),
  // Define partition and sort keys
  partitionKey: PARTITION_KEY,
  indexes: {
    [GSI1]: { partitionKey: GSI1_PK, sortKey: GSI1_SK },
  },
  // Add the DocumentClient
  DocumentClient,
});
