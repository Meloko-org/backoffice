import { ImageOff } from "lucide-react";
import type { Market } from "../types/markets";
import { rightPanelRegistry } from "../../../layouts/admin/config/rightPanelRegistry";
import DetailsActions from "../../../components/admin/details/DetailsActions";

type Props = {
	market: Market;
}


export default function FamilyDetails({
	market,
}: Props) {

	if (!market) return null;

  const config = rightPanelRegistry.category;

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
        item={market}
        actions={config?.actions ?? []}
        wrapperClasses="details-cols-2 mt-5"
      />

    </div>
  );
}