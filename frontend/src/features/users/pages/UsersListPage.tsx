import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminListPage from "../../../layouts/admin/pages/AdminListPage";


export default function UsersListPage() {

  useAdminPage("Liste des Users");

  return <AdminListPage model="users" />
}


