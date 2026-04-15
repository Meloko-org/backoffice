import type { RightPanelMap } from "../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import ShopDescDetails from "../components/ShopDescDetails";
import ShopDetails from "../components/ShopDetails";
import ShopWithdrawModeDetails from "../components/ShopWithdrawModeDetails";

const rightPanel: RightPanelMap = {
  shop: {
    component: ShopDetails,
    fullPanel: true,
    actions: ["display", "edit"]
  },
  shopWithdrawModes: {
    component: ShopWithdrawModeDetails,
    fullPanel: true,
  },
  shopDescriptions: {
    component: ShopDescDetails,
    fullPanel: true,
  }
}

export default rightPanel;