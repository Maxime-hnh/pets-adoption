import { create } from 'zustand';


interface UIStore {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
  showHeader: boolean;
  setShowHeader: (value: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobile: false,
  setIsMobile: (value: boolean) => set({ isMobile: value }),
  showHeader: true,
  setShowHeader: (value: boolean) => set({ showHeader: value }),
}));
