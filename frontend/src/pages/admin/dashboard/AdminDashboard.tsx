import Loader from "../../../components/admin/Loader";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { dashboardWidgets } from "../../../layouts/admin/registries/widgets/dashboardWidgetsRegistry";
import { useDashboard } from "./hooks/useAdminDashboard";

export default function AdminDashboard() {

  useAdminPage("Dashboard Admin")

  const { data, loading } = useDashboard();

  if (loading) return <div>L<Loader /></div>;
  if (!data) return <div>Erreur</div>;

  return (
    <div className="p-8 space-y-6 bg-pr">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboardWidgets.map((widget) => (
          <div key={widget.id}>
            {widget.component(data)}
          </div>
        ))}
      </div>
    </div>
  );
}
