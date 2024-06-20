import { applyHttpMiddlewares } from '@slsdemo/common';
import { TodosTable } from 'libs/tables/todos';
import { TodoEntity } from 'libs/models/Todo';

const handler = async (): Promise<TodoEntity[]> => {
  const { Items: todos } = await TodosTable.scan({
    limit: 100,
  });

  return todos as TodoEntity[];
};

export const main = applyHttpMiddlewares(handler);
