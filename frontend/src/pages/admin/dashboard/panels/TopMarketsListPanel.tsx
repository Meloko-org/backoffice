import { useEffect, useState } from "react"
import { type TopMarket } from "../types"
import Loader from "../../../../components/admin/Loader"
import { getTopMarketsList } from "../api/dashboard.api"
import TopMarketPanelButton from "../../../../components/admin/panelButtons/TopMarketPanelButton"
import { useRightPanel, type WithType } from "../../../../layouts/admin/contexts/RightPanelContext"

type Props = {
  context: WithType<"topMarkets">
}

export default function TopMarketsListPanel({ context }: Props) {

  const [ markets, setMarkets ] = useState<TopMarket[]>([]);
  const [ loading, setLoading ] = useState(true);

  const { setMain } = useRightPanel();

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
            setMain({
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