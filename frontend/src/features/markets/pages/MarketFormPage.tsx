import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import type { MarketFormValues } from "../types/markets";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { createMarket, getMarketById, updateMarket } from "../api/markets.api";
import { mapFormToPayload, mapMarketToFormValues } from "../mappers/market.mapper";
import { BallTriangle } from "react-loader-spinner";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { marketSchema } from "../schema/market.schema";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";
import type { ApiResponse } from "../../../types/global.types";

type MarketFormPageProps = {
  mode: "create" | "edit",
  marketId?: string,
}

export default function MarketFormPage({
  mode,
  marketId,
}: MarketFormPageProps) {

  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const defaultValues = {
    name: "",
    description: "",
    image: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
  }

  const [ initialValues, setInitialValues ] = useState<Partial<MarketFormValues>>(defaultValues)

  const [ loading, setLoading ] = useState(isEdit);

  useAdminPage(
    isEdit ? "Modifier le point de vente" : "Créer un point de vente"
  )

  /* chargement du point de vente en mode edit */
  useEffect(() => {
    if (!isEdit || !marketId) return;

    const loadProduct = async () => {
      try {
        const market =
          await getMarketById(marketId);

        setInitialValues(
          mapMarketToFormValues(market)
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [isEdit, marketId]);


  const handleSubmit = async (
    values: MarketFormValues
  ): Promise<ApiResponse<any>> => {

    const payload = mapFormToPayload(values);

    if (isEdit && marketId) {
      return await updateMarket(marketId, payload);
    }

    return await createMarket(payload);
  }; 

  console.log("values :", initialValues)

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
        <AdminForm<MarketFormValues>
          schema={marketSchema}
          initialValues={initialValues}
          mode={mode}
          submitLabel={
            isEdit
              ? "Mettre à jour"
              : "Créer le point de vente"
          }
          onSubmit={handleSubmit}
          onSuccess={(response) => {
            if (response.warnings?.length) {
              setTimeout(() => {
                navigate("/admin/markets");
              }, 4000)
            } else {
              navigate("/admin/markets");
            }
          }}
          renderers={adminFormRenderers}
        />
      </div>
    </div>
  );

}


