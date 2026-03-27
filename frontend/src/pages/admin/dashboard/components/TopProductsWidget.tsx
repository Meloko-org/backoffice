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
        {products.map((p, i) => (
          <div key={i} className="flex justify-between">
            <span>{p._id || "Produit inconnu"}</span>
            <span>{p.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}