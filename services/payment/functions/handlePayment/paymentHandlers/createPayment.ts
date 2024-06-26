import { Receipt } from 'libs/models/Receipt';
import { ReceiptStatus } from 'libs/types/receiptStatus';
import { v4 as uuid4 } from 'uuid';
import { PaymentHandler } from './type';

const createPayment: PaymentHandler = async ({ items, seller }) => {
  if (!items || items.length === 0 || !seller) {
    throw new Error('Items are required');
  }

  if (!seller) {
    throw new Error('Seller is required');
  }

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
