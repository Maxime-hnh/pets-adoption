import { create } from 'zustand';

interface UIStore {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
  activeNavItem: string;
  setActiveNavItem: (item: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobile: false,
  setIsMobile: (value: boolean) => set({ isMobile: value }),
  activeNavItem: '/',
  setActiveNavItem: (item: string) => set({ activeNavItem: item }),
}));
