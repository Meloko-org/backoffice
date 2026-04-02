import { useEffect, useState } from "react"
import { useAdminInfo, type WithType } from "../../../../layouts/admin/contexts/AdminInfoContext"
import { type TopShop } from "../types"
import Loader from "../../../../components/admin/Loader"
import { getTopShopsList } from "../api/dashboard.api"
import TopShopPanelButton from "../../../../components/admin/panelButtons/TopShopPanelButton"

type Props = {
  context: WithType<"topShops">
}

export default function TopShopsListPanel({ context }: Props) {

  const [ shops, setShops ] = useState<TopShop[]>([]);
  const [ loading, setLoading ] = useState(true);

  const { setInfoContext } = useAdminInfo();

  useEffect(() => {
    setLoading(true);
    getTopShopsList(20).then(setShops).finally(() => setLoading(false))
  }, [])


  if (loading) return <Loader />

  return (
    <div className="p-4 space-y-3">

      {shops.map((s) => (
        <TopShopPanelButton
          key={s._id}
          shop={s}
          onClick={() => 
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
          }
          extraClasses="w-full"
        />
      ))}
    </div>
  )
}