import { useEffect, useState } from "react";
import { useAdminInfo, type WithType } from "../../../../layouts/admin/contexts/AdminInfoContext";
import type { TopMarketByUsage } from "../types";
import { getTopMarketsByUsageList } from "../api/dashboard.api";
import Loader from "../../../../components/admin/Loader";
import TopMarketByUsagePanelButton from "../../../../components/admin/panelButtons/TopMarketByUsagePanelButton";

type Props = {
  context: WithType<"topMarketsByUsage">
}

export default function TopMarketsByUsageListPanel({ context }: Props) {

  const [ markets, setMarkets ] = useState<TopMarketByUsage[]>([]);
  const [ loading, setLoading ] = useState(true);

  const { setInfoContext } = useAdminInfo();

  useEffect(() => {
    setLoading(true);
    getTopMarketsByUsageList(20).then(setMarkets).finally(() => setLoading(false))
  }, [])


  if (loading) return <Loader />

  console.log("markets :", markets)

  return (
    <div className="p-4 space-y-3">

      {markets?.map((m, index) => (
        <TopMarketByUsagePanelButton
          key={index}
          market={m}
          onClick={() => 
            setInfoContext({
              id: m._id,
              type: "topMarket",
              title: m.name,
              level: 1,
              meta: {
                name: m.name,
                type: "topMarketsByUsage",
                title: "top markets by usage",
              },
              direction: "forward"
            })
          }
          extraClasses="w-full"
        />
      ))}

 
    </div>
  )
}