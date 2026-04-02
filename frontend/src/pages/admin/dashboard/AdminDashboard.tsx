import Loader from "../../../components/admin/Loader";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { dashboardWidgets } from "../../../layouts/admin/registries/widgets/dashboardWidgetsRegistry";
import { AvgCartWidget } from "./components/AvgCartWidget";
import OrdersChartWidget from "./components/OrdersChartWidget";
import RecentOrdersWidget from "./components/RecentOrdersWidget";
import RecentUsersWidget from "./components/RecentUsersWidget";
import { Revenue7DaysWidget } from "./components/Revenue7DaysWidget";
import ShopsWidget from "./components/ShopsWidget";
import TodayStatsWidget from "./components/TodayStatsWidget";
import { TopMarketsByUsageWidget } from "./components/TopMarketsByUsageWidget";
import { TopMarketsWidget } from "./components/TopMarketsWidget";
import { TopProductsWidget } from "./components/TopProductsWidget";
import { TopShopsWidget } from "./components/TopShopsWidget";
import UsersWidget from "./components/UsersWidget";
import { useAdminDashboard } from "./hooks/useAdminDashboard";

export default function AdminDashboard() {

  useAdminPage("Dashboard Admin")

  const { data, loading } = useAdminDashboard();


  if (loading) return <div><Loader /></div>;
  if (!data) return <div>Erreur</div>;

  return (
    <div className="mx-auto max-w-6xl">

      <div className="grid grid-cols-6 gap-6">

        <div className="col-span-4 space-y-6">

          <div className="grid grid-cols-3 gap-6">
            <div>
              <TodayStatsWidget data={data }/>
            </div>
            <div>
              <UsersWidget data={data} />
            </div>
            <div>
              <div className="grid grid-row-2 gap-6">
                <ShopsWidget data={data} />
              </div>
            </div>
            

          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <TopProductsWidget data={data} />
            </div>
            <div>
              <TopShopsWidget data={data} />
            </div>
            <div>
              <TopMarketsWidget data={data} />
            </div>
            <div>
              <TopMarketsByUsageWidget data={data} />
            </div>
          </div>
            
        </div>

        <div className="col-span-2 space-y-3">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Revenue7DaysWidget data={data} />
            </div>
            <div>
              <AvgCartWidget data={data} />
            </div>
          </div>
          <OrdersChartWidget data={data} />
          <RecentOrdersWidget data={data} />
          <RecentUsersWidget data={data} />
        </div>


      </div>

      

      

     

      

      

      


    </div>
  );
}
