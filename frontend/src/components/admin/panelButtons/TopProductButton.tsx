import type { TopProduct } from "../../../pages/admin/dashboard/types"
import { formatPriceToEuros } from "../../../utils/price/priceConverter";

type Props = {
  product: TopProduct;
  onClick: () => void;
  extraClasses?: string;
}

export default function TopProductButton({ product, onClick, extraClasses }: Props) {

  return (
    <button
      onClick={onClick}
      className={`
        panel-list-btn
        ${extraClasses}
      `}
    >
      <div>
        <div className="font-medium bg-primary/30 px-2 rounded-md">{product.name}</div>
        <div className="text-sm text-gray-500  text-left pl-3">
          {product.quantityFormatted}
        </div>
      </div>

      <div className="font-semibold">
        {formatPriceToEuros(product.revenue)}
      </div>
    </button>
  )
}