import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";

export function createShopFilters(
  data: Record<string, any>
): FilterConfig[] {

  return [
    {
      type: "boolean",
      key: "isValidated",
      label: "Validé",
    },
    {
      type: "boolean",
      key: "isPremium",
      label: "Premium",
    },
    {
      type: "boolean",
      key: "isOpen",
      label: "Open",
    },
    {
      type: "dateRange",
      fromKey: "createdAtFrom",
      toKey: "createdAtTo",
      label: "Créé"
    }
  ]
}