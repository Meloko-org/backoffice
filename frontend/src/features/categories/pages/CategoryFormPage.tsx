import { useNavigate } from "react-router-dom";
import type { CategoryFormValues } from "../types/category";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { createCategory, getCategoryById, updateCategory } from "../api/categories.api";
import { mapCategoryToFormValues, mapFormValuesToPayload } from "../mappers/category.mapper";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { categorySchema } from "../schema/category.schema";
import { useEffect, useState } from "react";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";

type CategoryFormPageProps = {
  mode: "create" | "edit";
  categoryId?: string;
};

export default function CategoryFormPage({
  mode,
  categoryId,
}: CategoryFormPageProps) {
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const [initialValues, setInitialValues] =
    useState<Partial<CategoryFormValues>>();

  const [loading, setLoading] = useState(isEdit);

  useAdminPage(
    isEdit ? "Modifier la catégorie" : "Créer la catégorie"
  );


  useEffect(() => {
    if (!isEdit || !categoryId) return;

    const loadCategory = async () => {
      try {
        const category =
          await getCategoryById(categoryId);

        setInitialValues(
          mapCategoryToFormValues(category)
        );
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [isEdit, categoryId]);


  const handleSubmit = async (
    values: CategoryFormValues
  ) => {
    const payload =
      mapFormValuesToPayload(values);

    if (isEdit && categoryId) {
      await updateCategory(categoryId, payload);
    } else {
      await createCategory(payload);
    }

    navigate("/admin/categories");
  };

  if (loading) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <AdminForm<CategoryFormValues>
          schema={categorySchema}
          initialValues={initialValues}
          mode={mode}
          submitLabel={
            isEdit
              ? "Mettre à jour"
              : "Créer la catégorie"
          }
          onSubmit={handleSubmit}
          renderers={adminFormRenderers}
        />
      </div>
    </div>
  );
}
