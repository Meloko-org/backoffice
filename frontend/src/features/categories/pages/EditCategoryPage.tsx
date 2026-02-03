import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CategoryForm } from "../components/CategoryForm";
import { getCategoryById, updateCategory } from "../api/categories.api";
import type {
  ProductCategory,
  CategoryPayload,
} from "../types/category";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<ProductCategory | null>(null);

  useEffect(() => {
    if (!id) return;
    // getCategoryById(id).then((res) => setCategory(res.data));
		(async () => {
			console.log("id dans useEffect :", id)
			const res = await getCategoryById(id)

			if (res.success) {
				console.log("res :", res.data)
				setCategory(res.data)
			}
		})()
  }, [id]);

  if (!category) return <p>Chargement...</p>;

  const handleUpdate = async (payload: CategoryPayload) => {
    await updateCategory(id!, payload);
    navigate("/admin/categories");
  };

	console.log("id params: ", id)
	console.log("category :", category)

  return (
    <>
      <h1>Modifier la catégorie</h1>
      <CategoryForm
        initialValues={category}
        submitLabel="Mettre à jour"
        onSubmit={handleUpdate}
      />
    </>
  );
}
