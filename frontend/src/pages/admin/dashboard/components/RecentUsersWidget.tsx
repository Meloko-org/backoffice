import { useNavigate } from "react-router-dom";
import RecentUserswidgetButton from "../../../../components/admin/widgetButtons/RecentUsersWidgetButton";
import type { AdminDashboardData } from "../types"

type Props = {
  data: AdminDashboardData;
}

export default function RecentUsersWidget({ data }: Props) {
  const navigate = useNavigate();
  const users = data.recentUsers;

  return (
    <div className="dashboard-bloc">
          
      <div className="dashboard-title-warning">
        Derniers users
      </div>

      <div className="dashboard-content py-2">
        <div className="space-y-3">
          {users.map((user) => (
            <RecentUserswidgetButton
              key={user.id}
              user={user}
              onClick={() => navigate(`/admin/users/${user.id}`)}
              extraClasses="w-full mb-1"
            />
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-sm text-gray-400">
            Aucun user récent
          </div>
        )}

      </div>
      
    </div>
  )
}