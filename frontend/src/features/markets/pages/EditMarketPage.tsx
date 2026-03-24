import { useParams } from "react-router-dom";
import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";

export default function EditMarketPage() {

  const { id } = useParams<{ id: string }>();
  
    if (!id) return null;
  
    useAdminPage("Modifier le point de vente");
  
    return (
      <AdminFormPage
        model="markets" 
        mode="edit" 
        id={id} 
      />
    )
}