import { applyHttpMiddlewares, getEnvVariable } from '@slsdemo/common';
import { FromSchema } from 'json-schema-to-ts';
import { PaymentAction } from 'libs/types/paymentAction';
import {
  PaymentHandlersMap,
  createPayment,
  payWithStripe,
} from './paymentHandlers';
import inputSchema from './schema';

const paymentHandlers: PaymentHandlersMap = {
  [PaymentAction.CREATE]: createPayment,
  [PaymentAction.PAY_WITH_STRIPE]: payWithStripe,
};

const ssmParameters = {
  STRIPE_API_KEY: getEnvVariable('STRIPE_API_KEY_SSM_PATH'),
};

const handler = async ({ body }: FromSchema<typeof inputSchema>) => {
  const { action } = body;

  return paymentHandlers[action](body);
};

export const main = applyHttpMiddlewares(handler, {
  inputSchema,
  ssmParameters,
});
