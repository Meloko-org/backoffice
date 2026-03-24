import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminListPage from "../../../layouts/admin/pages/AdminListPage";

export default function FamiliesListPage() {

  useAdminPage("Liste des familles (new)");

  return <AdminListPage model="families" />
}