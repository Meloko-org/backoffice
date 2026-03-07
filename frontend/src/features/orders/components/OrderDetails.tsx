import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import { getNameFromProductLine } from "../../../utils/product/nameGetter";
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

  console.log(order)

  return (
    <div className="bloc-details">

      <div>
        <p className="details-label">
          Numéro de commande
        </p>
        <p className="details-info-medium">{order.orderNumber}</p>
      </div>

      <div>
        <p className="details-label">
          Client
        </p>
        <p className="details-info-medium m-0">{`${order.user.firstname} ${order.user.lastname}`}</p>
        <p className="details-info-medium">{order.user.email}</p>
      </div>

      <div className="details-cols-2">
        <div>
          <p className="details-label">
            Adresse de facturation
          </p>
          <div className="adr-card">
            <p className={`font-medium adr-card-title`}>
              {order.billingAddress.name}
            </p>
            <p className="details-info m-0 px-1">{order.billingAddress.address1}</p>
            <p className="details-info m-0 px-1">{order.billingAddress.address2}</p>
            <div className="space-x-3">
              <span className="details-info px-1">{order.billingAddress.postalCode}</span>
              <span className="details-info px-1">{order.billingAddress.city}</span>
            </div>
          </div>
        </div>
        <div>
          {order.shippingAddress && (
            <>
              <p className="details-label">
                Adresse de facturation
              </p>
              <div className="adr-card">
                <p className={`font-medium adr-card-title`}>
                  {order.shippingAddress.name}
                </p>
                <p className="details-info m-0 px-1">{order.shippingAddress.address1}</p>
                <p className="details-info m-0 px-1">{order.shippingAddress.address2}</p>
                <div className="space-x-3">
                  <span className="details-info px-1">{order.shippingAddress.postalCode}</span>
                  <span className="details-info px-1">{order.shippingAddress.city}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="details-cols-2 mt-10">
        <div>
          <div>
            <p className="details-label">
              Date
            </p>
            <p className="details-info">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="details-label">
              Montant TTC
            </p>
            <p className="details-info">{formatPriceToEuros(order.totalTTC)}</p>
          </div>

          <div>
            <p className="details-label">
              Montant TVA
            </p>
            <p className="details-info">{formatPriceToEuros(order.totalVAT)}</p>
          </div>

          <div>
            <p className="details-label">
              Montant HT
            </p>
            <p className="details-info">{formatPriceToEuros(order.totalHT)}</p>
          </div>
        </div>
        <div className="details-col-right">
          <div>
            <p className="details-label">
              liste produits
            </p>
            {order.details.map((d) => (
              <div key={d._id} className="details-shop-bloc">
                <p className="details-shop-label">{d.shop.name}</p>
                {d.products.map((p) => (
                  <p key={p._id} className="details-product-list">
                    {getNameFromProductLine(p)}
                  </p>
                ))}
              </div>
            )
            )}
          </div>
        </div>
      </div>
      


      <div className="mt-10">
        <div className="space-x-3">
          <div className="flex flex-row gap-x-3">
            <div className="grow"></div>
            <div className="shrink rounded-lg border border-primary p-2">PAYÉE</div>
            {order.isPaid
              ? (
                <div className="flex flex-row items-center mt-1">
                  <p className="details-label">
                    le
                  </p>
                  <p className="details-info">{new Date(order.paidAt).toLocaleDateString()}</p>
                </div>
              ) : (
                <div className="border border-danger p-2">NON PAYÉE</div>
              )
            }
            <div className="grow"></div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div>
          <p className="details-label">
            Payment method
          </p>
          <p className="details-info">{order.paymentMethod}</p>
        </div>

        <div>
          <p className="details-label">
            Payment intent id
          </p>
          <p className="details-info">{order.paymentIntentId}</p>
        </div>

        <div>
          <p className="details-label">
            retirée
          </p>
          <p className="details-info">{order.isWithdrawn ? "OUI" : "NON"}</p>
        </div>
      </div>
      

    </div>
  )
}