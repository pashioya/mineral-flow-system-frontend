import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PurchaseOrder, WarehouseCustomer } from 'model/types';

const useWarehouseCustomers = () => {
  const url = process.env.NEXT_PUBLIC_WAREHOUSING_SERVER + '/warehouse-customers';
  return useQuery({
    queryKey: ['warehouseCustomers'],
    queryFn: async () => {
      return (await axios.get<WarehouseCustomer[]>(url)).data;
    },
  });
};

export default useWarehouseCustomers;
