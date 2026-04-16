import { useEffect, useState } from "react";
import type { WithId } from "../../../layouts/admin/contexts/AdminInfoContext"
import { type ShopSubOrder } from "../types/shop";
import Loader from "../../../components/admin/Loader";
import { getShopOrderById } from "../api/shops.api";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import { useNavigate } from "react-router-dom";
import { Check, Euro, ImageOff } from "lucide-react";
import { formatQty } from "../../../utils/quantity/quantityConverter";

type Props = {
  context: WithId<"shopSubOrder">
}

export default function ShopOrderDetails({ context }: Props) {

  const navigate = useNavigate();

  const { id } = context;

  const [ subOrder, setSubOrder ] = useState<ShopSubOrder | null>(null);

  useEffect(() => {
    getShopOrderById(id).then(setSubOrder)
  }, [id])


  if (!subOrder) {
    return (
      <Loader />
    )
  }

  

  console.log("subOrder :", subOrder)

  return (
    <div className="bloc-details">

      <div>
        <p className="details-label">
          client
        </p>
        <p className="details-info">{subOrder.user.firstname} {subOrder.user.lastname}</p>
      </div>

      <div className="details-cols-2">
        <div className="">
          <div>
            <p className="details-label">
              montant ht
            </p>
            <p className="details-info">{formatPriceToEuros(subOrder.shopTotalHT)}</p>
          </div>
          <div>
            <p className="details-label">
              montant vat
            </p>
            <p className="details-info">{formatPriceToEuros(subOrder.shopTotalVAT)}</p>
          </div>
          <div>
            <p className="details-label">
              montant ttc
            </p>
            <p className="details-info">{formatPriceToEuros(subOrder.shopTotalTTC)}</p>
          </div>
        </div>

        <div className="details-col-right">
          <div>
            <p className="details-label">
              mode de retrait
            </p>
            <p className="details-info">{subOrder.withdrawMode}</p>
          </div>
          <div>
            <p className="details-label">
              Point de vente
            </p>
            <p className="details-info">{subOrder.withdrawMarket}</p>
          </div>
          <div>
            <p className="details-label">
              jour de retrait
            </p>
            <p className="details-info">{subOrder.withdrawDay}</p>
          </div>
        </div>
      </div>

      <div className="text-primary font-semibold uppercase text-center text-xs">
        Détail produits
      </div>

      
      {subOrder.products.map((p) => (
        <div key={p._id} className="shopOrder-card">
          <div className="shopOrder-img-container">
            <div className="details-image ">
              {p.image ? (
                <img
                  src={p.image!}
                  alt={p.name!}
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
          <div className="col-span-7">
            <div className="flex flex-row gap-2">

              <div className="grow">
                <h4 className="my-0">{p.name}</h4>
                <div>
                  <span className="bloc-label mr-2">Quantity</span>
                  <span className="">{formatQty(p.quantity, p.unit)}</span>
                </div>
                <div>
                  <span className="bloc-label mr-2">Prix</span>
                  <span className="">{formatPriceToEuros(p.totalPrice)}</span>
                </div>
              </div>

              <div className="place-self-center">
                <div className="shopOrder-unit-container">
                  <div className="flex justify-between">
                    <span className="shopOrder-unit-label">Prix U. HT</span>
                    <span className="shopOrder-unit-value">{formatPriceToEuros(p.unitPriceHT)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="shopOrder-unit-label">Taux TVA</span>
                    <span className="shopOrder-unit-value">{p.vatRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="shopOrder-unit-label">Prix U. TTC</span>
                    <span className="shopOrder-unit-value">{formatPriceToEuros(p.unitPriceTTC)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="place-self-center">
            
            {p.productStatus === "confirmed" && (
              <div className="bg-primary/10 rounded-md p-1 place-self-center content-self-center">
                <Check className="text-primary" />
              </div>
            )}
            {p.refunded && (
              <div className="bg-danger/10 rounded-md p-1 place-self-center content-self-center">
                <Euro className="text-danger" />
              </div>
            )}
            
          </div>
        </div>
      ))}
      

      <div className="details-cols-2 mt-10">
        <div className="">
          <div>
            <p className="details-label">
              status
            </p>
            <p className="details-info">{subOrder.status}</p>
          </div>
        </div>

        <div className="details-col-right">
          <div>
            <p className="details-label">
              probleme de stock
            </p>
            <p className="details-info">{subOrder.stockIssue ? "Oui" : "Non"}</p>
          </div>
        </div>
      </div>

      <div className="mb-15">
        <p className="details-label">
          Avoirs
        </p>
        <p className="details-info">
          {subOrder.creditNotes.map((cn) => (
            <button
              onClick={() => {}}
              className="btn-success"
            >
              Voir l'avoir
            </button>
          ))}
        </p>
      </div>


      <div className="details-cols-2 mt-5">

        <div className="">
          <button
            onClick={() => {}}
            className="btn-success w-full "
          >
            Voir la facture
          </button>
        </div>

        <div className="">
          <button
            onClick={() => navigate(`/admin/orders/${subOrder.orderId}`)}
            className="btn-primary w-full text-center"
          >
            Voir commande globale
          </button>
        </div>
      </div>

        
        
      

      

    </div>
  )
}