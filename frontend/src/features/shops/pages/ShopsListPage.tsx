import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminListPage from "../../../layouts/admin/pages/AdminListPage";

export default function ShopsListPage() {

  useAdminPage("Liste des shops");

  return <AdminListPage model="shops" />
}