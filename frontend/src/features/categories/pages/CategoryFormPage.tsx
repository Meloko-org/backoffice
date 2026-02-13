import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TypeForSelect } from "../../types/types/type";
import type { CategoryFormValues, CategoryPayload } from "../types/category";
import type { FormField } from "../../../types/form/fieldConfig.type";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { getTypeNames } from "../../types/api/types.api";
import { createCategory, getCategoryById, updateCategory } from "../api/categories.api";
import { mapCategoryToFormValues, mapFormValuesToPayload } from "../mappers/category.mapper";
import { CategoryForm } from "../form/CategoryForm";
import { useCrudForm } from "../../../hooks/useCrudForm";

type CategoryFormPageProps = {
  mode: "create" | "edit";
  categoryId?: string;
};


export default function CategoryFormPage({
  mode,
  categoryId,
}: CategoryFormPageProps) {
  const navigate = useNavigate();

  const [types, setTypes] = useState<TypeForSelect[]>([]);

	useEffect(() => {
    getTypeNames().then(setTypes);
  }, []);


	/* fonction de validation des champs required à passer au hook useCrudform */
  const validateCategory = () => {
    const newErrors: Record<string, string> = {};

    if (!values.name) newErrors.name = "Le nom est obligatoire";
    if (!values.type) newErrors.type = "Le type est obligatoire";

		return newErrors;
  };


	/* appel du hook useCrudForm avec injection des données nécessaires */
	const {
		values,
		setValues,
		globalError,
		loading,
		handleSubmit,
		isEdit,
		errors,
	} = useCrudForm<CategoryFormValues, CategoryPayload>({
		mode,
		id: categoryId,

		defaultValues: {
			name: "",
			description: "",
			image: "",
			type: "",
		},

		fetchById: getCategoryById,
		mapToFormValues: mapCategoryToFormValues,
		mapToPayload: mapFormValuesToPayload,

		validate: validateCategory,

		createAction: createCategory,
		updateAction: updateCategory,

		onSuccess: () => navigate("/admin/categories"),

		resetOnSuccess: mode === "create",
	});

	// titre de la page
	useAdminPage(
    isEdit ? "Modifier la catégorie" : "Créer une catégorie"
  );


  const fields: FormField[] = [
    {
      name: "name",
      label: "Nom",
      type: "floating-input",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "floating-input",
    },
    {
      name: "image",
      label: "Image",
      type: "floating-input",
    },
    {
      name: "type",
      label: "Type",
      type: "floating-select",
      options: types.map((t) => ({
        value: t._id,
        label: t.name,
      })),
      required: true,
      disabled: isEdit, // 🔥 seule différence
    },
  ];

  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <CategoryForm
          fields={fields}
          values={values}
          onChange={(name, value) =>
            setValues((prev) => ({ ...prev, [name]: value }))
          }
          onSubmit={handleSubmit}
          submitLabel={
            isEdit ? "Mettre à jour" : "Créer la catégorie"
          }
          errors={errors}
          globalError={globalError}
        />
      </div>
    </div>
  );
}
