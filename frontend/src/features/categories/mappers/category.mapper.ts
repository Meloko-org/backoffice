import type { CategoryFormValues, CategoryPayload, ProductCategory } from "../types/category";

export const mapCategoryToFormValues = (
  category: ProductCategory
): CategoryFormValues => {
  return {
    name: category.name,
    description: category.description ?? "",
    image: category.image ?? "",
    type: category.type._id,
  };
};


export const mapFormValuesToPayload = (
  values: CategoryFormValues
): CategoryPayload => {
  return {
    name: values.name,
    description: values.description,
    image: values.image || null,
    type: values.type,
  };
};
