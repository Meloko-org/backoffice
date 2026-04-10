import { Check, Circle, Crown } from "lucide-react";
import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";

<Check className="text-primary" />

export function createShopFilters(
  data: Record<string, any>
): FilterConfig[] {

  return [
    {
      type: "boolean",
      key: "isValidated",
      label: "Validé",
      extraLabel: <Check className="text-primary w-5 h-5" />,
    },
    {
      type: "boolean",
      key: "isPremium",
      label: "Premium",
      extraLabel: <Crown className="text-warning w-5 h-5" />,
    },
    {
      type: "boolean",
      key: "isOpen",
      label: "Open",
      extraLabel: <div className="bg-primary rounded-full w-4 h-4"></div>,
    },
    {
      type: "dateRange",
      fromKey: "createdAtFrom",
      toKey: "createdAtTo",
      label: "Créé",
      extraLabel: "Créé",
    }
  ]
}