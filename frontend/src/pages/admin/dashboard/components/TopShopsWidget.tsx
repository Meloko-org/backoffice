import { WidgetButton } from "../../../../components/admin/buttons/WidgetButton";
import TopShopWidgetButton from "../../../../components/admin/widgetButtons/TopShopWidgetButton";
import { useRightPanel } from "../../../../layouts/admin/contexts/RightPanelContext";
import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import type { AdminDashboardData, TopShop } from "../types";

type Props = {
  data: AdminDashboardData
}

export function TopShopsWidget({ data }: Props) {

  const { main, setMain,  overlay} = useRightPanel();
  const isRightOpen = !!main || !!overlay;

  const shops = data.topShops;

  const handlePanel = () => {
    setMain({
      type: "topShops",
      title: "Top Shops",
      level: 0
    })
    // if (!isRightOpen) {
    //   openRight()
    // }
  }

  const handleShopPanel = (s: TopShop) => {
    setMain({
      id: s._id, 
      type: "topShop",
      title: s.name,
      level: 1,
      meta: {
        name: s.name
      },
      direction: "forward"
    })
    // if (!isRightOpen) {
    //   openRight()
    // }
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
            key={s._id}
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