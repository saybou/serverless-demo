import { NotFound } from 'http-errors';
import { FromSchema } from 'json-schema-to-ts';
import { applyHttpMiddlewares } from '../../libs/helpers';

import inputSchema from './schema';
import { Todo } from '../../libs/models/Todo';
import { PARTITION_KEY } from '../../resources/dynamodb';

const handler = async ({ pathParameters }: FromSchema<typeof inputSchema>) => {
  const { id } = pathParameters;

  const { Item: todo } = await Todo.get({ [PARTITION_KEY]: id });

  if (!todo) {
    throw new NotFound();
  }

  return todo;
};

export const main = applyHttpMiddlewares(handler, { inputSchema });
