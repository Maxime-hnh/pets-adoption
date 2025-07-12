import { MessageEntity } from "@/_schemas/message.schema";
import { messagesService } from "@/_services/messages.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateNoteMessage = () => {
  const queryClient = useQueryClient();
  const { updateInternalNotes } = messagesService;

  return useMutation({
    onMutate: async ({ id, values }) => {
      // Cancel any ongoing fetch for the animal list
      await queryClient.cancelQueries({ queryKey: ['messages', 'all'] });
      // Backup the current list of animals before optimistic update
      const backupData = queryClient.getQueryData<MessageEntity[]>(['messages', 'all']);
      // Apply optimistic update: update the target animal in cache immediately
      queryClient.setQueryData<MessageEntity[]>(['messages', 'all'], (old) =>
        old!.map(messages =>
          messages.id === id
            ? { ...messages, ...values }
            : messages
        )
      );
      // Return backup for potential rollback in case of error
      return { backupData };
    },
    mutationFn: ({ id, values }: { id: number; values: Partial<MessageEntity> }) =>
      updateInternalNotes(id, values),
    onSuccess: (data, { id }) => {
      toast.success(`Les notes du message ${id} a bien été mis à jour`)
    },
    onError: (error, { id }, context) => {
      queryClient.setQueryData(['messages', 'all'], context?.backupData);
      toast.error(`Une erreur est survenue pendant la modification des notes du message ${id}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages', 'all'],
        refetchType: 'none'
      });
    },
  });
}