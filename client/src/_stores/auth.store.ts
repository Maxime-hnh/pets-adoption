import { create } from 'zustand'

interface AuthState {
    loggedUser: { id: string; email: string } | null
    setLoggedUser: (user: AuthState['loggedUser']) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    loggedUser: null,
    setLoggedUser: (loggedUser) => set({ loggedUser }),
    logout: () => set({ loggedUser: null }),
}))
