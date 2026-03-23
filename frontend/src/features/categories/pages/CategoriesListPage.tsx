import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminListPage from "../../../layouts/admin/pages/AdminListPage";

export default function CategoriesListPage() {

  useAdminPage("Liste des catégories (new)");

  return <AdminListPage model="categories" />
}