import { AuthenticatedUser } from '@/_types/authenticated-user.interface.ts'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface AuthState {
    loggedUser: AuthenticatedUser | null;
    setLoggedUser: (user: AuthState['loggedUser']) => void;
    logout: () => void;
    isRefreshing: boolean;
    refreshSubscribers: ((token: string) => void)[];
    setIsRefreshing: (value: boolean) => void;
    setRefreshSubscribers: (subs: ((token: string) => void)[]) => void;
    addRefreshSubscriber: (cb: (token: string) => void) => void;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      loggedUser: null,
      setLoggedUser: (user) => set({ loggedUser: user }),
      logout: () => set({ loggedUser: null }),

      isRefreshing: false,
      refreshSubscribers: [],
      setIsRefreshing: (value) => set({ isRefreshing: value }),
      setRefreshSubscribers: (subs) => set({ refreshSubscribers: subs }),
      addRefreshSubscriber: (cb) =>
        set((state) => ({
          refreshSubscribers: [...state.refreshSubscribers, cb],
        })),
    }),
    {
      name: 'loggedUser',
      partialize: (state) => ({
        loggedUser: state.loggedUser,
      }),
    }
  )
);