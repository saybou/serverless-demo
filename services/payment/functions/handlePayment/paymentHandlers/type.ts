import { ReceiptEntity } from 'libs/models/Receipt';

import { FromSchema } from 'json-schema-to-ts';
import inputSchema from '../schema';

export type HandlerProps = FromSchema<typeof inputSchema>['body'];

export type PaymentHandler = (
  receipt: Partial<HandlerProps>,
) => Promise<ReceiptEntity>;
