import { ImageOff } from "lucide-react";
import { getNameFromProductLine } from "../../../utils/product/nameGetter";
import type { ProductLine } from "../types/order";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";

type Props = {
  line: ProductLine;
}

export default function OrderProductDetails({ line}: Props) {

  if (!line) return null;

  const imageUrl = line.product.image; 
  const hasImage = Boolean(imageUrl);
  const productName = getNameFromProductLine(line);

  return (
    <div className="right-panel-compact">

      {/* IMAGE */}
      <div className="px-10">
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

      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Produit
        </span>
        <span className="detail-info font-medium m-0">{productName}</span>
      </div>

      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Prix
        </span>
        <span className="detail-info font-medium m-0">{formatPriceToEuros(line.product.price)}</span>
      </div>

      {line.product.productCustomName && (
        <>
          <div className="right-panel-compact-row">
            <span className="detail-label text-xs uppercase tracking-wide">
              Poids par unité
            </span>
            <span className="detail-info font-medium m-0">{line.product.weightPerUnit}</span>
          </div>

          <div className="right-panel-compact-row">
            <span className="detail-label text-xs uppercase tracking-wide">
              Origine
            </span>
            <span className="detail-info font-medium m-0">{line.product.origin}</span>
          </div>

          <div className="right-panel-compact-row">
            <span className="detail-label text-xs uppercase tracking-wide">
              Format
            </span>
            <span className="detail-info font-medium m-0">{line.product.format}</span>
          </div>

          <div className="right-panel-compact-row">
            <span className="detail-label text-xs uppercase tracking-wide">
              Portion
            </span>
            <span className="detail-info font-medium m-0">{line.product.portion}</span>
          </div>
        </>
      )}

      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Quantité
        </span>
        <span className="detail-info font-medium m-0">{`${line.quantity} ${line.unit}`}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Prix unitaire HT
        </span>
        <span className="detail-info font-medium m-0">{formatPriceToEuros(line.unitPriceHT)}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Taux TVA
        </span>
        <span className="detail-info font-medium m-0">{formatPriceToEuros(line.vatRate)}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Montant TVA
        </span>
        <span className="detail-info font-medium m-0">{formatPriceToEuros(line.vatAmount)}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Prix unitaire TTC
        </span>
        <span className="detail-info font-medium m-0">{formatPriceToEuros(line.unitPriceTTC)}</span>
      </div>
    
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Quantité
        </span>
        <span className="detail-info font-medium m-0">{`${line.quantity} ${line.unit}`}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Prix total TTC
        </span>
        <span className="detail-info font-medium m-0">{formatPriceToEuros(line.totalPriceTTC)}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Status du produit
        </span>
        <span className="detail-info font-medium m-0">{line.productStatus}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Remboursé
        </span>
        <span className="detail-info font-medium m-0">{line.refunded}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Raison du remboursement
        </span>
        <span className="detail-info font-medium m-0">{line.refundReason}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Date du remboursement
        </span>
        <span className="detail-info font-medium m-0">{line.refundedAt}</span>
      </div>
      
      <div className="right-panel-compact-row">
        <span className="detail-label text-xs uppercase tracking-wide">
          Avoir
        </span>
        <span className="detail-info font-medium m-0">{line.refundCreditNote}</span>
      </div>






    </div>
  )
}