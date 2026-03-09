import { Eye, Trash } from "lucide-react";
import type { RightPanelMap } from "../../../layouts/admin/config/rightPanelRegistry";
import CategoryDetails from "../components/CategoryDetails";

const rightPanel: RightPanelMap = {
  category: {
    component: CategoryDetails,
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
    ]
  },
}

export default rightPanel;