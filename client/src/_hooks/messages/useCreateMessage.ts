import { CreateMessageEntity } from "@/_schemas/message.schema";
import { messagesService } from "@/_services/messages.service";
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateMessage = () => {
  const { create } = messagesService;
  return useMutation({
    mutationFn: (values: CreateMessageEntity) => create(values),
    onSuccess: () => {
      toast.success(`Votre message a bien été envoyé !`)
    },
    onError: () => {
      toast.error(`Une erreur est survenue lors de l'envoi de votre message`)
    }
  })
}
