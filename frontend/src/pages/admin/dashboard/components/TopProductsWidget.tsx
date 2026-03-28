import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData
}

export function TopProductsWidget({ data }: Props) {

  const products = data.topProducs;

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title">Top produits</div>

      <div className="dashboard-content">
        {products.map((p) => (
          <div key={p._id} className="flex justify-between">
            <span>{p.name}</span>
            <span>{p.quantityFormatted}</span>
          </div>
        ))}
      </div>
    </div>
  );
}