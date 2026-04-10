import { useParams } from "react-router-dom";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";

export default function EditShopPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <AdminFormPage
      model="shops"
      mode="edit"
      id={id}
    />
  );
}