import { useNavigate } from "react-router-dom";
import type { ProductFormValues } from "../types/product";
import { useEffect, useState } from "react";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { mapFormToPayload, mapProductToFormValues } from "../mappers/product.mapper";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { productFormSchema } from "../schema/product.schema";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";
import { createProduct, getProductById, updateProduct } from "../api/products.api";
import Loader from "../../../components/admin/Loader";

type ProductFormPageProps = {
  mode: "create" | "edit";
  productId?: string;
}

export default function ProductFormPage({
  mode,
  productId,
}: ProductFormPageProps) {

  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const defaultValues: ProductFormValues = {
    name: "",
    description: "",
    image: "",
    categoryId: "",
    familyId: "",
    weightMeasurement: 0,
    weightUnit: "gr",
    vatRate: "0"
  }

  const [ initialValues, setInitialValues ]= useState<Partial<ProductFormValues>>(defaultValues);

  const [ loading, setLoading ] = useState(isEdit);

  useAdminPage(
    isEdit ? "Modifier le produit" : "Créer un produit"
  )

  /* chargement du produit en mode edit */
  useEffect(() => {
    if (!isEdit || !productId) return;

    const loadProduct = async () => {
      try {
        const product =
          await getProductById(productId);

        setInitialValues(
          mapProductToFormValues(product)
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [isEdit, productId]);



  const handleSubmit = async (
      values: ProductFormValues
    ) => {
      const payload =
        mapFormToPayload(values);

      console.log("payload :", payload)
  
      if (isEdit && productId) {
        return await updateProduct(productId, payload);
      } else {
        return await createProduct(payload);
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
        <AdminForm<ProductFormValues>
          schema={productFormSchema}
          initialValues={initialValues}
          mode={mode}
          submitLabel={
            isEdit
              ? "Mettre à jour"
              : "Créer le produit"
          }
          onSubmit={handleSubmit}
          onSuccess={() => {
            navigate("/admin/products");
          }}
          renderers={adminFormRenderers}
        />
      </div>
    </div>
  );

}