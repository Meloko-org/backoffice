import { useEffect, useState } from "react";
import { useAdminInfo, type WithId } from "../../../../layouts/admin/contexts/AdminInfoContext"
import type { TopProductDetails } from "../types";
import { getTopProductDetails } from "../api/dashboard.api";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";
import { StatCard } from "../../../../components/admin/cards/StatCard";
import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import Loader from "../../../../components/admin/Loader";
import { EyeButton } from "../../../../components/admin/buttons/EyeButton";

type Props = {
  context: WithId<"topProduct">
}

export default function TopProductPanel({ context }: Props) {

  console.log("context product:", context)

  const { id } = context;
  const { setInfoContext } = useAdminInfo();

  const [data, setData] = useState<TopProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopProductDetails(id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  const handleBack = () => {
    setInfoContext({
      type: "topProducts",
      title: "Top Produits",
      level:0,
      direction: "back"
    });
  };

 
  console.log("data :", data)
  
  if (loading) return <Loader />;
  if (!data) return <div className="p-6">Erreur sdfgsdf</div>;

   const handleAnalytics = () => {
    setInfoContext({
      type: "productAnalytics",
      id: data.product._id,
      title: "Analyse du produit",
      level: 1,
      meta: {
        from: "topProduct",
        stockId: context.id,
        stockName: context.title
      },
      direction: "forward"
    })
  }

  return (
    <div className="h-full flex flex-col justify-center mt-5">

      <div className="p-4 space-y-6 overflow-auto">

        <div className="flex flex-row justify-center items-center w-full bg-primary/20 py-1">
          <span className="text-(--second-text)">vendu par :</span>
          <div className="flex flex-row items-center pl-5">
            <span className="font-semibold text-xl">{data.shop.name}</span>
            <EyeButton
              onClick={() => {}}
              extraClasses="h-8 w-9 py-0 px-1 ml-5"
            />
          </div>
          
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            label="Quantité vendue"
            value={data.stats.totalQuantity}
          />
          <StatCard
            label="Chiffre d’affaires"
            value={formatPriceToEuros(data.stats.totalRevenue)!}
          />
          <StatCard
            label="Commandes"
            value={data.stats.ordersCount}
          />
        </div>

        {/* CHART */}
        <div className="dashboard-bloc">
          <div className="dashboard-title">
            Activité
          </div>

          <div className="dashboard-content">
            <div className="flex flex-row justify-center">
              <LineChart width={350} height={250} data={data.timeline}>
                <XAxis dataKey="date" />
                <Tooltip />
                <CartesianGrid stroke="#eee" />

                <Line
                  type="monotone"
                  dataKey="quantity"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                />
              </LineChart>
            </div>
          </div>
          
        </div>

        

      </div>


      <div className="flex items-center justify-between p-4">
        <button
          onClick={handleBack}
          className="btn-outline-primary"
        >
          ← Retour
        </button>

        <button
          onClick={handleAnalytics}
          className="btn-primary"
        >
          Product Analytics
        </button>
      </div>
    </div>
  );
}