import { Entity } from 'dynamodb-toolbox';
import { ReceiptTable } from '../tables/receipt';
import { GSI1, GSI1_PK, GSI1_SK, PARTITION_KEY } from 'resources/dynamodb';
import { ReceiptStatus } from 'libs/types/receiptStatus';

export type ItemReceiptEntity = {
  id: string;
  productId: string;
  price: number;
};

export type ReceiptEntity = {
  id: string;
  date: string;
  items: ItemReceiptEntity[];
  seller: string;
  status: ReceiptStatus;
};

const getReceiptPartitionKey = <T extends Pick<ReceiptEntity, 'id'>>({
  id,
}: T): string => id;

const getReceiptGSI1PartitionKey = <T extends Pick<ReceiptEntity, 'seller'>>({
  seller,
}: T): string => seller;

const getReceiptGSI1SortKey = <T extends Pick<ReceiptEntity, 'date'>>({
  date,
}: T): string => date;

export const Receipt = new Entity({
  // Specify entity name
  name: 'Receipt',
  // Define attributes
  attributes: {
    [PARTITION_KEY]: {
      partitionKey: true,
      hidden: true,
      default: getReceiptPartitionKey,
    },
    [GSI1_PK]: {
      partitionKey: GSI1,
      hidden: true,
      default: getReceiptGSI1PartitionKey,
    },
    [GSI1_SK]: {
      sortKey: GSI1,
      hidden: true,
      onUpdate: true,
      default: getReceiptGSI1SortKey,
    },
    id: { type: 'string', required: true },
    date: { type: 'string', required: true },
    items: { type: 'list', required: true },
    seller: { type: 'string', required: true },
    status: { type: 'string', required: true },
  },
  // Assign it to our table
  table: ReceiptTable,
  // In Typescript, the "as const" statement is needed for type inference
} as const);
