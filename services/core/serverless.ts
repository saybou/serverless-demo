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
    'serverless-domain-manager', // https://www.npmjs.com/package/serverless-domain-manager / https://aws.plainenglish.io/serverless-framework-setting-up-a-custom-domain-to-api-gateway-91064a598f1d
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
    customDomain: {
      domainName: 'api.saybou.me',
      stage: '${self:provider.stage}',
      basePath: '',
      certificateName: '*.saybou.me',
      createRoute53Record: true,
      createRoute53IPv6Record: true,
      endpointType: 'REGIONAL',
      securityPolicy: 'tls_1_2',
      apiType: 'http',
      autoDomain: false,
    },
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
