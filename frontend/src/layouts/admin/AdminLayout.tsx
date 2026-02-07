import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import { useAdminLayout } from "./AdminLayoutContext";
import AdminSidebarLeft from "../../components/admin/AdminSidebarLeft";
import AdminSidebarRight from "../../components/admin/AdminSidebarRight";


function AdminLayoutContent() {

  const { isLeftOpen, isRightOpen } = useAdminLayout() ;

  console.log("LAYOUT left et right :", isLeftOpen, isRightOpen)

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* Sidebar gauche (fixe, derrière) */}
      <AdminSidebarLeft />

      {/* Sidebar droite (fixe, derrière) */}
      <AdminSidebarRight />


      {/* Zone centrale (au-dessus) */}
      <div
        className={`
          relative z-20 flex h-full flex-col
          transition-all duration-300 ease-in-out
          isolate
          ${isLeftOpen ? "ml-64" : "ml-0"}
          ${isRightOpen ? "mr-64" : "mr-0"}
        `}
        
        /**
         * Permet à la zone centrale d'avoir une couleur de fond qui masque bien les sidebar
         * sans sacrifier le drak mode
         */
        style={{ background: "var(--app-surface-bg)" }}
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
