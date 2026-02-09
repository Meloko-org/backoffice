import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useUserRole } from "../hooks/useUserRole";
import { useHasPermission } from "../hooks/useHasPermission";
import type { Permission } from "../config/adminPermissions";

type Props = {
  children: ReactNode;
  permission?: Permission;
};

export default function AdminRouteGuard({
  children,
  permission,
}: Props) {
	
  const { isLoaded, user } = useUser();
  const { role } = useUserRole();
  const hasPermission = useHasPermission;

  // ⏳ Attente Clerk
  if (!isLoaded) {
    return <div className="p-8">Chargement…</div>;
  }

  // 🚫 Pas connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Pas de rôle
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // 🚫 Permission requise mais absente
  if (permission && !hasPermission(permission)) {
    return <Navigate to="/admin" replace />;
  }

  // ✅ Autorisé
  return <>{children}</>;
}
