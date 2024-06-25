import {
  ServerlessEnvironmentConfig,
  domainsConfig,
  profileConfig,
} from './serverlessEnvironmentConfigs';

export const projectName = 'slsdemo'; // Keep it short to have role name below 64
export const defaultEnvironment = 'dev'; // Keep it short to have role name below 64

const defaultEnvironmentConfig = {};

export const environments: ServerlessEnvironmentConfig = {
  dev: {
    ...defaultEnvironmentConfig,
    ...domainsConfig.dev,
    ...profileConfig.dev,
  },
  staging: {
    ...defaultEnvironmentConfig,
    ...domainsConfig.staging,
    ...profileConfig.staging,
  },
  production: {
    ...defaultEnvironmentConfig,
    ...domainsConfig.production,
    ...profileConfig.production,
  },
};
