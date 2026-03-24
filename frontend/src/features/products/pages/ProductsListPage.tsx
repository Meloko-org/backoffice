import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminListPage from "../../../layouts/admin/pages/AdminListPage";



export default function ProductsListPage() {

  useAdminPage("Liste des produits (new)");

  return <AdminListPage model="products" />
}


