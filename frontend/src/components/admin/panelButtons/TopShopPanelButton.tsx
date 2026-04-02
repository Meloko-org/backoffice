import type { TopShop } from "../../../pages/admin/dashboard/types"
import { formatPriceToEuros } from "../../../utils/price/priceConverter";

type Props = {
  shop: TopShop;
  onClick: () => void;
  extraClasses?: string;
}

export default function TopShopPanelButton({ shop, onClick, extraClasses }: Props) {

  return (
    <button
      onClick={onClick}
      className={`
        panel-list-btn
        ${extraClasses}
      `}
    >
      <div>
        <div className="font-medium bg-primary/30 px-2 rounded-md">{shop.name}</div>
        <div className="text-sm text-gray-500  text-left pl-3">
          {shop.orders} commandes
        </div>
      </div>

      <div className="font-semibold">
        {formatPriceToEuros(shop.revenue)}
      </div>
    </button>
  )
}