import { getHandlerPath } from '../../libs/helpers';

export default {
  handler: getHandlerPath(__dirname),
  environment: {},
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/todos/{id}',
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Resource: { 'Fn::GetAtt': ['todosTable', 'Arn'] },
      Action: ['dynamodb:GetItem'],
    },
  ],
  iamRoleStatementsInherit: true,
};
