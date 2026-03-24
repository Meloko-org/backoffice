import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminListPage from "../../../layouts/admin/pages/AdminListPage";

export default function MarketsListPage() {

  useAdminPage("Liste des points de vente (new)");
  
  return <AdminListPage model="markets" />
}
