import { useParams } from "react-router-dom";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";

export default function EditCategoryPage() {

  const { id } = useParams<{ id: string }>();

  if (!id) return null;

	 return (
    <AdminFormPage
      model="categories" 
      mode="edit" 
      id={id} 
    />
   )
   
}
