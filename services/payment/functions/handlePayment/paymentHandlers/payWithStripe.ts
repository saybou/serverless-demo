import { NotFound } from 'http-errors';
import { Receipt } from 'libs/models/Receipt';

import { getEnvVariable } from '@slsdemo/common';
import { ReceiptStatus } from 'libs/types/receiptStatus';
import { PARTITION_KEY } from 'resources/dynamodb';
import { ActionProps } from './type';
import { PaymentAction } from 'libs/types/paymentAction';

const isPayWithStripeProps = (
  props: ActionProps,
): props is Extract<ActionProps, { action: PaymentAction.PAY_WITH_STRIPE }> => {
  return props.action === PaymentAction.PAY_WITH_STRIPE;
};

const payWithStripe = async (params: ActionProps) => {
  if (!isPayWithStripeProps(params)) {
    throw new Error('Invalid action');
  }

  const { id, stripeIntentId } = params;

  const stripeApiKey = getEnvVariable('STRIPE_API_KEY');

  const { Item: receipt } = await Receipt.get({ [PARTITION_KEY]: id });

  if (!receipt) {
    throw new NotFound();
  }

  const stripeResult = await new Promise(resolve => {
    console.log('Paying with Stripe', stripeApiKey, stripeIntentId);
    resolve({ success: true });
  });

  console.log('Stripe result', stripeResult);

  const updatedReceipt = {
    ...receipt,
    status: ReceiptStatus.PAID,
  };

  await Receipt.update(updatedReceipt);

  return updatedReceipt;
};

export { payWithStripe };
