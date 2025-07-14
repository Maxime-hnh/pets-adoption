import { PublicAnimal } from "@/_schemas/animal.schema";
import { favoritesService } from "@/_services/favorites.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useAuthStore } from "@/_stores/auth.store";

export const useFavoritesQuery = (): UseQueryResult<PublicAnimal[], Error> => {
  const { getFavorites } = favoritesService;
  const loggedUser = useAuthStore(state => state.loggedUser);

  return useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!loggedUser,  // ⚡ On désactive si pas connecté
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}