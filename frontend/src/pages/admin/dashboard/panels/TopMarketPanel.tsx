import { useEffect, useState } from "react";
import { type TopMarketDetails } from "../types";
import { getTopMarketDetails } from "../api/dashboard.api";
import Loader from "../../../../components/admin/Loader";
import { StatCard } from "../../../../components/admin/cards/StatCard";
import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";
import { useRightPanel, type WithId } from "../../../../layouts/admin/contexts/RightPanelContext";

type Props = {
  context: WithId<"topMarket">
}

export default function TopMarketPanel({ context }: Props) {

  const { id } = context;
  const { setMain } = useRightPanel();

  const [ data, setData ] = useState<TopMarketDetails | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    getTopMarketDetails(id)
      .then(setData)
      .finally(() => setLoading(false))
  }, [id])

  const handleBack = () => {
    setMain({
      type: context.meta.originalPanelType,
      title: context.meta.originalPanelTitle,
      level: 0,
      direction: "back"
    });
  }

  if (loading) return <Loader />;
  if (!data) return <div className="p-6">Erreur</div>;

  const handleAnalytics = () => {
    setMain({
      type: "marketAnalytics",
      id: data._id,
      title: "Analyse du market",
      level: 1,
      meta: {
        from: "topMarket",
        marketId: context.id,
        marketName: context.title,
        originalPanelType: context.meta.originalPanelType,
        originalPanelTitle: context.meta.originalPanelTitle,
      },
      direction: "forward"
    })
  }

  return (
    <div className="h-full flex flex-col justify-center mt-5">

      <div className="p-4 space-y-6 overflow-auto">
      
        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            label="Chiffre d'affaire"
            value={formatPriceToEuros(data.stats.totalRevenue)!}
          />
          <StatCard
            label="Commandes"
            value={data.stats.ordersCount}
          />
          <StatCard
            label="Panier moyen"
            value={formatPriceToEuros(data.stats.avgOrderValue)!}
          />
        </div>


        {/* CHART */}
        <div className="dashboard-bloc">
          <div className="dashboard-title-primary">
            Activité
          </div>
          <div className="dashboard-content">
            <div className="flex flex-row justify-center">
              <LineChart width={350} height={200} data={data.timeline}>
                <XAxis dataKey="date" />
                <Tooltip />
                <CartesianGrid stroke="#eee" />

                <Line
                  type="monotone"
                  dataKey="quantity"
                  stroke="#0081A7"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#98B66E"
                />
              </LineChart>
            </div>
          </div>
        </div>


        <div className="dashboard-bloc">
          <div className="dashboard-title-primary">
            Meilleures ventes
          </div>

          <div className="dashboard-content">
            {data.topShops.map((p) => (
              <div key={p._id} className="flex flex-row justify-between">
                <span className="uppercase font-mono font-semibold">{p.name}</span>
                <span className="font-semibold text-sm">{formatPriceToEuros(p.revenue)}</span>
                
              </div>
            ))}
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
          Market Analytics
        </button>
      </div>

    </div>
  )
}