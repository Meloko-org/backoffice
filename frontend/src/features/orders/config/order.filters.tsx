import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";

export function createOrderFilters(
  data: Record<string, any>
): FilterConfig[] {

  return [
    {
      type: "boolean",
      key: "isPaid",
      label: "Payée"
    },
    {
      type: "boolean",
      key: "isWithdrawn",
      label: "Retirée"
    },
    {
      type: "dateRange",
      fromKey: "paidAtFrom",
      toKey: "paidAtTo",
      label: "Payée"
    }
  ]
}