import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";

export default function CreateMarketPage() {
  useAdminPage("Créer un point de vente");
    
    return (
      <AdminFormPage
        model="markets" 
        mode="create" 
      />
    )
}