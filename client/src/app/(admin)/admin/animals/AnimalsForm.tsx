"use client"

import { useForm } from "react-hook-form";
import {
  Animal,
  AnimalSchema,
  AnimalStatus,
  AnimalStatusConfiglMap,
  AnimalStatusLabelMap,
  PlacementType,
  PlacementTypeLabelMap,
  PlacementTypeConfigMap,
  Species,
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
import { Button } from "@/_components/ui/button";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  Loader2,
  PlusCircle,
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
import { Label } from "@/_components/ui/label";
import { Textarea } from "@/_components/ui/textarea";
import { Checkbox } from "@/_components/ui/checkbox";
import { Switch } from "@/_components/ui/switch";
import { useState } from "react";
import { DatePicker } from "@/_components/DatePicker";
import { useIncompatibilitiesQuery } from "@/_hooks/incompatibilities/useIncompatibilitiesQuery";
import { useCreateAnimal } from "@/_hooks/animals/useCreateAnimal";
import { ApiError } from "@/_lib/handle-response";
import { toast } from "sonner";
import { useFullUpdateAnimal } from "@/_hooks/animals/useFullUpdateAnimal";
import { useUploadManyFiles } from "@/_hooks/upload/useUploadManyFiles";
import Image from "next/image";
import { useDeleteFile } from "@/_hooks/upload/useDeleteFile";
import { Card, CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";
import { SegmentedControl } from "@/_components/ui/segmented-control";
import { scrollToId } from "@/_lib/utils";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/_components/ui/dialog";
import Link from "next/link";

interface AnimalsFomProps {
  mode: string;
  values: Animal
}

export default function AnimalsForm({ mode = "create", values }: AnimalsFomProps) {

  const [photos, setPhotos] = useState<string[]>(values.photos ?? []);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const router = useRouter();
  const { data: incompatibilities } = useIncompatibilitiesQuery();
  const uploadManyFiles = useUploadManyFiles("images/animals");
  const createAnimal = useCreateAnimal();
  const updateAnimal = useFullUpdateAnimal();
  const deleteFile = useDeleteFile();
  const { isPending: isUploadPending } = uploadManyFiles;
  const { isPending: isCreatePending } = createAnimal;
  const { isPending: isUpdatePending } = updateAnimal;

  const form = useForm<Animal>({
    resolver: zodResolver(AnimalSchema),
    defaultValues: values
  });

  const handleUpload = async (files: any[]) => {
    const newUrls = await uploadManyFiles.mutateAsync(files)
    const currentUrls = form.getValues("photos") || [];
    const updatedUrls = [...currentUrls, ...newUrls];
    form.setValue("photos", updatedUrls)
    setPhotos(updatedUrls);
  }

  const handleDeleteFile = async (file: string) => {
    deleteFile.mutate(file)
    const updatedPhotos = photos.filter((photo) => photo !== file)
    setPhotos(updatedPhotos)
    form.setValue("photos", updatedPhotos)
  }

  function onSubmit(values: Animal): void {
    if (mode === "create") {

      createAnimal.mutate(values, {
        onSuccess: () => {
          setOpenSuccessModal(true);
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
      const { incompatibilityLabels, ...filteredValues } = values
      updateAnimal.mutate({ id, values: filteredValues }, {
        onSuccess: () => {
          router.back();
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

  function resetForm() {
    form.reset();
    setPhotos([]);
    setOpenSuccessModal(false);
  }

  // Fonction pour le champ date
  const datePickerComponent = (name: any, label: string, description?: string) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-0">
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-11/12 2xl:w-10/12">
        <div className="flex flex-row justify-between">

          <div className="flex flex-col">
            <h2 className="text-4xl">{mode === "create" ? "Ajouter un animal" : "Modifier un animal"}</h2>
            <p className="text-muted-foreground">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate, a!</p>
          </div>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              className="!bg-white"
              size={"lg"}
              onClick={() => window.history.back()}
            >
              Annuler
            </Button>

            <Button
              type="submit"
              className="ml-4 min-w-[135px]"
              size={"lg"}
              disabled={isCreatePending || isUpdatePending}
            >
              {isCreatePending || isUpdatePending ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {mode === "create" ? "Enregistrer" : "Modifier"}
                </>
              )}
            </Button>
          </div>
        </div>
        <Separator id="info" />
        <div className="flex flex-col gap-8">
          {/* Onglet Informations générales */}
          <Card >
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-inter font-semibold text-foreground">Informations générales</CardTitle>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <ChevronUp className="text-gray-300" />
                  <ChevronDown className="text-muted-foreground cursor-pointer" onClick={() => scrollToId("status")} />
                </div>
                <p className="text-muted-foreground">1/3</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="icadNumber"
                  render={({ field }) => (
                    <FormItem className="w-full gap-0">
                      <FormLabel className="text-base font-medium">Numéro ICAD</FormLabel>
                      <FormDescription className="text-xs font-light mb-1">
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
                <FormField
                  control={form.control}
                  name="species"
                  render={({ field }) => (
                    <FormItem className="gap-1">
                      <FormLabel className="text-base font-medium">Espèce</FormLabel>
                      <FormControl>
                        <SegmentedControl
                          value={field.value}
                          onChange={field.onChange}
                          options={[
                            { label: 'Chien', value: Species.DOG },
                            { label: 'Chat', value: Species.CAT },
                            { label: 'NAC', value: Species.OTHER },
                          ]}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem className="w-full gap-1">
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full gap-1">
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
                </div>
                {datePickerComponent("birthDate", "Date de naissance", "Date de naissance approximative si inconnue")}

              </div>

            </CardContent>
          </Card>

          <Separator id="status" />
          {/* Onglet Statut & Caractéristiques  */}
          <Card >
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-inter font-semibold text-foreground">Statut & Caractéristiques</CardTitle>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <ChevronUp className="text-muted-foreground cursor-pointer" onClick={() => scrollToId("info")} />
                  <ChevronDown className="text-muted-foreground cursor-pointer" onClick={() => scrollToId("photos")} />
                </div>
                <p className="text-muted-foreground">2/3</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="w-full gap-1">
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
                      <FormItem className="w-full gap-1">
                        <FormLabel className="text-base font-medium">Type de placement</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full bg-background">
                              <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(PlacementTypeLabelMap).map(([value, label]) => {
                                const config = PlacementTypeConfigMap[value as PlacementType];
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="gap-0">
                      <FormLabel className="text-base font-medium">Description</FormLabel>
                      <FormDescription className="text-xs font-light mb-1">
                        Description détaillée de l'animal (comportement, caractère, etc.)
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez l'animal..."
                          className="min-h-[120px] bg-background"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            Archiver cette fiche animal ?
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
            </CardContent>
          </Card>

          <Separator />


          {/* Onglet Photos & Note */}
          <Card id="photos">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-inter font-semibold text-foreground">Photos & Note interne</CardTitle>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <ChevronUp className="text-muted-foreground cursor-pointer" onClick={() => scrollToId("status")} />
                  <ChevronDown className="text-gray-300" />
                </div>
                <p className="text-muted-foreground">3/3</p>
              </div>
            </CardHeader>
            <CardContent>
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
                    {isUploadPending
                      ? <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
                      : <Upload className="h-10 w-10 text-muted-foreground" />
                    }
                    <p className="text-lg font-medium">Déposer des photos ou cliquer pour parcourir</p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG ou GIF • Max 5 MB par image
                    </p>
                  </div>
                </Label>
              </div>

              {photos.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-base font-medium mb-2">Photos téléchargées</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                          height={100}
                          width={100}
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteFile(photo)}
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
                    <FormLabel className="text-base font-medium">Note interne</FormLabel>
                    <FormDescription className="text-xs font-light mb-2">
                      Note visibles uniquement par les administrateurs
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Note interne..."
                        className="min-h-[120px] bg-background"
                        {...field}
                        value={field.value ?? ""}
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
                    <div className="flex flex-row gap-12">
                      {incompatibilities?.map((item) => (
                        <div className="flex items-center space-x-2" key={item.id}>
                          <Checkbox
                            className="h-5 w-5"
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
            </CardContent>
          </Card>
        </div>


        <div className="fixed right-8 top-3/4" onClick={form.handleSubmit(onSubmit)}>
          <div className="group relative flex items-end justify-center h-12 w-12 overflow-visible">
            <div
              className="flex flex-col items-center justify-end bg-emerald-500 rounded-full text-white
               transition-all duration-300 ease-out overflow-hidden
               h-12 w-12 group-hover:h-44"
            >
              <span
                className="writing-vertical text-sm font-medium opacity-0 transition-opacity duration-300 mb-2
                 group-hover:opacity-100"
              >
                {mode === "create" ? "Enregistrer" : "Modifier"}
              </span>

              <Button
                type="button"
                className="h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-500 p-0"
                disabled={isCreatePending || isUpdatePending}

              >
                {isCreatePending || isUpdatePending ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </form >
      <Dialog open={openSuccessModal} onOpenChange={setOpenSuccessModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Création réussie ! ✅ </DialogTitle>
            <DialogDescription>
              La fiche de l&apos;animal a bien été créé
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button asChild variant="outline">
              <Link href={"/admin/..."}> {/* TODO */}
                <Eye /> Voir
              </Link>
            </Button>
            <Button
              className="bg-indigo-500 hover:bg-indigo-500"
              onClick={resetForm}
            >
              <PlusCircle />Nouveau
            </Button>
            <Button asChild type="button" className="bg-emerald-500 hover:bg-emerald-500 !text-white">
              <Link href={"/admin/animals"}>
                Continuer <ArrowRight />
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form >
  );
}