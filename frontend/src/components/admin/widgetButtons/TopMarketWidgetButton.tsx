import { formatPriceToEuros } from "../../../utils/price/priceConverter";

type Props = {
  name: string;
  revenue: number;
  onClick: () => void;
  extraClasses?: string;
}

export default function TopMarketWidgetButton({
  name,
  revenue,
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
        <span>{formatPriceToEuros(revenue)}</span>
      </div>
    </button>
  )
}