"use client"

import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { DatePicker } from "@/_components/DatePicker";
import { useUploadManyFiles } from "@/_hooks/upload/useUploadManyFiles";
import Image from "next/image";
import { useDeleteFile } from "@/_hooks/upload/useDeleteFile";
import { Card, CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";
import { scrollToId } from "@/_lib/utils";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/_components/ui/dialog";
import Link from "next/link";
import { EventEntity, EventSchema, EventType, EventTypeConfigMap, EventTypeLabelMap } from "@/_schemas/events.schema";
import { useCreateEvent } from "@/_hooks/events/useCreateEvent";
import { useFullUpdateEvent } from "@/_hooks/events/useFullUpdateEvent";

interface EventsFomProps {
  mode: string;
  values: EventEntity
}

export default function EventsForm({ mode = "create", values }: EventsFomProps) {

  const [photos, setPhotos] = useState<string[]>(values.photos ?? []);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const router = useRouter();
  const uploadManyFiles = useUploadManyFiles("images/events");
  const createEvent = useCreateEvent();
  const updateEvent = useFullUpdateEvent();
  const deleteFile = useDeleteFile();
  const { isPending: isUploadPending } = uploadManyFiles;
  const { isPending: isCreatePending } = createEvent;
  const { isPending: isUpdatePending } = updateEvent;

  const form = useForm<EventEntity>({
    resolver: zodResolver(EventSchema),
    defaultValues: values
  });
console.log(form.formState.errors)
console.log(form.formState.isValid)
console.log(form.formState.isDirty)
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

  function onSubmit(values: EventEntity): void {
    if (mode === "create") {
      createEvent.mutate(values, {
        onSuccess: () => {
          setOpenSuccessModal(true);
        }
      })
    }
    else {
      const id = values.id!
      console.log(values)
      updateEvent.mutate({ id, values }, {
        onSuccess: () => {
          router.back();
        }
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
            <h2 className="text-4xl">{mode === "create" ? "Ajouter un évènement" : "Modifier un évènement"}</h2>
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
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full gap-0">
                      <FormLabel className="text-base font-medium">Titre</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Titre de l'évènement"
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full gap-1">
                      <FormLabel className="text-base font-medium">Type d'évènement</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(EventTypeLabelMap).map(([value, label]) => {
                              const config = EventTypeConfigMap[value as EventType];
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
                <div className="grid grid-cols-2 gap-4">
                  {datePickerComponent("startDate", "Date de début")}
                  {datePickerComponent("endDate", "Date de fin")}
                </div>
              </div>

            </CardContent>
          </Card>

          <Separator id="status" />
          {/* Onglet Statut & Caractéristiques  */}
          <Card >
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-inter font-semibold text-foreground">Détails & Adresse</CardTitle>
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="gap-0">
                      <FormLabel className="text-base font-medium">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez l'évènement..."
                          className="min-h-[120px]"
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
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full gap-0">
                      <FormLabel className="text-base font-medium">Adresse</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Numéro et nom de la rue"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="w-full gap-0">
                        <FormLabel className="text-base font-medium">Code Postal</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Code Postal"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-full gap-0">
                        <FormLabel className="text-base font-medium">Ville</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Ville"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full gap-0">
                      <FormLabel className="text-base font-medium">Prix</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Prix"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />


          {/* Onglet Photos & Note */}
          <Card id="photos">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-inter font-semibold text-foreground">Photos</CardTitle>
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
              La fiche de l&apos;évènement a bien été créé
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
              <Link href={"/admin/events"}>
                Continuer <ArrowRight />
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form >
  );
}