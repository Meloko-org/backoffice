import { useNavigate } from "react-router-dom";
import type { FamilyFormValues } from "../types/family";
import { useEffect, useState } from "react";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { mapFamilyToFormValues, mapFormValuesToPayload } from "../mappers/family.mapper";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { familySchema } from "../schema/family.schema";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";
import { createFamily, getFamilyById, updateFamily } from "../api/families.api";
import { BallTriangle, FidgetSpinner } from "react-loader-spinner";

type FamilyFormPageProps = {
  mode: "create" | "edit";
  familyId?: string;
}

export default function FamilyFormPage({
  mode,
  familyId,
}: FamilyFormPageProps) {

  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const defaultValues: FamilyFormValues = {
    name: "",
    description: "",
    image: null,
    category: "",
    tagCategories: [],
    productsTypes: "classic", 
  };


  const [initialValues, setInitialValues] =
      useState<Partial<FamilyFormValues>>(defaultValues);
  
  const [loading, setLoading] = useState(isEdit);

  useAdminPage(
    isEdit ? "Modifier la famille" : "Créer la famille"
  );

  /* chargement de la famille en mode edit */
  useEffect(() => {
    if (!isEdit || !familyId) return;

    const loadFamily = async () => {
      try {
        const category =
          await getFamilyById(familyId);

        setInitialValues(
          mapFamilyToFormValues(category)
        );
      } finally {
        setLoading(false);
      }
    };

    loadFamily();
  }, [isEdit, familyId]);


  const handleSubmit = async (
    values: FamilyFormValues
  ) => {
    const payload =
      mapFormValuesToPayload(values);

    if (isEdit && familyId) {
      await updateFamily(familyId, payload);
    } else {
      await createFamily(payload);
    }

    navigate("/admin/families");
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#98B66E"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

    return (
      <div className="p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <AdminForm<FamilyFormValues>
            schema={familySchema}
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