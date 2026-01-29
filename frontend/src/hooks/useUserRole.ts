import { useUser } from "@clerk/clerk-react";

export function useUserRole() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return { role: null, isLoaded };
  }

  const role = user.publicMetadata?.role as string | undefined;

  return {
    role: role ?? null,
    isLoaded,
  };
}
