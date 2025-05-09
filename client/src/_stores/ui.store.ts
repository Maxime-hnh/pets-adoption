import { create } from 'zustand';


interface UIStore {
    isMobile: boolean;
    setIsMobile: (value: boolean) => void;
}

export const useUIStore  = create<UIStore>((set) => ({
    isMobile: false,
    setIsMobile: (value:boolean) => set({ isMobile: value }),
    
}));
