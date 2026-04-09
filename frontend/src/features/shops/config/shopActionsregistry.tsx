import { Eye, Pencil } from "lucide-react";
import { createActionsRegistry } from "../../../layouts/admin/registries/actions/actionRegistry";
import { type ShopActionTarget } from "../types/shop";
import type { ShopActionContext } from "./shop.actions";

export const shopActions = createActionsRegistry<ShopActionTarget, ShopActionContext>({

  display: {
    label: "Voir",
    icon: Eye,
    variant: "success",

    placement: ["inline", "details"],

    visible: () => true,

    run: (shop, ctx) => {
      ctx.navigate(`/admin/shops/${shop._id}`)
    },
  },

  edit: {
    label: "Éditer",
    icon: Pencil,
    variant: "primary",

    placement: ["inline", "details"],

    // visible: (user) => !user.isDeleted,

    run: (shop, ctx) => {
      ctx.navigate(`/admin/shops/${shop._id}/edit`)
    },
  },
})