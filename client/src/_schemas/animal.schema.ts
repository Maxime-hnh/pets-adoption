import { Cat, Dog, Rabbit } from 'lucide-react';
import { z } from 'zod';

export enum Species {
  DOG = "DOG",
  CAT = "CAT",
  OTHER = "OTHER"
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export enum AnimalStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  ADOPTED = "ADOPTED",
  UNAVAILABLE = "UNAVAILABLE",
  PENDING = "PENDING",
  SOS = "SOS"
}

export enum PlacementType {
  STANDARD = "STANDARD",
  SOS = "SOS",
  FAD = "FAD"
}

export const SpeciesLabelMap: Record<Species, string> = {
  [Species.DOG]: 'Chien',
  [Species.CAT]: 'Chat',
  [Species.OTHER]: 'NACs',
};

export const SpeciesConfigMap: Record<Species, { icon: React.ElementType; color: string }> = {
  [Species.DOG]: { icon: Dog, color: 'text-indigo-500' },
  [Species.CAT]: { icon: Cat, color: 'text-orange-400' },
  [Species.OTHER]: { icon: Rabbit, color: 'text-green-500' },
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
