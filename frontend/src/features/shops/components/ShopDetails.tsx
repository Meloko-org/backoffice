import { useEffect, useMemo, useState } from "react";
import { getShopById } from "../api/shops.api";
import type { ShopDetail } from "../types/shop";
import { useShopActionsContext } from "../hooks/useShopActionsContext";
import { shopActions } from "../config/shopActionsregistry";
import Loader from "../../../components/admin/Loader";
import DetailsActions from "../../../components/admin/details/DetailsActions";
import { ImageOff } from "lucide-react";
import ShopStatusesBar from "./ShopStatusesBar";
import type { WithId } from "../../../layouts/admin/contexts/RightPanelContext";

type Props = {
  context: WithId<"shop">
}


export default function ShopDetails({
  context,
}: Props) {

  const { id } = context;

  const [ shop, setShop ] = useState<ShopDetail | null>(null);

  /* fetch du shop */
  useEffect(() => {
    getShopById(id).then(setShop)
  }, [id])

  /* création du context des actions */
  const ctx = useShopActionsContext();

  /* récupération des actions spécifiques au shop */
  const actions = useMemo(() => {
    if (!shop) return [];
    return shopActions.getActions(shop, ctx, "details")
  }, [shop, ctx])

  /* loader */
  if (!shop) {
    return (
      <Loader />
    )
  }

  const imageUrl = shop.logo; 
  const hasImage = Boolean(imageUrl);


  return (
    <div className="bloc-details">

      <div className="flex flex-row gap-x-3">
        <div className="w-[65%] space-y-3">
          <div>
            <p className="details-label">
              Nom 
            </p>
            <p className="details-info m-0">{shop.name}</p>
          </div>
          <div>
            <p className="details-label">
              siret
            </p>
            <p className="details-info m-0">{shop.siret}</p>
          </div>

          <ShopStatusesBar
            isOpen={shop.isOpen}
            isPremium={shop.isPremium}
            isValidated={shop.isValidated}
            extraClasses="w-full"
          />


          

        </div>
        <div className="flex items-center justify-center w-[35%]">
          <div className="no-pict w-full aspect-square rounded-full overflow-hidden flex items-center justify-center">
            {hasImage ? (
              <img
                src={imageUrl!}
                alt={shop.name}
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
      </div>

      <div>
        <p className="details-label">
          types
        </p>
        <div className="details-info">
          {shop.types.map(t => t.label).join(", ")}
        </div>
      </div>

      {shop.address && (
        <>
          <div>
              <p className="details-label">
                Adresse
              </p>
            </div>
          <div className="w-auto adr-card">
            <p className="details-info m-0 px-1">{shop.address.address1}</p>
            <p className="details-info m-0 px-1">{shop.address.address2}</p>
            <div className="space-x-3">
              <span className="details-info px-1">{shop.address.postalCode}</span>
              <span className="details-info px-1">{shop.address.city}</span>
            </div>
          </div>
        </>
      )}

      <div>
        <p className="details-label">
          nombre de photos
        </p>
        <div className="details-info">
          {shop.stats.photosCount}
        </div>
      </div>

      <div>
        <p className="details-label">
          nombre de videos
        </p>
        <div className="details-info">
          {shop.stats.videosCount}
        </div>
      </div>

      <div>
        <p className="details-label">
          nombre d'employés
        </p>
        <div className="details-info">
          {shop.stats.crewCount}
        </div>
      </div>

      <div>
        <p className="details-label">
          nombre de features
        </p>
        <div className="details-info">
          {shop.stats.featuresCount}
        </div>
      </div>

      <div>
        <p className="details-label">
          réseaux sociaux
        </p>
        <div className="details-info">
          {shop.socials.map(s => s.platform).join(", ")}
        </div>
      </div>


      <DetailsActions
        actions={actions}
        wrapperClasses="details-button-row mt-5"
      />

    </div>
  )
}