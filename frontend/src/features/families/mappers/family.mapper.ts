import type { FamilyFormValues, FamilyPayload, ProductFamily } from "../types/family";

export const mapFamilyToFormValues = (
  family: ProductFamily
): FamilyFormValues => {
  return {
    name: family.name,
    description: family.description ?? "",
    image: family.image ?? "",
    productsTypes: family.productsTypes?.[0] ?? "",
    category: family.category._id,
    tagCategories: family.tagCategories.map((t) => (t._id))
  };
};


export const mapFormValuesToPayload = (
  values: FamilyFormValues
): FamilyPayload => {
  return {
    name: values.name,
    description: values.description,
    image: values.image || null,
    category: values.category,
    productsTypes: [values.productsTypes],
    tagCategories: values.tagCategories
  };
};