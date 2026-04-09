import type { RightPanelMap } from "../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import ShopDetails from "../components/ShopDetails";

const rightPanel: RightPanelMap = {
  shop: {
    component: ShopDetails,
    fullPanel: true,
    actions: ["display", "edit"]
  }
}

export default rightPanel;