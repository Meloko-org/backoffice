import type { TopMarketByUsage } from "../../../pages/admin/dashboard/types";

type Props = {
  market: TopMarketByUsage;
  onClick: () => void;
  extraClasses?: string;
}

export default function TopMarketByUsagePanelButton({ market, onClick, extraClasses }: Props) {

  return (
    <button
      onClick={onClick}
      className={`
        panel-list-btn
        ${extraClasses}
      `}
    >
      <div>
        <div className="font-medium bg-primary/30 px-2 rounded-md">{market.name}</div>
        
      </div>

      <div className="font-semibold">
        {market.count}
      </div>
    </button>
  )
}