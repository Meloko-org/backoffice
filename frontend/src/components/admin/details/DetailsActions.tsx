import DetailsButton from "../buttons/DetailsButton"
import { userActionsRegistry } from "../../../features/users/config/userActionsRegistry";
import type { UserActionContext } from "../../../features/users/config/user.actions";


type Props = {
  item: any;
  ctx: UserActionContext;
  actionKeys: string[];
  wrapperClasses?: string;
}

export default function DetailsActions({
  item,
  ctx,
  actionKeys,
  wrapperClasses = "details-cols-2 mt-5",
}: Props) {
  

  return (
    <div className={wrapperClasses}>

      {actionKeys.map((key) => {
        const action = userActionsRegistry[key]

        if (!action) return null;

        if (action.visible && !action.visible(item)) {
          return null;
        }

        
        const label =
          typeof action.label === "function"
            ? action.label(item)
            : action.label

        const Icon = action.icon
        

        return (
          <DetailsButton
            key={key}
            label={label}
            icon={Icon}

            onClick={() => action.run(item, ctx)}

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
