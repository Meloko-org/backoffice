import { useEffect, useState } from "react";
import { useAdminInfo, type WithId } from "../../../../layouts/admin/contexts/AdminInfoContext"
import { type ProductAnalytics } from "../types";
import Loader from "../../../../components/admin/Loader";
import KPI from "../../../../components/admin/cards/KPI";
import { formatPriceToEuros } from "../../../../utils/price/priceConverter";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";
import { getProductAnalytics } from "../api/dashboard.api";
import { formatQty } from "../../../../utils/quantity/quantityConverter";
import { getNameFromAnalytics } from "../../../../utils/product/nameGetter";

type Props = {
  context: WithId<"productAnalytics">
}

export default function ProductAnalyticsPanel({ context }: Props) {

  const { setInfoContext } = useAdminInfo();

  const [ data, setData ] = useState<ProductAnalytics>();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"revenue" | "quantity">("revenue");
  const [ color, setColor ] = useState<"#98B66E" | "#0081A7">("#98B66E");

  useEffect(() => {
    setLoading(true)
    getProductAnalytics(context.id).then(setData).finally(() => setLoading(false))
  }, [context.id])

  const handleBack = () => {
    setInfoContext({
      id: context.meta.stockId,
      type: "topProduct",
      title: context.meta.stockName,
      level:1,
      direction: "back"
    });
  };

  if (loading) return <Loader />
  if (!data) return <div>Erreur</div>

  return (
    <div className="h-full flex flex-col justify-center p-4 gap-4">

      <div className="text-xl font-semibold bg-primary/20 text-center">
        {getNameFromAnalytics(data.product)}
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI title="Ventes totales" value={formatQty(data.stats.totalQuantity, data.product.unit)} />
        <KPI title="Chiffre d’affaires" value={formatPriceToEuros(data.stats.totalRevenue)!} />
        <KPI title="Nombre de commandes" value={data.stats.ordersCount} />
        <KPI title="Panier moyen" value={formatPriceToEuros(data.stats.avgOrderValue)!} />
      </div>


      <div className="dashboard-bloc">
        <div className="dashboard-title-primary">
          Performance
        </div>

        <div className="panel-bloc-content">

          <div className="flex flex-row space-x-3">
            <LineChart width={300} height={200} data={data.timeline}>
              <XAxis dataKey="date" />
              <Tooltip />
              <CartesianGrid stroke="#eee" />
              <Line 
                type="monotone"
                dataKey={mode}
                stroke={color}  
              />
            </LineChart>
            <div className="flex flex-col justify-center items-center gap-2">
              <button 
                onClick={() => {
                  setMode("revenue")
                  setColor("#98B66E")
                }}
                className="btn-primary"
              >€</button>
              <button 
                onClick={() => {
                  setMode("quantity")
                  setColor("#0081A7")
                }}
                className="btn-success"
              >Qté</button>
            </div>
          </div>
        </div>
          
       

        
      </div>


      <div className="dashboard-bloc">
        <div className="dashboard-title-primary">Insights</div>

        <ul className="panel-bloc-content text-sm">
          <li>
            📈 Pic de ventes le <span className="font-semibold">{data.insights.bestDay}</span>
          </li>

          <li>
            🏆 Meilleur vendeur : <span className="font-semibold">{data.insights.topShop}</span>
          </li>

          <li>
            💡 Prix moyen : <span className="font-semibold">{formatPriceToEuros(data.insights.avgPrice)}</span>
          </li>

          {/* <li>
            ⚠️ Forte dispersion des prix entre producteurs
          </li> */}
        </ul>
      </div>


      <div className="grid grid-cols-2 gap-3">

        <div className="dashboard-bloc">
          <div className="dashboard-title-primary">Top producteurs</div>

          <div className="panel-bloc-content space-y-1">
            {data.topShops.map((shop) => (
              <div key={shop._id} className="flex justify-between">
                <span>{shop.name}</span>
                <span>{formatQty(shop.quantity, data.product.unit)}</span>
              </div>
            ))}
          </div>
          
        </div>


        <div className="dashboard-bloc">
          <div className="dashboard-title-primary">Analyse des prix</div>

          <div className="panel-bloc-content space-y-1">
            <div className="flex justify-between">
              <span>Prix moyen</span>
              <span>{formatPriceToEuros(data.pricing.avg)}</span>
            </div>

            <div className="flex justify-between">
              <span>Min</span>
              <span>{formatPriceToEuros(data.pricing.min)}</span>
            </div>

            <div className="flex justify-between">
              <span>Max</span>
              <span>{formatPriceToEuros(data.pricing.max)}</span>
            </div>
          </div>
          
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