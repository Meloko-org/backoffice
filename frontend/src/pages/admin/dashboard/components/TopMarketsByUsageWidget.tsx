import { WidgetButton } from "../../../../components/admin/buttons/WidgetButton";
import TopMarketByUsageWidgetButton from "../../../../components/admin/widgetButtons/TopMarketByUsageWidgetButton";
import { useAdminInfo } from "../../../../layouts/admin/contexts/AdminInfoContext";
import { useAdminLayout } from "../../../../layouts/admin/contexts/AdminLayoutContext";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData
}

export function TopMarketsByUsageWidget({ data }: Props) {

  const { setInfoContext } = useAdminInfo();
  const { isRightOpen, openRight } = useAdminLayout();
  

  const markets = data.topMarketsByUsage;

  const handlePanel = () => {
    setInfoContext({
      type: "topMarketsByUsage",
      title: "Top Markets By Usage",
      level: 0
    })
    if (!isRightOpen) {
      openRight()
    }
  }

  const handleMarketPanel = (m: {_id: string; name: string; count: number}) => {
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

  console.log("markets :", markets)

  return (
    <div className="dashboard-bloc">
      <div className="dashboard-title-link">
        <span>Marchés les plus utilisés</span>
        <WidgetButton
          onClick={handlePanel}
          extraClasses="h-7 w-8 py-0 px-1"
        />
      </div>

      <div className="dashboard-content">
        {markets.map((m) => (
          <TopMarketByUsageWidgetButton
            key={m._id}
            name={m.name}
            count={m.count}
            onClick={() => handleMarketPanel(m)}
            extraClasses="w-full"
          />
        ))}
      </div>
    </div>
  );
}