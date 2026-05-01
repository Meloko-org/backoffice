import { Pencil, Trash2 } from "lucide-react";
import { createActionsRegistry } from "../../../layouts/admin/registries/actions/actionRegistry";
import { adminEvents } from "../../events/adminEvents";
import type { CategoryActionContext } from "./category.actions";
import type { CategoryActionTarget } from "../types/category";

export const categoryActions = createActionsRegistry<
  CategoryActionTarget, 
  CategoryActionContext
>({

  edit: {
    label: "Éditer",
    icon: Pencil,
    variant: "primary",

    placement: ["details", "inline"],

    run: (category, ctx) => {
      ctx.navigate(`/admin/categories/${category._id}/edit`)
    },
  },

  delete: {
    label: "Supprimer",
    icon: Trash2,
    variant: "danger",

    placement: ["details", "inline"],

    visible: () => true,
    run: (category, ctx) => {
      ctx.openRight?.();
      ctx.defineConfirm({
        title: "Supprimer la catégorie",
        confirmLabel: "Supprimer",

        onConfirm: async () => {
          await ctx.del(category._id)
          adminEvents.emit("categories:refresh")
        }
      })
    }
  }
})