import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";

export default function CreateCategoryPage() {

  useAdminPage("Créer une catégorie");
  
  return (
    <AdminFormPage
      model="categories" 
      mode="create" 
    />
  )
}



