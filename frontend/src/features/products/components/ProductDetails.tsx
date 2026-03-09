import { ImageOff } from "lucide-react";
import type { Product } from "../types/product";
import DetailsActions from "../../../components/admin/details/DetailsActions";
import { rightPanelRegistry } from "../../../layouts/admin/config/rightPanelRegistry";

type Props = {
	product: Product;
}


export default function FamilyDetails({
	product,
}: Props) {

	if (!product) return null;


  const config = rightPanelRegistry.product


	const imageUrl = product.image; 
  const hasImage = Boolean(imageUrl);


  return (
    <div className="bloc-details">
      
      {/* IMAGE */}
      <div className="details-image-ctn">
        <div className="details-image">
          {hasImage ? (
            <img
              src={imageUrl!}
              alt={product.name}
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
        <p className="details-info">{product.name}</p>
      </div>

      <div>
        <p className="details-label">
          Slug
        </p>
        <p className="details-info slug ">
          {product.slug}
        </p>
      </div>

      <div>
        <p className="details-label">
          Famille
        </p>
        <p className="details-info">{product.family.name}</p>
      </div>

      <div>
        <p className="details-label">
          Catégorie
        </p>
        <p className="details-info">{product.family.category.name}</p>
      </div>

      <div className="details-cols-3">
        <div className="details-inline">
          <div className="details-label">Unité</div>
          <div className="details-info">{product.weight.unit}</div>
        </div>
        <div className="details-inline">
          <div className="details-label">Mesure</div>
          <div className="details-info ">{product.weight.measurement}</div>
        </div>
        <div className="details-inline">
          <div className="details-label">TVA</div>
          <div className="details-info ">{product.vatRate}</div>
        </div>
      </div>

      
      <div>
        <p className="details-label">
          Description
        </p>
        <p className="details-info details-desc">
          {product.description}
        </p>
      </div>


      <DetailsActions
        item={product}
        actions={config?.actions ?? []}
        wrapperClasses="details-cols-2 mt-5"
      />

    </div>
  );
}