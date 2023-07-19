export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        date: { type: 'string' },
      },
      required: ['title', 'author', 'date'],
      additionalProperties: false,
    },
  },
  required: ['body'],
} as const;
