import findKey from 'lodash/findKey';
import {
  CloudFormationResource,
  CloudFormationResources,
} from 'serverless/aws';

interface CloudFormationReference {
  Ref: string;
}

export const ref = (
  resources: CloudFormationResources,
  referencedResource: CloudFormationResource,
): CloudFormationReference => {
  return {
    Ref: findKey(
      resources,
      resource => referencedResource === resource,
    ) as string,
  };
};
