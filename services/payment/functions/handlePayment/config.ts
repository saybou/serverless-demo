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
      Action: ['dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:UpdateItem'],
    },
    {
      Effect: 'Allow',
      Resource: [
        'arn:aws:ssm:${aws:region}:${aws:accountId}:parameter${self:provider.environment.STRIPE_API_KEY_SSM_PATH}',
      ],
      Action: ['ssm:GetParameters'],
    },
  ],
  iamRoleStatementsInherit: true,
};
