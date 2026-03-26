import { formatPriceToEuros } from "../../../../utils/price/priceConverter";

type Props = {
  orders: number;
  revenue?: number;
};

export default function TodayStatsWidget({ orders, revenue }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      
      {/* Orders */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="text-sm text-gray-500">Commandes aujourd’hui</div>
        <div className="text-2xl font-semibold mt-2">
          {orders}
        </div>
      </div>

      {/* Revenue */}
      {revenue !== undefined && (
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500">Chiffre d’affaires</div>
          <div className="text-2xl font-semibold mt-2">
            {formatPriceToEuros(revenue)}
          </div>
        </div>
      )}
      
    </div>
  );
}