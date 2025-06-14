import { ShortIncompatibility } from "@/_schemas/incompatibility.schema"
import { incompatibilitiesService } from "@/_services/incompatibilities.service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

const { getAll } = incompatibilitiesService

export const useIncompatibilitiesQuery = (): UseQueryResult<ShortIncompatibility[], Error> => {
  return useQuery({
    queryKey: ['incompatibilities', 'all'],
    queryFn: getAll,
    staleTime: Infinity,
    gcTime: Infinity,   
    refetchOnWindowFocus: false, 
    refetchOnMount: false       
  })
}