import { CloudFormationResources, Serverless } from 'serverless/aws';

import createTodo from './functions/createTodo/config';
import getTodo from './functions/getTodo/config';
import getTodos from './functions/getTodos/config';
import helloWorld from './functions/helloWorld/config';
import indexTodoInAlgolia from './functions/indexTodoInAlgolia/config';
import { todosTable } from './resources/dynamodb';
import { ref } from './libs/helpers';

const Resources: CloudFormationResources = { todosTable };

const serverlessConfiguration: Serverless = {
  service: 'serverless-demo', // Keep it short to have role name below 64
  frameworkVersion: '>=3.33.0',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    'serverless-prune-plugin',
  ],
  provider: {
    name: 'aws',
    logRetentionInDays: 30,
    runtime: 'nodejs16.x',
    region: 'eu-west-1',
    profile: '${self:custom.environments.${self:provider.stage}.profile}', // Used to point to the right AWS account
    stage: `\${opt:stage, 'dev'}`, // Doc: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
    apiGateway: { minimumCompressionSize: 1024 },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      STAGE: '${self:provider.stage}',
      TODOS_TABLE_NAME: '${self:custom.todosTableName}',
      /*API_ENDPOINT_URL: {
        'Fn::Join': [
          '',
          [
            'https://',
            {
              Ref: 'HttpApi',
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
      },*/
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
  functions: { createTodo, getTodo, getTodos, helloWorld, indexTodoInAlgolia },
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
      target: 'node16',
      define: { 'require.resolve': '0' },
      platform: 'node',
      mainFields: ['module', 'main'],
    },
    prune: { automatic: true, includeLayers: true, number: 3 },
    todosTableName: ref(Resources, todosTable),
  },
  resources: {
    Description: 'Serverless demo service',
    Resources,
  },
};

module.exports = serverlessConfiguration;
