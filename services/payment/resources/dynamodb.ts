import { CloudFormationResource } from 'serverless/aws';

export const PARTITION_KEY = 'PK';
export const GSI1 = 'GSI1';
export const GSI1_PK = 'GSI1_PK';
export const GSI1_SK = 'GSI1_SK';

enum KeyTypes {
  HASH = 'HASH', // partition key
  RANGE = 'RANGE', // sort key
}

export const receiptTable: CloudFormationResource = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    AttributeDefinitions: [
      { AttributeName: PARTITION_KEY, AttributeType: 'S' },
      { AttributeName: GSI1_PK, AttributeType: 'S' },
      { AttributeName: GSI1_SK, AttributeType: 'S' },
    ],
    KeySchema: [{ AttributeName: PARTITION_KEY, KeyType: KeyTypes.HASH }],
    GlobalSecondaryIndexes: [
      {
        IndexName: GSI1,
        KeySchema: [
          { AttributeName: GSI1_PK, KeyType: KeyTypes.HASH },
          { AttributeName: GSI1_SK, KeyType: KeyTypes.RANGE },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    StreamSpecification: {
      StreamViewType: 'NEW_AND_OLD_IMAGES',
    },
  },
};
