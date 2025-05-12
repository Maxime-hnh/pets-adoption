"use client"
import { Animal, Species, SpeciesConfigMap, SpeciesLabelMap } from "@/_schemas/animal.schema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useUpdateAnimal } from "@/_mutations/animals/useUpdateAnimal"
import { DatePicker } from "@/_components/DatePicker";
import { useState } from "react";

export const columns: ColumnDef<Partial<Animal>>[] = [
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
    header: "Espèce",
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
    header: "Sexe"
  },
  {
    accessorKey: "birthDate",
    header: "Date de naissance",
    cell: ({ row }) => {
      const updateAnimalMutation = useUpdateAnimal();
      const animal = row.original;
      const [date, setDate] = useState<Date | undefined>(animal.birthDate);
      const [open, setOpen] = useState<boolean>(false);

      const handleBirthDate = (birthDate: Date) => {
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
    header: "Statut"
  },
  {
    accessorKey: "placementType",
    header: "Type"
  },
  {
    accessorKey: "internalNotes",
    header: "Note"
  },
]