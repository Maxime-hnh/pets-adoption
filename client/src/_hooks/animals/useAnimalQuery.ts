'use client';

import { Animal } from "@/_schemas/animal.schema";
import { animalsService } from "@/_services/animals.service";
import { useQuery } from "@tanstack/react-query";

export const useAnimalQuery = (id: number) => {
  return useQuery<Animal, Error>({
    queryKey: ['animal', id],
    queryFn: () => animalsService.getById(id),
    enabled: !!id, // évite de lancer si id = 0 ou undefined
    staleTime: 1000 * 60 * 5, // 5 minutes de cache (ajustable)
  });
};