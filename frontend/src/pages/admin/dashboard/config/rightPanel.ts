import type { RightPanelMap } from "../../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import ProductAnalyticsPanel from "../panels/ProductAnalyticsPanel";
import TopProductPanel from "../panels/TopProductPanel";
import TopProductsListPanel from "../panels/TopProductsListPanel";

const rightPanel: RightPanelMap = {
  topProducts: {
    component: TopProductsListPanel,
    fullPanel: true,
  },
  topProduct: {
    component: TopProductPanel,
    fullPanel: true,
  },
  productAnalytics: {
    component: ProductAnalyticsPanel,
    fullPanel: true,
  }
}

export default rightPanel;