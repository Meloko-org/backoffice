import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useUserRole } from "../hooks/useUserRole";
import { useHasPermission } from "../hooks/useHasPermission";
import type { Permission } from "../config/adminPermissions";
import { BallTriangle } from "react-loader-spinner";

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
    return (
      <div className="w-full h-full flex justify-center items-center bg-warning">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#98B66E"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
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
