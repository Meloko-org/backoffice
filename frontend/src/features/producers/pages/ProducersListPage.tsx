import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminListPage from "../../../layouts/admin/pages/AdminListPage";

export default function ProducersListPage() {

  useAdminPage("Liste des Producteurs");

  return <AdminListPage model="producers" />
}