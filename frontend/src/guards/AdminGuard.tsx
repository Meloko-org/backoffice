import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
	
  const { role, isLoaded } = useUserRole();

  if (!isLoaded) {
    return <div className="p-8">Chargement…</div>;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
