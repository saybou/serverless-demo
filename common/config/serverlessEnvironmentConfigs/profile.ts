import { ServerlessEnvironmentConfig } from './types';

export const profileConfig: ServerlessEnvironmentConfig = {
  dev: {
    profile: 'saybou',
  },
  staging: {
    profile: '',
  },
  production: {
    profile: '',
  },
};
