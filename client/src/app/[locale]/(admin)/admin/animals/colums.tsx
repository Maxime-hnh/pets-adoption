"use client"
import { Animal, AnimalStatusConfiglMap, AnimalStatusLabelMap, GenderConfigMap, GenderLabelMap, PlacementTypeConfiglMap, PlacementTypeLabelMap, SpeciesConfigMap, SpeciesLabelMap } from "@/_schemas/animal.schema"
import { ColumnDef } from "@tanstack/react-table"
import { useUpdateAnimal } from "@/_mutations/animals/useUpdateAnimal"
import { DatePicker } from "@/_components/DatePicker";
import { Suspense, useState } from "react";
import { Checkbox } from "@/_components/ui/checkbox";
import { Button } from "@/_components/ui/button"
import { ArrowUpDown, Eye, MoreHorizontal, PenLine, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu"
import { useDeleteAnimal } from "@/_mutations/animals/useDeleteAnimal"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"
import SelectCell from "./SelectCell"
import { Skeleton } from "@/_components/ui/skeleton";

export const columns: ColumnDef<Partial<Animal>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "icadNumber",
    header: "N° Icad"
  },
  {
    accessorKey: "name",
    header: "Nom"
  },
  {
    accessorKey: "species",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Espèce
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Suspense fallback={<Skeleton className="h-8 w-full" />}>
        <SelectCell
          animal={row.original}
          initialValue={row.original.species}
          keyName="species"
          labelMap={SpeciesLabelMap}
          configMap={SpeciesConfigMap}
        />
      </Suspense>
    )
  },
  {
    accessorKey: "breed",
    header: "Race"
  },
  {
    accessorKey: "gender",
    header: "Sexe",
    cell: ({ row }) => (
      <Suspense fallback={<Skeleton className="h-8 w-full" />}>
        <SelectCell
          animal={row.original}
          initialValue={row.original.gender}
          keyName="gender"
          labelMap={GenderLabelMap}
          configMap={GenderConfigMap}
        />
      </Suspense>
    )
  },
  {
    accessorKey: "birthDate",
    header: "Date de naissance",
    cell: ({ row }) => {
      const updateAnimalMutation = useUpdateAnimal();
      const animal = row.original;
      const [date, setDate] = useState<Date | undefined>(animal.birthDate);
      const [open, setOpen] = useState<boolean>(false);

      const handleBirthDate = (birthDate: Date | undefined) => {
        setDate(birthDate);
        updateAnimalMutation.mutate({
          id: animal.id!,
          values: { birthDate },
        });
        setOpen(false);
      };
      return (
        <DatePicker date={date} handleBirthDate={handleBirthDate} open={open} setOpen={setOpen} />
      )
    }
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <Suspense fallback={<Skeleton className="h-8 w-full" />}>
        <SelectCell
          animal={row.original}
          initialValue={row.original.status}
          keyName="status"
          labelMap={AnimalStatusLabelMap}
          configMap={AnimalStatusConfiglMap}
        />
      </Suspense>
    )
  },
  {
    accessorKey: "placementType",
    header: "Type",
    cell: ({ row }) => (
      < Suspense fallback={<Skeleton className="h-8 w-full" />}>
        <SelectCell
          animal={row.original}
          initialValue={row.original.placementType}
          keyName="placementType"
          labelMap={PlacementTypeLabelMap}
          configMap={PlacementTypeConfiglMap}
        />
      </Suspense>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    enablePinning: true,
    cell: ({ row }) => {
      const animal = row.original
      const deleteAnimal = useDeleteAnimal();
      const [open, setOpen] = useState<boolean>(false);
      const handleDelete = (id: number) => {
        return deleteAnimal.mutate(id)
      }

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
              <DropdownMenuItem
                // onClick={() => navigator.clipboard.writeText(payment.id)}
                className="text-orange-500"
              >
                <PenLine className="text-orange-500" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={() => setOpen(!open)}>
                <Trash2 className="text-red-500" />
                Supprimer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-indigo-500">
                <Eye className="text-indigo-500" />
                Afficher
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]