'use server';

import axios from 'axios';
import { PurchaseOrder } from 'model/types';

export async function fetchPurchaseOrders() {
  return axios
    .get<PurchaseOrder[]>(process.env.NEXT_PUBLIC_WAREHOUSING_SERVER + '/purchase-orders')
    .then(res => res.data);
}
