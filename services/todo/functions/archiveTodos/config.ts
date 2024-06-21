import { getHandlerPath } from '@slsdemo/common';

export default {
  handler: getHandlerPath(__dirname),
  iamRoleStatements: [],
  iamRoleStatementsInherit: true,
  events: [
    {
      schedule: {
        enabled: false,
        method: 'scheduler',
        rate: ['cron(0 22 * * ? *)'],
        timezone: 'Europe/Paris',
        input: {
          key1: 'value1',
          key2: 'value2',
        },
      },
    },
  ],
};
