import { Eye, Trash } from "lucide-react";
import type { RightPanelMap } from "../../../layouts/admin/config/rightPanelRegistry";
import UserDetails from "../components/UserDetails";

const rightPanel: RightPanelMap = {
  user: {
    component: UserDetails,
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