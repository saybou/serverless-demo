import { DynamoDBStreamEvent } from 'aws-lambda';
import compact from 'lodash/compact';

import { Converter } from 'aws-sdk/clients/dynamodb';
import { applyHttpMiddlewares } from '../../libs/helpers';

const handler = async (event: DynamoDBStreamEvent): Promise<void> => {
  const filteredRecords = event.Records.filter(
    record =>
      record.eventName !== undefined &&
      ['CREATE', 'MODIFY', 'REMOVE'].includes(record.eventName),
  );

  const mappedEntities = compact(
    filteredRecords.map(record => {
      if (record.dynamodb?.NewImage) {
        return Converter.unmarshall(record.dynamodb.NewImage);
      }

      return record.dynamodb?.OldImage
        ? Converter.unmarshall(record.dynamodb.OldImage)
        : undefined;
    }),
  );

  console.log(mappedEntities);
};

export const main = applyHttpMiddlewares(handler);
