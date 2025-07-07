
import { GenderConfigMap, AnimalStatusConfiglMap, PlacementTypeConfigMap, GenderLabelMap, PlacementTypeLabelMap, AnimalStatusLabelMap, AnimalStatus, PlacementType } from "@/_schemas/animal.schema";
import { notFound } from "next/navigation";

import { getById } from "@/_lib/data";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Badge } from "./ui/badge";
import { ArrowLeft, Cake, Camera, DnaIcon, Heart, MapPin, PawPrint, Share2 } from "lucide-react";
import { cn } from "@/_lib/cn";
import { calculateAgeToString } from "@/_lib/utils";
import { Button } from "./ui/button";
import { Arrow } from "@radix-ui/react-tooltip";

interface AnimalProfileMobileProps {
  params: Promise<{ id: string }>
}



export async function generateMetadata({ params }: AnimalProfileMobileProps) {
  const { id } = await params;
  const animal = await getById(Number(id)); //cache(fn)

  return {
    title: `${animal.name} – À adopter | SPA de Verson`,
    description: `Découvrez ${animal.name}, un ${animal.species} de ${animal.breed} à adopter.`,
  }
}

export default async function AnimalProfileMobile({ params }: AnimalProfileMobileProps) {

  const { id } = await params;
  const animal = await getById(Number(id));  //cache(fn)
  if (!animal) return notFound()



  // Obtenir l'icône de genre avec sa couleur
  const GenderIcon = GenderConfigMap[animal.gender].icon;
  const genderBgColor = GenderConfigMap[animal.gender].bgColor + "/50";
  const genderIconColor = GenderConfigMap[animal.gender].color;

  // Obtenir le statut de l'animal avec sa couleur
  const statusBgColor = animal.status ? AnimalStatusConfiglMap[animal.status].bgColor : '';

  const placementTypeBgColor = animal.placementType ? PlacementTypeConfigMap[animal.placementType].bgColor : '';


  const infoContainer = (Icon: React.ElementType, title: string, info: string, bg: string, iconColor: string) => (
    <div className={`h-21 bg-white rounded-xl text-white`} >
      <div className={`h-full w-full ${bg} rounded-xl px-2 py-2`}>
        <div className=" flex flex-col items-start  gap-1 h-full">
          {/* <Icon className={`w-5 h-5 ${iconColor}`} /> */}
          <h4 className="text-lg">{title}</h4>
          <p className="text-sm font-bold ml-1 break-words w-full">{info}</p>
        </div>
      </div>
    </div >
  )

  return (
    <section id="animalProfile_container">
      <div className="w-full">

        {/* Image */}
        <div className="relative">
          <div className="absolute top-8 z-10 w-full px-4 flex justify-between">
            <Button size="icon" className="rounded-full !bg-white/15 backdrop-blur-xl hover:bg-white/50">
              <ArrowLeft className="!w-6 !h-6" />
            </Button>
            <Button size="icon" className="rounded-full !bg-white/15 backdrop-blur-xl hover:bg-white/50">
              <Heart className="!w-6 !h-6" />
            </Button>
          </div>
          <AspectRatio ratio={1}>
            <Image
              src={animal.photos?.[0] || ""}
              alt={animal.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="absolute -bottom-12 right-1/2 translate-x-1/2 w-7/8 h-25 bg-white rounded-3xl shadow-2xl">
            <div className="h-full flex flex-row gap-4 py-2 px-8 justify-between">
              <div className="flex flex-col justify-between">
                <h1 className="text-2xl font-[900] font-inter">
                  <span className="sr-only">Fiche animal du {animal.species} {animal.name}</span>
                  {animal.name}
                </h1>
                <div className="flex flex-col">
                  <p className="text-sm">{animal.breed}</p>
                  <div className="flex flex-row flex-nowrap items-center gap-1 ">
                    <MapPin className="!w-3 !h-3" />
                    <p className="text-xs text-gray-500"> SPA de Verson</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button
                  className="rounded-full h-10 w-10 flex items-center justify-center bg-indigo-500/80"
                >
                  <Share2 className="!w-5 !h-5" />
                </Button>
              </div>
            </div>
          </div>²
        </div>

        {/* About */}
        <div className="flex flex-col gap-4 pt-18 px-4">
          <div className="flex flex-row gap-2 items-center">
            <PawPrint className="!w-6 !h-6 -rotate-45 text-indigo-500" strokeWidth={2.5} />
            <h2 className="text-xl font-bold">À propos de {animal.name}</h2>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {infoContainer(DnaIcon, "Race", animal.breed, "bg-emerald-500/50", "text-emerald-500")}
            {infoContainer(Cake, "Âge", calculateAgeToString(animal.birthDate), "bg-amber-500/50", "text-amber-600")}
            {infoContainer(GenderIcon, "Sexe", GenderLabelMap[animal.gender], genderBgColor, genderIconColor)}
          </div>

          <p className="text-md text-justify text-gray-500 px-2">
            {animal.description}
          </p>
        </div>

        {/* Photos */}
        <div className="flex flex-col gap-4 py-8 px-4">
          <div className="flex flex-row gap-2 items-center">
            <Camera className="!w-6 !h-6 text-indigo-500" strokeWidth={2.5} />
            <h2 className="text-xl font-bold">Plus de photos</h2>
          </div>

          {animal.photos && animal.photos.length > 1 &&
            <div className="flex flex-col gap-4 max-w-full">
              {animal.photos.slice(1).map((photo, i) => (
                <Image key={i} src={photo} alt={`Image ${i + 1} de ${animal.name}`} width={500} height={500} className="w-full h-full object-cover" />
              ))}
            </div>
          }
        </div>

        {/* Call to action */}
        <div className="flex flex-col gap-4 pb-8 px-4">
          <Button className="w-full bg-indigo-500">
            <span>Adopter {animal.name}</span>
          </Button>
          <Button className="w-full bg-amber-500">
            <span>Contactez-nous</span>
          </Button>
        </div>
      </div>
    </section>
  )

}
