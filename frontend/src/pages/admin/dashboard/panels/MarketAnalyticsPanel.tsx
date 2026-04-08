import { useEffect, useState } from "react";
import { useAdminInfo, type WithId } from "../../../../layouts/admin/contexts/AdminInfoContext"
import type { MarketAnalytics } from "../types";
import { getMarketAnalytics } from "../api/dashboard.api";
import Loader from "../../../../components/admin/Loader";
import KPI from "../../../../components/admin/cards/KPI";
import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type Props = {
  context: WithId<"marketAnalytics">
}

export default function marketAnalytics({ context }: Props) {

  const { setInfoContext } = useAdminInfo();
    
  const [ data, setData ] = useState<MarketAnalytics>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarketAnalytics(context.id)
      .then(setData)
      .finally(() => setLoading(false))
  }, [context.id])

  const handleBack = () => {
    setInfoContext({
      id: context.meta.marketId,
      type: "topMarket",
      title: context.meta.marketName,
      level: 1,
      direction: "back",
      meta: {
        originalPanelType: context.meta.originalPanelType,
        originalPanelTitle: context.meta.originalPanelTitle,
      }
    });
  }

  if (loading) return <Loader />
  if (!data) return <div>Erreur</div>

  const { market, stats, timeline, topShops, topProducts, insights } = data;

  return (
    <div className="h-full flex flex-col justify-center p-4 gap-4">

      <div className="text-xl font-semibold bg-primary/20 text-center">
        {market.name}
      </div>

      {/* KPI */}
      <div className="grid grid-cols-3 gap-3">
        <KPI title="Chiffre d'affaires" value={formatPriceToEuros(stats.totalRevenue)!} />
        <KPI title="Commandes" value={stats.ordersCount} />
        <KPI title="Panier moyen" value={formatPriceToEuros(stats.avgOrderValue)!} />
      </div>

      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3">
          {/* GRAPH */}
          <div className="dashboard-bloc">
            <div className="dashboard-title-primary">Activité</div>

            <div className="panel-bloc-content">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={timeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#98B66E" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          {/* INSIGHTS */}
          <div className="dashboard-bloc">
            <div className="dashboard-title-primary">Insights</div>

            <div className="panel-bloc-content">
              <div className="text-(--second-text) mb-0">Meilleur jour</div>
              <div className="font-semibold mb-3">{insights.bestDay}</div>
              <div className="text-(--second-text) mb-0">Top Shop</div>
              <div className="font-semibold mb-3">{insights.topShop}</div>
              <div className="text-(--second-text) mb-0">Top Product</div>
              <div className="font-semibold mb-3">{insights.topProduct}</div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP SHOPS */}
      <div className="dashboard-bloc">
        <div className="dashboard-title-primary">Top shops</div>

        <div className="panel-bloc-content">
          {topShops.map((s: any) => (
            <div key={s._id} className="flex justify-between text-sm px-3">
              <span>{s.name}</span>
              <span>{formatPriceToEuros(s.revenue)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="dashboard-bloc">
        <div className="dashboard-title-primary">Top produits</div>

        <div className="panel-bloc-content">
          {topProducts.map((p: any) => (
            <div key={p.name} className="flex justify-between text-sm px-3">
              <span>{p.name}</span>
              <span>{formatPriceToEuros(p.revenue)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="btn-outline-primary"
        >
          ← Retour
        </button>
      </div>

    </div>
  )
}