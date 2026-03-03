import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import type { Order } from "../types/order"

type Props = {
  order: Order;
  onEdit?: (order: Order) => void;
  onDelete?: (order: Order) => void;
}

export default function OrderDetails({
  order,
  onEdit,
  onDelete,
}: Props) {

  if (!order) return null;

  return (
    <div className="p-4 text-sm relative">

      <div className="mb-5">
        <p className="detail-label text-xs uppercase tracking-wide">
          Numéro de commande
        </p>
        <p className="detail-info font-medium m-0">{order.orderNumber}</p>
      </div>

      <div className="mb-5">
        <p className="detail-label text-xs uppercase tracking-wide">
          Client
        </p>
        <p className="detail-info font-medium m-0">{`${order.user.firstname} ${order.user.lastname}`}</p>
        <p className="detail-info font-medium m-0">{order.user.email}</p>
      </div>

      <div className="mb-5">
        <p className="detail-label text-xs uppercase tracking-wide">
          Date
        </p>
        <p className="detail-info font-medium m-0">{new Date(order.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="space-y-3 mb-5">
        <div>
          <p className="detail-label text-xs uppercase tracking-wide">
            Montant TTC
          </p>
          <p className="detail-info font-medium m-0">{formatPriceToEuros(order.totalTTC)}</p>
        </div>

        <div>
          <p className="detail-label text-xs uppercase tracking-wide">
            Montant TVA
          </p>
          <p className="detail-info font-medium m-0">{formatPriceToEuros(order.totalVAT)}</p>
        </div>

        <div>
          <p className="detail-label text-xs uppercase tracking-wide">
            Montant HT
          </p>
          <p className="detail-info font-medium m-0">{formatPriceToEuros(order.totalHT)}</p>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex flex-row">
          <div className="flex flex-row basis-1/3">
            <p className="detail-label text-xs uppercase tracking-wide">
              Payée
            </p>
            <p className="detail-info font-medium mb-1 ml-5">{order.isPaid ? "OUI" : "NON"}</p>
          </div>
          <div className="flex flex-row basis-2/3">
            <p className="detail-label text-xs uppercase tracking-wide">
              le
            </p>
            <p className="detail-info font-medium mb-1 ml-5">{new Date(order.paidAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <p className="detail-label text-xs uppercase tracking-wide">
            Payment method
          </p>
          <p className="detail-info font-medium m-0">{order.paymentMethod}</p>
        </div>

        <div>
          <p className="detail-label text-xs uppercase tracking-wide">
            Payment intent id
          </p>
          <p className="detail-info font-medium m-0">{order.paymentIntentId}</p>
        </div>

        <div>
          <p className="detail-label text-xs uppercase tracking-wide">
            retait
          </p>
          <p className="detail-info font-medium m-0">{order.isWithdrawn ? "OUI" : "NON"}</p>
        </div>
      </div>

      <div>
        <p className="detail-label text-xs uppercase tracking-wide">
          Adresse de facturation
        </p>
        <div className="adr-card">
          <p className={`font-medium adr-card-title`}>
            {order.billingAddress.name}
          </p>
          <p className="detail-info m-0">{order.billingAddress.address1}</p>
          <p className="detail-info m-0">{order.billingAddress.address2}</p>
          <div className="space-x-3">
            <span className="detail-info ">{order.billingAddress.postalCode}</span>
            <span className="detail-info ">{order.billingAddress.city}</span>
          </div>
        </div>
      </div>

      {order.shippingAddress && (
        <div>
        <p className="detail-label text-xs uppercase tracking-wide">
          Adresse de facturation
        </p>
        <div className="adr-card">
          <p className={`font-medium adr-card-title`}>
            {order.shippingAddress.name}
          </p>
          <p className="detail-info m-0">{order.shippingAddress.address1}</p>
          <p className="detail-info m-0">{order.shippingAddress.address2}</p>
          <div className="space-x-3">
            <span className="detail-info ">{order.shippingAddress.postalCode}</span>
            <span className="detail-info ">{order.shippingAddress.city}</span>
          </div>
        </div>
      </div>
      )}
      

    </div>
  )
}