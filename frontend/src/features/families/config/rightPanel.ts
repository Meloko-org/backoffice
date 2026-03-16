import { Eye, Trash } from "lucide-react";
import type { RightPanelMap } from "../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import FamilyDetails from "../components/FamilyDetails";

const rightPanel: RightPanelMap = {
  family: {
    component: FamilyDetails,
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