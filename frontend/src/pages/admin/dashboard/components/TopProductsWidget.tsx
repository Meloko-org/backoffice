import { WidgetButton } from "../../../../components/admin/buttons/WidgetButton";
import TopProductWidgetButton from "../../../../components/admin/widgetButtons/TopProductWidgetButton";
import { useAdminInfo } from "../../../../layouts/admin/contexts/AdminInfoContext";
import { useAdminLayout } from "../../../../layouts/admin/contexts/AdminLayoutContext";
import type { AdminDashboardData, TopProduct } from "../types";

type Props = {
  data: AdminDashboardData
}

export function TopProductsWidget({ data }: Props) {

  const { isRightOpen, openRight } = useAdminLayout();
  const { setInfoContext } = useAdminInfo();

  const products = data.topProducts;

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

  const handleProductPanel = (p: TopProduct) => {
    setInfoContext({
      id: p._id, 
      type: "topProduct",
      title: p.name,
      level: 1,
      meta: {
        name: p.name
      },
      direction: "forward"
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

      <div className="dashboard-content space-y-1">
        {products.map((p) => (
          <TopProductWidgetButton
            key={p._id}
            label={p.name}
            quantity={p.quantityFormatted}
            onClick={() => handleProductPanel(p)}
            extraClasses="w-full"
          />
        ))}
      </div>
    </div>
  );
}