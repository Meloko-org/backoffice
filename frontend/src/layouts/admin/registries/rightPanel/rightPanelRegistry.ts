import type { ProductLine } from "../../../../features/orders/types/order";
import type { ShopCrew, ShopDescriptions, ShopPhotos, ShopSocials, ShopVideos, ShopWithdrawModes } from "../../../../features/shops/types/shop";
import type { ModelInfoContext, WithData, WithId, WithType } from "../../contexts/AdminInfoContext";

// export type RightPanelType =
//   | "category"
//   | "family"
//   | "product"
//   | "market"
//   | "user"
//   | "userPage"
//   | "order"
//   | "orderProduct"


// export interface RightPanelConfig {
//   component: React.ComponentType<{ context: ModelInfoContext}>;
//   fullPanel?: boolean;
//   actions?: string[];
// }

export type RightPanelContextMap = {
  category: WithId<"category">;
  family: WithId<"family">;
  product: WithId<"product">;
  market: WithId<"market">;
  user: WithId<"user">;
  userPage: WithId<"userPage">;
  producer: WithId<"producer">;
  order: WithId<"order">;
  orderProduct: WithData<"orderProduct", ProductLine>;
  shop: WithId<"shop">;

  topProducts: WithType<"topProducts">;
  topProduct: WithId<"topProduct">;
  productAnalytics: WithId<"productAnalytics">;

  topShops: WithType<"topShops">;
  topShop: WithId<"topShop">;
  shopAnalytics: WithId<"shopAnalytics">;

  topMarkets: WithType<"topMarkets">;
  topMarket: WithId<"topMarket">;
  marketAnalytics: WithId<"marketAnalytics">;

  topMarketsByUsage: WithType<"topMarketsByUsage">;

  shopWithdrawModes: WithData<"shopWithdrawModes", ShopWithdrawModes>;
  shopDescriptions: WithData<"shopDescriptions", ShopDescriptions>;
  shopPhotos: WithData<"shopPhotos", ShopPhotos>;
  shopVideos: WithData<"shopVideos", ShopVideos>;
  shopCrew: WithData<"shopCrew", ShopCrew>;
  shopSocials: WithData<"shopSocials", ShopSocials>;
  shopSubOrder: WithId<"shopSubOrder">;
  shopNote: WithId<"shopNote">;
};

export type RightPanelType = keyof RightPanelContextMap;


export type RightPanelConfig<T extends keyof RightPanelContextMap> = {
  component: React.ComponentType<{
    context: RightPanelContextMap[T];
  }>;
  fullPanel?: boolean;
  actions?: string[];
};

/**
 * type pour écriture rapide du typage dans les fichiers rightPanel
 */
export type RightPanelMap = {
  [K in RightPanelType]?: RightPanelConfig<K>;
};

/**
 * Utilisation de Vite: import.meta.glob pour créer un auto-registry
 */
const modules = import.meta.glob(
  [
    "../../../../features/**/config/rightPanel.ts",
    "../../../../pages/admin/**/config/rightPanel.ts",
  ],
  { eager: true }
) as Record<
  string,
  { default: RightPanelMap }
>

export const rightPanelRegistry: RightPanelMap = 
  Object.values(modules).reduce((acc, mod) => {
    return {
      ...acc,
      ...mod.default,
    }
  }, {} as RightPanelMap)




console.log("rightPanelRegistry loaded")