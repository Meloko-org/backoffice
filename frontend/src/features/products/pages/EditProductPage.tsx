import { useParams } from "react-router-dom";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";
import { useAdminPage } from "../../../hooks/useAdminPage";

export default function EditProductPage() {

  const { id } = useParams<{ id: string}>();

  if (!id) return null;

  useAdminPage("Modifier le produit");

  return (
    <AdminFormPage
      model="products" 
      mode="edit" 
      id={id} 
    />
  )
}