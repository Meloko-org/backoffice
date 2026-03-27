import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData
}

export function TopShopsWidget({ data }: Props) {

  const shops = data.topShops;

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title">Top producteurs</div>

      <div className="dashboard-content">
        {shops.map((s, i) => (
          <div key={i} className="flex justify-between">
            <span>{s.name || "Shop inconnu"}</span>
            <span>{formatPriceToEuros(s.revenue)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}