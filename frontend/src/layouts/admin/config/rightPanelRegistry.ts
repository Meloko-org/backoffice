export type RightPanelType =
  | "category"
  | "family"
  | "product"
  | "market"
  | "user"
  | "userPage"
  | "order"
  | "orderProduct"



export interface RightPanelConfig {
  component: React.ComponentType<any>;
  fullPanel?: boolean;
  actions?: string[];
}


/**
 * Utilisation de Vite: import.meta.glob pour créer un auto-registry
 */
const modules = import.meta.glob(
  "../../../features/**/config/rightPanel.ts",
  { eager: true }
) as Record<
  string,
  { default: Partial<Record<RightPanelType, RightPanelConfig>> }
>

export const rightPanelRegistry: Partial<
  Record<RightPanelType, RightPanelConfig>
> = Object.values(modules).reduce((acc, mod) => {
  return {
    ...acc,
    ...mod.default,
  }
}, {})


/**
 * type pour écriture rapide du typage dans les fichiers rightPanel
 */
export type RightPanelMap =
  Partial<Record<RightPanelType, RightPanelConfig>>


