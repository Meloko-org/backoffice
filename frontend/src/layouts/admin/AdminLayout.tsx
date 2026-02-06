import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import { useAdminLayout } from "./AdminLayoutContext";


function AdminLayoutContent() {

  const { isLeftOpen, isRightOpen } = useAdminLayout() ;

  console.log("LAYOUT left et right :", isLeftOpen, isRightOpen)

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* Sidebar gauche (fixe, derrière) */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-primary">
        Sidebar gauche
      </aside>

      {/* Sidebar droite (fixe, derrière) */}
      <aside className="fixed inset-y-0 right-0 w-64 bg-primary">
        Sidebar droite
      </aside>

      {/* Zone centrale (au-dessus) */}
      <div
        className={`
          relative z-20 flex h-full flex-col bg-lightbg
          transition-all duration-300 ease-in-out
          ${isLeftOpen ? "ml-64" : "ml-0"}
          ${isRightOpen ? "mr-64" : "mr-0"}
        `}
      >
        <AdminHeader />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default function AdminLayout() {
  return (
    <AdminLayoutContent />
  );
}
