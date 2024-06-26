import { getHandlerPath } from '@slsdemo/common';

export default {
  handler: getHandlerPath(__dirname),
  environment: {},
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/payment',
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Resource: { 'Fn::GetAtt': ['receiptTable', 'Arn'] },
      Action: ['dynamodb:PutItem'],
    },
  ],
  iamRoleStatementsInherit: true,
};
