import { getHandlerPath } from '../../libs/helpers';

export default {
  handler: getHandlerPath(__dirname),
  environment: {},
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/todos',
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Resource: { 'Fn::GetAtt': ['todosTable', 'Arn'] },
      Action: ['dynamodb:Scan'],
    },
  ],
  iamRoleStatementsInherit: true,
};
