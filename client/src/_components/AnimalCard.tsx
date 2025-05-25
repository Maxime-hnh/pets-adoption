import { Animal, AnimalStatusConfiglMap, GenderConfigMap, PlacementTypeConfiglMap, SpeciesLabelMap, GenderLabelMap, AnimalStatusLabelMap, PlacementTypeLabelMap } from "@/_schemas/animal.schema";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Cake } from "lucide-react";
import { calculateAge } from "@/_helpers/utils";

export default function AnimalCard({ animal }: { animal: Animal }) {

  // Obtenir l'icône de genre avec sa couleur
  const GenderIcon = animal.gender ? GenderConfigMap[animal.gender].icon : null;
  const genderColor = animal.gender ? GenderConfigMap[animal.gender].color : '';

  // Obtenir le statut de l'animal avec sa couleur
  const statusColor = animal.status ? AnimalStatusConfiglMap[animal.status].color : '';

  const placementTypeColor = animal.placementType ? PlacementTypeConfiglMap[animal.placementType].color : '';

  return (
    <div key={animal.id} className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48">
        <figure className="relative bg-black overflow-hidden h-full w-full">
          <Image
            alt={animal.name}
            src={animal.photos && animal.photos.length > 0 ? animal.photos[0] : ""}
            width={465}
            height={192}
            className="h-full object-cover objet-center scale-105 group-hover:scale-100 group-hover:opacity-50 transition-all duration-500"
          />
        </figure>
      </div>
      <div className="p-4">
        <div className="mb-2 text-2xl font-inter font-[900]">{animal.name}</div>
        <div className="flex flex-wrap gap-2">
          {animal.gender && (
            <Badge
              className={`bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 ${genderColor}`}
            >
              {GenderIcon && <GenderIcon className="mr-1 h-3 w-3" />}
              {GenderLabelMap[animal.gender]}
            </Badge>
          )}
         {animal.birthDate && (
            <Badge
              className={`text-sm px-3 py-1 text-black bg-gray-100 hover:bg-gray-200`}
            >
              <Cake size={24} />

              {calculateAge(animal.birthDate)}
            </Badge>
          )}
          {animal.placementType && (
            <Badge
              className={`text-sm px-3 py-1 ${placementTypeColor} bg-gray-100 hover:bg-gray-200`}
            >
              {PlacementTypeLabelMap[animal.placementType]}
            </Badge>
          )}

        </div>
      </div>
    </div>
  )
}
