import { CloudFormationResource } from 'serverless/aws';

export const importTodoDLQ: CloudFormationResource = {
  Type: 'AWS::SQS::Queue',
  Properties: {
    MessageRetentionPeriod: 791200, // 8 days, which means 4 minimum in the DLQ
  },
};

export const importTodoQueue: CloudFormationResource = {
  Type: 'AWS::SQS::Queue',
  Properties: {
    RedrivePolicy: {
      maxReceiveCount: 3,
      deadLetterTargetArn: { 'Fn::GetAtt': ['importTodoDLQ', 'Arn'] },
    },
  },
};
