import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";
import type { CategoryForSelect } from "../../categories/types/category";

export function createFamilyFilters(
  data: Record<string, any>
): FilterConfig[] {

  const categories: CategoryForSelect[] = data.categories || [];

  return [
    {
      type: "select",
      key: "category",
      label: "Catégories",
      options: categories.map((r) => ({
        label: r.name,
        value: r._id,
      })),
    },
  ]
}