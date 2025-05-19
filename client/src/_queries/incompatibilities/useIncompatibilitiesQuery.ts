import { ShortIncompatibility } from "@/_schemas/incompatibility.schema"
import { incompatibilitiesService } from "@/_services/incompatibilities.service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

const { getAll } = incompatibilitiesService

export const useIncompatibilitiesQuery = (): UseQueryResult<ShortIncompatibility[], Error> => {
  return useQuery({
    queryKey: ['incompatibilities', 'all'],
    queryFn: getAll,
    staleTime: Infinity, // les données ne deviennent jamais obsolètes
    gcTime: Infinity,    // ne jamais supprimer les données du cache (tant que l'app tourne)
    refetchOnWindowFocus: false, // pas de refetch en revenant sur l'onglet
    refetchOnMount: false        // pas de refetch au remontage du composant    
  })
}