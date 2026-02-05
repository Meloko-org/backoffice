import { createCategory } from "../api/categories.api";
import { CategoryForm } from "../form/CategoryForm";
import { useNavigate } from "react-router-dom";
import type { CategoryPayload } from "../types/category";
import { useEffect, useState } from "react";
import type { Type } from "../../types/types/type";
import { getTypeNames } from "../../types/api/types.api";
import type { FormField } from "../../../types/form/fieldConfig.type";
import type { ApiError } from "../../../types/global.types";

export default function CreateCategoryPage() {
  const navigate = useNavigate();
	const [globalError, setGlobalError] = useState<ApiError | undefined>();
	const [types, setTypes] = useState<Type[]>([]);
	

	/* initialisation de values pour gestion des errors */
	const [ values, setValues ] = useState<CategoryPayload>({
		name: "",
		description: "",
		image: "",
		type: "",
	})
	const [ errors, setErrors ] = useState<Record<string, string>>({});

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!values.name) newErrors.name = "Le nom est obligatoire";
		if (!values.type) newErrors.type = "Le type est obligatoire";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};


	/* récupération des noms des types */
	useEffect(() => {
		getTypeNames().then((res) => {
			if (res.success) {
				setTypes(res.data);
			}
		});
	}, []);


	/* définition des champs constituant le form */
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
			disabled: false,
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
			disabled: false,
		},
	];


  const handleSubmit = async (payload: CategoryPayload) => {

		if (!validate()) return;

		try {
			await createCategory(payload);
    	navigate("/admin/categories");
		} catch (error) {

			const apiError = error as ApiError;
			setGlobalError(apiError)
		}
  };

  return (
    <>
      <h1>Créer une catégorie</h1>

      <CategoryForm<CategoryPayload>
				fields={fields}
				values={values}
				onChange={(name, value) =>
					setValues((prev) => ({ ...prev!, [name]: value }))
				}
				onSubmit={handleSubmit}
				submitLabel="Mettre à jour"
				errors={errors}
				globalError={globalError}
			/>
    </>
  );
}
