import { favoritesService } from "@/_services/favorites.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();
  const { removeFromFavorites } = favoritesService

  return useMutation({
    mutationFn: (animalId: number) => removeFromFavorites(animalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('Animal supprimé de vos favoris !')
    },
    onError: () => {
      toast.error('Une erreur est survenue')
    }
  })
}