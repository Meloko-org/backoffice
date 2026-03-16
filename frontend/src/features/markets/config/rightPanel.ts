import { Eye, Trash } from "lucide-react";
import type { RightPanelMap } from "../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import MarketDetails from "../components/MarketDetails";

const rightPanel: RightPanelMap = {
  market: {
    component: MarketDetails,
    fullPanel: false,
    actions: [
      {
        label: "Éditer",
        icon: Eye,
        variant: "primary",
        action: "edit",
      },
      {
        label: "Supprimer",
        icon: Trash,
        variant: "danger",
        action: "delete",
      },
    ],
  },
}

export default rightPanel;