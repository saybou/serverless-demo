import { getHandlerPath } from '../../libs/helpers';

export default {
  handler: getHandlerPath(__dirname),
  environment: {},
  events: [
    {
      stream: {
        type: 'dynamodb' as const,
        maximumRetryAttempts: 3,
        bisectBatchOnFunctionError: true,
        arn: {
          'Fn::GetAtt': ['todosTable', 'StreamArn'],
        },
        /*destinations: {
          onFailure: {
            arn: {
              'Fn::GetAtt': ['indexTodoInAlgoliaDLQ', 'Arn'],
            },
            type: 'sqs',
          },
        },*/
      },
    },
  ],
  iamRoleStatements: [],
  iamRoleStatementsInherit: true,
};
