import { Pencil, Trash2 } from "lucide-react";
import { createActionsRegistry } from "../../../layouts/admin/registries/actions/actionRegistry";
import type { ProductActionTarget } from "../types/product";
import type { ProductActionContext } from "./product.actions";
import { adminEvents } from "../../users/events/adminEvents";

export const productActions = createActionsRegistry<
  ProductActionTarget, 
  ProductActionContext
>({

  edit: {
    label: "Éditer",
    icon: Pencil,
    variant: "primary",

    placement: ["details", "inline"],

    run: (product, ctx) => {
      ctx.navigate(`/admin/products/${product._id}/edit`)
    },
  },

  delete: {
    label: "Supprimer",
    icon: Trash2,
    variant: "danger",

    placement: ["details", "inline"],

    visible: () => true,
    run: (product, ctx) => {
      ctx.openRight?.();
      ctx.defineConfirm({
        title: "Supprimer le produit",
        confirmLabel: "Supprimer",

        onConfirm: async () => {
          await ctx.del(product._id)
          adminEvents.emit("products:refresh")
        }
      })
    }
  }
})