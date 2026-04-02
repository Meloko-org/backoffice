import { useEffect, useState } from "react";
import { useAdminInfo, type WithType } from "../../../../layouts/admin/contexts/AdminInfoContext";
import Loader from "../../../../components/admin/Loader";
import { getTopProductsList } from "../api/dashboard.api";
import type { TopProduct } from "../types";
import TopProductPanelButton from "../../../../components/admin/panelButtons/TopProductPanelButton";

type Props = {
  context: WithType<"topProducts">
}

export default function TopProductsListPanel({ context }: Props) {

  console.log("context list:", context)

  const [products, setProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const { setInfoContext } = useAdminInfo();

  useEffect(() => {
    setLoading(true);
    getTopProductsList(20).then(setProducts).finally(() => setLoading(false));

  }, []);

  if (loading) return <Loader />

  return (
    <div className="p-4 space-y-3">

      {products?.map((p) => (
        <TopProductPanelButton 
          key={p._id}
          product={p} 
          onClick={() =>
            setInfoContext({
              id: p._id, 
              type: "topProduct",
              title: p.name,
              level: 1,
              meta: {
                name: p.name
              },
              direction: "forward"
            })}
          extraClasses="w-full"
        />

      ))}

    </div>
  );
}