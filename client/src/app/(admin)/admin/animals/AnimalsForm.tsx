"use client"

import { useForm } from "react-hook-form";
import {
  Animal,
  AnimalSchema,
  AnimalStatus,
  AnimalStatusConfiglMap,
  AnimalStatusLabelMap,
  Gender,
  GenderConfigMap,
  GenderLabelMap,
  PlacementType,
  PlacementTypeLabelMap,
  PlacementTypeConfiglMap,
  Species,
  SpeciesConfigMap,
  SpeciesLabelMap,
} from "@/_schemas/animal.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/_components/ui/form";
import { Paper } from "@/_components/ui/paper";
import { Button } from "@/_components/ui/button";
import {
  Check,
  Clipboard,
  Loader2,
  PawPrint,
  Upload,
  X
} from "lucide-react";
import { Input } from "@/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/_components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/_components/ui/radio-group";
import { Label } from "@/_components/ui/label";
import { cn } from "@/_helpers/cn";
import { Textarea } from "@/_components/ui/textarea";
import { Checkbox } from "@/_components/ui/checkbox";
import { Switch } from "@/_components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_components/ui/tabs";
import { useState } from "react";
import { DatePicker } from "@/_components/DatePicker";
import { useIncompatibilitiesQuery } from "@/_queries/incompatibilities/useIncompatibilitiesQuery";
import { UseFormReturn } from "react-hook-form";
import { useCreateAnimal } from "@/_mutations/animals/useCreateAnimal";
import { ApiError } from "@/_helpers/handle-response";
import { toast } from "sonner";
import { useAnimalFormStore } from "@/_stores/animalForm.store";
import { useUpdateAnimal } from "@/_mutations/animals/useUpdateAnimal";
import { useUploadManyFiles } from "@/_mutations/upload/useUploadManyFiles";


export default function AnimalsForm() {

  const { close, mode, defaultValues } = useAnimalFormStore();

  const [activeTab, setActiveTab] = useState("general");
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);
  const { data: incompatibilities } = useIncompatibilitiesQuery();
  const uploadManyFiles = useUploadManyFiles();
  const createAnimal = useCreateAnimal();
  const updateAnimal = useUpdateAnimal();
  const { isPending: isUploadPending } = uploadManyFiles;
  const { isPending: isCreatePending } = createAnimal;
  const { isPending: isUpdatePending } = updateAnimal;
  const form = useForm<Animal>({
    resolver: zodResolver(AnimalSchema),
    defaultValues
  });

  const handleUpload = async (files: any[]) => {
    uploadManyFiles.mutate(files)
  }

  function onSubmit(values: Animal): void {
    if (mode === "create") {

      createAnimal.mutate(values, {
        onSuccess: () => {
          close();
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            if (error.message.includes("icadNumber")) {
              form.setError("icadNumber", { message: error.message });
            } else {
              toast.error(error.message || "Une erreur est survenue lors de la création de l'animal")
            }
          }
        },
      })
    }
    else {
      const id = values.id!
      updateAnimal.mutate({
        id, values
      }, {
        onSuccess: () => {
          close();
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            if (error.message.includes("icadNumber")) {
              form.setError("icadNumber", { message: error.message });
            } else {
              toast.error(error.message || "Une erreur est survenue lors de la mise à jour de l'animal")
            }
          }
        },
      })
    }
  }

  // Fonction pour gérer les composants radio
  const radioComponent = (
    name: any,
    formLabel: string,
    col: number,
    labelMap: Record<string, string>,
    configMap: Record<string, any>) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col mb-4">
          <FormLabel className="text-base font-medium">{formLabel}</FormLabel>
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
                        className={cn("w-full p-0 cursor-pointer", isSelected ? 'border-2 border-primary bg-[#644a4017]' : 'border')}
                      >
                        <div className="flex flex-col space-x-2 relative p-2">
                          <div className="flex items-center justify-center flex-col gap-2 h-full">
                            <div className="border p-2 rounded-full bg-(--secondary)">
                              <Icon />
                            </div>
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

  // Fonction pour le champ date
  const datePickerComponent = (name: any, label: string, description?: string) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-0 mt-4">
          <FormLabel className="text-base font-medium">{label}</FormLabel>
          {description && <FormDescription className="text-xs font-light mb-2">{description}</FormDescription>}
          <DatePicker
            date={field.value}
            handleBirthDate={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // Fonction pour simuler l'upload de photos
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPhotoPreview([...photoPreview, ...newPhotos]);

      // Dans un cas réel, vous téléchargeriez les fichiers et obtiendriez des URLs
      const currentPhotos = form.getValues("photos") || [];
      form.setValue("photos", [...currentPhotos, ...newPhotos]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="general" className="text-base">
              Informations générales
            </TabsTrigger>
            <TabsTrigger value="details" className="text-base">
              Détails & Statut
            </TabsTrigger>
            <TabsTrigger value="photos" className="text-base">
              Photos & Notes
            </TabsTrigger>
          </TabsList>

          {/* Onglet Informations générales */}
          <TabsContent value="general" className="">
            <div className="pb-4 pt-2">
              <div className="flex items-center gap-2 mb-4">
                <PawPrint className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Identité de l'animal</h2>
              </div>
              <FormField
                control={form.control}
                name="icadNumber"
                render={({ field }) => (
                  <FormItem className="w-full mb-4 gap-0">
                    <FormLabel className="text-base font-medium">Numéro ICAD</FormLabel>
                    <FormDescription className="text-xs font-light mb-2">
                      Numéro d'identification unique de l'animal (optionnel)
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="250268xxxxxxxxx"
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {radioComponent("species", "Espèce", 3, SpeciesLabelMap, SpeciesConfigMap)}

              {radioComponent("gender", "Sexe", 2, GenderLabelMap, GenderConfigMap)}

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base font-medium">Nom</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Nom de l'animal"
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base font-medium">Race</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Race ou type"
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {datePickerComponent("birthDate", "Date de naissance", "Date de naissance approximative si inconnue")}
            </div>
          </TabsContent>

          {/* Onglet Détails & Statut */}
          <TabsContent value="details" className="space-y-6">
            <div className="pt-2 pb-4 min-h-full 2xl:min-h-[577px]">
              <div className="flex items-center gap-2 mb-4">
                <Clipboard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Statut & Caractéristiques</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base font-medium">Statut</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(AnimalStatusLabelMap).map(([value, label]) => {
                              const config = AnimalStatusConfiglMap[value as AnimalStatus];
                              return (
                                <SelectItem value={value} key={value} className="w-full">
                                  <span className={config.color}>
                                    {label}
                                  </span>
                                </SelectItem>
                              );
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
                  name="placementType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-base font-medium">Type de placement</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(PlacementTypeLabelMap).map(([value, label]) => {
                              const config = PlacementTypeConfiglMap[value as PlacementType];
                              return (
                                <SelectItem value={value} key={value} className="w-full">
                                  <span className={config.color}>
                                    {label}
                                  </span>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col space-y-4 mb-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="gap-0">
                      <FormLabel className="text-base font-medium">Description</FormLabel>
                      <FormDescription className="text-xs font-light mb-2">
                        Description détaillée de l'animal (comportement, caractère, etc.)
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez l'animal..."
                          className="min-h-[120px] bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isSterilized"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Stérilisé</FormLabel>
                        <FormDescription>
                          L'animal est-il stérilisé ?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isArchived"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Archivé</FormLabel>
                        <FormDescription>
                          Archiver cette fiche animal
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {form.watch("status") === AnimalStatus.ADOPTED &&
                datePickerComponent("adoptionDate", "Date d'adoption", "Date à laquelle l'animal a été adopté")}
            </div>
          </TabsContent>

          {/* Onglet Photos & Notes */}
          <TabsContent value="photos" className="space-y-6">

            <div className="pt-2 pb-4 min-h-full 2xl:min-h-[577px]">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Photos & Notes internes</h2>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center bg-background">
                <Input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={e => handleUpload(e.target.files as any)}
                />

                <Label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2 w-full">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="text-lg font-medium">Déposer des photos ou cliquer pour parcourir</p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG ou GIF • Max 5 MB par image
                    </p>
                  </div>
                </Label>
              </div>

              {photoPreview.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-base font-medium mb-2">Photos téléchargées</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {photoPreview.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            const newPhotos = [...photoPreview];
                            newPhotos.splice(index, 1);
                            setPhotoPreview(newPhotos);
                            form.setValue("photos", newPhotos);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="internalNotes"
                render={({ field }) => (
                  <FormItem className="mt-6 gap-0">
                    <FormLabel className="text-base font-medium">Notes internes</FormLabel>
                    <FormDescription className="text-xs font-light mb-2">
                      Notes visibles uniquement par les administrateurs
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Notes internes..."
                        className="min-h-[120px] bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="incompatibilityIds"
                render={({ field }) => (
                  <FormItem className="mt-6 gap-0">
                    <div className="mb-4">
                      <FormLabel className="text-base font-medium">Incompatibilités</FormLabel>
                      <FormDescription className="text-xs font-light mb-2">
                        Sélectionnez les types d'incompatibilités pour cet animal
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {incompatibilities?.map((item) => (
                        <div className="flex items-center space-x-2" key={item.id}>
                          <Checkbox
                            id={item.id.toString()}
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value || [], item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id))
                            }}
                          />
                          <label
                            htmlFor={item.id.toString()}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Annuler
          </Button>

          <Button type="submit" className="min-w-[135px]" disabled={isCreatePending || isUpdatePending}>
            {isCreatePending || isUpdatePending ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Enregistrer
              </>
            )}
          </Button>
        </div>
      </form >
    </Form >
  );
}