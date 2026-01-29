import { Outlet, Navigate } from "react-router-dom";
import  { useAuth } from "@clerk/clerk-react";
import { useUserRole } from "../hooks/useUserRole";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout() {
  const { role, isLoaded } = useUserRole();
	const  { isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="p-8">Chargement…</div>;
  }

	if (!isSignedIn) {
		return <Navigate to="/login" replace />
	}

  if (!role || !["admin", "dev", "support"].includes(role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-screen">
      <AdminSidebar role={role} />

      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
