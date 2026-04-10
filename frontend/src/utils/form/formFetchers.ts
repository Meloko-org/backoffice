import type { FieldOption } from "../../core/forms/types";
import { getCategoryNames } from "../../features/categories/api/categories.api";
import { getShopFeaturesNames } from "../../features/shopFeatures/api/shopFeatures.api";
import { getTagCategoryNames } from "../../features/tagCategories/api/tagCategory.api";
import { getTypeNames } from "../../features/types/api/types.api";



export async function fetchTypes(): Promise<FieldOption[]> {

  const data = await getTypeNames()

  return data.map((t: any) => ({
    value: t._id,
    label: t.name,
  }));
}


export async function fetchTagCategories(): Promise<FieldOption[]> {
  const data = await getTagCategoryNames();

  return data.map((t: any) => ({
    value: t._id,
    label: t.name,
    description: t.description,
    color: t.color,
  }))
}


export async function fetchCategories(): Promise<FieldOption[]> {
  const data = await getCategoryNames();

  return data.map((t: any) => ({
    value: t._id,
    label: t.name,
  }))
}


export async function fetchShopFeatures(): Promise<FieldOption[]> {
  const data = await getShopFeaturesNames();

  return data.map((sf: any) => ({
    value: sf._id,
    label: sf.label,
  }))
}