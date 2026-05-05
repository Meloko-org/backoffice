import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";

export function createSupportFilters(): FilterConfig[] {
  return [
    {
      type: "select",
      key: "status",
      label: "Statut",
      extraLabel: "Statut",
      options: [
        { label: "Open", value: "open" },
        { label: "Pending", value: "pending" },
        { label: "Resolved", value: "resolved" },
      ],
    },
    {
      type: "select",
      key: "category",
      label: "Catégorie",
      extraLabel: "Catégorie",
      options: [
        { label: "Bug", value: "bug" },
        { label: "Question", value: "question" },
        { label: "Litige", value: "dispute" },
        { label: "Autre", value: "other" },
      ],
    },
    {
      type: "boolean",
      key: "unreadByAdmin",
      label: "Non lus",
      extraLabel: "Non lus",
    },
  ]
}
