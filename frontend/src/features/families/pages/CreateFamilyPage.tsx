import { useAdminPage } from "../../../hooks/useAdminPage";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";

export default function CreateFamilyPage() {

  useAdminPage("Créer une famille");
  
  return (
    <AdminFormPage
      model="families"
      mode="create"
    />
  )
}