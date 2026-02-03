import { createCategory } from "../api/categories.api";
import { CategoryForm } from "../components/CategoryForm";
import { useNavigate } from "react-router-dom";
import type { CategoryPayload } from "../types/category";

export default function CreateCategoryPage() {
  const navigate = useNavigate();

  const handleCreate = async (payload: CategoryPayload) => {
    await createCategory(payload);
    navigate("/admin/categories");
  };

  return (
    <>
      <h1>Créer une catégorie</h1>
      <CategoryForm submitLabel="Créer" onSubmit={handleCreate} />
    </>
  );
}
