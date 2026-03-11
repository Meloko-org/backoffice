import type { LucideIcon } from "lucide-react"
import DetailsButton from "../buttons/DetailsButton"
import { useInfoLayout } from "../../../layouts/admin/contexts/AdminInfoContext"


export type DetailsAction = {
  label: string;
  icon: LucideIcon;
  variant?: "success" | "primary" | "warning" | "danger";
  action: "display" | "edit" | "suspend" | "delete";
}

type Props = {
  item: unknown;
  actions: DetailsAction[];
  wrapperClasses?: string;
}

export default function DetailsActions({
  item,
  actions,
  wrapperClasses = "details-cols-2 mt-5",
}: Props) {
  if (!actions?.length) return null

  const { infoContext } = useInfoLayout();

  const actionHandlers = {
    edit: infoContext?.onEdit,
    delete: infoContext?.onDelete,
    display: infoContext?.onDisplay,
    suspend: infoContext?.onSuspend,
  }

  return (
    <div className={wrapperClasses}>
      {actions.map((action) => {
        const handler = actionHandlers[action.action];

        if (!handler) return null;

        return (
          <DetailsButton
            key={action.label}
            label={action.label}
            icon={action.icon}
            onClick={() => handler(item as any)}
            extraClasses={`w-full ${
              action.variant === "danger" 
                ? "btn-danger" 
                : action.variant === "warning"
                  ? "btn-warning"
                  : action.variant === "primary"
                    ? "btn-primary"
                    : "btn-success"
            }`}
          />
        )
      })}
    </div>
  )
}
