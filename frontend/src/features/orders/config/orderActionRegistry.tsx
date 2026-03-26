import { Eye } from "lucide-react";
import { createActionsRegistry } from "../../../layouts/admin/registries/actions/actionRegistry";
import { type OrderActionTarget } from "../types/order";
import type { OrderActionContext } from "./order.actions";

export const orderActions = createActionsRegistry<
  OrderActionTarget,
  OrderActionContext
>({
  display: {
    label: "Voir",
    icon: Eye,
    variant: "success",

    placement: ["details", "inline"],

    run: (order, ctx) => {
      ctx.navigate(`/admin/orders/${order._id}`)
    },
  },
})