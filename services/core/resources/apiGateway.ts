import * as AwsConfig from 'serverless/aws';

export const HttpApiId: AwsConfig.Output = {
  Value: {
    Ref: 'HttpApi',
  },
  Export: {
    Name: '${self:custom.projectName}-HttpApiId-${self:provider.stage}',
  },
};
