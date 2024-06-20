export const getEnvVariable = (key: string): string => {
  if (process.env[key] === undefined) {
    throw new Error(`Unable to get env variable ${key}`);
  }

  return process.env[key] as string;
};
