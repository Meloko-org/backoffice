import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData;
};

export default function ShopsWidget({ data }: Props) {
  const { total, totalPremium, newToday, newTodayPremium, newWeek, newWeekPremium } = data.shops;

  return (
    <div className="dashboard-bloc">

      <div className="dashboard-title">Shops</div>

      <div className="dashboard-content">
        <h2>Total / <span className="text-warning">Premium</span></h2>
        <div className="dashboard-data-1">
          <span>{total} / </span>
          <span className="text-warning">{totalPremium}</span>
        </div>
      
        <h2>Aujourd’hui</h2>
        <div className="dashboard-data-1">
          <span>+{newToday ? newToday : 0} / </span>
          <span className="text-warning">{newTodayPremium}</span>
        </div>

        <h2>Cette semaine</h2>
        <div className="dashboard-data-1">
          <span>+{newWeek ? newWeek : 0} / </span>
          <span className="text-warning">{newWeekPremium}</span>
        </div>
      </div>
      
    </div>
  );
}