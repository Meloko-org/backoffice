import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData
}

export function TopMarketsByUsageWidget({ data }: Props) {

  const markets = data.topMarketsByUsage;

  console.log("markets :", markets)

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title-primary">Marchés les plus utilisés</div>

      <div className="dashboard-content">
        {markets.map((m, i) => (
          <div key={i} className="flex justify-between">
            <span>{m.name}</span>
            <span>{m.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}