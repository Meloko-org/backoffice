import { Eye } from "lucide-react";

type Props = {
  onClick: () => void;
  extraClasses?: string;
}

export function WidgetButton({
  onClick,
  extraClasses,
}: Props) {

  return (
    <button 
      className={`
          btn-widget 
          ${extraClasses}
        `}
      onClick={onClick}
    >
      <Eye />
    </button>
  )
}