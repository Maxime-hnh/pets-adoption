import { useAuthStore } from "@/_stores/auth.store";
import { useEffect } from "react";

export function useAuthHydration() {
  const setLoggedUser = useAuthStore((state) => state.setLoggedUser);
  const loggedUser = useAuthStore((state) => state.loggedUser);

  useEffect(() => {
    if (loggedUser === null) {
      const stored = localStorage.getItem("loggedUser");
      if (stored) {
        try {
          setLoggedUser(JSON.parse(stored));
        } catch (error) {
          localStorage.removeItem("loggedUser");
        }
      }
    }
  }, [setLoggedUser, loggedUser]);
}
