export default {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
      },
      required: ['id'],
      additionalProperties: false,
    },
  },
  required: ['pathParameters'],
} as const;
