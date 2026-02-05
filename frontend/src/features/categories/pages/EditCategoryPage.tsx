import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CategoryForm } from "../form/CategoryForm";
import { getCategoryById, updateCategory } from "../api/categories.api";
import type {
  CategoryPayload,
} from "../types/category";
import { getTypeNames } from "../../types/api/types.api";
import type { FormField } from "../../../types/form/fieldConfig.type";
import type { Type } from "../../types/types/type";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const [category, setCategory] = useState<ProductCategory | null>(null);

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


	useEffect(() => {
    getTypeNames().then((res) => {
      setTypes(res.data);
    });
  }, []);

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
			disabled: true,
		},
	];


  useEffect(() => {
    if (!id) return;

		(async () => {
			console.log("id dans useEffect :", id)
			const res = await getCategoryById(id)

			if (res.success) {
				console.log("res :", res.data)
				const cat = res.data;

				setValues({
					name: cat.name,
					description: cat.description,
					type: cat.type._id
				})
				// setCategory(res.data)
			}
		})()
  }, [id]);

  // if (!category) return <p>Chargement...</p>;
	if (values === null) return <p>Chargement...</p>;

  const handleSubmit = async (payload: CategoryPayload) => {
		if (!validate()) return;

    await updateCategory(id!, payload);
    navigate("/admin/categories");
  };

	console.log("id params: ", id)
	console.log("values :", values)
	console.log("types :", types)

  return (
    <>
      <h1>Modifier la catégorie</h1>

			<CategoryForm<CategoryPayload>
				fields={fields}
				values={values}
				onChange={(name, value) =>
					setValues((prev) => ({ ...prev!, [name]: value }))
				}
				onSubmit={handleSubmit}
				submitLabel="Mettre à jour"
				errors={errors}
			/>
			
    </>
  );
}
