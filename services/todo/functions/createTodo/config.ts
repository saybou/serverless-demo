import { getHandlerPath } from '@slsdemo/common';

export default {
  handler: getHandlerPath(__dirname),
  environment: {},
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/todos',
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Resource: { 'Fn::GetAtt': ['todosTable', 'Arn'] },
      Action: ['dynamodb:PutItem'],
    },
  ],
  iamRoleStatementsInherit: true,
};
