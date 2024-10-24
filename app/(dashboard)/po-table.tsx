'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { ChevronDown, DotSquare, SortDescIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { PurchaseOrder } from 'model/types';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

export const columns: ColumnDef<PurchaseOrder>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={value => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'orderNumber',
    header: 'Order Number',
    cell: ({ row }) => (
      <ContextMenu>
        <ContextMenuTrigger>{row.getValue('orderNumber')}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>Copy Order Number</ContextMenuItem>
          <ContextMenuItem inset>Select</ContextMenuItem>
          <ContextMenuItem inset>View Purchase Order</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    accessorKey: 'orderStatus',
    header: 'Order Status',
    cell: ({ row }) => (
      <ContextMenu>
        <ContextMenuTrigger>{row.getValue('orderStatus')}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>Copy Order Status</ContextMenuItem>
          <ContextMenuItem inset>Select</ContextMenuItem>
          <ContextMenuItem inset>View Purchase Order</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    accessorKey: 'dateReceived',
    header: 'Date Received',
    cell: ({ row }) => (
      <ContextMenu>
        <ContextMenuTrigger>
          {new Date(row.getValue('dateReceived')).toISOString()}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>Copy Date Received</ContextMenuItem>
          <ContextMenuItem inset>Select</ContextMenuItem>
          <ContextMenuItem inset>View Purchase Order</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    accessorKey: 'deliveryDate',
    header: 'Delivery Date',
    cell: ({ row }) => (
      <ContextMenu>
        <ContextMenuTrigger>
          {new Date(row.getValue('deliveryDate')).toISOString()}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>Copy Delivery Date</ContextMenuItem>
          <ContextMenuItem inset>Select</ContextMenuItem>
          <ContextMenuItem inset>View Purchase Order</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    accessorKey: 'warehouseCustomerUUID',
    header: 'Customer UUID',
    cell: ({ row }) => (
      <ContextMenu>
        <ContextMenuTrigger>{row.getValue('warehouseCustomerUUID')}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>Copy Customer UUID</ContextMenuItem>
          <ContextMenuItem inset>Select</ContextMenuItem>
          <ContextMenuItem inset>View Purchase Order</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    accessorKey: 'purchaseOrderUUID',
    header: 'Purchase Order UUID',
    cell: ({ row }) => (
      <ContextMenu>
        <ContextMenuTrigger>{row.getValue('purchaseOrderUUID')}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>Copy Purchase Order UUID</ContextMenuItem>
          <ContextMenuItem inset>Select</ContextMenuItem>
          <ContextMenuItem inset>View Purchase Order</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => (
      <ContextMenu>
        <ContextMenuTrigger>{row.getValue('address')}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>Copy Address</ContextMenuItem>
          <ContextMenuItem inset>Select</ContextMenuItem>
          <ContextMenuItem inset>View Purchase Order</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.getValue('orderNumber'))}
            >
              Copy Order Number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Customer</DropdownMenuItem>
            <DropdownMenuItem>View Purchase Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function POTable({ data }: { data: PurchaseOrder[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by Order Number..."
          value={(table.getColumn('orderNumber')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('orderNumber')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <div>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div>
            {'Total Purchase Orders: '}
            {table.getFilteredRowModel().rows.length}
          </div>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
