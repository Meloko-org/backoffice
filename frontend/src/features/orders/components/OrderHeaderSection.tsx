import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import type { OrderDetail } from "../types/order";

interface Props {
  order: OrderDetail;
}

export function OrderHeaderSection({ order }: Props) {
  return (
    <div className="bloc">
      <h1 className="">
        Commande {order.orderNumber}
      </h1>

      <div className="order-bloc">
        <div>
          <p><strong>Status paiement :</strong> {order.isPaid ? "Payée" : "Non payée"}</p>
          <p><strong>Méthode :</strong> {order.paymentMethod}</p>
        </div>

        <div>
          <p><strong>Total HT :</strong> {formatPriceToEuros(order.totalHT)}</p>
          <p><strong>Total TVA :</strong> {formatPriceToEuros(order.totalVAT)}</p>
          <p><strong>Total TTC :</strong> {formatPriceToEuros(order.totalTTC)}</p>
        </div>

        <div>
          <p><strong>Créée le :</strong> {new Date(order.createdAt).toLocaleString()}</p>
          {order.paidAt && (
            <p><strong>Payée le :</strong> {new Date(order.paidAt).toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  );
}
