import type { TopMarket } from "../../../pages/admin/dashboard/types"
import { formatPriceToEuros } from "../../../utils/price/priceConverter";

type Props = {
  market: TopMarket;
  onClick: () => void;
  extraClasses?: string;
}

export default function TopMarketPanelButton({ market, onClick, extraClasses }: Props) {

  return (
    <button
      onClick={onClick}
      className={`
        panel-list-btn
        ${extraClasses}
      `}
    >
      <div>
        <div className="font-medium bg-primary/30 px-2 rounded-md">{market.name}</div>
        
      </div>

      <div className="font-semibold">
        {formatPriceToEuros(market.revenue)}
      </div>
    </button>
  )
}