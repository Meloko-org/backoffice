import { ImageOff } from "lucide-react";
import type { Product } from "../types/product";
import DetailsActions from "../../../components/admin/details/DetailsActions";
import { useEffect, useMemo, useState } from "react";
import { getProductById } from "../api/products.api";
import { useProductActionsContext } from "../hooks/useProductActionsContext";
import { productActions } from "../config/productActionsRegistry";
import Loader from "../../../components/admin/Loader";
import type { WithId } from "../../../layouts/admin/contexts/AdminInfoContext";

type Props = {
	context: WithId<"product"> 
}


export default function FamilyDetails({
	context,
}: Props) {

  const { id } = context

	const [ product, setProduct ] = useState<Product | null>(null);

  useEffect(() => {
    getProductById(id).then(setProduct)
  }, [id])

  const ctx = useProductActionsContext();

  const actions = useMemo(() => {
    if (!product) return [];
    return productActions.getActions(product, ctx, "details")
  }, [product, ctx])

  if (!product) {
      return (
        <Loader />
      )
    }


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
        actions={actions}
        wrapperClasses="details-cols-2 mt-5"
      />

    </div>
  );
}