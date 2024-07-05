import { PaymentAction } from 'libs/types/paymentAction';

export const createPaymentSchema = {
  type: 'object',
  properties: {
    seller: { type: 'string' },
    action: { const: PaymentAction.CREATE },
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          productId: { type: 'string' },
          price: { type: 'number' },
        },
        required: ['id', 'productId', 'price'],
        additionalProperties: false,
      },
    },
  },
  required: ['seller', 'action', 'items'],
  additionalProperties: false,
} as const;

export const payWithStripeSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    action: { const: PaymentAction.PAY_WITH_STRIPE },
    stripeIntentId: { type: 'string' },
  },
  required: ['id', 'action', 'stripeIntentId'],
  additionalProperties: false,
} as const;

export default {
  type: 'object',
  properties: {
    body: {
      oneOf: [createPaymentSchema, payWithStripeSchema],
    },
  },
  required: ['body'],
} as const;
