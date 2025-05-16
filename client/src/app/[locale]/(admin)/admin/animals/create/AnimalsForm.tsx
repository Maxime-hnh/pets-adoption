"use client"

import { useForm } from "react-hook-form";
import { Animal, AnimalSchema, AnimalStatus, AnimalStatusConfiglMap, AnimalStatusLabelMap, Gender, GenderConfigMap, GenderLabelMap, PlacementType, Species, SpeciesConfigMap, SpeciesLabelMap } from "@/_schemas/animal.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form";
import { Paper } from "@/_components/ui/paper";
import { Button } from "@/_components/ui/button";
import { useCreateAnimal } from "@/_mutations/animals/useCreateAnimal";
import { Loader2 } from "lucide-react";
import { Input } from "@/_components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { Group } from "@/_components/ui/group";
import { RadioGroup, RadioGroupItem } from "@/_components/ui/radio-group";
import { Label } from "@/_components/ui/label";
import { cn } from "@/_helpers/cn";

export default function AnimalsForm() {

  const form = useForm<Animal>({
    resolver: zodResolver(AnimalSchema),
    defaultValues: {
      icadNumber: "",
      name: "",
      species: Species.DOG,
      breed: "",
      gender: Gender.MALE,
      // birthDate
      description: "",
      // adoptionDate:
      status: AnimalStatus.AVAILABLE,
      placementType: PlacementType.STANDARD,
      photos: [],
      internalNotes: "",
      isArchived: false,
      isSterilized: false,
      // animalIncompatibilities
    }
  })

  const createAnimal = useCreateAnimal();
  const { isPending } = createAnimal;

  function onSubmit(values: Animal) {
    // createAnimal.mutate(values)
    console.log(values);
  }
  console.log(form.getValues())



  const radioComponent = (name: any, formLabel: string, col: number, labelMap: Record<string, string>, configMap: Record<string, any>) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full mb-4">
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className={`grid grid-cols-${col} gap-4`}
            >
              {Object.entries(labelMap).map(([value, label]) => {
                const config = configMap[value as any];
                const Icon = config.icon;
                const isSelected = field.value === value;

                return (
                  <div key={value} className="relative">
                    <RadioGroupItem
                      value={value}
                      id={value}
                      className="sr-only peer"
                    />
                    <Label
                      htmlFor={value}
                    >
                      <Paper
                        key={value}
                        className={cn("w-full p-0 cursor-pointer", isSelected ? 'border-2 border-primary' : 'border')}
                      >
                        <div className="flex flex-col space-x-2 relative h-[100px] p-2">
                          <div className="flex items-center justify-center flex-col gap-2 h-full">
                            <div className="border p-2 rounded-full bg-(--secondary)">
                              <Icon />
                            </div>
                            <span>{label}</span>
                          </div>
                          <RadioGroupItem
                            className="absolute top-2 right-1"
                            onClick={(e) => e.stopPropagation()}
                            value={value} id={value}
                          />
                        </div>
                      </Paper>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

  )


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-8 pt-4">

          <div className="col-span-8 flex flex-col gap-4">
            <Paper>
              <FormField
                control={form.control}
                name="icadNumber"
                render={({ field }) => (
                  <FormItem className="w-full mb-4">
                    <FormLabel>ICAD</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {radioComponent("species", "Espèce", 3, SpeciesLabelMap, SpeciesConfigMap)}

              {radioComponent("gender", "Sexe", 2, GenderLabelMap, GenderConfigMap)}
              <Group className="mt-4">
                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Race</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} className="flex-1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Group>
            </Paper>
            <Paper>

            </Paper>
          </div>
          <div className="col-span-4">
            <Paper>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full mb-4">
                    <FormLabel>Statut</FormLabel>
                    <FormControl>
                      <Select {...field}>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSterilized"
                render={({ field }) => (
                  <FormItem className="w-full mb-4">
                    <FormLabel>Stérilisé</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(value === 'true')}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"true"} className="w-full">
                            Oui
                          </SelectItem>
                          <SelectItem value={"false"} className="w-full">
                            Non
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Paper>
          </div>
        </div>
        <Button type="submit" className="w-full mt-6" disabled={isPending}>
          {isPending
            ? <Loader2 className="animate-spin" />
            : "Valider"
          }
        </Button>
      </form>
    </Form >
  )
}