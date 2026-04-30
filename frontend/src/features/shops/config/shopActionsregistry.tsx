import { Eye, LockKeyhole, Pencil } from "lucide-react";
import { createActionsRegistry } from "../../../layouts/admin/registries/actions/actionRegistry";
import { type ShopActionTarget } from "../types/shop";
import type { ShopActionContext } from "./shop.actions";
import { adminEvents } from "../../users/events/adminEvents";

export const shopActions = createActionsRegistry<ShopActionTarget, ShopActionContext>({

  display: {
    label: "Voir",
    icon: Eye,
    variant: "success",

    placement: ["rowMenu", "details"],

    run: (shop, ctx) => {
      ctx.navigate(`/admin/shops/${shop._id}`)
    },
  },

  edit: {
    label: "Éditer",
    icon: Pencil,
    variant: "primary",

    placement: ["rowMenu", "details"],

    // visible: (user) => !user.isDeleted,

    run: (shop, ctx) => {
      console.log("id :", shop._id)
      ctx.navigate(`/admin/shops/${shop._id}/edit`)
    },
  },

  validate: {
    label: (shop) => shop.isValidated ? "Bloquer" : "Autoriser",
    icon: LockKeyhole,
    variant: "danger",

    placement: ["rowMenu", "details", "shop-header"],

    visible: () => true,

    run: (shop, ctx) => {
      ctx.openRight?.();

      if (shop.isValidated) {
        ctx.defineConfirm({
          title: "Bloquer le shop",
          confirmLabel: "Bloquer",

          onConfirm: async () => {
            await ctx.unvalidate(shop._id)
            adminEvents.emit("shops:refresh")
          }
        })
      } else {
        ctx.defineConfirm({
          title: "Valider le shop",
          confirmLabel: "Valider",

          onConfirm: async () => {
            await ctx.validate(shop._id)
            adminEvents.emit("shops:refresh")
          }
        })
      }
    } 
   }
})