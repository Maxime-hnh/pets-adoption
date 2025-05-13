"use client"
import { Animal, AnimalStatus, AnimalStatusConfiglMap, AnimalStatusLabelMap, Gender, GenderConfigMap, GenderLabelMap, PlacementType, PlacementTypeConfiglMap, PlacementTypeLabelMap, Species, SpeciesConfigMap, SpeciesLabelMap } from "@/_schemas/animal.schema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { ColumnDef } from "@tanstack/react-table"
import { useUpdateAnimal } from "@/_mutations/animals/useUpdateAnimal"
import { DatePicker } from "@/_components/DatePicker";
import { useState } from "react";
import { Checkbox } from "@/_components/ui/checkbox";
import { Button } from "@/_components/ui/button"
import { ArrowUpDown, Eye, MoreHorizontal, PenLine, Plus, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu"
import { useDeleteAnimal } from "@/_mutations/animals/useDeleteAnimal"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/_components/ui/alert-dialog"

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
    cell: ({ row }) => {

      const updateAnimalMutation = useUpdateAnimal();
      const animal = row.original;

      const handleChangeSpecies = (species: Species) => {
        updateAnimalMutation.mutate({
          id: animal.id!,
          values: { species },
        });
      };

      return (
        <Select value={animal.species} onValueChange={handleChangeSpecies}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SpeciesLabelMap).map(([value, label]) => {
              const config = SpeciesConfigMap[value as Species];
              const Icon = config.icon;

              return (
                <SelectItem value={value} key={value} className="w-full flex items-center">
                  <Icon className={`mr-4 ${config.color}`} />
                  <span className={config.color}>
                    {label}
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select >
      )
    }
  },
  {
    accessorKey: "breed",
    header: "Race"
  },
  {
    accessorKey: "gender",
    header: "Sexe",
    cell: ({ row }) => {
      const updateAnimalMutation = useUpdateAnimal();
      const animal = row.original;

      const handleChangeSpecies = (gender: Gender) => {
        updateAnimalMutation.mutate({
          id: animal.id!,
          values: { gender },
        });
      };

      return (
        <Select value={animal.gender} onValueChange={handleChangeSpecies}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(GenderLabelMap).map(([value, label]) => {
              const config = GenderConfigMap[value as Gender]
              const Icon = config.icon
              return (
                <SelectItem value={value} key={value} className="w-full flex items-center">
                  <Icon className={`mr-2 ${config.color}`} />
                  <span className={config.color}>
                    {label}
                  </span>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      )
    }
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
    cell: ({ row }) => {
      const animal = row.original;
      const updateAnimalMutation = useUpdateAnimal();

      const handleChangeSpecies = (status: AnimalStatus) => {
        updateAnimalMutation.mutate({
          id: animal.id!,
          values: { status },
        });
      };

      return (
        <Select value={animal.status} onValueChange={handleChangeSpecies}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(AnimalStatusLabelMap).map(([value, label]) => {
              const config = AnimalStatusConfiglMap[value as AnimalStatus]
              return (
                <SelectItem value={value} key={value} className="w-full flex items-center">
                  <span className={config.color}>
                    {label}
                  </span>
                </SelectItem>
              )
            })}

          </SelectContent>
        </Select>
      )
    }
  },
  {
    accessorKey: "placementType",
    header: "Type",
    cell: ({ row }) => {
      const animal = row.original;
      const updateAnimalMutation = useUpdateAnimal();

      const handleChangeSpecies = (placementType: PlacementType) => {
        updateAnimalMutation.mutate({
          id: animal.id!,
          values: { placementType },
        });
      };

      return (
        <Select value={animal.placementType} onValueChange={handleChangeSpecies}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PlacementTypeLabelMap).map(([value, label]) => {
              const config = PlacementTypeConfiglMap[value as PlacementType]
              return (
                <SelectItem value={value} key={value} className="w-full flex items-center">
                  <span className={`${config.color}`}>
                    {label}
                  </span>
                </SelectItem>
              )
            })}

          </SelectContent>
        </Select>
      )
    }
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