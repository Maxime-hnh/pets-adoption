import { MessageEntity, MessageStatus } from "@/_schemas/message.schema"
import { messagesService } from "@/_services/messages.service"
import { MessagesTab, useAdminStore } from "@/_stores/admin.store"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useMemo } from "react"

const { getAll, getMyMessages } = messagesService;

export const useAllMessagesQuery = () => {
  return useQuery<MessageEntity[], Error>({
    queryKey: ['messages', 'all'],
    queryFn: getAll,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
};

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

/**
 * Hook personnalisé pour filtrer les messages avec useMemo pour optimiser les performances
 */
export const useFilteredMessages = (messages: MessageEntity[] = []) => {
  const activeTab = useAdminStore((state) => state.activeMessagesTab);
  const searchValue = useAdminStore((state) => state.searchMessagesValue);

  const filteredMessages = useMemo(() => {
    if (!messages.length) return [];

    return messages.filter((message) => {
      // Filtrage par onglet actif
      const tabFilter = activeTab === MessagesTab.ALL 
        ? true 
        : message.status === MessageStatus.RECEIVED;

      if (!tabFilter) return false;

      // Filtrage par recherche (vide = tous les résultats)
      if (!searchValue.trim()) return true;

      const searchLower = searchValue.toLowerCase();
      return (
        message.subject?.toLowerCase().includes(searchLower) ||
        message.nameSender?.toLowerCase().includes(searchLower) ||
        message.emailSender?.toLowerCase().includes(searchLower)
      );
    });
  }, [messages, activeTab, searchValue]);

  return filteredMessages;
};
