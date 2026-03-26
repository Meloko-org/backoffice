import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminListPage from "../../../layouts/admin/pages/AdminListPage";

export default function OrdersListPage() {

  useAdminPage("Liste des commandes (new)");

  return <AdminListPage model="orders" />
}