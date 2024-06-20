import { CloudFormationResources, Serverless } from 'serverless/aws';

import { HttpApiId } from './resources/apiGateway';

import preventApiFromCrawler from './functions/preventApiFromCrawler/config';

const Resources: CloudFormationResources = {};

const serverlessConfiguration: Serverless = {
  service: 'serverless-demo-core', // Keep it short to have role name below 64
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
    stage: `\${opt:stage, 'dev'}`, // Doc: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
    apiGateway: { minimumCompressionSize: 1024 },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      STAGE: '${self:provider.stage}',
    },
    tags: {
      Environment: '${self:provider.stage}',
      Project: '${self:custom.projectName}',
      Role: '${self:service}',
    },
    httpApi: {
      payload: '2.0',
      cors: true,
    },
  },
  package: { individually: true },
  functions: { preventApiFromCrawler },
  custom: {
    projectName: 'serverless-demo',
    environments: {
      dev: { profile: 'saybou' },
    },
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
  },
  resources: {
    Description:
      'Core: Main stack managing shared AWS services on which other stacks depend',
    Resources,
    Outputs: {
      HttpApiId,
    },
  },
};

module.exports = serverlessConfiguration;
