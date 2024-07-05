import { FromSchema } from 'json-schema-to-ts';
import { ReceiptEntity } from 'libs/models/Receipt';
import { PaymentAction } from 'libs/types/paymentAction';
import inputSchema from '../schema';

export type ActionProps = FromSchema<typeof inputSchema>['body'];

export type PaymentHandlersMap = {
  [K in PaymentAction]: (props: ActionProps) => Promise<ReceiptEntity>;
};
