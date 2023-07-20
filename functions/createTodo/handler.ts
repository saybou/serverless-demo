import { FromSchema } from 'json-schema-to-ts';
import { v4 as uuid4 } from 'uuid';
import { applyHttpMiddlewares } from '../../libs/helpers';
import { Todo } from '../../libs/models/Todo';

import inputSchema from './schema';

const handler = async ({ body }: FromSchema<typeof inputSchema>) => {
  const { title, author, date } = body;

  const todo = await Todo.put({
    id: uuid4(),
    title,
    author,
    date,
  });

  const tata = 'tata';

  console.log(tata);
  console.log('hello');

  return todo;
};

export const main = applyHttpMiddlewares(handler, { inputSchema });
