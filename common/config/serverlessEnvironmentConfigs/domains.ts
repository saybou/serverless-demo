import { ServerlessEnvironmentConfig } from './types';

const defaultDomainsConfig = {
  domain: '${ssm:/OPS/domain}',
};

export const domainsConfig: ServerlessEnvironmentConfig = {
  dev: {
    ...defaultDomainsConfig,
    api_subdomain: 'api-dev',
  },
  staging: {
    ...defaultDomainsConfig,
    api_subdomain: 'api-staging',
  },
  production: {
    ...defaultDomainsConfig,
    api_subdomain: 'api-prod',
  },
};
