import { useParams } from "react-router-dom";
import AdminFormPage from "../../../layouts/admin/pages/AdminFormPage";

export default function EditProducerPage() {
  const { id } = useParams<{ id: string}>();

  if (!id) return null;

  return (
    <AdminFormPage
      model="producers"
      mode="edit"
      id={id}
    />
  );
}