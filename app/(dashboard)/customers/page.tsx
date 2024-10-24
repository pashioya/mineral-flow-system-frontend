import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WarehouseCustomerTable } from '../wc-table';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchWarehouseCustomers } from 'server/actions';

export default async function CustomersPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['warehouseCustomers'],
    queryFn: async () => {
      return fetchWarehouseCustomers();
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>View all customers and their orders.s </CardDescription>
      </CardHeader>
      <CardContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <WarehouseCustomerTable />
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
