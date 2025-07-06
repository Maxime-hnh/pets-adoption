import { Animal, GenderConfigMap, PlacementTypeConfigMap, PlacementTypeLabelMap } from "@/_schemas/animal.schema";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Cake } from "lucide-react";
import { calculateAgeToString } from "@/_lib/utils";
import { Separator } from "./ui/separator";
import { cn } from "@/_lib/cn";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipTrigger } from "@/_components/ui/tooltip";
import { IncompatibilityConfigMap } from "@/_schemas/incompatibility.schema";

export default function AnimalCard({ animal, className }: { animal: Animal, className?: string }) {

  // Obtenir l'icône de genre avec sa couleur
  const GenderIcon = animal.gender ? GenderConfigMap[animal.gender].icon : null;
  const genderColor = animal.gender ? GenderConfigMap[animal.gender].color : '';

  const placementTypeColor = animal.placementType ? PlacementTypeConfigMap[animal.placementType].color : 'text-blue-500';

  return (
    <div
      key={animal.id}
      className={cn(
        "min-h-[440px] max-h-[440px] group cursor-pointer bg-[#fff6e8] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow px-3 pt-3 pb-6",
        className)}
    >

      {/* image*/}
      <div className="relative h-48">
        {animal.placementType && (
          <Badge
            className={`group-hover:animate-wiggle absolute -top-1 -left-2 -rotate-8 z-30 text-xs px-3 rounded-full  bg-${placementTypeColor.slice(5)}`}
          >
            {PlacementTypeLabelMap[animal.placementType]}
          </Badge>
        )}
        <figure className="bg-black overflow-hidden h-full w-full rounded-2xl">
          <Image
            alt={animal.name}
            src={animal.photos && animal.photos.length > 0 ? animal.photos[0] : ""}
            width={500}
            height={500}
            className="h-full object-cover objet-center scale-105 group-hover:scale-110 group-hover:opacity-75 transition-all duration-750"
          />
        </figure>
      </div>

      {/* Informations */}
      <div className="pt-4 px-2 flex flex-col justify-between">

        {/* Nom et espèce */}
        <div className="text-center mb-6 text-md font-semibold capitalize">{animal.breed}	• {animal.name}</div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {animal.gender && (
            <Badge
              className={`rounded-full bg-${genderColor.slice(5)} text-sm py-2`}
            >
              {GenderIcon && <GenderIcon className="h-5 w-5" />}
            </Badge>
          )}

          {animal.birthDate && (
            <Badge
              className={`rounded-full text-xs bg-white`}
              variant={"outline"}
            >
              <Cake size={24} />

              {calculateAgeToString(animal.birthDate, true)}
            </Badge>
          )}
          {animal.incompatibilityLabels
            && animal.incompatibilityLabels.length > 0
            && <div className="flex flex-wrap gap-2">
              {animal.incompatibilityLabels.map((value, index) => {
                const config = IncompatibilityConfigMap[value]
                const Icon = config.icon
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <Icon size={24} />
                    </TooltipTrigger>
                    <TooltipContent
                      sideOffset={0}
                      className="bg-white border border-gray-200 px-2 py-1 rounded-full shadow-sm text-xs"
                    >
                      {config.label}
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          }
        </div>
        <div className="px-2">
          <Separator className="my-4" />
        </div>

        {/* Description */}
        {<p className="text-xs px-2">{animal.description ? `${animal.description.slice(0, 100)}...` : "Aucune description disponible"}</p>}
      </div>
    </div>
  )
}
