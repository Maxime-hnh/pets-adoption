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
import { Calendar, ChevronDown, PawPrint } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { useState, useMemo } from "react";
import { cn } from "@/_helpers/cn";
import { useAllAnimalsQuery } from "@/_queries/animals/useAnimalsQuery";
import { Skeleton } from "@/_components/ui/skeleton";
import { Group } from "@/_components/ui/group";
import { useUpdateAnimal } from "@/_mutations/animals/useUpdateAnimal";
import { useDeleteAnimal } from "@/_mutations/animals/useDeleteAnimal";
import { ColumnFiltersState, ColumnPinningState, SortingState, VisibilityState } from "@tanstack/react-table";
import { Animal, AnimalStatusConfiglMap, AnimalStatusLabelMap, Gender, GenderConfigMap, PlacementTypeConfiglMap, PlacementTypeLabelMap, Species, SpeciesConfigMap, SpeciesLabelMap } from "@/_schemas/animal.schema";
import { Checkbox } from "@/_components/ui/checkbox";
import { ArrowUpDown, Eye, MoreHorizontal, PenLine, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog";
import SelectCell from "./SelectCell";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDate } from "@/_helpers/utils";

export default function AnimalsTable() {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: [], right: ["actions"] });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading } = useAllAnimalsQuery();
  const pathName = usePathname();

  //hooks
  const updateAnimal = useUpdateAnimal();
  const deleteAnimal = useDeleteAnimal();

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
        const animal = row.original;
        if (animal.photos && animal.photos?.length > 0) {
          return (
            <Image
              alt={`${animal.species}`}
              src={row.original.photos![0]}
              className="max-h-[50px] max-w-[75px] rounded-lg"
              width={75}
              height={50}
              objectFit="cover"
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
      accessorKey: "icadNumber",
      header: "N° Icad",
    },
    {
      accessorKey: "name",
      header: "Nom",
    },
    {
      accessorKey: "species",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Espèce
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const { icon: Icon, color } = SpeciesConfigMap[row.original.species as Species]

        return <div className="flex gap-2 items-center">
          <Icon className={`${color} h-5 w-5`} />
          {SpeciesLabelMap[row.original.species as Species]}
        </div>
      }
    },
    {
      accessorKey: "breed",
      header: "Race",
    },
    {
      accessorKey: "gender",
      header: "Sexe",
      cell: ({ row }) => {
        const { icon: Icon, color } = GenderConfigMap[row.original.gender as Gender];
        return <Icon className={`${color}`} />;
      }
    },
    {
      accessorKey: "birthDate",
      header: "Date de naissance",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatDate(row.original.birthDate!)}
        </div>
      )
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => (
        <SelectCell
          animal={row.original}
          initialValue={row.original.status}
          keyName="status"
          labelMap={AnimalStatusLabelMap}
          configMap={AnimalStatusConfiglMap}
          updateAnimal={updateAnimal}
        />
      ),
    },
    {
      accessorKey: "placementType",
      header: "Type",
      cell: ({ row }) => (
        <SelectCell
          animal={row.original}
          initialValue={row.original.placementType}
          keyName="placementType"
          labelMap={PlacementTypeLabelMap}
          configMap={PlacementTypeConfiglMap}
          updateAnimal={updateAnimal}
        />
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      enablePinning: true,
      cell: ({ row }) => {
        const animal = row.original as Animal;
        const [open, setOpen] = useState(false);

        const handleDelete = (id: number) => {
          return deleteAnimal.mutate(id);
        };

        return (
          <>
            <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmation requise</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`Cette action est irréversible. Elle supprimera définitivement les données de l'animal nommé ${animal.name}.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500" onClick={() => handleDelete(animal.id!)}>
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label="Open menu" variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild className="text-orange-500 cursor-pointer">
                  <Link href={`${pathName}/form/${animal.id}`}>
                    <PenLine className="text-orange-500" />
                    Modifier
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => setOpen(!open)}>
                  <Trash2 className="text-red-500" />
                  Supprimer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={`/admin/animals/${animal.id}`}>
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
  ] as ColumnDef<Partial<Animal>>[], [updateAnimal, deleteAnimal]
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
            <Link href={`${pathName}/form`} className="!text-white">
              <PawPrint />
              Nouveau
            </Link>
          </Button>
          {isLoading ? (
            <Skeleton className="rounded-xl w-[300px] h-[36px]" />
          ) : (
            <Input
              placeholder="Rechercher un nom ..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
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
