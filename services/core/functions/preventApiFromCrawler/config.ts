import { getHandlerPath } from '@slsdemo/common';

export default {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/robots.txt',
      },
    },
    {
      httpApi: {
        method: 'head',
        path: '/robots.txt',
      },
    },
  ],
};
