import { useNavigate } from "react-router-dom";
import RecentOrderswidgetButton from "../../../../components/admin/widgetButtons/RecentOrdersWidgetButton";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData;
};

export default function RecentOrdersWidget({ data }: Props) {
  const navigate = useNavigate();
  const orders = data.recentOrders;

  return (
    <div className="dashboard-bloc">
      
      <div className="dashboard-title-warning">
        Dernières commandes
      </div>

      <div className="dashboard-content py-2">
        <div className="space-y-3">
          {orders.map((order) => (
            <RecentOrderswidgetButton
              key={order.id}
              order={order}
              onClick={() => navigate(`/admin/orders/${order.id}`)}
              extraClasses="w-full mb-1"
            />
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