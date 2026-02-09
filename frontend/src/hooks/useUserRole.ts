import { useUser } from "@clerk/clerk-react";
import type { AdminRole } from "../types/admin";

export function useUserRole() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return { role: null, isLoaded };
  }

  const role = user.publicMetadata?.role as AdminRole | undefined;

  return {
    role: role ?? null,
    isLoaded,
  };
}
