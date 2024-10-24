import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PurchaseOrder } from 'model/types';

const usePurchaseOrders = () => {
  const url = process.env.NEXT_PUBLIC_WAREHOUSING_SERVER + '/purchase-orders';
  return useQuery({
    queryKey: ['purchaseOrders'],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });
};

export default usePurchaseOrders;
