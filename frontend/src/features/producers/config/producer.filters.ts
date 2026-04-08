import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";

export function createProducersFilters(
  data: Record<string, any>
): FilterConfig[] {

  return [
    {
      type: "select",
      key: "status",
      label: "User Status",
      options: [
        { label: "Actif", value: "active" },
        { label: "Suspendu", value: "suspended" },
        { label: "Supprimé", value: "deleted" },
      ],
    },
    {
      type: "select",
      key: "onboardingStep",
      label: "Onboarding",
      options: [
        { label: "0", value: "0"},
        { label: "1", value: "1"},
        { label: "2", value: "2"},
        { label: "3", value: "3"},
        { label: "4", value: "4"},
        { label: "5", value: "5"},
        { label: "6", value: "6"},
      ]
    }
  ]
}