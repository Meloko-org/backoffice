import type { CreateProductPayload, Product, ProductFormValues } from "../types/product";

export function mapFormToPayload(
  values: ProductFormValues
): CreateProductPayload {
  return {
    name: values.name,
    description: values.description || undefined,
    image: values.image || undefined,
    family: values.familyId,
    weight: {
      measurement: values.weightMeasurement,
      unit: values.weightUnit,
    },
    vatRate: values.vatRate,
  };
}


export function mapProductToFormValues(
  product: Product
): ProductFormValues {
  return {
    name: product.name,
    description: product.description ?? "",
    image: product.image ?? undefined,

    categoryId: product.family.category._id,
    familyId: product.family._id,

    weightMeasurement: product.weight.measurement,
    weightUnit: product.weight.unit as "gr" | "piece",

    vatRate: product.vatRate,
  };
}
