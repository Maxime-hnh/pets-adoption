import { Animal } from "@/_schemas/animal.schema";
import { animalsService } from "@/_services/animals.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useQuickPropsUpdate = () => {
  const queryClient = useQueryClient();
  const { update } = animalsService;

  return useMutation({
    onMutate: async ({ id, values }) => {
      // Cancel any ongoing fetch for the animal list
      await queryClient.cancelQueries({ queryKey: ['animals', 'all'] });
      // Backup the current list of animals before optimistic update
      const backupData = queryClient.getQueryData<Animal[]>(['animals', 'all']);
      // Apply optimistic update: update the target animal in cache immediately
      queryClient.setQueryData<Animal[]>(['animals', 'all'], (old) =>
        old!.map(animal =>
          animal.id === id
            ? { ...animal, ...values }
            : animal
        )
      );
      // Return backup for potential rollback in case of error
      return { backupData };
    },
    mutationFn: ({ id, values }: { id: number; values: Partial<Animal> }) =>
      update(id, values),
    onSuccess: (data, { id }) => {
      toast.success(`Mise à jour réussie de l'animal nommé ${data.name}`)
    },
    onError: (error, { id }, context) => {
      // Roll back to the previous data in case of error
      queryClient.setQueryData(['animals', 'all'], context?.backupData);
      toast.error(`Une erreur est survenue pendant la modification de l'animal ${id}`)
    },
    onSettled: () => {
      // Invalidate the animal list query so it's marked stale
      // Won't refetch automatically unless refetchOnMount or staleTime allows it
      queryClient.invalidateQueries({
        queryKey: ['animals', 'all'],
        refetchType: 'none'
      });
    },
  });
}