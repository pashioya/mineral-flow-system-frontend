'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
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

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all">
        <Table>
          <TableCaption>A list of recent purchase orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Customer UUID</TableHead>
              <TableHead>Purchase Order UUID</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>{order.dateReceived.toISOString()}</TableCell>
                <TableCell>{order.deliveryDate.toISOString()}</TableCell>
                <TableCell>{order.warehouseCustomerUUID}</TableCell>
                <TableCell>{order.purchaseOrderUUID}</TableCell>
                <TableCell>{order.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
