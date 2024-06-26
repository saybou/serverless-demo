import { applyHttpMiddlewares } from '@slsdemo/common';
import { PaymentAction } from 'libs/types/paymentAction';
import { PaymentHandler, createPayment } from './paymentHandlers';
import { FromSchema } from 'json-schema-to-ts';
import inputSchema from './schema';

type PaymentHandlersMap = Record<PaymentAction, PaymentHandler>;

const paymentHandlers: PaymentHandlersMap = {
  [PaymentAction.CREATE]: createPayment,
};

const handler = async ({ body }: FromSchema<typeof inputSchema>) => {
  const { action, ...receiptData } = body;

  return await paymentHandlers[action](receiptData);
};

export const main = applyHttpMiddlewares(handler);
