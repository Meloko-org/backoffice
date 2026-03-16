import { Eye, Trash } from "lucide-react";
import type { RightPanelMap } from "../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import ProductDetails from "../components/ProductDetails";


const rightPanel: RightPanelMap = {
  product: {
    component: ProductDetails,
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