import { useEffect, useState } from "react"
import { useAdminInfo, type WithType } from "../../../../layouts/admin/contexts/AdminInfoContext"
import { type TopMarket } from "../types"
import Loader from "../../../../components/admin/Loader"
import { getTopMarketsList } from "../api/dashboard.api"
import TopMarketPanelButton from "../../../../components/admin/panelButtons/TopMarketPanelButton"

type Props = {
  context: WithType<"topMarkets">
}

export default function TopMarketsListPanel({ context }: Props) {

  const [ markets, setMarkets ] = useState<TopMarket[]>([]);
  const [ loading, setLoading ] = useState(true);

  const { setInfoContext } = useAdminInfo();

  useEffect(() => {
    setLoading(true);
    getTopMarketsList(20).then(setMarkets).finally(() => setLoading(false))
  }, [])


  if (loading) return <Loader />

  return (
    <div className="p-4 space-y-3">

      {markets?.map((m, index) => (
        <TopMarketPanelButton
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
                originalPanelType: "topMarkets",
                originalPanelTitle: "top markets",
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