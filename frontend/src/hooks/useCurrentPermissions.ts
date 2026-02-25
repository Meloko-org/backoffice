import { ROLE_PERMISSIONS } from "../config/adminPermissions";
import { useUserRole } from "./useUserRole";

/* ce hook sert pour le menu */

export function useCurrentPermissions() {
  const { role, isLoaded } = useUserRole();

  if (!isLoaded || !role) return [];

  return ROLE_PERMISSIONS[role] ?? [];
}
