import { ScheduledEvent } from 'aws-lambda';
import { applyHttpMiddlewares } from '@slsdemo/common';

const handler = async (event: ScheduledEvent): Promise<void> => {
  console.log({ event });

  await new Promise(resolve => {
    resolve('');
  });
};

export const main = applyHttpMiddlewares(handler);
