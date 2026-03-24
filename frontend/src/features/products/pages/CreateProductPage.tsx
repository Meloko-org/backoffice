import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";

export default function CreateProductPage() {

  useAdminPage("Créer un produit");
    
  return (
    <AdminFormPage
      model="products" 
      mode="create" 
    />
  )
}