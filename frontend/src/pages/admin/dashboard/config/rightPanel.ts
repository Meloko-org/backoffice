import type { RightPanelMap } from "../../../../layouts/admin/registries/rightPanel/rightPanelRegistry";
import marketAnalytics from "../panels/MarketAnalyticsPanel";
import ProductAnalyticsPanel from "../panels/ProductAnalyticsPanel";
import ShopAnalyticsPanel from "../panels/ShopAnalyticsPanel";
import TopMarketPanel from "../panels/TopMarketPanel";
import TopMarketsListPanel from "../panels/TopMarketsListPanel";
import TopProductPanel from "../panels/TopProductPanel";
import TopProductsListPanel from "../panels/TopProductsListPanel";
import TopShopPanel from "../panels/TopShopPanel";
import TopShopsListPanel from "../panels/TopShopsListPanel";

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
  },
  topShops: {
    component: TopShopsListPanel,
    fullPanel: true,
  },
  topShop: {
    component: TopShopPanel,
    fullPanel: true,
  },
  shopAnalytics: {
    component: ShopAnalyticsPanel,
    fullPanel: true,
  },
  topMarkets: {
    component: TopMarketsListPanel,
    fullPanel: true,
  },
  topMarket: {
    component: TopMarketPanel,
    fullPanel: true,
  },
  marketAnalytics: {
    component: marketAnalytics,
    fullPanel: true,
  },
}

export default rightPanel;