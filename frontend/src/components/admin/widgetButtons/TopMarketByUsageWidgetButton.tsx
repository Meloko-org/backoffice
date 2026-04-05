
type Props = {
  name: string;
  count: number;
  onClick: () => void;
  extraClasses?: string;
}

export default function TopMarketByUsageWidgetButton({
  name,
  count,
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
        <span>{name}</span>
        <span>{count}</span>
      </div>
    </button>
  )
}