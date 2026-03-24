import { Pencil, Trash2 } from "lucide-react";
import { adminEvents } from "../../users/events/adminEvents";
import type { FamilyActionTarget } from "../types/family";
import type { FamilyActionContext } from "./family.actions";
import { createActionsRegistry } from "../../../layouts/admin/registries/actions/actionRegistry";

export const familyActions = createActionsRegistry<FamilyActionTarget, FamilyActionContext>({

  edit: {
    label: "Éditer",
    icon: Pencil,
    variant: "primary",

    placement: ["details", "inline"],

    run: (family, ctx) => {
      ctx.navigate(`/admin/families/${family._id}/edit`)
    },
  },

  delete: {
    label: "Supprimer",
    icon: Trash2,
    variant: "danger",

    placement: ["details", "inline"],

    visible: () => true,
    run: (family, ctx) => {
      ctx.openRight?.();
      ctx.defineConfirm({
        title: "Supprimer la catégorie",
        confirmLabel: "Supprimer",

        onConfirm: async () => {
          await ctx.del(family._id)
          adminEvents.emit("families:refresh")
        }
      })
    }
  }
})


