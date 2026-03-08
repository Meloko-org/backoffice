import type { LucideIcon } from "lucide-react";


type Props = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  extraClasses?: string;
}

export default function DetailsButton({
  label,
  icon: Icon,
  onClick,
  extraClasses,
}: Props) {

  return (
    <button
      onClick={onClick}
      className={`
          flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm
          ${extraClasses ?? ""}
        `}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}