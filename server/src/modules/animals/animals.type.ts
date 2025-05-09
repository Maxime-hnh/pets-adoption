import { Animal, AnimalIncompatibility } from "@prisma/client";

export type AnimalsWithIncompatibility = Animal & { animalIncompatibilities: AnimalIncompatibility[] };