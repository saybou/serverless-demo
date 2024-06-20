import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import jsonValidator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import httpErrorHandler from '@middy/http-error-handler';
import { Handler } from 'aws-lambda';

export interface ApplyMiddlewareOptions {
  inputSchema?: unknown;
}

export const applyHttpMiddlewares = <T, R>(
  handler: Handler<T, R>,
  options: ApplyMiddlewareOptions = {},
): middy.MiddyfiedHandler<T, R> => {
  const { inputSchema } = options;

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

  return middyfiedHandler;
};
