import { WidgetButton } from "../../../../components/admin/buttons/WidgetButton";
import TopMarketWidgetButton from "../../../../components/admin/widgetButtons/TopMarketWidgetButton";
import { useAdminInfo } from "../../../../layouts/admin/contexts/AdminInfoContext";
import { useAdminLayout } from "../../../../layouts/admin/contexts/AdminLayoutContext";
import type { AdminDashboardData, TopMarket } from "../types";

type Props = {
  data: AdminDashboardData;
}

export function TopMarketsWidget({
  data,
}: Props) {

  const { setInfoContext } = useAdminInfo();
  const { isRightOpen, openRight } = useAdminLayout();

  // console.log("revenue by market :", data)

  const markets = data.topMarkets

  const handlePanel = () => {
    setInfoContext({
      type: "topMarkets",
      title: "Top Markets",
      level: 0
    })
    if (!isRightOpen) {
      openRight()
    }
  }

  const handleMarketPanel = (m: TopMarket) => {
    setInfoContext({
      id: m._id,
      type: "topMarket",
      title: m.name,
      level: 1,
      meta: {
        name: m.name
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
        <span>Top marchés</span>
        <WidgetButton
          onClick={handlePanel}
          extraClasses="h-7 w-8 py-0 px-1"
        />
      </div>

      <div className="dashboard-content">
        {markets.map((m) => (
          <TopMarketWidgetButton
            key={m._id}
            name={m.name}
            revenue={m.revenue}
            onClick={() => handleMarketPanel(m)}
            extraClasses="w-full"
          />
        ))} 
      </div>
    </div>
  );
}