import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import jsonValidator from '@middy/validator';
import ssm from '@middy/ssm';
import { transpileSchema } from '@middy/validator/transpile';
import httpErrorHandler from '@middy/http-error-handler';
import { Handler } from 'aws-lambda';
import { getInternal } from '@middy/util';

type SsmParameters = Record<string, string>;
export interface ApplyMiddlewareOptions {
  inputSchema?: unknown;
  ssmParameters?: SsmParameters;
}

export const applyHttpMiddlewares = <T, R>(
  handler: Handler<T, R>,
  options: ApplyMiddlewareOptions = {},
): middy.MiddyfiedHandler<T, R> => {
  const { inputSchema, ssmParameters } = options;

  const middyfiedHandler = middy(handler);
  middyfiedHandler.use(httpErrorHandler());

  if (inputSchema !== undefined) {
    middyfiedHandler.use(jsonBodyParser());
    middyfiedHandler.use(
      jsonValidator({
        eventSchema: transpileSchema(inputSchema ?? {}, {
          allErrors: true,
          verbose: true,
        }),
      }),
    );
  }

  if (ssmParameters !== undefined) {
    middyfiedHandler
      .use(
        ssm({
          fetchData: ssmParameters,
          cacheKey: 'ssm-defaults',
        }),
      )
      .before(async request => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await getInternal(Object.keys(ssmParameters), request);
        Object.assign(process.env, data);
      });
  }

  return middyfiedHandler;
};
