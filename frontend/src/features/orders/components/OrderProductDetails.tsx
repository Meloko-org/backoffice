import { ImageOff } from "lucide-react";
import { getNameFromProductLine } from "../../../utils/product/nameGetter";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import { OrderProductStatusBadge } from "../../../components/admin/badges/OrderProductStatus";
import type { ModelInfoContext } from "../../../layouts/admin/contexts/AdminInfoContext";

type Props = {
  context: Extract<ModelInfoContext, { type: "orderProduct" }>
}

export default function OrderProductDetails({ context }: Props) {

  const line = context.data

  const imageUrl = line.product.image; 
  const hasImage = Boolean(imageUrl);
  const productName = getNameFromProductLine(line);

  return (
    <div className="bloc-details">

      {/* IMAGE */}
      <div className="details-image-ctn">
        <div className="details-image">
          {hasImage ? (
            <img
              src={imageUrl!}
              alt={productName!}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="details-no-image">
              <ImageOff className="w-8 h-8" />
              <span>Aucune image</span>
            </div>
          )}
        </div>
      </div>

      <div className="details-cols-2">
        <div className="">
          <div>
            <p className="details-label">
              Produit
            </p>
            <p className="details-info">{productName}</p>
          </div>
          <div>
            <p className="details-label">
              Prix
            </p>
            <p className="details-info">{formatPriceToEuros(line.product.price)}</p>
          </div>

          {line.product.productCustomName && (
            <>
              <div>
                <p className="details-label">
                  poids par unité
                </p>
                <p className="details-info">{line.product.weightPerUnit}</p>
              </div>
              <div>
                <p className="details-label">
                  origine
                </p>
                <p className="details-info">{line.product.origin}</p>
              </div>
              <div>
                <p className="details-label">
                  format
                </p>
                <p className="details-info">{line.product.format}</p>
              </div>
              <div>
                <p className="details-label">
                  portion
                </p>
                <p className="details-info">{line.product.portion}</p>
              </div>
            </>
          )}

        </div>

        <div className="details-col-right">
          <div>
            <p className="details-label">
              Prix Unitaire HT
            </p>
            <p className="details-info">{formatPriceToEuros(line.unitPriceHT)}</p>
          </div>
          <div>
            <p className="details-label">
              taux tva
            </p>
            <p className="details-info">{formatPriceToEuros(line.vatRate)}</p>
          </div>
          <div>
            <p className="details-label">
              montant tva
            </p>
            <p className="details-info">{formatPriceToEuros(line.vatAmount)}</p>
          </div>
          <div>
            <p className="details-label">
              Prix Unitaire ttc
            </p>
            <p className="details-info">{formatPriceToEuros(line.unitPriceTTC)}</p>
          </div>
          <div>
            <p className="details-label">
              quantité
            </p>
            <p className="details-info">{`${line.quantity} ${line.unit}`}</p>
          </div>
          <div>
            <p className="details-label">
              Prix total ttc
            </p>
            <p className="details-info">{formatPriceToEuros(line.totalPriceTTC)}</p>
          </div>
        </div>
      </div>

      <div className="details-cols-2 my-3 items-center">
        {/* <div className="details-col-right"> */}
          <h3 className="text-right">
            Status du produit
          </h3>
        {/* </div> */}

        <div className="details-info">
          <OrderProductStatusBadge status={line.productStatus} />
        </div>
      </div>


      {line.productStatus === "cancelled" && (
        <div className="rounded-lg bg-danger/10 px-4 pt-4 pb-2">

          <div className="details-cols-2">
            <p className="details-label-danger">
              Remboursé
            </p>
            <p className="details-info">{line.refunded ? "OUI" : "NON"}</p>
          </div>
          
          <div className="details-cols-2">
            <p className="details-label-danger">
              Date du remboursement
            </p>
            <p className="details-info">{new Date(line.refundedAt).toLocaleDateString()}</p>
          </div>
          
          <div>
            <p className="details-label-danger">
              Raison du remboursement
            </p>
            <p className="details-info">{line.refundReason}</p>
          </div>
          
          <div>
            <p className="details-label-danger">
              Avoir
            </p>
            <p className="details-info">{line.refundCreditNote}</p>
          </div>

        </div>
      )}
      
      


    </div>
  )
}