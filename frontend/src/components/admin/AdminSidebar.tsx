import { NavLink } from "react-router-dom";
import DarkModeToggle from "../global/DarkModeToggle";

type Props = {
  role: string;
};

export default function AdminSidebar({ role }: Props) {
  return (
    <aside className="w-64 border-r p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Meloko Admin</h2>

      <div className="mr-5">
        <DarkModeToggle />
      </div>

      <nav className="space-y-2">
        <NavLink to="/admin" className="block hover:text-blue-600">
          Dashboard
        </NavLink>

        {(role === "admin" || role === "dev") && (
          <>
            <NavLink to="/admin/products" className="block hover:text-blue-600">
              Produits
            </NavLink>
            <NavLink to="/admin/products/import" className="block ml-4 text-sm hover:text-blue-600">
              Import CSV
            </NavLink>
            <NavLink to="/admin/categories" className="block hover:text-blue-600">
              Catégories
            </NavLink>
            <NavLink to="/admin/markets" className="block hover:text-blue-600">
              Markets
            </NavLink>
            <NavLink to="/admin/markets/import" className="block ml-4 text-sm hover:text-blue-600">
              Import CSV
            </NavLink>
          </>
        )}

        {(role === "admin" || role === "support") && (
          <NavLink to="/admin/support" className="block hover:text-blue-600">
            Support
          </NavLink>
        )}
      </nav>
    </aside>
  );
}
