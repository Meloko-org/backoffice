import type { ResolvedAction } from "../../layouts/admin/registries/actions/action.types";

type Props = {
  actions: ResolvedAction[];
};

export function DataInlineRowActions({ actions }: Props) {

  return (
    <div className="flex items-center gap-2">
      {actions.map((action, index) => (
        <button
          key={index}
          disabled={action.disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!action.disabled) {
              action.run();
            }
          }}
          className={`
            p-1 rounded transition table-action-btn
            ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {action.icon && <action.icon className="w-4 h-4" />}
        </button>
      ))}
    </div>
  );
}