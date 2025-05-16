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

              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem className="w-full mb-4">
                    <FormLabel className="text-lg font-medium mb-2">Espèce</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        value={field.value} 
                        onValueChange={field.onChange} 
                        className="grid grid-cols-3 gap-4"
                      >
                        {Object.entries(SpeciesLabelMap).map(([value, label]) => {
                          const config = SpeciesConfigMap[value as Species];
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
                                className={cn(
                                  "flex flex-col items-center justify-center h-[120px] w-full rounded-lg border-2 cursor-pointer",
                                  "transition-all duration-200 ease-in-out",
                                  "hover:border-primary/70 hover:bg-primary/5",
                                  "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
                                  isSelected 
                                    ? "border-primary bg-primary/10 shadow-sm" 
                                    : "border-muted bg-background"
                                )}
                              >
                                <div className={cn(
                                  "p-3 rounded-full mb-2",
                                  "transition-all duration-200",
                                  isSelected ? "bg-primary/20" : "bg-muted"
                                )}>
                                  <Icon className={cn(
                                    "h-8 w-8",
                                    isSelected ? "text-primary" : "text-muted-foreground"
                                  )} />
                                </div>
                                <span className={cn(
                                  "font-medium text-lg",
                                  isSelected ? "text-primary" : "text-foreground"
                                )}>
                                  {label}
                                </span>
                                {isSelected && (
                                  <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-primary animate-pulse" />
                                )}
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


              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full mt-4">
                    <FormLabel>Sexe</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-row">
                        {Object.entries(GenderLabelMap).map(([value, label]) => {
                          const config = GenderConfigMap[value as Gender]
                          const Icon = config.icon
                          const isSelected = field.value === value;
                          const radio = document.getElementById(value) as HTMLInputElement;

                          return (
                            <Paper
                              key={value}
                              className={cn("w-full p-0 cursor-pointer", isSelected ? 'border-2 border-primary' : 'border')}
                              onClick={() => radio.click()}
                            >
                              <div className="flex flex-col space-x-2 relative h-[90px] p-2">
                                <div className="flex justify-between">
                                  <div className="border p-2 rounded-xl bg-(--secondary)">
                                    <Icon />
                                  </div>
                                  <RadioGroupItem
                                    onClick={(e) => e.stopPropagation()}
                                    value={value} id={value}
                                  />

                                </div>
                                <Label className="m-auto">{label}</Label>
                              </div>
                            </Paper>
                          )
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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