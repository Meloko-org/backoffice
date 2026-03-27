import Loader from "../../../components/admin/Loader";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { dashboardWidgets } from "../../../layouts/admin/registries/widgets/dashboardWidgetsRegistry";
import { AvgCartWidget } from "./components/AvgCartWidget";
import OrdersChartWidget from "./components/OrdersChartWidget";
import RecentOrdersWidget from "./components/RecentOrdersWidget";
import { Revenue7DaysWidget } from "./components/Revenue7DaysWidget";
import { RevenueByMarketWidget } from "./components/RevenueByMarketWidget";
import TodayStatsWidget from "./components/TodayStatsWidget";
import { TopMarketsWidget } from "./components/TopMarketsWidget";
import { TopProductsWidget } from "./components/TopProductsWidget";
import { TopShopsWidget } from "./components/TopShopsWidget";
import UsersWidget from "./components/UsersWidget";
import { useAdminDashboard } from "./hooks/useAdminDashboard";

export default function AdminDashboard() {

  useAdminPage("Dashboard Admin")

  const { data, loading } = useAdminDashboard();

  console.log("dash data :", data)
  console.log("FULL DATA:", data);
  console.log("TODAY:", data?.today);

  if (loading) return <div><Loader /></div>;
  if (!data) return <div>Erreur</div>;

  return (
    <div className="p-8 space-y-6 bg-pr">

      <div className="grid grid-cols-6 gap-6">
        <div>
          <TodayStatsWidget data={data }/>
        </div>
        <div>
          <UsersWidget data={data} />
        </div>
        <div className="col-span-2">
          <RecentOrdersWidget data={data} />
        </div>
        <div className="col-span-2">
          <OrdersChartWidget data={data} />
        </div>
      </div>

      <Revenue7DaysWidget data={data} />

      <AvgCartWidget data={data} />

      <RevenueByMarketWidget data={data} />

      <TopProductsWidget data={data} />

      <TopShopsWidget data={data} />

      <TopMarketsWidget data={data} />


    </div>
  );
}
