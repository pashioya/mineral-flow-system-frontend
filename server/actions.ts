'use server';

import axios from 'axios';
import { PurchaseOrder } from 'model/types';

export async function fetchPurchaseOrders() {
  return axios
    .get<PurchaseOrder[]>(process.env.NEXT_PUBLIC_WAREHOUSING_SERVER + '/purchase-orders')
    .then(res => res.data);
}

export async function fetchWarehouseCustomers() {
  return axios
    .get(process.env.NEXT_PUBLIC_WAREHOUSING_SERVER + '/warehouse-customers')
    .then(res => res.data);
}
