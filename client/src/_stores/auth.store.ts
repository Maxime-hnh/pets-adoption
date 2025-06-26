import { AuthenticatedUser } from '@/_types/authenticated-user.interface.ts'
import { create } from 'zustand'

interface AuthState {
  loggedUser: AuthenticatedUser | null;
  isHydrated: boolean;
  setLoggedUser: (user: AuthenticatedUser | null) => void;
  setIsHydrated: (value: boolean) => void;
  logout: () => void;
  isRefreshing: boolean;
  refreshSubscribers: ((token: string) => void)[];
  setIsRefreshing: (value: boolean) => void;
  setRefreshSubscribers: (subs: ((token: string) => void)[]) => void;
  addRefreshSubscriber: (cb: (token: string) => void) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedUser: null,
  isHydrated: false,
  setLoggedUser: (user) => set({ loggedUser: user }),
  setIsHydrated: (value) => set({ isHydrated: value }),
  logout: () => set({ loggedUser: null }),
  isRefreshing: false,
  refreshSubscribers: [],
  setIsRefreshing: (value) => set({ isRefreshing: value }),
  setRefreshSubscribers: (subs) => set({ refreshSubscribers: subs }),
  addRefreshSubscriber: (cb) =>
    set((state) => ({
      refreshSubscribers: [...state.refreshSubscribers, cb],
    })),
}))