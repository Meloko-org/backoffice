import { Eye, LockKeyhole, Pencil } from "lucide-react";
import { createActionsRegistry } from "../../../layouts/admin/registries/actions/actionRegistry";
import { type ShopActionTarget } from "../types/shop";
import type { ShopActionContext } from "./shop.actions";

export const shopActions = createActionsRegistry<ShopActionTarget, ShopActionContext>({

  display: {
    label: "Voir",
    icon: Eye,
    variant: "success",

    placement: ["rowMenu", "details"],

    visible: () => true,

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

    run: (shop, ctx) => {

    } 
   }
})