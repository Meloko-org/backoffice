import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData
}

export function AvgCartWidget({ data }: Props) {

  const value = data.avgCart;

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title-warning">Panier moyen</div>
      <div className="dashboard-content py-3">
        <div className="dashboard-data-1">
          {formatPriceToEuros(value)}
        </div>
      </div>
    </div>
  );
}