import { useParams } from "react-router-dom";
import FamilyFormPage from "./FamilyFormPage";

export default function EditFamilyPage() {

  const { id } = useParams<{ id: string }>();

	 return <FamilyFormPage mode="edit" familyId={id} />
}