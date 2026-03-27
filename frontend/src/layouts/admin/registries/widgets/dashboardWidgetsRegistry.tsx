import { AvgCartWidget } from "../../../../pages/admin/dashboard/components/AvgCartWidget";
import OrdersChartWidget from "../../../../pages/admin/dashboard/components/OrdersChartWidget";
import RecentOrdersWidget from "../../../../pages/admin/dashboard/components/RecentOrdersWidget";
import { Revenue7DaysWidget } from "../../../../pages/admin/dashboard/components/Revenue7DaysWidget";
import { RevenueByMarketWidget } from "../../../../pages/admin/dashboard/components/RevenueByMarketWidget";
import TodayStatsWidget from "../../../../pages/admin/dashboard/components/TodayStatsWidget";
import { TopMarketsWidget } from "../../../../pages/admin/dashboard/components/TopMarketsWidget";
import { TopProductsWidget } from "../../../../pages/admin/dashboard/components/TopProductsWidget";
import { TopShopsWidget } from "../../../../pages/admin/dashboard/components/TopShopsWidget";
import UsersWidget from "../../../../pages/admin/dashboard/components/UsersWidget";
import type { AdminDashboardData } from "../../../../pages/admin/dashboard/types";

type WidgetConfig = {
  id: string;
  Component: React.ComponentType<{ data: AdminDashboardData }>;
};

export const dashboardWidgets: WidgetConfig[] = [
  {
    id: "today-stats",
    Component: TodayStatsWidget,
  },
  {
    id: "users",
    Component: UsersWidget,
  },
  {
    id: "recent-orders",
    Component: RecentOrdersWidget,
  },
  {
    id: "orders-chart",
    Component: OrdersChartWidget,
  },
  {
    id: "revenue-7d",
    Component: Revenue7DaysWidget,
  },
  {
    id: "avg-cart",
    Component: AvgCartWidget,
  },
  {
    id: "market-revenue",
    Component: RevenueByMarketWidget,
  },
  {
    id: "top-markets",
    Component: TopMarketsWidget,
  },
  {
    id: "top-products",
    Component: TopProductsWidget,
  },
  {
    id: "top-shops",
    Component: TopShopsWidget,
  }
];