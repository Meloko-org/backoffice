import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";
import type { TypeForSelect } from "../../types/types/type";

export function createCategoryFilters(
  data: Record<string, any>
): FilterConfig[] {

  const types: TypeForSelect[] = data.types || [];

  return [ 
    {
      type: "select",
      key: "type",
      label: "Type",
      options: types.map((r) => ({
        label: r.name,
        value: r._id,
      })),
    },
  ]
}