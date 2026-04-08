import { Eye, Pencil, Store, User } from "lucide-react";
import { createActionsRegistry } from "../../../layouts/admin/registries/actions/actionRegistry";
import { type ProducerActionTarget } from "../types/producer";
import { type ProducerActionContext } from "./producer.action";

export const producerActions = createActionsRegistry<ProducerActionTarget, ProducerActionContext>({

  edit: {
    label: "Éditer",
    icon: Pencil,
    variant: "primary",

    placement: ["inline", "details"],

    run: (producer, ctx) => {
      ctx.navigate(`/admin/producers/${producer._id}/edit`)
    },
  },

  userDisplay: {
    label: "Voir user",
    icon: User,
    variant: "success",

    placement: ["inline", "details"],

    run: (producer, ctx) => {
      ctx.navigate(`/admin/users/${producer.owner._id}`)
    }
  },

  shopDisplay: {
    label: "Voir shop",
    icon: Store,
    variant: "greener",

    placement: ["inline", "details"],

    visible: (producer) => !!producer.shop?._id,

    run: (producer, ctx) => {
      ctx.navigate(`/admin/shops/${producer.shop._id}`)
    }
  }
})