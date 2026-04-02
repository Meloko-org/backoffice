import { formatPriceToEuros } from "../../../utils/price/priceConverter";

type Props = {
  label: string;
  orders: number;
  revenue: number;
  onClick: () => void;
  extraClasses?: string;
}

export default function TopShopWidgetButton({
  label,
  orders,
  revenue,
  onClick,
  extraClasses,
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
        <span>{orders}</span>
        <span>{formatPriceToEuros(revenue)}</span>
      </div>
    </button>
  )
}