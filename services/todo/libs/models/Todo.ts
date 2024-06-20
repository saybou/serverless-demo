import { Entity } from 'dynamodb-toolbox';
import { TodosTable } from '../tables/todos';
import {
  GSI1,
  GSI1_PK,
  GSI1_SK,
  PARTITION_KEY,
} from '../../resources/dynamodb';

export type TodoEntity = {
  id: string;
  title: string;
  author: string;
  date: string;
};

const getTaxonomyTermPartitionKey = <T extends Pick<TodoEntity, 'id'>>({
  id,
}: T): string => id;

const getTaxonomyTermGSI1PartitionKey = <T extends Pick<TodoEntity, 'author'>>({
  author,
}: T): string => author;

const getTaxonomyTermGSI1SortKey = <T extends Pick<TodoEntity, 'date'>>({
  date,
}: T): string => date;

export const Todo = new Entity({
  // Specify entity name
  name: 'Todo',
  // Define attributes
  attributes: {
    [PARTITION_KEY]: {
      partitionKey: true,
      hidden: true,
      default: getTaxonomyTermPartitionKey,
    },
    [GSI1_PK]: {
      partitionKey: GSI1,
      hidden: true,
      default: getTaxonomyTermGSI1PartitionKey,
    },
    [GSI1_SK]: {
      sortKey: GSI1,
      hidden: true,
      onUpdate: true,
      default: getTaxonomyTermGSI1SortKey,
    },
    id: { type: 'string', required: true },
    title: { type: 'string', required: true },
    author: { type: 'string', required: true },
    date: { type: 'string', required: true },
  },
  // Assign it to our table
  table: TodosTable,
  // In Typescript, the "as const" statement is needed for type inference
} as const);
