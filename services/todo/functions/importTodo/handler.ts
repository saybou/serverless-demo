import { SQSBatchResponse, SQSRecord } from 'aws-lambda';
import { applyHttpMiddlewares } from '@slsdemo/common';

const handler = async (record: SQSRecord): Promise<SQSBatchResponse> => {
  console.log({ record });

  await new Promise(resolve => {
    resolve('');
  });

  return {
    batchItemFailures: [],
  };
};

export const main = applyHttpMiddlewares(handler);
