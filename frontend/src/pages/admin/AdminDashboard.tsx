import { useAdminPage } from "../../hooks/useAdminPage";

export default function AdminDashboard() {

  useAdminPage("Dashboard Admin")

  return (
    <div className="p-8 space-y-6 bg-pr">

      <div className="bg-red-500 text-white p-8">
        TAILWIND IS ALIVE
      </div>

      <p className="text-gray-600">
        Accès réservé au rôle admin.
      </p>
    </div>
  );
}
