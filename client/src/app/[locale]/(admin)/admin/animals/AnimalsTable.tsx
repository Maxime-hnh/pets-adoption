"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table"
import { Input } from "@/_components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu"
import { ChevronDown, PawPrint, Plus } from "lucide-react"
import { Button } from "@/_components/ui/button"
import { useState } from "react"
import { cn } from "@/_helpers/cn"
import Link from "next/link"
import { useAllAnimalsQuery } from "@/_queries/animals/useAnimalsQuery"
import { Skeleton } from "@/_components/ui/skeleton"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
}

export function AnimalsTable<TData, TValue>({ columns }: DataTableProps<TData, TValue>) {


  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: [], right: ["actions"] })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading }: { data: any, isLoading: boolean } = useAllAnimalsQuery();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnPinning,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });


  if (isLoading) return <div className="w-full p-4">
    <Skeleton className="rounded-xl w-full h-[500px]" />
  </div>

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Link href={"/admin/animals/create"}>
          <Button className="mr-4"><PawPrint /> Nouveau</Button>
        </Link>
        <Input
          placeholder="Rechercher un nom ..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const pinningSide = header.column.getIsPinned();

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        pinningSide === 'left' && 'sticky left-0 z-10 bg-white sticky-left-shadow',
                        pinningSide === 'right' && 'sticky right-0 z-10 bg-white sticky-right-shadow'
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const pinningSide = cell.column.getIsPinned();

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          pinningSide === 'left' && 'sticky left-0 z-10 bg-white sticky-left-shadow',
                          pinningSide === 'right' && 'sticky right-0 z-10 bg-white sticky-right-shadow'
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} /{" "}
          {table.getFilteredRowModel().rows.length} lignes sélectionnées
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}
