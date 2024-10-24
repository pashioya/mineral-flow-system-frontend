import { Tabs, TabsContent } from '@/components/ui/tabs';
import { File, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { POTable } from './po-table';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchPurchaseOrders } from 'server/actions';

export default async function PurchaseOrdersPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['purchaseOrders'],
    queryFn: async () => {
      return fetchPurchaseOrders();
    },
  });

  // TODO: Implement proper data fetching

  return (
    <Tabs defaultValue="all">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <RefreshCcw className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Refresh</span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card className="p-5">
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
            </CardHeader>
            <POTable />
          </Card>
        </TabsContent>
      </HydrationBoundary>
    </Tabs>
  );
}
