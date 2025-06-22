import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/_components/ui/carousel";
import { calculateAge } from "@/_helpers/utils";
import { GenderConfigMap, AnimalStatusConfiglMap, AnimalStatusLabelMap, SpeciesLabelMap, GenderLabelMap, PlacementTypeLabelMap, PlacementTypeConfiglMap } from "@/_schemas/animal.schema";
import { animalsService } from "@/_services/animals.service";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowRight, Calendar, Heart, MapPin, Phone, PawPrint } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/_components/ui/badge";
import { Suspense } from "react";
import { IncompatibilityConfigMap } from "@/_schemas/incompatibility.schema";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import SuggestCardSkeleton from "./SuggestCardSkeleton";

interface AnimalProfileProps {
  params: Promise<{ id: string }>
}


export async function generateMetadata({ params }: AnimalProfileProps) {
  const { serverGetById } = animalsService;
  const { id } = await params;
  const animal = await serverGetById(Number(id), 300);
  return {
    title: `${animal.name} – À adopter | NomDuSite`,
    description: `Découvrez ${animal.name}, un ${animal.species} de ${animal.breed} à adopter.`,
  }
}

export default async function AnimalProfile({ params }: AnimalProfileProps) {

  const { serverGetById } = animalsService;
  const { id } = await params;
  const animal = await serverGetById(Number(id), 300);
  if (!animal) return notFound()

  // Obtenir l'icône de genre avec sa couleur
  const GenderIcon = animal.gender ? GenderConfigMap[animal.gender].icon : null;
  const genderColor = animal.gender ? GenderConfigMap[animal.gender].color : '';

  // Obtenir le statut de l'animal avec sa couleur
  const statusColor = animal.status ? AnimalStatusConfiglMap[animal.status].color : '';

  const placementTypeColor = animal.placementType ? PlacementTypeConfiglMap[animal.placementType].color : '';

  return (

    <div className="min-h-screen bg-gray-50 py-8 max-w-[100dvw]">

      {/* Partie haute */}
      <div className="container mx-auto lg:px-4">
        {/* Fiche d'identité principale */}
        <Card className="relative overflow-hidden">

          <CardContent className="flex flex-col relative z-10">

            <div className="flex flex-col lg:flex-row">
              {/* Partie gauche - Photo de profil */}
              <div className="lg:w-1/3 h-[375px] relative">
                <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse"></div>}>
                  <Carousel className="relative" opts={{ loop: true }}>
                    <CarouselContent>
                      {animal.photos && animal.photos.length > 0 ? (
                        animal.photos.map((photo, index) => (
                          <CarouselItem key={index}>
                            <Image
                              alt={`Photo de ${animal.name}, ${SpeciesLabelMap[animal.species]}`}
                              src={photo}
                              width={375}
                              height={375}
                              priority={index === 0}
                              className="object-cover object-center w-full h-full  rounded-2xl"
                            />
                          </CarouselItem>
                        ))
                      ) : (
                        <CarouselItem className="h-full">
                          <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-2">
                              <Heart size={48} className="text-gray-300" />
                              <p className="text-gray-400 text-sm">Aucune photo disponible</p>
                            </div>
                          </div>
                        </CarouselItem>
                      )}
                    </CarouselContent>
                    {animal.photos && animal.photos.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0">
                        <CarouselDots className="gap-2" />
                      </div>
                    )}
                  </Carousel>
                </Suspense>
              </div>

              {/* Partie droite - Informations */}
              <div className="lg:w-2/3 p-6 lg:p-8 lg:pb-0 relative">
                <Image
                  src="/assets/mascot/standingPointing.png"
                  alt="Mascot"
                  width={125}
                  height={125}
                  className="scale-x-[-1] absolute bottom-0 right-0"

                />

                <div className="flex flex-col h-full">
                  {/* En-tête avec nom et badges */}
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="sr-only">
                        {animal.name} – {SpeciesLabelMap[animal.species]} à adopter
                      </h1>
                      <h2 className="
                      text-4xl 
                      font-bold
                      pb-[7px]
                      mr-4
                      bg-no-repeat
                      bg-[length:contain]
                      bg-[position:bottom_center]
                      "
                        style={{ backgroundImage: "url('https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/underline.png')" }}
                      >{animal.name}</h2>

                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm px-3 py-1">
                          {SpeciesLabelMap[animal.species]}
                        </Badge>

                        {animal.gender && (
                          <Badge
                            className={`bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 ${genderColor}`}
                          >
                            {GenderIcon && <GenderIcon className="mr-1 h-3 w-3" />}
                            {GenderLabelMap[animal.gender]}
                          </Badge>
                        )}

                        {animal.placementType && (
                          <Badge
                            className={`text-sm px-3 py-1 ${placementTypeColor} bg-gray-100 hover:bg-gray-200`}
                          >
                            {PlacementTypeLabelMap[animal.placementType]}
                          </Badge>
                        )}
                        {animal.status && (
                          <Badge
                            className={`text-sm px-3 py-1 ${statusColor} bg-gray-100 hover:bg-gray-200`}
                          >
                            {AnimalStatusLabelMap[animal.status]}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin size={16} className="text-gray-400" />
                      <span>Situé(e) au refuge de Paris</span>
                    </div>
                  </div>

                  {/* Informations principales */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Race</p>
                      <p className="font-medium">{animal.breed}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Âge</p>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        {animal.birthDate ? calculateAge(animal.birthDate) : 'Non renseigné'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {animal.birthDate ? `Né(e) le ${format(animal.birthDate, "dd MMMM yyyy", { locale: fr })}` : ''}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Stérilisé(e)</p>
                      <p className="font-medium">{animal.isSterilized ? "Oui" : "Non"}</p>
                    </div>

                    {animal.icadNumber && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Numéro ICAD</p>
                        <p className="font-medium">{animal.icadNumber}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Incompatibilité(s)</p>
                      {animal.incompatibilityLabels
                        && animal.incompatibilityLabels.length > 0
                        ? <div className="flex flex-wrap gap-2">
                          {animal.incompatibilityLabels.map((value, index) => {
                            const config = IncompatibilityConfigMap[value]
                            const Icon = config.icon
                            return (
                              <Tooltip key={index}>
                                <TooltipTrigger>
                                  <Icon size={40} />
                                </TooltipTrigger>
                                <TooltipContent
                                  sideOffset={0}
                                  className="bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm text-sm"
                                >
                                  {config.label}
                                </TooltipContent>
                              </Tooltip>
                            )
                          })}
                        </div>
                        : <p className="font-medium">Aucune</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partie basse */}
            <div className=" pt-4 border-t border-gray-100 gap-8 grid grid-cols-12">

              {/* Décorations de pattes d'animaux */}
              <div className="absolute bottom-0 right-0 transform -rotate-72 translate-x-2 -translate-y-2 z-0 hidden lg:block">
                <div className="flex">
                  <PawPrint size={20} color="#ff7e5f" />
                  <PawPrint size={20} color="#ff7e5f" className="ml-4 mt-2" />
                </div>

                <div className="flex mt-2">
                  <PawPrint size={28} color="#ff7e5f" className="ml-8" />
                  <PawPrint size={24} color="#ff7e5f" className="ml-4 mt-1" />
                  <PawPrint size={32} color="#ff7e5f" className="ml-4 mt-1" />
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 flex-grow col-span-12 lg:col-span-8 ">
                <h2 className="text-3xl font-semibold flex items-center gap-2 mb-3">
                  <Heart size={24} className="text-rose-500" />
                  À propos de {animal.name}
                </h2>

                <div className="prose prose-sm max-w-none">
                  {animal.description ? (
                    <p className="leading-relaxed text-justify px-4 lg:px-0">{animal.description}</p>
                  ) : (
                    <p className="text-gray-500 italic">Aucune description disponible pour {animal.name}.</p>
                  )}
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="gap-4 col-span-12 lg:col-span-4 flex flex-row lg:flex-col justify-center items-center lg:border-l lg:border-gray-100 h-full">
                <Button size="lg" className="rounded-full">
                  Adopter {animal.name} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button variant="outline" size="lg" className="rounded-full border-gray-300 hover:bg-gray-50">
                  <Phone className="mr-2 h-4 w-4" /> Nous contacter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <SuggestCardSkeleton />
      </div>
    </div >
  )
}