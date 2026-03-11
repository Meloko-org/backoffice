import type { LucideIcon } from "lucide-react"

export type RightPanelType =
  | "category"
  | "family"
  | "product"
  | "market"
  | "user"
  | "order"
  | "orderProduct"


export interface RightPanelAction {
  label: string;
  icon: LucideIcon;
  variant?: "success" | "primary" | "warning" | "danger";
  action: "display" | "edit" | "suspend" | "delete";
}

export interface RightPanelConfig {
  component: React.ComponentType<any>;
  fullPanel?: boolean;
  actions?: RightPanelAction[];
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


