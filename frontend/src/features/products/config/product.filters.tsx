import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";
import type { FamilyForSelect } from "../../families/types/family";

export function createProductFilters(
  data: Record<string, any>
): FilterConfig[] {

  const families: FamilyForSelect[] = data.families || [];

  return [
    {
      type: "select",
      key: "family",
      label: "Famille",
      options: families.map((r) => ({
        label: r.name,
        value: r._id,
      })),
    },
  ]
}