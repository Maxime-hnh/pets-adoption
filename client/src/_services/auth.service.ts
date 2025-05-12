import { authHeader } from "@/_helpers/auth-header";
import { handleResponse } from "@/_helpers/handle-response";
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
    };
    return await handleResponse(await fetch(`/api/auth/login`, requestOptions));
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
      };

      const response = await fetch('/api/auth/refreshToken', requestOptions);
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
}

export const authService = new AuthService();