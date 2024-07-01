// Initialize AWS SDK
import {
  SSMClient,
  PutParameterCommand,
  ParameterType,
  ParameterTier,
  GetParameterCommand,
} from '@aws-sdk/client-ssm';

import { region } from './config';

// Prefix used for all parameters created by this script
const parameter_prefix = '/demo-credentials/';

//Only for demo otherwise use the get SSM values on secure SSM account
const SSM_PARAMETERS = [
  {
    name: `${parameter_prefix}StripeApiKey`,
    isSecure: true,
    value: 'stripe-api-key-123',
  },
];

const ssmClient = new SSMClient({
  region: region,
});

const checkForUpdate = async (
  parameterName: string,
  isSecure: boolean,
  secretValue: string,
): Promise<boolean> => {
  try {
    const res = await ssmClient.send(
      new GetParameterCommand({
        Name: parameterName,
        WithDecryption: isSecure,
      }),
    );

    const parameter = res.Parameter;
    if (parameter === undefined) {
      return true;
    }

    const ssmValue = parameter.Value;

    if (ssmValue === secretValue) {
      return false;
    }

    return true;
  } catch (error) {
    console.warn(
      `Warn occurred while checking the value of the SSM Parameter ${parameterName}, it probably doesn't exist yet`,
    );

    return true;
  }
};

const createSsmParameters = async (): Promise<Array<string>> => {
  const ssmParametersList: Array<string> = [];

  for (const parameter of SSM_PARAMETERS) {
    console.log('Creating SSM parameter for', parameter.name);
    const parameterName = parameter.name;
    const secretValue = parameter.value;

    const updateNeeded = await checkForUpdate(
      parameterName,
      parameter.isSecure,
      secretValue,
    );

    ssmParametersList.push(parameterName);

    if (updateNeeded) {
      const params = {
        Name: parameterName,
        Value: parameter.value,
        Type: parameter.isSecure
          ? ParameterType.SECURE_STRING
          : ParameterType.STRING,
        Overwrite: true,
        Tier:
          secretValue.length > 4096
            ? ParameterTier.ADVANCED
            : ParameterTier.STANDARD,
      };

      await ssmClient.send(new PutParameterCommand(params));
    }
  }

  return ssmParametersList;
};

const updateCredentials = async (environment?: string): Promise<void> => {
  console.log('Creating SSM parameters for shared credentials', environment);
  await createSsmParameters();

  // console.log('Cleaning up deprecated parameters');
  // const parametersList = sharedParameters.concat(environmentParameters);

  // await parameterCleanup(parametersList);
};

// The updateCredentials function only checks if the environment (argv[2]) is 'dev'
// If it's anything else it will use it's default behavior, which is to use Secret Names instead of ARNs
void updateCredentials(process.argv[2] ?? undefined);
