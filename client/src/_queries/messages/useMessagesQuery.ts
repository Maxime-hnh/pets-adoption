import { MessageEntity } from "@/_schemas/message.schema"
import { messagesService } from "@/_services/messages.service"
import { useQuery } from "@tanstack/react-query"

const { getAll, getMyMessages } = messagesService;

export const useMessagesQuery = () => {
  return useQuery<MessageEntity[]>({
    queryKey: ['messages', 'all'],
    queryFn: getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}

export const useMyMessagesQuery = () => {
  return useQuery<MessageEntity[]>({
    queryKey: ['messages', 'mine'],
    queryFn: getMyMessages,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}
