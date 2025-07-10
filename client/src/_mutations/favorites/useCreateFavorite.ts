import { PublicAnimal } from "@/_schemas/animal.schema";
import { favoritesService } from "@/_services/favorites.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateFavorite = () => {
  const queryClient = useQueryClient();
  const { addToFavorites } = favoritesService;

  return useMutation({
    mutationFn: (animalId: number) => addToFavorites(animalId),
    onMutate: async (animalId: number) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });

      const previousFavorites = queryClient.getQueryData<PublicAnimal[]>(['favorites']);

      // Mise à jour immédiate (optimistic)
      queryClient.setQueryData<PublicAnimal[]>(['favorites'], old =>
        old ? [...old, { id: animalId } as PublicAnimal] : [{ id: animalId } as PublicAnimal]
      );

      return { previousFavorites };
    },
    onError: (err, animalId, context) => {
      // Rollback
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
      toast.error('Une erreur est survenue');
    },
    onSuccess: () => {
      toast.success('Animal ajouté aux favoris !')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  })
}