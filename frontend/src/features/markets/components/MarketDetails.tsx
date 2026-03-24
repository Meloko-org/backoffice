import { ImageOff } from "lucide-react";
import type { Market } from "../types/markets";
import DetailsActions from "../../../components/admin/details/DetailsActions";
import { useEffect, useMemo, useState } from "react";
import { getMarketById } from "../api/markets.api";
import { useMarketActionsContext } from "../hooks/useMarketActionContext";
import { marketActions } from "../config/marketActionsRegistry";
import Loader from "../../../components/admin/Loader";

type Props = {
	id: string;
}


export default function FamilyDetails({
	id,
}: Props) {

	const [ market, setMarket ] = useState<Market | null>(null)

  useEffect(() => {
    getMarketById(id).then(setMarket)
  }, [id])

  const ctx = useMarketActionsContext();

  const actions = useMemo(() => {
    if (!market) return [];
    return marketActions.getActions(market, ctx, "details")
  }, [ market, ctx])

  if (!market) {
      return (
        <Loader />
      )
    }

	const imageUrl = market.image; 
  const hasImage = Boolean(imageUrl);

  return (
    <div className="bloc-details">

      {/* IMAGE */}
      <div className="details-image-ctn">
        <div className="details-image">
          {hasImage ? (
            <img
              src={imageUrl!}
              alt={market.name}
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

      {/* INFOS */}
      <div>
        <p className="details-label">
          Nom
        </p>
        <p className="details-info">{market.name}</p>
      </div>

      <div>
        <p className="details-label">
          Slug
        </p>
        <p className="details-info slug">
          {market.slug}
        </p>
      </div>

      <div>
        <p className="details-label">
          Adresse
        </p>
        <div className="adr-card">
          <p className="details-info m-0 px-1">{market.address.address1}</p>
          <p className="details-info m-0 px-1">{market.address.address2}</p>
          <div className="space-x-3">
            <span className="details-info px-1">{market.address.postalCode}</span>
            <span className="details-info px-1">{market.address.city}</span>
          </div>
        </div>
      </div>

      <div className="details-cols-2">
        <div>
          <p className="details-label">
          Latitude
          </p>
          <p className="details-info slug">
            {market.address.latitude}
          </p>
        </div>
        <div>
          <p className="details-label">
            Longitude
          </p>
          <p className="details-info slug">
            {market.address.longitude}
          </p>
        </div>
      </div>          

      <div>
        <p className="details-label">
          Description
        </p>
        <p className="details-info details-desc">
          {market.description}
        </p>
      </div>



      {/* ACTIONS */}
      <DetailsActions
        actions={actions}
        wrapperClasses="details-cols-2 mt-5"
      />

    </div>
  );
}