'use client'

import { Animal } from "@/_schemas/animal.schema";
import { animalsService } from "@/_services/animals.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query"


const { getAll, getAllWithFilters, getDogs, getCats, getOthers } = animalsService;

export const useAllAnimalsQuery = (): UseQueryResult<Animal[], Error> => {
  return useQuery({
    queryKey: ['animals', 'all'],
    queryFn: getAll,
    staleTime: 1000 * 60 * 5
  })
};

export const useFilteredAnimalsQuery = (filters: Record<string, string>): UseQueryResult<Animal[], Error> => {
  return useQuery({
    queryKey: ['animals', 'filtered', filters],
    queryFn: () => getAllWithFilters(filters),
    enabled: Object.keys(filters).length > 0,
    staleTime: 1000 * 60 * 5
  })
};

export const useDogsQuery = (): UseQueryResult<Animal[], Error> => {
  return useQuery({
    queryKey: ['animals', 'dogs'],
    queryFn: getDogs,
    staleTime: 1000 * 60 * 5
  })
};

export const useCatsQuery = (): UseQueryResult<Animal[], Error> => {
  return useQuery({
    queryKey: ['animals', 'cats'],
    queryFn: getCats,
    staleTime: 1000 * 60 * 5
  })
};

export const useOthersQuery = (): UseQueryResult<Animal[], Error> => {
  return useQuery({
    queryKey: ['animals', 'others'],
    queryFn: getOthers,
    staleTime: 1000 * 60 * 5
  })
};