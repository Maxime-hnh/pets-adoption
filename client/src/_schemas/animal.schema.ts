import { Cat, Dog, Mars, Rabbit, Venus } from 'lucide-react';
import { z } from 'zod';

export enum Species {
  DOG = "DOG",
  CAT = "CAT",
  OTHER = "OTHER"
}


export enum AnimalStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  ADOPTED = "ADOPTED",
  UNAVAILABLE = "UNAVAILABLE",
  PENDING = "PENDING",
}

export enum PlacementType {
  STANDARD = "STANDARD",
  SOS = "SOS",
  FAD = "FAD"
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export const PlacementTypeLabelMap: Record<PlacementType, string> = {
  [PlacementType.STANDARD]: 'Standard',
  [PlacementType.SOS]: 'SOS',
  [PlacementType.FAD]: 'FAD',
};


export const PlacementTypeConfiglMap: Record<PlacementType, { color: string }> = {
  [PlacementType.STANDARD]: { color: "text-green-500" },
  [PlacementType.SOS]: { color: "text-red-500" },
  [PlacementType.FAD]: { color: "text-blue-500" },
}

export const AnimalStatusLabelMap: Record<AnimalStatus, string> = {
  [AnimalStatus.AVAILABLE]: 'Disponible',
  [AnimalStatus.RESERVED]: 'Réservé',
  [AnimalStatus.ADOPTED]: 'Adopté',
  [AnimalStatus.UNAVAILABLE]: 'Non disponible',
  [AnimalStatus.PENDING]: 'En attente',
};


export const AnimalStatusConfiglMap: Record<AnimalStatus, { color: string }> = {
  [AnimalStatus.AVAILABLE]: { color: "text-green-500" },
  [AnimalStatus.RESERVED]: { color: "text-orange-500" },
  [AnimalStatus.ADOPTED]: { color: "text-blue-500" },
  [AnimalStatus.UNAVAILABLE]: { color: "text-red-500" },
  [AnimalStatus.PENDING]: { color: "text-gray-500" },
}

export const GenderLabelMap: Record<Gender, string> = {
  [Gender.MALE]: 'Mâle',
  [Gender.FEMALE]: 'Femelle',
};

export const GenderConfigMap: Record<Gender, { icon: React.ElementType; color: string }> = {
  [Gender.MALE]: { icon: Mars, color: "text-blue-400" },
  [Gender.FEMALE]: { icon: Venus, color: "text-pink-600" },
}

export const SpeciesLabelMap: Record<Species, string> = {
  [Species.DOG]: 'Chien',
  [Species.CAT]: 'Chat',
  [Species.OTHER]: 'NACs',
};

export const SpeciesConfigMap: Record<Species, { icon: React.ElementType; color: string }> = {
  [Species.DOG]: { icon: Dog, color: 'text-blue-500' },
  [Species.CAT]: { icon: Cat, color: 'text-amber-500' },
  [Species.OTHER]: { icon: Rabbit, color: 'text-emerald-400' },
};

export const SpeciesSchema = z.nativeEnum(Species);
export const GenderSchema = z.nativeEnum(Gender);
export const AnimalStatusSchema = z.nativeEnum(AnimalStatus);
export const PlacementTypeSchema = z.nativeEnum(PlacementType);

export const AnimalSchema = z.object({
  id: z.number(),
  uid: z.number(),
  icadNumber: z.number().optional(),
  name: z.string(),
  isSterilized: z.boolean(),
  species: SpeciesSchema,
  breed: z.string(),
  gender: GenderSchema,
  birthDate: z.coerce.date(),
  description: z.string().optional(),
  status: AnimalStatusSchema,
  placementType: PlacementTypeSchema,
  adoptionDate: z.coerce.date().optional(),
  photos: z.array(z.string()).optional(),
  internalNotes: z.string().optional(),
  isArchived: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  animalIncompatibilities: z.array(z.any()),
  incompatibilityLabels: z.array(z.string()),
  deletedAt: z.coerce.date().optional(),
});


export type Animal = z.infer<typeof AnimalSchema>;
