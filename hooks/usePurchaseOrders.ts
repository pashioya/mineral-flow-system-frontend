import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PurchaseOrder } from 'model/types';

const usePurchaseOrders = () => {
  const url = process.env.NEXT_PUBLIC_WAREHOUSING_SERVER + '/purchase-orders';
  return useQuery({
    queryKey: ['purchaseOrders'],
    queryFn: async () => {
      return (await axios.get<PurchaseOrder[]>(url)).data;
    },
  });
};

export default usePurchaseOrders;
