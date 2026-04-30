import { useEffect, useState } from "react";
import Loader from "../../../../components/admin/Loader";
import { getTopProductsList } from "../api/dashboard.api";
import type { TopProduct } from "../types";
import TopProductPanelButton from "../../../../components/admin/panelButtons/TopProductPanelButton";
import { useRightPanel, type WithType } from "../../../../layouts/admin/contexts/RightPanelContext";

type Props = {
  context: WithType<"topProducts">
}

export default function TopProductsListPanel({ context }: Props) {

  const [products, setProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const { setMain } = useRightPanel();

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
            setMain({
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