import { Eye } from "lucide-react";

type Props = {
  onClick: () => void;
  extraClasses?: string;
}

export function EyeButton({
  onClick,
  extraClasses,
}: Props) {

  return (
    <button 
      className={`
          btn-outline-primary
          ${extraClasses}
        `}
      onClick={onClick}
    >
      <Eye />
    </button>
  )
}