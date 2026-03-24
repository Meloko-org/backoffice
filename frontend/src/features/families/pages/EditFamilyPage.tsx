import { useParams } from "react-router-dom";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";
import { useAdminPage } from "../../../hooks/useAdminPage";

export default function EditFamilyPage() {

  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  useAdminPage("Modifier la famille");

	return (
    <AdminFormPage
      model="families"
      mode="edit"
      id={id}
    />
  )
}