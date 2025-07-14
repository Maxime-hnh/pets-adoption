"use client";

import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/_components/ui/table";
import { Input } from "@/_components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";
import { Calendar, CalendarPlus, ChevronDown } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { useState, useMemo } from "react";
import { cn } from "@/_lib/cn";
import { Skeleton } from "@/_components/ui/skeleton";
import { Group } from "@/_components/ui/group";

import { ColumnFiltersState, ColumnPinningState, SortingState, VisibilityState } from "@tanstack/react-table";
import { Checkbox } from "@/_components/ui/checkbox";
import { ArrowUpDown, Eye, MoreHorizontal, PenLine, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDate } from "@/_lib/utils";
import { useRouter } from "next/navigation";
import { useDeleteEvent } from "@/_hooks/events/useDeleteEvent";
import { EventEntity, EventType, EventTypeConfigMap, EventTypeLabelMap } from "@/_schemas/events.schema";
import { useAllEventsQuery } from "@/_hooks/events/useEventsQuery";

export default function AnimalsTable() {

  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: [], right: ["actions"] });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useAllEventsQuery();
  const pathName = usePathname();

  //hooks
  const deleteEvent = useDeleteEvent();

  //columns
  const columns = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "photos",
      header: "",
      cell: ({ row }) => {
        const event = row.original;
        if (event.photos && event.photos?.length > 0) {
          return (
            <Image
              alt={`Image de l'événement ${event.title}`}
              src={row.original.photos![0]}
              className="max-h-[50px] max-w-[75px] rounded-lg object-cover"
              width={75}
              height={50}
            />
          );
        } else {
          return (
            <div className="h-[50px] w-[75px] rounded-lg bg-accent flex items-center justify-center text-gray-500 font-medium text-xs">
              Image
            </div>
          );
        }
      },
    },
    {
      accessorKey: "title",
      header: "Titre",
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const { icon: Icon, color } = EventTypeConfigMap[row.original.type as EventType]

        return <div className={`flex gap-2 items-center ${color}`}>
          <Icon className={`${color} h-5 w-5`} />
          {EventTypeLabelMap[row.original.type as EventType]}
        </div>
      }
    },
    {
      accessorKey: "startDate",
      header: "Date de début",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatDate(row.original.startDate!)}
        </div>
      )
    },
    {
      accessorKey: "endDate",
      header: "Date de fin",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatDate(row.original.endDate!)}
        </div>
      )
    },
    {
      accessorKey: "city",
      header: "Ville",
    },
    {
      accessorKey: "price",
      header: "Prix",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.price && row.original.price > 0 ? `${row.original.price} €` : "Gratuit"}
        </div>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      enablePinning: true,
      cell: ({ row }) => {
        const event = row.original as EventEntity;
        const [open, setOpen] = useState(false);

        const handleDelete = (id: number) => {
          return deleteEvent.mutate(id);
        };

        return (
          <>
            <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation requise</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`Cette action est irréversible. Elle supprimera définitivement les données de l'événement ${event.title}.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500" onClick={() => handleDelete(event.id!)}>
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  onMouseEnter={() => router.prefetch(`/admin/events/form/${event.id}`)}
                  aria-label="Open menu"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild className="text-orange-500 cursor-pointer">
                  <Link href={`${pathName}/form/${event.id}`}>
                    <PenLine className="text-orange-500" />
                    Modifier
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => setOpen(!open)}>
                  <Trash2 className="text-red-500" />
                  Supprimer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={`/admin/events/${event.id}`}>
                  <DropdownMenuItem className="text-indigo-500 cursor-pointer">
                    <Eye className="text-indigo-500" />
                    Afficher
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ] as ColumnDef<Partial<EventEntity>>[], [deleteEvent]
  );

  const table = useReactTable({
    data: data ?? [],
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


  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Group>
          <Button asChild className="mr-4">
            <Link prefetch href={`${pathName}/form`} className="!text-white">
              <CalendarPlus />
              Nouveau
            </Link>
          </Button>
          {isLoading ? (
            <Skeleton className="rounded-xl w-[300px] h-[36px]" />
          ) : (
            <Input
              placeholder="Rechercher un évènement..."
              value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="w-xs max-w-sm"
            />
          )}
        </Group>
        {isLoading ? (
          <Skeleton className="rounded-xl w-[115px] h-[36px]" />
        ) : (
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
                .map((column) => (
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
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {isLoading ? (
        <div className="w-full">
          <Skeleton className="rounded-xl w-full h-[500px]" />
        </div>
      ) : (
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
                          pinningSide === "left" && "sticky left-0 z-10 bg-white sticky-left-shadow",
                          pinningSide === "right" && "sticky right-0 z-10 bg-white sticky-right-shadow"
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
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => {
                      const pinningSide = cell.column.getIsPinned();
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            pinningSide === "left" && "sticky left-0 z-10 bg-white sticky-left-shadow",
                            pinningSide === "right" && "sticky right-0 z-10 bg-white sticky-right-shadow"
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {isLoading ? (
        <Group justify="between" className="py-4">
          <Skeleton className="rounded-xl w-[300px] h-[36px]" />
          <Group align="center">
            <Skeleton className="rounded-xl w-[80px] h-[36px]" />
            <Skeleton className="rounded-xl w-[80px] h-[36px]" />
          </Group>
        </Group>
      ) : (
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
      )}
    </div>
  );
}
