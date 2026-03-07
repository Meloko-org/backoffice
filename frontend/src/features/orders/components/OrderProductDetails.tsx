import { ImageOff } from "lucide-react";
import { getNameFromProductLine } from "../../../utils/product/nameGetter";
import type { ProductLine } from "../types/order";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import { OrderProductStatusBadge } from "../../../components/admin/badges/OrderProductStatus";

type Props = {
  line: ProductLine;
}

export default function OrderProductDetails({ line}: Props) {

  if (!line) return null;

  const imageUrl = line.product.image; 
  const hasImage = Boolean(imageUrl);
  const productName = getNameFromProductLine(line);

  return (
    <div className="right-panel">

      {/* IMAGE */}
      <div className="px-15 mb-5">
        <div className="no-pict w-full aspect-4/3 rounded-lg overflow-hidden flex items-center justify-center">
          {hasImage ? (
            <img
              src={imageUrl!}
              alt={productName!}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-neutral-400">
              <ImageOff className="w-8 h-8" />
              <span>Aucune image</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-3">
        <div className="basis-1/2 space-y-3">
          <div>
            <p className="detail-label">
              Produit
            </p>
            <p className="detail-info font-medium m-0">{productName}</p>
          </div>
          <div>
            <p className="detail-label">
              Prix
            </p>
            <p className="detail-info font-medium m-0">{formatPriceToEuros(line.product.price)}</p>
          </div>

          {line.product.productCustomName && (
            <>
              <div>
                <p className="detail-label">
                  poids par unité
                </p>
                <p className="detail-info font-medium m-0">{line.product.weightPerUnit}</p>
              </div>
              <div>
                <p className="detail-label">
                  origine
                </p>
                <p className="detail-info font-medium m-0">{line.product.origin}</p>
              </div>
              <div>
                <p className="detail-label">
                  format
                </p>
                <p className="detail-info font-medium m-0">{line.product.format}</p>
              </div>
              <div>
                <p className="detail-label">
                  portion
                </p>
                <p className="detail-info font-medium m-0">{line.product.portion}</p>
              </div>
            </>
          )}

        </div>

        <div className="basis-1/2 space-y-3 text-right">
          <div>
            <p className="detail-label">
              Prix Unitaire HT
            </p>
            <p className="detail-info font-medium m-0">{formatPriceToEuros(line.unitPriceHT)}</p>
          </div>
          <div>
            <p className="detail-label">
              taux tva
            </p>
            <p className="detail-info font-medium m-0">{formatPriceToEuros(line.vatRate)}</p>
          </div>
          <div>
            <p className="detail-label">
              montant tva
            </p>
            <p className="detail-info font-medium m-0">{formatPriceToEuros(line.vatAmount)}</p>
          </div>
          <div>
            <p className="detail-label">
              Prix Unitaire ttc
            </p>
            <p className="detail-info font-medium m-0">{formatPriceToEuros(line.unitPriceTTC)}</p>
          </div>
          <div>
            <p className="detail-label">
              quantité
            </p>
            <p className="detail-info font-medium m-0">{`${line.quantity} ${line.unit}`}</p>
          </div>
          <div>
            <p className="detail-label">
              Prix total ttc
            </p>
            <p className="detail-info font-medium m-0">{formatPriceToEuros(line.totalPriceTTC)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-56 justify-between mx-auto my-5">
        <span className="detail-label text-xs uppercase tracking-wide">
          Status du produit
        </span>
        <span className="detail-info font-medium m-0">
          <OrderProductStatusBadge status={line.productStatus} />
        </span>
      </div>


      {line.productStatus === "cancelled" && (
        <>
          <div className="rounded-lg bg-danger/10 p-4">
          <div>
            <p className="detail-label">
              Remboursé
            </p>
            <p className="detail-info font-medium m-0">{line.refunded ? "OUI" : "NON"}</p>
          </div>
          
          <div>
            <p className="detail-label">
              Raison du remboursement
            </p>
            <p className="detail-info font-medium m-0">{line.refundReason}</p>
          </div>
          
          <div>
            <p className="detail-label">
              Date du remboursement
            </p>
            <p className="detail-info font-medium m-0">{new Date(line.refundedAt).toLocaleDateString()}</p>
          </div>
          
          <div>
            <p className="detail-label">
              Avoir
            </p>
            <p className="detail-info font-medium m-0">{line.refundCreditNote}</p>
          </div>
          </div>
        </>
      )}
      
      


    </div>
  )
}