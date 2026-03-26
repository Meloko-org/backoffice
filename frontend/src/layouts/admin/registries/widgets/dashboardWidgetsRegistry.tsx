import TodayStatsWidget from "../../../../pages/admin/dashboard/components/TodayStatsWidget";
import type { AdminDashboardData } from "../../../../pages/admin/dashboard/types";

type WidgetConfig = {
  id: string;
  component: (data: AdminDashboardData) => React.ReactNode;
};

export const dashboardWidgets: WidgetConfig[] = [
  {
    id: "today-stats",
    component: (data) => (
      <TodayStatsWidget
        orders={data.today.ordersCount}
        revenue={data.today.revenue}
      />
    ),
  },
];