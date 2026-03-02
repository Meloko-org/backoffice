import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import type { UserDashboard } from "../types/user";

type Props = {
  business: UserDashboard["business"];
};

export default function UserBusinessSection({ business }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="stat">
        <div className="stat-result">{business.totalOrders}</div>
        <div className="stat-text">Commandes</div>
      </div>

      <div className="stat">
        <div className="stat-result">
          {formatPriceToEuros(business.totalSpentTTC)}
        </div>
        <div className="stat-text">Total dépensé</div>
      </div>

      <div className="stat">
        <div className="stat-result">
          {formatPriceToEuros(business.averageBasketTTC)}
        </div>
        <div className="stat-text">Panier moyen</div>
      </div>
    </div>
  );
}
