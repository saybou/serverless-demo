import { applyHttpMiddlewares, getEnvVariable } from '@slsdemo/common';
import { PaymentAction } from 'libs/types/paymentAction';
import { PaymentHandler, createPayment } from './paymentHandlers';
import { FromSchema } from 'json-schema-to-ts';

import inputSchema from './schema';

type PaymentHandlersMap = Record<PaymentAction, PaymentHandler>;

const paymentHandlers: PaymentHandlersMap = {
  [PaymentAction.CREATE]: createPayment,
};

const ssmParameters = {
  STRIPE_API_KEY: getEnvVariable('STRIPE_API_KEY_SSM_PATH'),
};

const handler = async ({ body }: FromSchema<typeof inputSchema>) => {
  const { action, ...receiptData } = body;

  const stripeApiKey = getEnvVariable('STRIPE_API_KEY');
  console.log({ stripeApiKey });

  return await paymentHandlers[action](receiptData);
};

export const main = applyHttpMiddlewares(handler, {
  inputSchema,
  ssmParameters,
});
