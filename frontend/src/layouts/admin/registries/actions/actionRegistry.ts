import type { ActionDefinition, ActionPlacement, ResolvedAction } from "./action.types"

export function createActionsRegistry<T, Ctx>(
  registry: Record<string, ActionDefinition<T, Ctx>>
) {

  function getActions(
    item: T,
    ctx: Ctx,
    placement?: ActionPlacement
  ): ResolvedAction[] {

    if (!item) return [];

    return Object.values(registry)

      .filter((action) => {

        if (placement && action.placement) {
          if (!action.placement.includes(placement)) {
            return false
          }
        }

        if (action.visible && !action.visible(item)) {
          return false
        }

        return true
      })

      .map((action) => {

        const label =
          typeof action.label === "function"
            ? action.label(item)
            : action.label

        return {
          label,
          icon: action.icon,
          variant: action.variant,
          run: () => action.run(item, ctx)
        }
      })
  }

  return {
    registry,
    getActions
  }
}