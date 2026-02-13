import { useParams } from "react-router-dom";
import CategoryFormPage from "./CategoryFormPage";

export default function EditCategoryPage() {

  const { id } = useParams<{ id: string }>();

	 return <CategoryFormPage mode="edit" categoryId={id} />
}
