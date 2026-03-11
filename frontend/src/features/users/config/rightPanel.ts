import { Ban, Eye, Pencil, Trash } from "lucide-react";
import type { RightPanelMap } from "../../../layouts/admin/config/rightPanelRegistry";
import UserDetails from "../components/UserDetails";

const rightPanel: RightPanelMap = {
  user: {
    component: UserDetails,
    fullPanel: false,
    actions: [
      {
        label: "Voir",
        icon: Eye,
        variant: "success",
        action: "display",
      },
      {
        label: "Éditer",
        icon: Pencil,
        variant: "primary",
        action: "edit",
      },
      {
        label: "Suspension",
        icon: Ban,
        variant: "warning",
        action: "suspend",
      },
      {
        label: "Suppression",
        icon: Trash,
        variant: "danger",
        action: "delete",
      },
    ],
  },
}

export default rightPanel;