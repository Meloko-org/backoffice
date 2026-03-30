import { WidgetButton } from "../../../../components/admin/buttons/WidgetButton";
import { useAdminInfo } from "../../../../layouts/admin/contexts/AdminInfoContext";
import { useAdminLayout } from "../../../../layouts/admin/contexts/AdminLayoutContext";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData
}

export function TopProductsWidget({ data }: Props) {

  const { isRightOpen, openRight } = useAdminLayout();
  const { setInfoContext } = useAdminInfo();

  const products = data.topProducs;


  const handlePanel = () => {
    setInfoContext({
      type: "topProducts",
      title: "Top Produits",
      level: 0
    })
    if (!isRightOpen) {
      openRight()
    }
  }

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title-link">
        <span>Top produits</span>
        <WidgetButton
          onClick={handlePanel}
          extraClasses="h-7 w-8 py-0 px-1"
        />
      </div>

      <div className="dashboard-content">
        {products.map((p) => (
          <div key={p._id} className="flex justify-between">
            <span>{p.name}</span>
            <span>{p.quantityFormatted}</span>
          </div>
        ))}
      </div>
    </div>
  );
}