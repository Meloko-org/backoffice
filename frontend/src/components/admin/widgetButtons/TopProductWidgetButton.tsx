type Props = {
  label: string;
  quantity: string;
  onClick: () => void;
  extraClasses?: string;
}


export default function TopProductWidgetButton({
  label,
  quantity,
  onClick,
  extraClasses
}: Props) {

  return (
    <button
      onClick={onClick}
      className={`
        panel-list-btn
        ${extraClasses}
      `}
    >
      <div className="flex justify-between w-full">
        <span>{label}</span>
        <span>{quantity}</span>
      </div>
    </button>
  )
} 