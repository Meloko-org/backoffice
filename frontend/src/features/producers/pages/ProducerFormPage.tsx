import { useNavigate } from "react-router-dom";
import type { ProducerFormValues } from "../types/producer";
import { useEffect, useState } from "react";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { getProducerById, updateProducer } from "../api/producer.api";
import { mapFormValuesToPayload, mapProducerToFormValues } from "../mappers/producer.mapper";
import type { ApiResponse } from "../../../types/global.types";
import Loader from "../../../components/admin/Loader";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { producerFormSchema } from "../schema/producer.schema";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";

type ProducerFormPageProps = {
  producerId?: string;
  mode: "edit" | "create"
}

export default function ProducerFormPage({ producerId }: ProducerFormPageProps) {

  const navigate = useNavigate();

  const defaultValues: ProducerFormValues = {
    socialReason: "",
    siren: "",
    iban: "",
    bic: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    country: "",
  }

  const [ initialValues, setInitialValues ] =
    useState<ProducerFormValues>(defaultValues);

  const [ loading, setLoading ] = useState<boolean>(false);

  useAdminPage("Modifier le producer");

  useEffect(() => {
    if (!producerId) return;

    const loadProducer = async () => {
      setLoading(true)

      try {
        const producer = await getProducerById(producerId)

        setInitialValues(
          mapProducerToFormValues(producer)
        )
      } finally {
        setLoading(false)
      }
    }

    loadProducer();
  }, [producerId])


  const handleSubmit = async (
    values: ProducerFormValues
  ): Promise<ApiResponse<any>> => {


    const payload =
      mapFormValuesToPayload(values);

    return updateProducer(producerId!, payload);
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
      <div className="p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <AdminForm<ProducerFormValues>
            schema={producerFormSchema}
            initialValues={initialValues}
            mode="edit"
            submitLabel="Mettre à jour"
            onSubmit={handleSubmit}
            onSuccess={() => {
              navigate("/admin/producers");
            }}
            renderers={adminFormRenderers}
          />
        </div>
      </div>
    )
}