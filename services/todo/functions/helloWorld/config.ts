import { getHandlerPath } from '../../libs/helpers';

export default {
  handler: getHandlerPath(__dirname),
  environment: {},
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/helloWorld/{name}',
      },
    },
  ],
  iamRoleStatements: [],
  iamRoleStatementsInherit: true,
};
