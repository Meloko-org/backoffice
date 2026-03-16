import { Ban, Eye, Pencil, Trash, type LucideIcon } from "lucide-react"
import type { UserActionTarget } from "../types/user"
import type { UserActionContext } from "./user.actions"
import FloatingSelect from "../../../core/forms/components/floatingSelect";


export type UserAction = {
  label: string | ((user: UserActionTarget) => string);
  icon: LucideIcon
  variant?: "success" | "primary" | "warning" | "danger" | "default"

  visible?: (user: UserActionTarget) => boolean

  run: (
    user: UserActionTarget,
    ctx: UserActionContext
  ) => void | Promise<void>
}


export const userActionsRegistry: Record<string, UserAction> = {

  display: {
    label: "Voir",
    icon: Eye,
    variant: "success",

    visible: () => true,

    run: (user, ctx) => {
      ctx.navigate(`/admin/users/${user._id}`)
    },
  },

  edit: {
    label: "Éditer",
    icon: Pencil,
    variant: "primary",

    visible: (user) => !user.isDeleted,

    run: (user, ctx) => {
      ctx.navigate(`/admin/users/${user._id}/edit`)
    },
  },

  suspend: {
    label: (user) => user.isSuspended ? "Réactiver" : "Suspendre",
    icon: Ban,
    variant: "warning",

    visible: (user) => !user.isDeleted,

    run: (user, ctx) => {

      ctx.openRight?.();

      if (user.isSuspended) {

        ctx.defineConfirm({
          title: "Réactiver l'utilisateur",
          confirmLabel: "Réactiver",

          onConfirm: async () => {
            await ctx.unsuspend(user._id)
            ctx.refetch?.()
          },
        })

      } else {

        ctx.defineConfirm<string>({
          title: "Suspendre l'utilisateur",
          confirmLabel: "Suspendre",

          content: (value, setValue) => (
            <FloatingSelect
              label="Raison de la suspension"
              options={[
                { value: "fraud", label: "Fraude" },
                { value: "abuse", label: "Abus" },
                { value: "spam", label: "Spam" },
              ]}
              value={value || ""}
              onChange={setValue}
            />
          ),

          onConfirm: async (reason) => {
            await ctx.suspend({
              id: user._id,
              reason
            })

            ctx.refetch?.()
          },
        })

      }
    },
  },

  delete: {
    label: (user) => user.isDeleted ? "Restaurer" : "Supprimer",
    icon: Trash,
    variant: "danger",

    visible: () => true,

    run: (user, ctx) => {

      ctx.openRight?.();

      if (user.isDeleted) {

        ctx.defineConfirm({
          title: "Restaurer l'utilisateur",
          confirmLabel: "Restaurer",

          onConfirm: async () => {
            await ctx.restore(user._id)
            ctx.refetch?.()
          },
        })

      } else {

        ctx.defineConfirm({
          title: "Supprimer l'utilisateur",
          confirmLabel: "Supprimer",

          onConfirm: async () => {
            await ctx.del(user._id)
            ctx.refetch?.()
          },
        })

      }

    },
  },

}