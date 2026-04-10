import { useNavigate } from "react-router-dom";
import type { ShopFormValues } from "../types/shop";
import { useEffect, useState } from "react";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { getShopForm } from "../api/shops.api";
import { mapFormValuesToPayload, mapShopToFormValues } from "../mappers/shop.mapper";
import type { ApiResponse } from "../../../types/global.types";
import Loader from "../../../components/admin/Loader";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { shopFormSchema } from "../schema/shop.schema";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";
/*
type ShopFormPageProps = {
  shopId?: string;
  mode: "edit" | "create";
}

export default function ShopFormPage({ shopId }: ShopFormPageProps) {

  const navigate = useNavigate();

  const defaultValues: ShopFormValues = {

  }

  const [ initialValues, setInitialValues ] = useState<ShopFormValues>(defaultValues);

  const [ loading, setLoading ] = useState<boolean>(false);

  useAdminPage("Modifier le Shop");

  useEffect(() => {
    if (!shopId) return;

    const loadShop = async () => {
      setLoading(true)
      try {
        const shop = await getShopForm(shopId)
        setInitialValues(
          mapShopToFormValues(shop)
        )
      } finally {
        setLoading(false)
      }
    }

    loadShop();
  }, [shopId])


  const handleSubmit = async (
    values: ShopFormValues
  ): Promise<ApiResponse<any>> => {

    const payload = mapFormValuesToPayload(values);

    return updateShop(shopId!, payload)
  }


  if (loading) {
    return (
      <Loader />
    );
  }


  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <AdminForm<ShopFormValues>
          schema={shopFormSchema}
          initialValues={initialValues}
          mode="edit"
          submitLabel="Mettre à jour"
          onSubmit={handleSubmit}
          onSuccess={() => {
            navigate("/admin/users");
          }}
          renderers={adminFormRenderers}
        />
      </div>
    </div>
  )


}*/