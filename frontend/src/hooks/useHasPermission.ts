import { ROLE_PERMISSIONS, type Permission } from "../config/adminPermissions";
import { useUserRole } from "./useUserRole";

export function useHasPermission(permission: Permission | Permission[]) {
  const { role, isLoaded } = useUserRole();

  if (!isLoaded || !role) return false;

  const allowed = ROLE_PERMISSIONS[role] ?? [];

  if (Array.isArray(permission)) {
    return permission.every(p => allowed.includes(p));
  }

  return allowed.includes(permission);
}



/* exemples d'utilisation

Bouton “Importer produits”
const canImport = useHasPermission("products:import");

{canImport && (
  <Button>Importer des produits</Button>
)}

🔹 Page protégée
const canRead = useHasPermission("products:read");

if (!canRead) {
  return <Navigate to="/admin" replace />;
}


*/