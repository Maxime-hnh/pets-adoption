import { authHeader } from "@/_lib/auth-header";
import { handleResponse } from "@/_lib/handle-response";
import { useAuthStore } from "@/_stores/auth.store";
import { AuthRequest } from "@/_types/auth-request.interface";
import { AuthenticatedUser } from "@/_types/authenticated-user.interface.ts";
import { toast } from "sonner";

class AuthService {

  constructor() {
  }

  login = async (values: AuthRequest): Promise<AuthenticatedUser> => {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(values),
      credentials: 'include' as RequestCredentials,
    };
    return await handleResponse(await fetch(`/api/auth/login`, requestOptions));
  }

  logout = async () => {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      credentials: 'include' as RequestCredentials,
    };
    await handleResponse(await fetch(`/api/auth/logout`, requestOptions));
    const store = useAuthStore.getState();
    store.logout();
  }

  refreshToken = async (): Promise<AuthenticatedUser | void> => {
    const store = useAuthStore.getState(); //curent store

    if (store.isRefreshing) {
      return new Promise((resolve) => {
        store.addRefreshSubscriber(() => resolve(store.loggedUser!));
      })
    }

    store.setIsRefreshing(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        credentials: 'include' as RequestCredentials,
      };

      const response = await fetch('/api/auth/refresh', requestOptions);
      const user = await handleResponse(response);

      // Stocke le nouveau token
      store.setLoggedUser(user);

      // Notifie toutes les requêtes en attente
      store.refreshSubscribers.forEach((cb: any) => cb(user.accessToken));
      store.setRefreshSubscribers([]);

      return user;
    } catch (error) {
      toast.error("Session expirée", {
        description: "Veuillez vous reconnecter.",
      });
      store.logout();
      setTimeout(() => window.location.reload(), 1500);
    } finally {
      store.setIsRefreshing(false);
    }
  };

  me = async (cookies?: string) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        ...authHeader(),
        ...(cookies && { Cookie: cookies }),
      },
      credentials: 'include' as RequestCredentials,
    };
    return await handleResponse(await fetch(`/api/auth/me`, requestOptions));
  }
}

export const authService = new AuthService();