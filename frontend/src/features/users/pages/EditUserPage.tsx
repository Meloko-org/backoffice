import { useParams } from "react-router-dom";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <AdminFormPage
      model="users"
      mode="edit"
      id={id}
    />
  );
}