import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { usePurchaseOrders } from 'hooks';
import axios from 'axios';
import { PurchaseOrder } from 'model/types';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { POTable } from './po-table';

export default async function PurchaseOrdersPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;

  // const { data, isLoading, isError } = usePurchaseOrders();
  const url = process.env.NEXT_PUBLIC_WAREHOUSING_SERVER + '/purchase-orders';

  const response = await axios.get<PurchaseOrder[]>(url);
  const { purchaseOrders, newOffset, totalPurchaseOrders } = {
    purchaseOrders: response.data,
    newOffset: 0,
    totalPurchaseOrders: 1,
  };

  // TODO: Implement proper data fetching

  return (
    <Tabs defaultValue="all">
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
          <POTable data={response.data} />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
