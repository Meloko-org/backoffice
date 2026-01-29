import { Navigate } from "react-router-dom";
import { useUserRole } from "../../hooks/useUserRole";

export default function AdminDashboard() {
  const { role, isLoaded } = useUserRole();

  if (!isLoaded) {
    return <div className="p-8">Chargement…</div>;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-8 space-y-6 bg-pr">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
				
      </div>

      <div className="bg-red-500 text-white p-8">
        TAILWIND IS ALIVE
      </div>

      <p className="text-gray-600">
        Accès réservé au rôle admin.
      </p>
    </div>
  );
}
