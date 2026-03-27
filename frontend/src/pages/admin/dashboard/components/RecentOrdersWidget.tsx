import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData;
};

export default function RecentOrdersWidget({ data }: Props) {
  const orders = data.recentOrders;

  return (
    <div className="dashboard-bloc">
      
      <div className="dashboard-title">
        Dernières commandes
      </div>

      <div className="dashboard-content">
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center text-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  #{order.orderNumber}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="text-right">
                <div className="font-medium">
                  {formatPriceToEuros(order.total)}
                </div>

                <div
                  className={`text-xs ${
                    order.isPaid
                      ? "text-primary"
                      : "text-danger"
                  }`}
                >
                  {order.isPaid ? "Payée" : "Non payée"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-sm text-gray-400">
            Aucune commande récente
          </div>
        )}

      </div>
      

      
    </div>
  );
}