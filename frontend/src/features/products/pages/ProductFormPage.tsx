import { useNavigate } from "react-router-dom";
import type { ProductFormValues } from "../types/product";
import { useEffect, useState } from "react";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { mapFormToPayload, mapProductToFormValues } from "../mappers/product.mapper";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { productSchema } from "../schema/product.schema";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";
import { BallTriangle } from "react-loader-spinner";
import { createProduct, getProductById, updateProduct } from "../api/products.api";

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
    vatRate: 0
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

  console.log(initialValues)


  const handleSubmit = async (
      values: ProductFormValues
    ) => {
      const payload =
        mapFormToPayload(values);
  
      if (isEdit && productId) {
        await updateProduct(productId, payload);
      } else {
        await createProduct(payload);
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
        <AdminForm<ProductFormValues>
          schema={productSchema}
          initialValues={initialValues}
          mode={mode}
          submitLabel={
            isEdit
              ? "Mettre à jour"
              : "Créer le produit"
          }
          onSubmit={handleSubmit}
          renderers={adminFormRenderers}
        />
      </div>
    </div>
  );

}