import { PaymentAction } from 'libs/types/paymentAction';

export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        seller: { type: 'string' },
        action: { enum: Object.values(PaymentAction) },
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
    },
  },
  required: ['body'],
} as const;
