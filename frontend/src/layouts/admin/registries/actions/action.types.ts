import type { LucideIcon } from "lucide-react"

export type ActionPlacement =
  | "rowMenu"
  | "details"
  | "user-header"
  | "shop-header"
  | "inline";

export type ActionDefinition<T, Ctx> = {
  label: string | ((item: T) => string)
  icon?: LucideIcon
  variant?: "success" | "primary" | "warning" | "danger" | "greener"

  placement?: ActionPlacement[]

  visible?: (item: T) => boolean

  run: (item: T, ctx: Ctx) => void
}


export type ResolvedAction = {
  label: string
  icon?: LucideIcon
  variant?: "success" | "primary" | "warning" | "danger" | "greener"
  disabled?: boolean
  run: () => void
}