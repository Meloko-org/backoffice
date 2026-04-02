import { formatPriceToEuros } from "../../../utils/price/priceConverter";

type Props = {
  order: {
    id: string;
    orderNumber: string;
    total: number;
    createdAt: string;
    isPaid: boolean;
  };
  onClick: () => void;
  extraClasses?: string;
}

export default function RecentOrderswidgetButton({
  order,
  onClick,
  extraClasses
}: Props) {

  return (
    <button
      onClick={onClick}
      className={`
        panel-list-btn
        ${extraClasses}
      `}
    >
      <div className="flex justify-between items-center text-sm w-full">
        <div className="flex flex-col">
          <span className="font-medium">
            #{order.orderNumber}
          </span>
          <span className="text-gray-400 text-xs">
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="text-right">
          <div className="font-medium">
            {formatPriceToEuros(order.total)}
          </div>

          <div
            className={`text-xs ${
              order.isPaid
                ? "text-primary"
                : "text-danger"
            }`}
          >
            {order.isPaid ? "Payée" : "Non payée"}
          </div>
        </div>
      </div>
    </button>
  )
}