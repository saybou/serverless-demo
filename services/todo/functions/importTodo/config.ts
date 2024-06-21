import { getHandlerPath } from '@slsdemo/common';

export default {
  handler: getHandlerPath(__dirname),
  // reservedConcurrency: 20, --> use maximumConcurrency instead
  timeout: 15,
  iamRoleStatements: [],
  iamRoleStatementsInherit: true,
  events: [
    {
      sqs: {
        batchSize: 5,
        maximumBatchingWindow: 60,
        maximumConcurrency: 2,
        functionResponseType: 'ReportBatchItemFailures' as const,
        arn: {
          'Fn::GetAtt': ['importTodoQueue', 'Arn'],
        },
      },
    },
  ],
};
