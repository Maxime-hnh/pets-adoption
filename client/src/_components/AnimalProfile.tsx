
import { GenderConfigMap, AnimalStatusConfiglMap, PlacementTypeConfigMap, GenderLabelMap, PlacementTypeLabelMap, AnimalStatusLabelMap, AnimalStatus, PlacementType } from "@/_schemas/animal.schema";

import { Cake, DnaIcon, Heart, PawPrint, Phone } from "lucide-react";
import { notFound } from "next/navigation";

import { getAnimalById } from "@/_lib/data";
import { calculateAgeToString } from "@/_lib/utils";
import Image from "next/image";
import { Badge } from "@/_components/ui/badge";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/_components/ui/button";
import HandleFavoriteButton from "./HandleFavoriteButton";
import Link from "next/link";

interface AnimalProfileProps {
  params: Promise<{ id: string }>
}


export async function generateMetadata({ params }: AnimalProfileProps) {
  const { id } = await params;
  const animal = await getAnimalById(Number(id)); //cache(fn)

  return {
    title: `${animal.name} – À adopter | SPA de Verson`,
    description: `Découvrez ${animal.name}, un ${animal.species} de ${animal.breed} à adopter.`,
  }
}

export default async function AnimalProfile({ params }: AnimalProfileProps) {

  const { id } = await params;
  const animal = await getAnimalById(Number(id));  //cache(fn)
  if (!animal) return notFound()



  // Obtenir l'icône de genre avec sa couleur
  const GenderIcon = GenderConfigMap[animal.gender].icon;
  const genderBgColor = GenderConfigMap[animal.gender].bgColorTransparent;
  const genderIconColor = GenderConfigMap[animal.gender].color;

  // Obtenir le statut de l'animal avec sa couleur
  const statusBgColor = animal.status ? AnimalStatusConfiglMap[animal.status].bgColor : '';

  const placementTypeBgColor = animal.placementType ? PlacementTypeConfigMap[animal.placementType].bgColor : '';

  const infoContainer = (Icon: React.ElementType, title: string, info: string, bg: string, iconColor: string) => (
    <div className={`h-42 w-52 bg-white rounded-3xl`} >
      <div className={`h-full w-full ${bg} rounded-3xl`}>
        <div className="flex flex-col justify-center gap-1 items-center h-full">
          <Icon className={`w-10 h-10 ${iconColor}`} />
          <p className="text-sm font-bold">{title}</p>
          <p className="text-sm mt-2">{info}</p>
        </div>
      </div>
    </div >
  )

  return (
    <section id="animalProfile_container" className="sm:pt-[90px]">
      <div className="w-full h-[calc(100dvh-90px)]">

        <div className="flex flex-col gap-4 w-full h-full">

          <div className="bg-[#f5f3e4] h-2/3 md:px-5 lg:px-20 xl:px-50 2xl:px-75 flex justify-center items-center">
            <div className="grid grid-cols-12 gap-12">

              <div className="flex flex-col gap-8 col-span-6 xl:col-span-7">
                <div className="flex flex-row gap-4">
                  <Badge className={`rounded-full ${statusBgColor} !text-white text-sm font-normal px-4 py-1`}>
                    {animal.status === AnimalStatus.AVAILABLE
                      ? <><Heart className="fill-current mr-2" /> Prêt pour l&apos;adoption</>
                      : AnimalStatusLabelMap[animal.status]}
                  </Badge>
                  {animal.placementType !== PlacementType.STANDARD
                    && <Badge className={`rounded-full ${placementTypeBgColor} !text-white text-sm text-semibold px-4 py-1`}>
                      {PlacementTypeLabelMap[animal.placementType]}
                    </Badge>
                  }
                </div>
                <h1 className="font-fredoka font-[700] md:text-4xl lg:text-5xl">Voici {animal.name}</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique reiciendis, ab earum quis consequuntur amet dignissimos assumenda blanditiis explicabo rem?</p>
                <div className="flex flex-col lg:flex-row gap-4">

                  <Button className="bg-indigo-500 animate-fade-in-left hover:bg-indigo-600" size={"3xl"}><PawPrint className="hidden xs:block xs:mr-2" /> Adopter {animal.name}</Button>

                  <Link href="/contact">
                    <Button
                      variant={"outline"}
                      className="!border-indigo-500 !border-2 !text-indigo-500 animate-fade-in-right font-bold"
                      size={"3xl"}>
                      <Phone strokeWidth={2.5} className="xs:mr-2" /> Nous Contacter
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative w-[20rem] h-full lg:w-[25rem] col-span-6 xl:col-span-5">
                {animal.photos && animal.photos.length > 0 && (
                  <AspectRatio ratio={1}>
                    <Image
                      src={animal.photos[0]}
                      alt={animal.name}
                      width={1000}
                      height={1000}
                      className="rounded-3xl w-full h-full object-cover"
                    />
                    {/* <Button
                      className="group absolute -bottom-6 -right-6 bg-white hover:bg-white h-14 w-12 rounded-lg shadow-2xl">
                      <Heart className="text-red-500 !h-6 !w-6 group-hover:animate-bounce" strokeWidth={2} />
                    </Button> */}
                    <HandleFavoriteButton
                      buttonClassName="group absolute -bottom-6 -right-6 bg-white hover:bg-white h-14 w-12 rounded-lg shadow-2xl"
                      iconClassName="text-red-500 !h-6 !w-6 group-hover:animate-bounce"
                      animal={animal}
                    />
                  </AspectRatio>
                )}
              </div>
            </div>
          </div>

          <div className="h-1/3 flex flex-row gap-8 justify-center items-center">
            {infoContainer(DnaIcon, "Race", animal.breed, "bg-emerald-500/40", "text-emerald-500")}
            {infoContainer(Cake, "Age", calculateAgeToString(animal.birthDate), "bg-amber-500/40", "text-amber-600")}
            {infoContainer(GenderIcon, "Sexe", GenderLabelMap[animal.gender], genderBgColor, genderIconColor)}
          </div>
        </div>

      </div>

      <div id="animalProfile_description" className="bg-[#f5e0e3] px-10 lg:px-25 xl:px-50 2xl:px-75 flex flex-col gap-16 justify-center items-center py-20">
        <div className="flex flex-row gap-4 items-center">
          <Heart className="fill-current text-red-500 !h-10 !w-10" />
          <h3 className="font-fredoka font-[700] text-4xl">Mon histoire</h3>
        </div>
        <div className="bg-white shadow-2xl p-12 rounded-3xl max-w-full lg:max-w-2/3">
          <p>{animal.description}</p>
        </div>
      </div>
      {animal.photos && animal.photos.length > 1 &&
        <div id="animalProfile_photos" className="py-20 px-10 lg:px-25 xl:px-35 2xl:px-55 flex flex-col gap-16 justify-center items-center">
          <h3 className="font-fredoka font-[700] text-4xl">Plus de photos de {animal.name}</h3>
          <div className="flex flex-row gap-4 justify-start items-center max-w-full overflow-x-auto">
            {animal.photos.map((photo, i) => (
              <div key={i} className="min-w-80 max-w-80">
                <AspectRatio ratio={1}>
                  <Image
                    src={photo}
                    alt={animal.name}
                    width={1000}
                    height={1000}
                    className="rounded-3xl w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>
      }
    </section>
  )
}