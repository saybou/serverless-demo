import { CloudFormationResources, Serverless } from 'serverless/aws';
import {
  defaultEnvironment,
  environments,
  projectName,
  ref,
} from '@slsdemo/common';

import handlePayment from './functions/handlePayment/config';
import { receiptTable } from './resources/dynamodb';

const Resources: CloudFormationResources = {
  receiptTable,
};

const serverlessConfiguration: Serverless = {
  service: `${projectName}-payment`, // Keep it short to have role name below 64
  frameworkVersion: '>=3.33.0',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    'serverless-prune-plugin',
  ],
  provider: {
    name: 'aws',
    logRetentionInDays: 30,
    runtime: 'nodejs20.x',
    region: 'eu-west-1',
    profile: '${self:custom.environments.${self:provider.stage}.profile}', // Used to point to the right AWS account
    stage: `\${opt:stage, '${defaultEnvironment}'}`, // Doc: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
    apiGateway: { minimumCompressionSize: 1024 },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      STAGE: '${self:provider.stage}',
      RECEIPT_TABLE_NAME: '${self:custom.receiptTableName}',
      STRIPE_API_KEY_SSM_PATH:
        '${self:custom.environments.${self:provider.stage}.stripeApiKeySsmPath}',
      API_ENDPOINT_URL: {
        'Fn::Join': [
          '',
          [
            'https://',
            {
              'Fn::ImportValue':
                '${self:custom.projectName}-HttpApiId-${self:provider.stage}',
            },
            '.execute-api.',
            {
              Ref: 'AWS::Region',
            },
            '.',
            {
              Ref: 'AWS::URLSuffix',
            },
          ],
        ],
      },
    },
    tags: {
      Environment: '${self:provider.stage}',
      Project: '${self:custom.projectName}',
      Role: '${self:service}',
    },
    httpApi: {
      // @ts-ignore error in serverless/aws types
      id: {
        'Fn::ImportValue':
          '${self:custom.projectName}-HttpApiId-${self:provider.stage}',
      },
    },
  },
  package: { individually: true },
  functions: {
    handlePayment,
  },
  custom: {
    projectName,
    environments,
    esbuild: {
      packager: 'yarn',
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['canvas', 'aws-sdk'],
      target: 'node20',
      define: { 'require.resolve': '0' },
      platform: 'node',
      mainFields: ['module', 'main'],
    },
    prune: { automatic: true, includeLayers: true, number: 3 },
    receiptTableName: ref(Resources, receiptTable),
  },
  resources: {
    Description: 'Payment service',
    Resources,
  },
};

module.exports = serverlessConfiguration;
