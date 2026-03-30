import type { ProductLine } from "../../../../features/orders/types/order";
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
  order: WithId<"order">;
  orderProduct: WithData<"orderProduct", ProductLine>;
  topProducts: WithType<"topProducts">;
  topProduct: WithId<"topProduct">;
  productAnalytics: WithId<"productAnalytics">
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