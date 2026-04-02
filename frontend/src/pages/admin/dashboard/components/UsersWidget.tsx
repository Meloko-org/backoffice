import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData;
};

export default function UsersWidget({ data }: Props) {
  const { total, newToday, newWeek } = data.users;

  return (
    <div className="dashboard-bloc">

      <div className="dashboard-title-primary">Utilisateurs</div>

      <div className="dashboard-content">
        <h2>Total</h2>
        <div className="dashboard-data-1">
          {total}
        </div>
      
        <h2>Aujourd’hui</h2>
        <div className="dashboard-data-1">+{newToday ? newToday : 0}</div>

        <h2>Cette semaine</h2>
        <div className="dashboard-data-1">+{newWeek ? newWeek : 0}</div>
      </div>
      
    </div>
  );
}