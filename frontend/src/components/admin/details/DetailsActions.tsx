import type { ResolvedAction } from "../../../layouts/admin/registries/actions/action.types";
import DetailsButton from "../buttons/DetailsButton"



type Props = {
  actions: ResolvedAction[];
  wrapperClasses?: string;
}

export default function DetailsActions({
  actions,
  wrapperClasses = "details-cols-2 mt-5",
}: Props) {

  return (
    <div className={wrapperClasses}>

      {actions.map((action, index) => {
        
        return (
          <DetailsButton
            key={index}
            label={action.label}
            icon={action.icon}

            onClick={() => action.run()}

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
