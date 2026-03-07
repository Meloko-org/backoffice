import type { RightPanelMap } from "../../../layouts/admin/config/rightPanelRegistry";
import MarketDetails from "../components/MarketDetails";

const rightPanel: RightPanelMap = {
  market: {
    component: MarketDetails,
    fullPanel: true,
  },
}

export default rightPanel;