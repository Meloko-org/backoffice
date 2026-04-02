import { WidgetButton } from "../../../../components/admin/buttons/WidgetButton";
import { useAdminInfo } from "../../../../layouts/admin/contexts/AdminInfoContext";
import { useAdminLayout } from "../../../../layouts/admin/contexts/AdminLayoutContext";
import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import type { AdminDashboardData } from "../types";

type Props = {
  data: AdminDashboardData;
}

export function TopMarketsWidget({
  data,
}: Props) {

  const { setInfoContext } = useAdminInfo();
  const { isRightOpen, openRight } = useAdminLayout();

  console.log("revenue by market :", data)

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
        {markets.map((m, index) => (
          <div key={index} className="flex justify-between">
            <span>{m.name}</span>
            <span>{formatPriceToEuros(m.revenue)}</span> 
          </div>
        ))} 
      </div>
    </div>
  );
}