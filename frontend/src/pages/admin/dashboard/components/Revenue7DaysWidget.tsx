import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData
}

export function Revenue7DaysWidget({ data }: Props) {

  const value = data.revenue7Days;

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title-warning">CA sur 7 jours</div>
      <div className="dashboard-content py-3">
        <div className="dashboard-data-1">
          {formatPriceToEuros(value)}
        </div>
      </div>
      
    </div>
  );
}