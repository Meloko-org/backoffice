import { WidgetButton } from "../../../../components/admin/buttons/WidgetButton";
import TopShopWidgetButton from "../../../../components/admin/widgetButtons/TopShopWidgetButton";
import { useAdminInfo } from "../../../../layouts/admin/contexts/AdminInfoContext";
import { useAdminLayout } from "../../../../layouts/admin/contexts/AdminLayoutContext";
import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import type { AdminDashboardData, TopShop } from "../types";

type Props = {
  data: AdminDashboardData
}

export function TopShopsWidget({ data }: Props) {

  const { isRightOpen, openRight } = useAdminLayout();
  const { setInfoContext } = useAdminInfo();

  const shops = data.topShops;

  const handlePanel = () => {
    setInfoContext({
      type: "topShops",
      title: "Top Shops",
      level: 0
    })
    if (!isRightOpen) {
      openRight()
    }
  }

  const handleShopPanel = (s: TopShop) => {
    setInfoContext({
      id: s._id, 
      type: "topShop",
      title: s.name,
      level: 1,
      meta: {
        name: s.name
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
        <span>Top shops</span>
        <WidgetButton
          onClick={handlePanel}
          extraClasses="h-7 w-8 py-0 px-1"
        />
      </div>

      <div className="dashboard-content">
        {shops.map((s) => (
          <TopShopWidgetButton
            label={s.name}
            orders={s.orders}
            revenue={s.revenue}
            onClick={() => handleShopPanel(s)}
            extraClasses="w-full"
          />
        ))}
      </div>
    </div>
  );
}