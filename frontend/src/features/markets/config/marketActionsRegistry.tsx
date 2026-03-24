import { Pencil, Trash2 } from "lucide-react";
import { createActionsRegistry } from "../../../layouts/admin/registries/actions/actionRegistry";
import type { MarketActionTarget } from "../types/markets";
import type { MarketActionContext } from "./market.actions";
import { adminEvents } from "../../users/events/adminEvents";

export const marketActions = createActionsRegistry<
  MarketActionTarget,
  MarketActionContext
>({
  edit: {
    label: "Éditer",
    icon: Pencil,
    variant: "primary",

    placement: ["details", "inline"],

    run: (market, ctx) => {
      ctx.navigate(`/admin/markets/${market._id}/edit`)
    },
  },

  delete: {
    label: "Supprimer",
    icon: Trash2,
    variant: "danger",

    placement: ["details", "inline"],

    visible: () => true,
    run: (market, ctx) => {
      ctx.openRight?.();
      ctx.defineConfirm({
        title: "Supprimer le point de vente",
        confirmLabel: "Supprimer",

        onConfirm: async () => {
          await ctx.del(market._id)
          adminEvents.emit("markets:refresh")
        }
      })
    }
  }
})