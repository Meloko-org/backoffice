import { useParams } from "react-router-dom";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";
import { useAdminPage } from "../../../hooks/useAdminPage";

export default function EditCategoryPage() {

  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  useAdminPage("Modifier la catégorie");

	return (
    <AdminFormPage
      model="categories" 
      mode="edit" 
      id={id} 
    />
  )
   
}
