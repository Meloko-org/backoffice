import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import { useAdminLayout } from "./AdminLayoutContext";
// import AdminSidebarRight from "../../../src/components/admin/AdminSidebarRight";
import AdminSidebarRight from "./AdminSidebarRight";
import AdminSidebar from "./AdminSidebar";
import { ConfirmProvider } from "./providers/ConfirmProvider";
import { useConfirm } from "./contexts/ConfirmContext";


function AdminLayoutContent() {

  const { isLeftOpen, isRightOpen } = useAdminLayout();
  const { isOpen } = useConfirm();

  // console.log("ADMIN_LAYOUT")

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* Sidebar gauche (fixe, derrière) */}
      <AdminSidebar />

      {/* Sidebar droite (fixe, derrière) */}
      <AdminSidebarRight />


      {/* Zone centrale (au-dessus) */}
      <div
        className={`
          relative z-20 flex h-full flex-col
          transition-all duration-300 ease-in-out
          isolate
          ${isLeftOpen ? "ml-64" : "ml-16"}
          ${isRightOpen ? "mr-96" : "mr-0"}
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

      {/* on rajoute un overlay sur tout l'écran pour empécher d'interagir quand confirmPanel est ouvert */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" />
      )}

    </div>
  );
}

export default function AdminLayout() {
  return (
    <ConfirmProvider>
      <AdminLayoutContent />
    </ConfirmProvider>
  );
}
