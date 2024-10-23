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

export default async function PurchaseOrdersPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { purchaseOrders, newOffset, totalPurchaseOrders } = {
    purchaseOrders: [
      {
        date_received: '2024-10-23 19:20:00.403060',
        delivery_date: '2025-01-01 00:00:00.000000',
        customeruuid: 'f845992d-0f9a-47f7-ab46-4d2cb8effefd',
        purchase_orderuuid: '9cbb2a04-5bfe-480c-97ec-7650467b7711',
        address: 'Pashioyastraat 1, 2018 Antwerpen, Belgium',
        order_number: 'PO-2021-0001',
        order_status: 'CREATED',
      },
    ],
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
                <TableCell>{order.order_number}</TableCell>
                <TableCell>{order.order_status}</TableCell>
                <TableCell>{order.date_received}</TableCell>
                <TableCell>{order.delivery_date}</TableCell>
                <TableCell>{order.customeruuid}</TableCell>
                <TableCell>{order.purchase_orderuuid}</TableCell>
                <TableCell>{order.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
