import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

export default function PostLoginRedirect() {
  const { role, isLoaded } = useUserRole();

  if (!isLoaded) {
    return <div className="p-8">Connexion en cours…</div>;
  }

  if (role && ["admin", "dev", "support"].includes(role)) {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/" replace />;
}
