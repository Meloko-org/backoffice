import { useNavigate } from "react-router-dom";
import type { CategoryFormValues } from "../types/category";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { createCategory, getCategoryById, updateCategory } from "../api/categories.api";
import { mapCategoryToFormValues, mapFormValuesToPayload } from "../mappers/category.mapper";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { categoryFormSchema } from "../schema/category.schema";
import { useEffect, useState } from "react";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";
import type { ApiResponse } from "../../../types/global.types";
import Loader from "../../../components/admin/Loader";

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

  console.log("mode :", mode)
  console.log("isEdit :", isEdit)

  const defaultValues: CategoryFormValues = {
    name: "",
    description: "",
    image: null,
    type: "",
  }

  const [initialValues, setInitialValues] =
    useState<Partial<CategoryFormValues>>(defaultValues);

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
  ): Promise<ApiResponse<any>> => {
    
    const payload =
      mapFormValuesToPayload(values);

    if (isEdit && categoryId) {
      return await updateCategory(categoryId, payload);
    } else {
      return await createCategory(payload);
    }
  };


  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <AdminForm<CategoryFormValues>
          schema={categoryFormSchema}
          initialValues={initialValues}
          mode={mode}
          submitLabel={
            isEdit
              ? "Mettre à jour"
              : "Créer la catégorie"
          }
          onSubmit={handleSubmit}
          onSuccess={() => {
            console.log("youpi")
            navigate("/admin/categories");
          }}
          renderers={adminFormRenderers}
        />
      </div>
    </div>
  );
}
