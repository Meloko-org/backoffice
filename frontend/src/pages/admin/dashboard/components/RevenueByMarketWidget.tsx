import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData;
}

export function RevenueByMarketWidget({
  data,
}: Props) {

  console.log("revenue by market :", data)

  const markets = data.revenueByMarket

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title">Top marchés</div>

      <div className="dashboard-content">
        {markets.map((m, index) => (
          <div key={index} className="flex justify-between">
            <span>{m.name}</span>
            <span>{formatPriceToEuros(m.revenue)}</span> 
          </div>
        ))} 
      </div>
    </div>
  );
}