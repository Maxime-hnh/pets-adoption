import { AuthenticatedUser } from '@/_types/authenticated-user.interface.ts'
import { create } from 'zustand'

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

export const useAuthStore = create<AuthState>((set) => ({
    loggedUser: null,
    setLoggedUser: (user) => {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        set({ loggedUser: user });
    },
    logout: () => {
        localStorage.removeItem('loggedUser');
        set({ loggedUser: null });
    },
    isRefreshing: false,
    refreshSubscribers: [],
    setIsRefreshing: (value) => set({ isRefreshing: value }),
    setRefreshSubscribers: (subs) => set({ refreshSubscribers: subs }),
    addRefreshSubscriber: (cb) => set((state) => ({
        refreshSubscribers: [...state.refreshSubscribers, cb],
    })),
}));