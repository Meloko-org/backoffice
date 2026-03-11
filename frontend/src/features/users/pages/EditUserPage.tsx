import { useParams } from "react-router-dom";
import UserFormPage from "./UserFormPage";

export default function EditUserPage() {
  
  const { id } = useParams<{ id: string}>();

  return <UserFormPage mode="edit" userId={id} />
}