import { UUID } from 'crypto';

export type PurchaseOrder = {
  purchaseOrderUUID: UUID;
  warehouseCustomerUUID: UUID;
  orderNumber: string;
  deliveryDate: Date;
  dateReceived: Date;
  address: string;
  orderStatus: OrderStatus;
  orderItems: OrderItem[];
};

export type OrderItem = {
  materialUUID: UUID;
  quantity: number;
  price: number;
};

export enum OrderStatus {
  CREATED,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
}
