import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData
};

export default function TodayStatsWidget({ data }: Props) {

  const orders = data.today.ordersCount;
  const revenue = data.today.revenue;

  // console.log("orders :", orders)
  // console.log("revenue :", revenue)

  return (
    <div className="dashboard-bloc">

      <div className="dashboard-title-success">Aujourd'hui</div>

      <div className="dashboard-content">
        {/* Orders */}
        <div className="">
          <h2 className="text-success">Commandes</h2>
          <div className="dashboard-data-1">
            {orders}
          </div>
        </div>

        {/* Revenue */}
        {revenue !== undefined && (
          <div className="">
            <h2 className="text-success">Chiffre d’affaires</h2>
            <div className="dashboard-data-1">
              {formatPriceToEuros(revenue)}
            </div>
          </div>
        )}
      </div>
      
      
      
    </div>
  );
}