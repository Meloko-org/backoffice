import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData
}

export function TopMarketsWidget({ data }: Props) {

  const markets = data.topMarketsByUsage;

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title">Marchés les plus utilisés</div>

      <div className="dashboard-content">
        {markets.map((m, i) => (
          <div key={i} className="flex justify-between">
            <span>{m._id || "Marché inconnu"}</span>
            <span>{m.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}