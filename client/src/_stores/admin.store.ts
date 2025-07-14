import { MessageEntity } from "@/_schemas/message.schema";
import { create } from "zustand";

export enum MessagesTab {
  ALL = "all",
  UNREAD = "unread"
}

interface AdminStore {
  selectedMessage: MessageEntity | null;
  setSelectedMessage: (message: MessageEntity | null) => void;
  activeMessagesTab: MessagesTab;
  setActiveMessagesTab: (tab: MessagesTab) => void;
  searchMessagesValue: string;
  setSearchMessagesValue: (value: string) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  selectedMessage: null,
  setSelectedMessage: (message) => set({ selectedMessage: message }),
  activeMessagesTab: MessagesTab.ALL,
  setActiveMessagesTab: (tab) => set({ activeMessagesTab: tab }),
  searchMessagesValue: "",
  setSearchMessagesValue: (value) => set({ searchMessagesValue: value }),
}));