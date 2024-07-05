import { Receipt } from 'libs/models/Receipt';
import { ReceiptStatus } from 'libs/types/receiptStatus';
import { v4 as uuid4 } from 'uuid';

import { ActionProps } from './type';
import { PaymentAction } from 'libs/types/paymentAction';

const isCreatePaymentProps = (
  props: ActionProps,
): props is Extract<ActionProps, { action: PaymentAction.CREATE }> => {
  return props.action === PaymentAction.CREATE;
};

const createPayment = async (params: ActionProps) => {
  if (!isCreatePaymentProps(params)) {
    throw new Error('Invalid action');
  }

  const { items, seller } = params;

  const now = new Date();
  const receipt = {
    id: uuid4(),
    date: now.getTime().toString(),
    items,
    seller,
    status: ReceiptStatus.CREATED,
  };

  await Receipt.put(receipt);

  return receipt;
};

export { createPayment };
