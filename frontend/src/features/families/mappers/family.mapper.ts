import type { FamilyFormValues, FamilyPayload, ProductFamily } from "../types/family";

export const mapFamilyToFormValues = (
  family: ProductFamily
): FamilyFormValues => {
  return {
    name: family.name,
    description: family.description ?? "",
    image: family.image ?? "",
    productTypes: family.productTypes,
    category: family.category._id,
    tagCategories: family.tagCategories
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
    productTypes: values.productTypes,
    tagCategories: values.tagCategories
  };
};